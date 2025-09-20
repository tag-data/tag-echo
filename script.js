// TAG Echo - Enterprise Political Copywriting Platform
// Professional JavaScript functionality

class TagEcho {
    constructor() {
        this.currentTab = 'analyzer';
        this.chatMinimized = false;
        this.analysisResults = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCharacterCounter();
        this.setupChatAssistant();
        this.loadDemoData();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabId = e.currentTarget.dataset.tab;
                this.switchTab(tabId);
            });
        });

        // Copy analyzer
        const analyzeBtn = document.getElementById('analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.analyzeCopy());
        }

        // Copy input
        const copyInput = document.getElementById('copy-input');
        if (copyInput) {
            copyInput.addEventListener('input', () => this.updateCharCount());
            copyInput.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                    this.analyzeCopy();
                }
            });
        }

        // Channel selector
        const channelSelect = document.getElementById('channel-select');
        if (channelSelect) {
            channelSelect.addEventListener('change', () => this.updateChannelGuidance());
        }

        // Chat functionality
        const chatSend = document.getElementById('chat-send');
        const chatInput = document.getElementById('chat-input');
        const chatToggle = document.getElementById('chat-toggle');

        if (chatSend) {
            chatSend.addEventListener('click', () => this.sendChatMessage());
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }

        if (chatToggle) {
            chatToggle.addEventListener('click', () => this.toggleChat());
        }

        // Template usage
        document.querySelectorAll('.use-template-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const template = e.target.closest('.template-card').querySelector('p').textContent;
                this.useTemplate(template);
            });
        });

        // Generate copy button
        const generateBtn = document.querySelector('.generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateCopy());
        }

        // Settings dropdown
        const settingsBtn = document.getElementById('settings-btn');
        const settingsDropdown = document.getElementById('settings-dropdown');
        if (settingsBtn && settingsDropdown) {
            settingsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleSettings();
            });

            // Close settings when clicking outside
            document.addEventListener('click', (e) => {
                if (!settingsDropdown.contains(e.target) && !settingsBtn.contains(e.target)) {
                    this.closeSettings();
                }
            });
        }

        // Settings item interactions
        document.querySelectorAll('.settings-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleSettingsItemClick(item);
            });
        });

        // Toggle switches
        document.querySelectorAll('.toggle-switch input').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                this.handleToggleChange(e.target);
            });
        });

        // Logout button
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Workspace interactions
        document.querySelectorAll('.workspace-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.workspace-item').forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.switchWorkspace(e.currentTarget.textContent.trim());
            });
        });

        // Project interactions
        document.querySelectorAll('.project-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.loadProject(e.currentTarget.querySelector('.project-name').textContent);
            });
        });
    }

    switchTab(tabId) {
        // Update tab buttons
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');

        this.currentTab = tabId;
        
        // Add animation
        document.getElementById(tabId).classList.add('fade-in');
        setTimeout(() => {
            document.getElementById(tabId).classList.remove('fade-in');
        }, 300);
    }

    setupCharacterCounter() {
        this.updateCharCount();
    }

    updateCharCount() {
        const copyInput = document.getElementById('copy-input');
        const charCount = document.getElementById('char-count');
        
        if (copyInput && charCount) {
            const count = copyInput.value.length;
            charCount.textContent = count;
            
            // Update color based on channel limits
            const channel = document.getElementById('channel-select').value;
            let limit = 280; // Default
            
            switch (channel) {
                case 'sms':
                    limit = 160;
                    break;
                case 'email':
                    limit = 50; // Subject line
                    break;
                case 'social':
                    limit = 280;
                    break;
                case 'winred':
                    limit = 100;
                    break;
            }
            
            if (count > limit) {
                charCount.style.color = 'var(--error-red)';
            } else if (count > limit * 0.8) {
                charCount.style.color = 'var(--warning-orange)';
            } else {
                charCount.style.color = 'var(--gray-500)';
            }
        }
    }

    updateChannelGuidance() {
        this.updateCharCount();
        
        const channel = document.getElementById('channel-select').value;
        const copyInput = document.getElementById('copy-input');
        
        // Update placeholder based on channel
        const placeholders = {
            email: 'Subject: Join Our Movement for Change\\n\\nDear [Name],\\n\\nOur community deserves strong leadership on the issues that matter most. Together, we can build a better future for all families...',
            sms: 'Join our campaign for positive change in our community. Your support helps us reach more voters and share our message. Contribute today!',
            social: 'Our community deserves strong leadership. Join thousands of neighbors supporting positive change. Your voice matters! #CommunityFirst',
            web: 'Building a Stronger Community Together\\n\\nOur campaign is focused on the issues that matter most to working families. With your support, we can create real change in our community.',
            print: 'Together, we can build a stronger future for our community. Join our campaign for positive change and help us reach every voter with our message of hope and progress.'
        };
        
        if (copyInput && placeholders[channel]) {
            copyInput.placeholder = placeholders[channel];
        }
    }

    async analyzeCopy() {
        const copyInput = document.getElementById('copy-input');
        const analyzeBtn = document.getElementById('analyze-btn');
        const resultsSection = document.getElementById('results-section');
        
        if (!copyInput.value.trim()) {
            this.showNotification('Please enter some copy to analyze', 'warning');
            return;
        }

        // Show loading state
        analyzeBtn.classList.add('loading');
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        
        try {
            // Simulate API call
            await this.delay(2000);
            
            // Generate mock analysis results
            const results = this.generateMockAnalysis(copyInput.value);
            this.displayAnalysisResults(results);
            
            // Show results section
            resultsSection.style.display = 'block';
            resultsSection.classList.add('slide-up');
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
        } catch (error) {
            this.showNotification('Analysis failed. Please try again.', 'error');
        } finally {
            // Reset button
            analyzeBtn.classList.remove('loading');
            analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze Message';
        }
    }

    generateMockAnalysis(text) {
        const channel = document.getElementById('channel-select').value;
        const length = text.length;
        const urgencyWords = ['urgent', 'now', 'today', 'deadline', 'time', 'important'];
        const ctaWords = ['donate', 'contribute', 'support', 'join', 'participate', 'volunteer'];
        const emotionalWords = ['community', 'together', 'future', 'change', 'help', 'build'];
        
        // Calculate scores based on content analysis
        const urgencyScore = this.calculateWordScore(text.toLowerCase(), urgencyWords) * 20 + Math.random() * 20 + 60;
        const ctaScore = this.calculateWordScore(text.toLowerCase(), ctaWords) * 25 + Math.random() * 15 + 70;
        const engagementScore = this.calculateWordScore(text.toLowerCase(), emotionalWords) * 15 + Math.random() * 25 + 60;
        const clarityScore = Math.max(0, 100 - (length / 10)) + Math.random() * 20;
        
        const overallScore = Math.round((urgencyScore + ctaScore + engagementScore + clarityScore) / 4);
        
        // Generate insights based on analysis
        const positiveInsights = [];
        const negativeInsights = [];
        const suggestions = [];
        
        if (urgencyScore > 80) {
            positiveInsights.push('Strong motivational language encourages immediate action');
        }
        if (ctaScore > 85) {
            positiveInsights.push('Clear and compelling call-to-action');
        }
        if (engagementScore > 75) {
            positiveInsights.push('Effective community-focused messaging');
        }
        
        if (length > 160 && channel === 'sms') {
            negativeInsights.push('Message length may exceed SMS character limits');
        }
        if (urgencyScore < 70) {
            negativeInsights.push('Could benefit from stronger action-oriented language');
        }
        if (!text.toLowerCase().includes('support') && !text.toLowerCase().includes('join')) {
            negativeInsights.push('Consider including clearer participation opportunities');
        }
        
        suggestions.push({
            type: 'Shorter Version',
            text: this.generateShorterVersion(text)
        });
        suggestions.push({
            type: 'Personalized',
            text: this.generatePersonalizedVersion(text)
        });
        
        return {
            overallScore,
            metrics: {
                engagement: Math.round(engagementScore),
                urgency: Math.round(urgencyScore),
                clarity: Math.round(clarityScore),
                cta: Math.round(ctaScore)
            },
            insights: {
                positive: positiveInsights,
                negative: negativeInsights,
                suggestions
            },
            predictions: {
                clickRate: (overallScore / 10 + Math.random() * 5).toFixed(1),
                donationRate: (overallScore / 30 + Math.random() * 2).toFixed(1),
                shareRate: (overallScore / 50 + Math.random() * 1).toFixed(1),
                avgDonation: Math.round(25 + (overallScore - 50) * 0.5 + Math.random() * 20)
            }
        };
    }

    calculateWordScore(text, words) {
        let score = 0;
        words.forEach(word => {
            if (text.includes(word)) score += 1;
        });
        return Math.min(score / words.length, 1);
    }

    generateShorterVersion(text) {
        // Simple algorithm to create shorter version
        const words = text.split(' ');
        if (words.length <= 10) return text;
        
        const key_words = words.filter(word => 
            word.toLowerCase().includes('community') ||
            word.toLowerCase().includes('support') ||
            word.toLowerCase().includes('join') ||
            word.toLowerCase().includes('together') ||
            word.toLowerCase().includes('change')
        );
        
        if (key_words.length > 0) {
            return key_words.slice(0, 12).join(' ') + '...';
        }
        
        return words.slice(0, 12).join(' ') + '...';
    }

    generatePersonalizedVersion(text) {
        return text.replace(/you/gi, '[Name], you').replace(/your/gi, 'your');
    }

    displayAnalysisResults(results) {
        // Update main score
        document.getElementById('main-score').textContent = results.overallScore;
        
        // Update metric bars
        const metrics = ['engagement', 'urgency', 'clarity', 'cta'];
        metrics.forEach((metric, index) => {
            const fill = document.querySelectorAll('.metric-fill')[index];
            const value = document.querySelectorAll('.metric-value')[index];
            if (fill && value) {
                fill.style.width = `${results.metrics[metric]}%`;
                value.textContent = `${results.metrics[metric]}%`;
            }
        });
        
        // Update insights
        const positiveList = document.getElementById('positive-insights');
        const negativeList = document.getElementById('negative-insights');
        const suggestionsDiv = document.getElementById('ai-suggestions');
        
        if (positiveList) {
            positiveList.innerHTML = results.insights.positive.map(insight => `<li>${insight}</li>`).join('');
        }
        
        if (negativeList) {
            negativeList.innerHTML = results.insights.negative.map(insight => `<li>${insight}</li>`).join('');
        }
        
        if (suggestionsDiv) {
            suggestionsDiv.innerHTML = results.insights.suggestions.map(suggestion => 
                `<div class="suggestion"><strong>${suggestion.type}:</strong> "${suggestion.text}"</div>`
            ).join('');
        }
        
        // Update predictions
        const predictions = document.querySelectorAll('.metric-prediction');
        if (predictions.length >= 4) {
            predictions[0].textContent = `${results.predictions.clickRate}% ± 2.1%`;
            predictions[1].textContent = `${results.predictions.donationRate}% ± 0.8%`;
            predictions[2].textContent = `${results.predictions.shareRate}% ± 0.4%`;
            predictions[3].textContent = `$${results.predictions.avgDonation}`;
        }
        
        this.analysisResults = results;
    }

    setupChatAssistant() {
        // Initialize chat with welcome message (already in HTML)
    }

    sendChatMessage() {
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        
        if (!chatInput.value.trim()) return;
        
        const userMessage = chatInput.value.trim();
        chatInput.value = '';
        
        // Add user message
        this.addChatMessage(userMessage, 'user');
        
        // Simulate AI response
        setTimeout(() => {
            const aiResponse = this.generateAIResponse(userMessage);
            this.addChatMessage(aiResponse, 'ai');
        }, 1000);
    }

    addChatMessage(message, sender) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = message;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateAIResponse(userMessage) {
        const responses = {
            'help': 'I can assist with message analysis, content generation, and strategic recommendations for your political communications. What would you like help with?',
            'analyze': 'To analyze your message, enter it in the Message Analyzer tab and click "Analyze Message". I\'ll provide insights on engagement potential, clarity, and effectiveness.',
            'generate': 'Use the Content Generator tab to create message variations. Specify your message type, tone, target audience, and key topic for optimal results.',
            'improve': this.analysisResults ? 
                `Based on your recent analysis (score: ${this.analysisResults.overallScore}), I recommend focusing on ${this.analysisResults.metrics.urgency < 70 ? 'action-oriented language' : 'message clarity'}.` :
                'Please analyze a message first, then I can provide specific improvement recommendations.',
            'templates': 'The Templates tab contains proven message formats for various campaign communications. You can customize them for your specific needs.',
            'performance': 'The Performance tab displays campaign metrics and analytics. I can help interpret the data and suggest optimization strategies.',
            'default': 'I\'m here to help with your political messaging needs. Ask me about message analysis, content generation, performance optimization, or template usage.'
        };
        
        const lowerMessage = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return responses.default;
    }

    toggleChat() {
        const chatMessages = document.querySelector('.chat-messages');
        const chatInput = document.querySelector('.chat-input-container');
        const chatToggle = document.getElementById('chat-toggle');
        
        this.chatMinimized = !this.chatMinimized;
        
        if (this.chatMinimized) {
            chatMessages.style.display = 'none';
            chatInput.style.display = 'none';
            chatToggle.innerHTML = '<i class="fas fa-plus"></i>';
        } else {
            chatMessages.style.display = 'block';
            chatInput.style.display = 'flex';
            chatToggle.innerHTML = '<i class="fas fa-minus"></i>';
        }
    }

    // Settings functionality - Enterprise Edition
    toggleSettings() {
        const settingsDropdown = document.getElementById('settings-dropdown');
        const isVisible = settingsDropdown.classList.contains('active');
        
        if (isVisible) {
            this.closeSettings();
        } else {
            this.openSettings();
        }
    }

    openSettings() {
        const settingsDropdown = document.getElementById('settings-dropdown');
        settingsDropdown.classList.add('active');
        
        // Add enterprise-level visual feedback
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                settingsBtn.style.transform = 'scale(1)';
            }, 150);
        }
        
        // Add overlay for mobile
        if (window.innerWidth <= 768) {
            this.createSettingsOverlay();
        }

        // Add escape key listener
        document.addEventListener('keydown', this.handleSettingsEscape.bind(this));
        
        // Add enterprise analytics tracking
        this.trackUserInteraction('settings_opened', 'settings_dropdown');
    }

    closeSettings() {
        const settingsDropdown = document.getElementById('settings-dropdown');
        settingsDropdown.classList.remove('active');
        
        // Remove overlay
        this.removeSettingsOverlay();
        
        // Remove escape key listener
        document.removeEventListener('keydown', this.handleSettingsEscape.bind(this));
    }

    createSettingsOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'settings-overlay show';
        overlay.id = 'settings-overlay';
        overlay.addEventListener('click', () => this.closeSettings());
        document.body.appendChild(overlay);
    }

    removeSettingsOverlay() {
        const overlay = document.getElementById('settings-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    handleSettingsEscape(e) {
        if (e.key === 'Escape') {
            this.closeSettings();
        }
    }

    handleSettingsItemClick(item) {
        const text = item.querySelector('span').textContent;
        
        // Don't handle toggle items (they have their own handlers)
        if (item.classList.contains('toggle-item')) {
            return;
        }

        // Demo functionality for settings items
        const demoActions = {
            'Edit Profile': () => this.showDemo('Profile editing would open here'),
            'Change Password': () => this.showDemo('Password change form would appear here'),
            'Export Campaign Data': () => this.showDemo('Campaign data export initiated'),
            'API Configuration': () => this.showDemo('API settings panel would open here'),
            'Privacy Settings': () => this.showDemo('Privacy controls would be displayed here'),
            'Help Center': () => this.showDemo('Opening help documentation...'),
            'Contact Support': () => this.showDemo('Support ticket system would launch here')
        };

        if (demoActions[text]) {
            demoActions[text]();
            this.closeSettings();
        }
    }

    handleToggleChange(toggle) {
        const setting = toggle.id;
        const isEnabled = toggle.checked;
        
        // Demo functionality for toggles
        const toggleMessages = {
            'dark-mode-toggle': isEnabled ? 'Dark mode enabled (demo)' : 'Dark mode disabled (demo)',
            'email-notifications': isEnabled ? 'Email notifications enabled' : 'Email notifications disabled',
            'sms-alerts': isEnabled ? 'SMS alerts enabled' : 'SMS alerts disabled'
        };

        if (toggleMessages[setting]) {
            this.showDemo(toggleMessages[setting]);
            
            // Special demo for dark mode
            if (setting === 'dark-mode-toggle') {
                this.demoThemeToggle(isEnabled);
            }
        }
    }

    handleLogout() {
        this.showDemo('Logging out... (This is a demo)');
        this.closeSettings();
        
        // Demo logout animation
        setTimeout(() => {
            this.showDemo('In a real application, you would be redirected to the login page');
        }, 1500);
    }

    demoThemeToggle(isDark) {
        const body = document.body;
        if (isDark) {
            body.style.filter = 'invert(1) hue-rotate(180deg)';
            setTimeout(() => {
                body.style.filter = '';
                this.showDemo('Dark mode demo complete. Full theme switching would be implemented here.');
            }, 2000);
        }
    }

    showDemo(message) {
        // Create temporary demo notification
        const notification = document.createElement('div');
        notification.className = 'demo-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-primary);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-weight: 500;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    useTemplate(template) {
        const copyInput = document.getElementById('copy-input');
        if (copyInput) {
            copyInput.value = template;
            this.updateCharCount();
            this.switchTab('analyzer');
            this.showNotification('Template loaded! You can now analyze or modify it.', 'success');
        }
    }

    generateCopy() {
        // Simulate content generation
        this.showNotification('Content generation feature coming soon. This will provide AI-powered message variations.', 'info');
    }

    switchWorkspace(workspaceName) {
        this.showNotification(`Switched to workspace: ${workspaceName}`, 'success');
        // In a real app, this would load workspace-specific data
    }

    loadProject(projectName) {
        this.showNotification(`Loading project: ${projectName}`, 'info');
        // In a real app, this would load project data
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-green)' : 
                        type === 'error' ? 'var(--error-red)' : 
                        type === 'warning' ? 'var(--warning-orange)' : 'var(--secondary-blue)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                                  type === 'error' ? 'exclamation-circle' : 
                                  type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    loadDemoData() {
        // Load some demo data for the analytics tab
        this.setupDemoAnalytics();
        
        // Add some demo trending topics
        this.updateTrendingTopics();
    }

    setupDemoAnalytics() {
        // In a real app, this would fetch actual analytics data
        console.log('Demo analytics data loaded');
    }

    updateTrendingTopics() {
        // In a real app, this would fetch real trending political topics
        console.log('Trending topics updated');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Enterprise Analytics Tracking
    trackUserInteraction(action, element) {
        console.log(`📊 Enterprise Analytics: ${action} on ${element} at ${new Date().toISOString()}`);
        
        // In a real enterprise app, this would send data to analytics services
        // like Google Analytics, Adobe Analytics, Mixpanel, etc.
        
        // Example enterprise-level tracking payload:
        const payload = {
            timestamp: new Date().toISOString(),
            user_id: 'ted.clark@tagstrategies.co', // Would come from auth
            action: action,
            element: element,
            session_id: 'demo_session_' + Date.now(),
            platform: 'TAG_ECHO',
            version: '2.1.0',
            user_agent: navigator.userAgent,
            url: window.location.href
        };
        
        // This would normally be sent to your enterprise data warehouse
        // await fetch('/api/analytics/track', { method: 'POST', body: JSON.stringify(payload) });
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tagEcho = new TagEcho();
    
    // Add some demo interactions
    console.log('🚀 TAG Echo initialized successfully!');
    console.log('💡 Try analyzing some political copy to see the AI in action');
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+1-4 for tab switching
    if (e.ctrlKey && e.key >= '1' && e.key <= '4') {
        e.preventDefault();
        const tabs = ['analyzer', 'generator', 'analytics', 'templates'];
        const tabIndex = parseInt(e.key) - 1;
        if (tabs[tabIndex]) {
            window.tagEcho.switchTab(tabs[tabIndex]);
        }
    }
    
    // Escape to close chat
    if (e.key === 'Escape' && !window.tagEcho.chatMinimized) {
        window.tagEcho.toggleChat();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TagEcho;
}
