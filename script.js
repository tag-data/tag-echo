// TAG Echo - AI-Powered Political Copywriting Platform
// Interactive JavaScript functionality

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
            sms: 'URGENT: The radical left is trying to defund our police! We need YOUR help to stop them. Donate $25 NOW to protect our communities. Time is running out!',
            email: 'Subject: URGENT: Stop the Radical Left - Donate $25 NOW\\n\\nDear [Name],\\n\\nThe radical left is launching their most dangerous attack yet...',
            social: '🚨 BREAKING: The radical left wants to defund our police! We can\'t let this happen. Join thousands fighting back → Donate $25 #DefendPolice',
            winred: 'URGENT: Stop radical left policies! Your $25 donation protects our communities. Donate NOW!',
            web: 'Join the Fight Against Radical Policies\\n\\nOur communities are under attack. Your donation of $25 or more helps us fight back against dangerous policies that threaten our safety and security.'
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
            analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze Copy';
        }
    }

    generateMockAnalysis(text) {
        const channel = document.getElementById('channel-select').value;
        const length = text.length;
        const urgencyWords = ['urgent', 'now', 'immediately', 'deadline', 'time', 'running out'];
        const ctaWords = ['donate', 'contribute', 'give', 'support', 'join', 'act'];
        const emotionalWords = ['fight', 'defend', 'protect', 'stop', 'save', 'help'];
        
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
            positiveInsights.push('Excellent urgency indicators create immediate action motivation');
        }
        if (ctaScore > 85) {
            positiveInsights.push('Clear and compelling call-to-action');
        }
        if (engagementScore > 75) {
            positiveInsights.push('Strong emotional appeal targeting key concerns');
        }
        
        if (length > 160 && channel === 'sms') {
            negativeInsights.push('Message length exceeds SMS character limit (160 chars)');
        }
        if (urgencyScore < 70) {
            negativeInsights.push('Could benefit from stronger urgency language');
        }
        if (!text.includes('$')) {
            negativeInsights.push('Consider including specific donation amount');
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
            word.toLowerCase().includes('urgent') ||
            word.toLowerCase().includes('donate') ||
            word.toLowerCase().includes('now') ||
            word.includes('$') ||
            word.toLowerCase().includes('stop')
        );
        
        return key_words.slice(0, 15).join(' ') + '...';
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
            'help': 'I can help you analyze political copy, generate new messages, and optimize your campaigns. What specific task would you like assistance with?',
            'analyze': 'To analyze your copy, paste it into the Copy Analyzer tab and click "Analyze Copy". I\'ll provide detailed insights on engagement potential, urgency, clarity, and call-to-action effectiveness.',
            'generate': 'Use the AI Generator tab to create new copy variations. Specify your campaign type, tone, target audience, and key message for best results.',
            'improve': this.analysisResults ? 
                `Based on your recent analysis (score: ${this.analysisResults.overallScore}), I recommend focusing on ${this.analysisResults.metrics.urgency < 70 ? 'urgency language' : 'call-to-action clarity'}.` :
                'Please analyze some copy first, then I can provide specific improvement suggestions.',
            'templates': 'Check out the Templates tab for proven high-performing message formats. You can customize them for your specific campaign needs.',
            'performance': 'The Analytics tab shows your campaign performance metrics. I can help interpret the data and suggest optimization strategies.',
            'default': 'I\'m here to help with your political copywriting needs. You can ask me about analyzing copy, generating new messages, improving performance, or using templates.'
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
        // Simulate copy generation
        this.showNotification('AI Copy Generator coming soon! This will integrate with advanced language models.', 'info');
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
