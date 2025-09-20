// TAG Echo - AI-Powered Political Copywriting Platform
// Interactive JavaScript functionality

class TagEcho {
    constructor() {
        this.currentTab = 'analyzer';
        this.chatMinimized = false;
        this.analysisResults = null;
        this.darkMode = false;
        this.workspaceTypes = this.initializeWorkspaceTypes();
        
        this.init();
    }

    initializeWorkspaceTypes() {
        return {
            // Workspace Type Definitions
            TYPES: {
                CANDIDATE: {
                    id: 'candidate',
                    name: 'Political Candidate',
                    icon: 'fas fa-vote-yea',
                    color: '#DC143C',
                    description: 'Individual candidate campaigns',
                    provisioning: {
                        maxUsers: 25,
                        features: ['sms', 'email', 'social', 'analytics', 'compliance'],
                        storage: '10GB',
                        apiCalls: 50000
                    }
                },
                PAC: {
                    id: 'pac',
                    name: 'PAC',
                    icon: 'fas fa-flag-usa',
                    color: '#1E3A8A',
                    description: 'Political Action Committee',
                    provisioning: {
                        maxUsers: 15,
                        features: ['sms', 'email', 'social', 'analytics', 'compliance', 'donor-management'],
                        storage: '25GB',
                        apiCalls: 75000
                    }
                },
                SUPER_PAC: {
                    id: 'super_pac',
                    name: 'Super PAC',
                    icon: 'fas fa-star-and-crescent',
                    color: '#F59E0B',
                    description: 'Independent expenditure committees',
                    provisioning: {
                        maxUsers: 50,
                        features: ['sms', 'email', 'social', 'analytics', 'compliance', 'donor-management', 'ie-tracking'],
                        storage: '100GB',
                        apiCalls: 150000
                    }
                },
                PRIVATE_CLIENT: {
                    id: 'private_client',
                    name: 'Private Client',
                    icon: 'fas fa-building',
                    color: '#10B981',
                    description: 'Private sector clients',
                    provisioning: {
                        maxUsers: 10,
                        features: ['sms', 'email', 'social', 'analytics'],
                        storage: '5GB',
                        apiCalls: 25000
                    }
                },
                INTERNAL: {
                    id: 'internal',
                    name: 'Internal',
                    icon: 'fas fa-cog',
                    color: '#6B7280',
                    description: 'TAG internal operations',
                    provisioning: {
                        maxUsers: 100,
                        features: ['all'],
                        storage: 'unlimited',
                        apiCalls: 'unlimited'
                    }
                }
            },

            // Workspace Classifications
            WORKSPACES: {
                'budd-for-senate-ct': {
                    type: 'candidate',
                    candidate: 'Ted Budd',
                    office: 'U.S. Senate',
                    state: 'Connecticut',
                    election: '2024',
                    status: 'active'
                },
                'butler-for-congress-tx-09': {
                    type: 'candidate',
                    candidate: 'Butler',
                    office: 'U.S. House',
                    district: 'TX-09',
                    election: '2024',
                    status: 'active'
                },
                'dynamic-sports-medicine': {
                    type: 'private_client',
                    industry: 'Healthcare/Sports Medicine',
                    clientType: 'Medical Practice',
                    status: 'active'
                },
                'florida-firebrand-pac': {
                    type: 'pac',
                    focus: 'Conservative Advocacy',
                    state: 'Florida',
                    status: 'active'
                },
                'frontline-policy': {
                    type: 'pac',
                    focus: 'Policy Advocacy',
                    status: 'active'
                },
                'gilkey-windows': {
                    type: 'private_client',
                    industry: 'Construction/Home Improvement',
                    clientType: 'Local Business',
                    status: 'active'
                },
                'hern-for-congress-ok-01': {
                    type: 'candidate',
                    candidate: 'Kevin Hern',
                    office: 'U.S. House',
                    district: 'OK-01',
                    election: '2024',
                    status: 'active'
                },
                'kennedy-for-senate-la': {
                    type: 'candidate',
                    candidate: 'John Kennedy',
                    office: 'U.S. Senate',
                    state: 'Louisiana',
                    election: '2024',
                    status: 'active'
                },
                'knight-for-congress-tn-7': {
                    type: 'candidate',
                    candidate: 'Knight',
                    office: 'U.S. House',
                    district: 'TN-7',
                    election: '2024',
                    status: 'active'
                },
                'lone-star-network': {
                    type: 'super_pac',
                    focus: 'Texas Republican Support',
                    state: 'Texas',
                    status: 'active'
                },
                'lopez-for-congress-ca-13': {
                    type: 'candidate',
                    candidate: 'Lopez',
                    office: 'U.S. House',
                    district: 'CA-13',
                    election: '2024',
                    status: 'active'
                },
                'luttrell-for-congress-tx-08': {
                    type: 'candidate',
                    candidate: 'Morgan Luttrell',
                    office: 'U.S. House',
                    district: 'TX-08',
                    election: '2024',
                    status: 'active'
                },
                'males-for-congress-ca-25': {
                    type: 'candidate',
                    candidate: 'Males',
                    office: 'U.S. House',
                    district: 'CA-25',
                    election: '2024',
                    status: 'active'
                },
                'miguez-for-senate-la': {
                    type: 'candidate',
                    candidate: 'Miguez',
                    office: 'U.S. Senate',
                    state: 'Louisiana',
                    election: '2024',
                    status: 'active'
                },
                'miller-meeks-for-congress-ia-01': {
                    type: 'candidate',
                    candidate: 'Mariannette Miller-Meeks',
                    office: 'U.S. House',
                    district: 'IA-01',
                    election: '2024',
                    status: 'active'
                },
                'moore-for-congress-wv-02': {
                    type: 'candidate',
                    candidate: 'Moore',
                    office: 'U.S. House',
                    district: 'WV-02',
                    election: '2024',
                    status: 'active'
                },
                'moore-for-senate-al': {
                    type: 'candidate',
                    candidate: 'Moore',
                    office: 'U.S. Senate',
                    state: 'Alabama',
                    election: '2024',
                    status: 'active'
                },
                'morris-for-senate-ky': {
                    type: 'candidate',
                    candidate: 'Morris',
                    office: 'U.S. Senate',
                    state: 'Kentucky',
                    election: '2024',
                    status: 'active'
                },
                'old-general': {
                    type: 'internal',
                    purpose: 'General Discussion',
                    status: 'active'
                },
                'owens-for-congress-ut-04': {
                    type: 'candidate',
                    candidate: 'Burgess Owens',
                    office: 'U.S. House',
                    district: 'UT-04',
                    election: '2024',
                    status: 'active'
                },
                'palmetto-patriots-pac': {
                    type: 'pac',
                    focus: 'South Carolina Conservative',
                    state: 'South Carolina',
                    status: 'active'
                },
                'perrys-restaurant-group': {
                    type: 'private_client',
                    industry: 'Food Service/Restaurant',
                    clientType: 'Restaurant Chain',
                    status: 'active'
                },
                'pino-for-congress-nj-09': {
                    type: 'candidate',
                    candidate: 'Pino',
                    office: 'U.S. House',
                    district: 'NJ-09',
                    election: '2024',
                    status: 'active'
                },
                'reitz-for-attorney-general-tx': {
                    type: 'candidate',
                    candidate: 'Reitz',
                    office: 'Attorney General',
                    state: 'Texas',
                    election: '2024',
                    status: 'active'
                },
                'stop-newsom-pac': {
                    type: 'pac',
                    focus: 'Anti-Newsom California',
                    state: 'California',
                    status: 'active'
                },
                'tag-siege-hdm': {
                    type: 'internal',
                    purpose: 'HDM Operations',
                    status: 'active'
                },
                'tag-tech': {
                    type: 'internal',
                    purpose: 'Technology Development',
                    status: 'active'
                },
                'tuberville-for-governor-al': {
                    type: 'candidate',
                    candidate: 'Tommy Tuberville',
                    office: 'Governor',
                    state: 'Alabama',
                    election: '2026',
                    status: 'active'
                }
            }
        };
    }

    init() {
        this.initializeDarkMode();
        this.setupEventListeners();
        this.setupCharacterCounter();
        this.setupChatAssistant();
        this.loadDemoData();
        this.initializeLiveCounter();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabId = e.currentTarget.dataset.tab;
                this.switchTab(tabId);
            });
        });

        // SMS analyzer
        const analyzeSmsBtn = document.getElementById('analyze-sms-btn');
        if (analyzeSmsBtn) {
            analyzeSmsBtn.addEventListener('click', () => this.analyzeCopy());
        }

        // SMS input
        const smsInput = document.getElementById('sms-message');
        if (smsInput) {
            smsInput.addEventListener('input', () => this.updateCharCount());
            smsInput.addEventListener('keydown', (e) => {
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
                const workspaceName = e.currentTarget.querySelector('.workspace-name').textContent;
                const workspaceMeta = e.currentTarget.querySelector('.workspace-meta').textContent;
                this.switchWorkspace(workspaceName, workspaceMeta);
            });
        });

        // Project interactions
        document.querySelectorAll('.project-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.loadProject(e.currentTarget.querySelector('.project-name').textContent);
            });
        });

        // Workspace search functionality
        const workspaceSearch = document.getElementById('workspace-search');
        if (workspaceSearch) {
            workspaceSearch.addEventListener('input', (e) => {
                this.filterWorkspaces(e.target.value);
            });
        }

        // Workspace toggle functionality
        const workspaceToggle = document.getElementById('workspace-toggle');
        if (workspaceToggle) {
            workspaceToggle.addEventListener('click', () => {
                this.toggleWorkspaceSection();
            });
        }

        // Mobile navigation menu
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelector('.nav-links');
        if (navMenu && navLinks) {
            navMenu.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }

        // Navigation CTA button
        const navCta = document.querySelector('.nav-cta');
        if (navCta) {
            navCta.addEventListener('click', () => {
                this.showNotification('Get Started functionality coming soon!', 'info');
            });
        }

        // New workspace button
        const newWorkspaceBtn = document.querySelector('.new-workspace-btn');
        if (newWorkspaceBtn) {
            newWorkspaceBtn.addEventListener('click', () => {
                this.createNewWorkspace();
            });
        }

        // Export button functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('export-btn') || e.target.closest('.export-btn')) {
                e.preventDefault();
                this.showExportOptions();
            }
        });

        // Client toggle functionality
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.switchClientMode(mode);
            });
        });

        // Get Started buttons
        const getStartedBtn = document.getElementById('get-started');
        const ctaGetStartedBtn = document.getElementById('cta-get-started');
        
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                this.showAppInterface();
            });
        }
        
        if (ctaGetStartedBtn) {
            ctaGetStartedBtn.addEventListener('click', () => {
                this.showAppInterface();
            });
        }
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
        const smsInput = document.getElementById('sms-message');
        const charCount = document.getElementById('char-count');
        
        if (smsInput && charCount) {
            const count = smsInput.value.length;
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
        const smsInput = document.getElementById('sms-message');
        
        // Update placeholder based on channel
        const placeholders = {
            sms: 'URGENT: The radical left is trying to defund our police! We need YOUR help to stop them. Donate $25 NOW to protect our communities. Time is running out!',
            email: 'Subject: URGENT: Stop the Radical Left - Donate $25 NOW\\n\\nDear [Name],\\n\\nThe radical left is launching their most dangerous attack yet...',
            social: '🚨 BREAKING: The radical left wants to defund our police! We can\'t let this happen. Join thousands fighting back → Donate $25 #DefendPolice',
            winred: 'URGENT: Stop radical left policies! Your $25 donation protects our communities. Donate NOW!',
            web: 'Join the Fight Against Radical Policies\\n\\nOur communities are under attack. Your donation of $25 or more helps us fight back against dangerous policies that threaten our safety and security.'
        };
        
        if (smsInput && placeholders[channel]) {
            smsInput.placeholder = placeholders[channel];
        }
    }

    async analyzeCopy() {
        const smsInput = document.getElementById('sms-message');
        const analyzeBtn = document.getElementById('analyze-sms-btn');
        const resultsSection = document.getElementById('sms-analysis-results');
        const hasFirstNameTag = document.getElementById('has-firstname-tag').checked;
        
        if (!smsInput.value.trim()) {
            this.showNotification('Please enter some SMS message to analyze', 'warning');
            return;
        }

        // Show loading state
        analyzeBtn.classList.add('loading');
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        
        try {
            // Simulate API call
            await this.delay(1500);
            
            // Analyze the SMS message
            const analysis = this.analyzeSMSMessage(smsInput.value, hasFirstNameTag);
            this.displaySMSAnalysis(analysis);
            
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
            analyzeBtn.innerHTML = '<i class="fas fa-calculator"></i> Check Segments';
        }
    }

    // SMS Analysis based on Paul Sapperstein's business rules
    analyzeSMSMessage(message, hasFirstNameTag = false) {
        // Paul's Rules:
        // - 124 characters without FirstName tag, 116 with FirstName tag
        // - Each additional link takes 22 characters
        // - Special characters/emojis/unicode not allowed
        // - With link + "stop 2 end", must be 160 chars or less total
        
        const analysis = {
            originalMessage: message,
            messageLength: message.length,
            hasFirstNameTag: hasFirstNameTag,
            segments: 1,
            encoding: 'GSM7',
            maxSegmentLength: 160,
            characterBreakdown: [],
            unicodeCharacters: [],
            links: [],
            compliance: []
        };
        
        // Character limit based on FirstName tag
        const baseLimit = hasFirstNameTag ? 116 : 124;
        
        // Detect links (simplified regex for common patterns)
        const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[^\s]+\.[a-z]{2,}\/[^\s]*)/gi;
        const links = message.match(linkRegex) || [];
        analysis.links = links;
        
        // Calculate effective character limit considering additional links
        // First link is "included", each additional link takes 22 chars
        const additionalLinkChars = Math.max(0, links.length - 1) * 22;
        const effectiveLimit = baseLimit - additionalLinkChars;
        
        // Check for Unicode characters (non-GSM7)
        const gsm7Chars = "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";
        const extendedGsm7 = "^{}\\[~]|€";
        
        for (let i = 0; i < message.length; i++) {
            const char = message[i];
            let charType = 'gsm7';
            
            if (!gsm7Chars.includes(char) && !extendedGsm7.includes(char)) {
                charType = 'unicode';
                analysis.unicodeCharacters.push({
                    char: char,
                    position: i,
                    unicode: char.charCodeAt(0).toString(16)
                });
                analysis.encoding = 'Unicode';
            }
            
            analysis.characterBreakdown.push({
                char: char === ' ' ? '·' : char,
                type: char === ' ' ? 'space' : charType,
                position: i
            });
        }
        
        // Calculate segments based on encoding and length
        if (analysis.encoding === 'Unicode') {
            analysis.maxSegmentLength = 70;
            analysis.segments = Math.ceil(message.length / 67); // 67 chars per segment for concatenated Unicode
        } else {
            analysis.maxSegmentLength = 160;
            if (message.length > 160) {
                analysis.segments = Math.ceil(message.length / 153); // 153 chars per segment for concatenated GSM7
            }
        }
        
        // Compliance checks
        analysis.compliance = this.checkSMSCompliance(message, analysis, effectiveLimit, hasFirstNameTag);
        
        return {
            messageLength: analysis.messageLength,
            segments: analysis.segments,
            maxSegmentLength: analysis.maxSegmentLength,
            encoding: analysis.encoding,
            characterBreakdown: analysis.characterBreakdown,
            unicodeCharacters: analysis.unicodeCharacters,
            links: analysis.links,
            compliance: analysis.compliance,
            hasFirstNameTag: analysis.hasFirstNameTag,
            effectiveLimit: effectiveLimit
        };
    }
    
    checkSMSCompliance(message, analysis, effectiveLimit, hasFirstNameTag) {
        const rules = [];
        const links = (message.match(/https?:\/\/[^\s]+/g) || []).length;
        const baseLength = message.length;
        const adjustedLength = hasFirstNameTag ? baseLength + 8 : baseLength;
        const totalLength = adjustedLength + (links * 22); // Each link adds ~22 chars
        
        // Rule 1: Single segment without {FirstName} - 124 chars max
        if (!hasFirstNameTag) {
            const limit = 124;
            if (totalLength <= limit) {
                rules.push({
                    rule: `Single segment without {FirstName}: ${totalLength}/${limit} characters`,
                    status: 'pass',
                    icon: 'fas fa-check-circle'
                });
            } else {
                rules.push({
                    rule: `Single segment without {FirstName}: ${totalLength}/${limit} characters (OVER LIMIT)`,
                    status: 'fail',
                    icon: 'fas fa-exclamation-circle'
                });
            }
        }
        
        // Rule 2: Single segment with {FirstName} - 116 chars max
        if (hasFirstNameTag) {
            const limit = 116;
            if (totalLength <= limit) {
                rules.push({
                    rule: `Single segment with {FirstName}: ${totalLength}/${limit} characters`,
                    status: 'pass',
                    icon: 'fas fa-check-circle'
                });
            } else {
                rules.push({
                    rule: `Single segment with {FirstName}: ${totalLength}/${limit} characters (OVER LIMIT)`,
                    status: 'fail',
                    icon: 'fas fa-exclamation-circle'
                });
            }
        }
        
        // Rule 3: Link counting
        if (links > 0) {
            rules.push({
                rule: `Links detected: ${links} link(s) × 22 chars = ${links * 22} additional characters`,
                status: 'warning',
                icon: 'fas fa-link'
            });
        }
        
        // Rule 4: Multi-segment warning
        if (analysis.segments > 1) {
            rules.push({
                rule: `Multi-segment message: ${analysis.segments} segments (DOUBLES CLIENT COSTS!)`,
                status: 'fail',
                icon: 'fas fa-exclamation-triangle'
            });
        } else {
            rules.push({
                rule: `Single segment message: Cost-effective`,
                status: 'pass',
                icon: 'fas fa-dollar-sign'
            });
        }
        
        // Rule 5: Character encoding
        if (analysis.encoding === 'Unicode') {
            rules.push({
                rule: 'Unicode encoding detected: Reduces character limit',
                status: 'warning',
                icon: 'fas fa-font'
            });
        } else {
            rules.push({
                rule: 'GSM 7-bit encoding: Standard character limit',
                status: 'pass',
                icon: 'fas fa-font'
            });
        }
        
        return rules;
    }
    
    displaySMSAnalysis(analysis) {
        // Update message details table
        document.getElementById('segments-display').textContent = analysis.segments;
        document.getElementById('length-display').textContent = analysis.messageLength;
        document.getElementById('max-length-display').textContent = analysis.maxSegmentLength;
        document.getElementById('encoding-display').textContent = analysis.encoding;
        
        // Update segment count color
        const segmentDisplay = document.getElementById('segments-display');
        if (analysis.segments > 1) {
            segmentDisplay.style.color = '#dc2626';
        } else {
            segmentDisplay.style.color = '#22c55e';
        }
        
        // Generate character matrix
        this.generateCharacterMatrix(analysis.characterBreakdown);
        
        // Update compliance results
        this.displayComplianceResults(analysis.compliance);
    }
    
    generateCharacterMatrix(characters) {
        const matrixContainer = document.getElementById('character-matrix');
        matrixContainer.innerHTML = '';
        
        characters.forEach(charData => {
            const charSquare = document.createElement('div');
            charSquare.className = 'char-square';
            
            if (charData.type === 'space') {
                charSquare.className += ' space';
                charSquare.textContent = '·'; // Middle dot for spaces
                charSquare.title = 'Space';
            } else if (charData.char === '\n') {
                charSquare.className += ' gsm7';
                charSquare.textContent = '↵';
                charSquare.title = 'Newline';
            } else if (charData.type === 'gsm7') {
                charSquare.className += ' gsm7';
                charSquare.textContent = charData.char;
                charSquare.title = `GSM 7-bit: ${charData.char}`;
            } else if (charData.type === 'unicode') {
                charSquare.className += ' unicode';
                charSquare.textContent = charData.char;
                charSquare.title = `Unicode: ${charData.char}`;
            }
            
            matrixContainer.appendChild(charSquare);
        });
    }
    
    displayComplianceResults(complianceRules) {
        const complianceContainer = document.getElementById('compliance-results');
        complianceContainer.innerHTML = '';
        
        complianceRules.forEach(rule => {
            const ruleElement = document.createElement('div');
            ruleElement.className = `compliance-item ${rule.status}`;
            
            ruleElement.innerHTML = `
                <i class="compliance-icon ${rule.icon}"></i>
                <span>${rule.rule}</span>
            `;
            
            complianceContainer.appendChild(ruleElement);
        });
    }

    generateMockAnalysis(text) {
        const channel = document.getElementById('channel-select')?.value || 'sms';
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
        const smsInput = document.getElementById('sms-message');
        if (smsInput) {
            smsInput.value = template;
            this.updateCharCount();
            this.switchTab('analyzer');
            this.showNotification('Template loaded! You can now analyze or modify it.', 'success');
        }
    }

    generateCopy() {
        // Simulate copy generation
        this.showNotification('AI Copy Generator coming soon! This will integrate with advanced language models.', 'info');
    }

    switchWorkspace(workspaceName, workspaceMeta) {
        // Update header workspace display
        const workspaceNameEl = document.querySelector('.workspace-name');
        const workspaceTypeEl = document.querySelector('.workspace-type');
        
        if (workspaceNameEl) {
            workspaceNameEl.textContent = workspaceName;
        }
        
        if (workspaceTypeEl) {
            // Extract type from meta (e.g., "Louisiana • Internal Client" -> "Internal Client")
            const type = workspaceMeta.split('•').pop().trim();
            workspaceTypeEl.textContent = type;
        }
        
        // Update the live counter for the selected workspace
        this.updateCounterForWorkspace(workspaceName, workspaceMeta);
        
        // Show different content based on workspace type
        if (workspaceMeta.includes('Internal Client')) {
            this.loadInternalClientData(workspaceName);
        } else if (workspaceMeta.includes('P2P Active')) {
            this.loadP2PClientData(workspaceName);
        } else if (workspaceMeta.includes('Revenue Share')) {
            this.loadRevenueShareData(workspaceName);
        }
        
        this.showNotification(`Switched to: ${workspaceName}`, 'success');
    }
    
    loadInternalClientData(clientName) {
        // Load internal client specific data
        console.log(`Loading internal client data for: ${clientName}`);
        
        // Update P2P dashboard with client-specific metrics
        this.updateP2PMetrics({
            type: 'internal',
            client: clientName,
            showFullAccess: true
        });
    }
    
    loadP2PClientData(clientName) {
        // Load P2P client specific data
        console.log(`Loading P2P client data for: ${clientName}`);
        
        // Update dashboard with P2P specific metrics
        this.updateP2PMetrics({
            type: 'p2p',
            client: clientName,
            showLimitedAccess: true
        });
    }
    
    loadRevenueShareData(clientName) {
        // Load revenue share client data
        console.log(`Loading revenue share data for: ${clientName}`);
        
        // Update dashboard with revenue share metrics
        this.updateP2PMetrics({
            type: 'revshare',
            client: clientName,
            showRevenueMetrics: true
        });
    }
    
    updateP2PMetrics(config) {
        // Update the P2P dashboard with client-specific data
        const dashboardTitle = document.querySelector('.header-main h2');
        if (dashboardTitle) {
            dashboardTitle.textContent = `P2P Analytics - ${config.client}`;
        }
        
        // Update the live counter for this client
        this.updateCounterForWorkspace(config.client, config.type);
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

    filterWorkspaces(searchTerm) {
        const workspaceItems = document.querySelectorAll('.workspace-item');
        const searchLower = searchTerm.toLowerCase();
        
        workspaceItems.forEach(item => {
            const workspaceName = item.querySelector('span').textContent.toLowerCase();
            const shouldShow = workspaceName.includes(searchLower) || searchTerm === '';
            
            if (shouldShow) {
                item.style.display = 'flex';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-10px)';
                setTimeout(() => {
                    if (item.style.opacity === '0') {
                        item.style.display = 'none';
                    }
                }, 200);
            }
        });

        // Show "no results" message if no workspaces match
        const visibleWorkspaces = Array.from(workspaceItems).filter(item => 
            item.style.display !== 'none'
        );
        
        let noResultsMsg = document.getElementById('no-workspace-results');
        if (visibleWorkspaces.length === 0 && searchTerm !== '') {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-workspace-results';
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = `
                    <div style="text-align: center; padding: var(--spacing-4); color: var(--text-tertiary);">
                        <i class="fas fa-search" style="font-size: var(--font-size-xl); margin-bottom: var(--spacing-2); opacity: 0.5;"></i>
                        <p>No workspaces found</p>
                        <small>Try a different search term</small>
                    </div>
                `;
                document.querySelector('.workspace-list').appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    toggleWorkspaceSection() {
        const workspaceContent = document.getElementById('workspace-content');
        const workspaceToggle = document.getElementById('workspace-toggle');
        const isCollapsed = workspaceContent.classList.contains('collapsed');
        
        if (isCollapsed) {
            workspaceContent.classList.remove('collapsed');
            workspaceToggle.innerHTML = '<i class="fas fa-chevron-up"></i>';
        } else {
            workspaceContent.classList.add('collapsed');
            workspaceToggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
        }
    }

    createNewWorkspace() {
        // Simulate new workspace creation dialog
        const workspaceName = prompt('Enter workspace name:');
        if (workspaceName && workspaceName.trim()) {
            const cleanName = workspaceName.trim().toLowerCase().replace(/\s+/g, '-');
            
            // Create new workspace element
            const workspaceList = document.getElementById('workspace-list');
            const newWorkspace = document.createElement('div');
            newWorkspace.className = 'workspace-item';
            newWorkspace.innerHTML = `
                <i class="fas fa-folder"></i>
                <span>${cleanName}</span>
            `;
            
            // Add event listener
            newWorkspace.addEventListener('click', (e) => {
                document.querySelectorAll('.workspace-item').forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.switchWorkspace(cleanName);
            });
            
            // Insert before the new workspace button
            workspaceList.appendChild(newWorkspace);
            
            // Switch to new workspace
            document.querySelectorAll('.workspace-item').forEach(i => i.classList.remove('active'));
            newWorkspace.classList.add('active');
            
            this.showNotification(`Workspace "${cleanName}" created successfully!`, 'success');
        }
    }

    showExportOptions() {
        // Create export modal
        const modal = document.createElement('div');
        modal.className = 'export-modal-overlay';
        modal.innerHTML = `
            <div class="export-modal">
                <div class="export-modal-header">
                    <h3>Export P2P Analytics Report</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="export-modal-body">
                    <p>Choose your preferred export format:</p>
                    <div class="export-options">
                        <button class="export-option" data-format="pdf">
                            <i class="fas fa-file-pdf"></i>
                            <span>PDF Report</span>
                            <small>Formatted report for viewing and printing</small>
                        </button>
                        <button class="export-option" data-format="csv">
                            <i class="fas fa-file-csv"></i>
                            <span>CSV Data</span>
                            <small>Raw data for analysis and import</small>
                        </button>
                        <button class="export-option" data-format="excel">
                            <i class="fas fa-file-excel"></i>
                            <span>Excel Spreadsheet</span>
                            <small>Formatted data for Excel analysis</small>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        modal.querySelectorAll('.export-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const format = e.currentTarget.dataset.format;
                this.exportP2PReport(format);
                document.body.removeChild(modal);
            });
        });

        // Animate modal in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    switchClientMode(mode) {
        const appInterface = document.getElementById('app-interface');
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        const userRole = document.getElementById('user-role');
        
        // Update toggle buttons
        toggleBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === mode) {
                btn.classList.add('active');
            }
        });
        
        // Update app interface mode
        appInterface.classList.remove('internal-mode', 'external-mode');
        appInterface.classList.add(`${mode}-mode`);
        
        // Update navigation groups
        const navGroups = document.querySelectorAll('.nav-group');
        navGroups.forEach(group => {
            group.classList.remove('active');
        });
        
        const activeNavGroup = document.querySelector(`.${mode}-nav`);
        if (activeNavGroup) {
            activeNavGroup.classList.add('active');
        }
        
        // Update user role based on mode
        if (mode === 'external') {
            userRole.textContent = 'Campaign Manager';
            this.showNotification('Switched to External Client view', 'info');
            
            // Switch to a safe tab for external users
            this.switchTab('analyzer');
        } else {
            userRole.textContent = 'Internal Admin';
            this.showNotification('Switched to Internal Team view', 'info');
        }
        
        // Update workspace visibility
        const internalWorkspaces = document.querySelectorAll('.internal-only');
        internalWorkspaces.forEach(workspace => {
            if (mode === 'internal') {
                workspace.style.display = 'block';
            } else {
                workspace.style.display = 'none';
            }
        });
    }

    showAppInterface() {
        // Hide the marketing homepage content
        document.querySelector('.hero').style.display = 'none';
        document.querySelector('.features').style.display = 'none';
        document.querySelector('.cta').style.display = 'none';
        
        // Show the app interface
        const appInterface = document.getElementById('app-interface');
        appInterface.classList.remove('hidden');
        
        // Smooth scroll to app interface
        appInterface.scrollIntoView({ behavior: 'smooth' });
        
        this.showNotification('Welcome to TAG Echo! Start by analyzing your SMS messages.', 'success');
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

    // P2P Export functionality
    exportP2PReport(format = 'pdf') {
        const reportData = this.generateP2PReportData();
        
        switch (format.toLowerCase()) {
            case 'pdf':
                this.exportToPDF(reportData);
                break;
            case 'csv':
                this.exportToCSV(reportData);
                break;
            case 'excel':
                this.exportToExcel(reportData);
                break;
            default:
                this.showNotification('Unsupported export format', 'error');
        }
    }

    generateP2PReportData() {
        const currentDate = new Date().toLocaleDateString();
        const workspace = document.querySelector('.workspace-name')?.textContent || 'All Workspaces';
        
        return {
            metadata: {
                title: 'Procure-to-Pay Analytics Report',
                workspace: workspace,
                generatedDate: currentDate,
                period: '30 Days',
                generatedBy: 'Ted Clark'
            },
            metrics: {
                totalSpend: '$2,400,000',
                purchaseOrders: '1,247',
                activeVendors: '156',
                avgPayTime: '4.2 days'
            },
            vendors: [
                { name: 'Facebook Ads', category: 'Media & Advertising', spend: '$487,250', orders: 89, payTime: '2.1 days', performance: 'Excellent' },
                { name: 'Google Ads', category: 'Media & Advertising', spend: '$398,100', orders: 76, payTime: '1.8 days', performance: 'Excellent' },
                { name: 'Microsoft Services', category: 'Technology', spend: '$156,800', orders: 23, payTime: '3.4 days', performance: 'Good' },
                { name: 'Twitter Ads', category: 'Media & Advertising', spend: '$134,500', orders: 45, payTime: '5.2 days', performance: 'Average' },
                { name: 'Salesforce', category: 'Technology', spend: '$98,200', orders: 12, payTime: '2.8 days', performance: 'Good' },
                { name: 'Adobe Creative Suite', category: 'Software', spend: '$45,600', orders: 8, payTime: '1.5 days', performance: 'Excellent' }
            ],
            categories: [
                { name: 'Media & Advertising', spend: '$1,080,000', percentage: '45%' },
                { name: 'Technology Services', spend: '$600,000', percentage: '25%' },
                { name: 'Professional Services', spend: '$360,000', percentage: '15%' },
                { name: 'Office Supplies', spend: '$240,000', percentage: '10%' },
                { name: 'Other', spend: '$120,000', percentage: '5%' }
            ],
            compliance: {
                score: 94,
                policyAdherence: 96,
                documentation: 92,
                approvalProcess: 98,
                vendorVerification: 89
            }
        };
    }

    exportToPDF(data) {
        // Create PDF content
        const pdfContent = `
<!DOCTYPE html>
<html>
<head>
    <title>P2P Analytics Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .title { font-size: 24px; font-weight: bold; color: #333; }
        .subtitle { color: #666; margin-top: 10px; }
        .section { margin: 30px 0; }
        .section h2 { color: #007AFF; border-bottom: 2px solid #007AFF; padding-bottom: 5px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 20px 0; }
        .metric-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; }
        .metric-value { font-size: 24px; font-weight: bold; color: #007AFF; }
        .metric-label { color: #666; margin-top: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f5f5f5; font-weight: bold; }
        .performance-excellent { color: #30D158; font-weight: bold; }
        .performance-good { color: #007AFF; font-weight: bold; }
        .performance-average { color: #FF9F0A; font-weight: bold; }
        .footer { margin-top: 50px; text-align: center; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">${data.metadata.title}</div>
        <div class="subtitle">Workspace: ${data.metadata.workspace} | Period: ${data.metadata.period}</div>
        <div class="subtitle">Generated: ${data.metadata.generatedDate} by ${data.metadata.generatedBy}</div>
    </div>

    <div class="section">
        <h2>Key Metrics</h2>
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">${data.metrics.totalSpend}</div>
                <div class="metric-label">Total Spend</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${data.metrics.purchaseOrders}</div>
                <div class="metric-label">Purchase Orders</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${data.metrics.activeVendors}</div>
                <div class="metric-label">Active Vendors</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${data.metrics.avgPayTime}</div>
                <div class="metric-label">Avg. Pay Time</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Top Vendor Performance</h2>
        <table>
            <thead>
                <tr>
                    <th>Vendor</th>
                    <th>Category</th>
                    <th>Total Spend</th>
                    <th>Orders</th>
                    <th>Avg. Pay Time</th>
                    <th>Performance</th>
                </tr>
            </thead>
            <tbody>
                ${data.vendors.map(vendor => `
                    <tr>
                        <td>${vendor.name}</td>
                        <td>${vendor.category}</td>
                        <td>${vendor.spend}</td>
                        <td>${vendor.orders}</td>
                        <td>${vendor.payTime}</td>
                        <td class="performance-${vendor.performance.toLowerCase()}">${vendor.performance}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Category Breakdown</h2>
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Total Spend</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                ${data.categories.map(category => `
                    <tr>
                        <td>${category.name}</td>
                        <td>${category.spend}</td>
                        <td>${category.percentage}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Compliance Score</h2>
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Overall Compliance Score</strong></td>
                    <td><strong>${data.compliance.score}%</strong></td>
                </tr>
                <tr>
                    <td>Policy Adherence</td>
                    <td>${data.compliance.policyAdherence}%</td>
                </tr>
                <tr>
                    <td>Documentation</td>
                    <td>${data.compliance.documentation}%</td>
                </tr>
                <tr>
                    <td>Approval Process</td>
                    <td>${data.compliance.approvalProcess}%</td>
                </tr>
                <tr>
                    <td>Vendor Verification</td>
                    <td>${data.compliance.vendorVerification}%</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p>This report was generated by TAG Echo - Copywriting Intelligence Platform</p>
        <p>© 2024 TAG Strategies. All rights reserved.</p>
    </div>
</body>
</html>`;

        // Convert HTML to PDF and download
        const printWindow = window.open('', '_blank');
        printWindow.document.write(pdfContent);
        printWindow.document.close();
        
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);

        this.showNotification('PDF report generated successfully!', 'success');
    }

    exportToCSV(data) {
        let csvContent = '';
        
        // Add metadata
        csvContent += `P2P Analytics Report\n`;
        csvContent += `Workspace,${data.metadata.workspace}\n`;
        csvContent += `Period,${data.metadata.period}\n`;
        csvContent += `Generated,${data.metadata.generatedDate}\n`;
        csvContent += `Generated By,${data.metadata.generatedBy}\n\n`;
        
        // Add key metrics
        csvContent += `KEY METRICS\n`;
        csvContent += `Metric,Value\n`;
        csvContent += `Total Spend,${data.metrics.totalSpend}\n`;
        csvContent += `Purchase Orders,${data.metrics.purchaseOrders}\n`;
        csvContent += `Active Vendors,${data.metrics.activeVendors}\n`;
        csvContent += `Avg Pay Time,${data.metrics.avgPayTime}\n\n`;
        
        // Add vendor data
        csvContent += `VENDOR PERFORMANCE\n`;
        csvContent += `Vendor Name,Category,Total Spend,Orders,Avg Pay Time,Performance\n`;
        data.vendors.forEach(vendor => {
            csvContent += `${vendor.name},${vendor.category},${vendor.spend},${vendor.orders},${vendor.payTime},${vendor.performance}\n`;
        });
        
        csvContent += `\nCATEGORY BREAKDOWN\n`;
        csvContent += `Category,Total Spend,Percentage\n`;
        data.categories.forEach(category => {
            csvContent += `${category.name},${category.spend},${category.percentage}\n`;
        });
        
        csvContent += `\nCOMPLIANCE SCORES\n`;
        csvContent += `Category,Score\n`;
        csvContent += `Overall Compliance Score,${data.compliance.score}%\n`;
        csvContent += `Policy Adherence,${data.compliance.policyAdherence}%\n`;
        csvContent += `Documentation,${data.compliance.documentation}%\n`;
        csvContent += `Approval Process,${data.compliance.approvalProcess}%\n`;
        csvContent += `Vendor Verification,${data.compliance.vendorVerification}%\n`;

        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `P2P_Analytics_Report_${data.metadata.generatedDate.replace(/\//g, '-')}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('CSV report downloaded successfully!', 'success');
    }

    exportToExcel(data) {
        // Create Excel-compatible HTML table
        let excelContent = `
            <table>
                <tr><td colspan="6"><strong>P2P Analytics Report</strong></td></tr>
                <tr><td>Workspace:</td><td>${data.metadata.workspace}</td></tr>
                <tr><td>Period:</td><td>${data.metadata.period}</td></tr>
                <tr><td>Generated:</td><td>${data.metadata.generatedDate}</td></tr>
                <tr><td>Generated By:</td><td>${data.metadata.generatedBy}</td></tr>
                <tr><td></td></tr>
                
                <tr><td colspan="6"><strong>KEY METRICS</strong></td></tr>
                <tr><td>Total Spend</td><td>${data.metrics.totalSpend}</td></tr>
                <tr><td>Purchase Orders</td><td>${data.metrics.purchaseOrders}</td></tr>
                <tr><td>Active Vendors</td><td>${data.metrics.activeVendors}</td></tr>
                <tr><td>Avg Pay Time</td><td>${data.metrics.avgPayTime}</td></tr>
                <tr><td></td></tr>
                
                <tr><td colspan="6"><strong>VENDOR PERFORMANCE</strong></td></tr>
                <tr><td><strong>Vendor Name</strong></td><td><strong>Category</strong></td><td><strong>Total Spend</strong></td><td><strong>Orders</strong></td><td><strong>Avg Pay Time</strong></td><td><strong>Performance</strong></td></tr>
        `;
        
        data.vendors.forEach(vendor => {
            excelContent += `<tr><td>${vendor.name}</td><td>${vendor.category}</td><td>${vendor.spend}</td><td>${vendor.orders}</td><td>${vendor.payTime}</td><td>${vendor.performance}</td></tr>`;
        });
        
        excelContent += `
                <tr><td></td></tr>
                <tr><td colspan="6"><strong>CATEGORY BREAKDOWN</strong></td></tr>
                <tr><td><strong>Category</strong></td><td><strong>Total Spend</strong></td><td><strong>Percentage</strong></td></tr>
        `;
        
        data.categories.forEach(category => {
            excelContent += `<tr><td>${category.name}</td><td>${category.spend}</td><td>${category.percentage}</td></tr>`;
        });
        
        excelContent += `
                <tr><td></td></tr>
                <tr><td colspan="6"><strong>COMPLIANCE SCORES</strong></td></tr>
                <tr><td>Overall Compliance Score</td><td>${data.compliance.score}%</td></tr>
                <tr><td>Policy Adherence</td><td>${data.compliance.policyAdherence}%</td></tr>
                <tr><td>Documentation</td><td>${data.compliance.documentation}%</td></tr>
                <tr><td>Approval Process</td><td>${data.compliance.approvalProcess}%</td></tr>
                <tr><td>Vendor Verification</td><td>${data.compliance.vendorVerification}%</td></tr>
            </table>
        `;

        // Create and download Excel file
        const blob = new Blob([excelContent], { 
            type: 'application/vnd.ms-excel;charset=utf-8;' 
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `P2P_Analytics_Report_${data.metadata.generatedDate.replace(/\//g, '-')}.xls`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Excel report downloaded successfully!', 'success');
    }
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TagEcho;
}
