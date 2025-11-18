export type KnowledgeVersion = {
  id: string;
  timestamp: string;
  author: string;
  changes: string;
  data: {
    company: string;
    properties: string;
    faqs: string;
    policies: string;
    objections: string;
  };
};

export type KnowledgeAttachment = {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
};

export const terraStore = {
  knowledge: {
    company: '',
    properties: '',
    faqs: '',
    policies: '',
    objections: '',
    logs: [] as string[],
    confidence: '95% confident in responses',
    versions: [] as KnowledgeVersion[],
    attachments: [] as KnowledgeAttachment[],
  },
  settings: {
    name: 'Terra',
    style: 'Balanced',
    languages: ['English'],
    responseSpeed: 'Natural',
    typingIndicator: true,
    messageLength: 'Standard',
    workingHours: '24/7',
    channels: {
      whatsapp: {
        enabled: true,
        templates: {
          welcome: 'Hello {{name}}! 👋 I\'m Terra, your property assistant. How can I help you today?',
          followUp: 'Hi {{name}}, just following up on your interest in {{property}}. Would you like to schedule a site visit?',
          bookingConfirmation: '🎉 Great choice {{name}}! Your site visit is confirmed for {{date}} at {{time}}. Address: {{address}}',
          priceQuote: 'Here\'s the pricing for {{property}}: {{price}}. This includes {{amenities}}. Would you like detailed information?',
          paymentPlan: 'We offer flexible payment plans for {{property}}. Down payment: {{downPayment}}, EMI: {{emi}}. Interested?'
        },
        businessHours: '9 AM - 6 PM IST',
        responseTime: '< 2 minutes',
        greetingMessage: 'Welcome to our property assistant! I can help you find your dream home.',
        quickReplies: ['Show me properties', 'Book site visit', 'Get price quote', 'Payment options', 'Contact agent']
      },
      webchat: {
        enabled: true,
        widget: {
          position: 'bottom-right',
          theme: 'light',
          primaryColor: '#3b82f6',
          welcomeMessage: 'Hi! I\'m Terra 👋 How can I help you find your perfect home?',
          showTypingIndicator: true,
          autoOpenDelay: 3000,
          customCSS: '',
          branding: {
            showPoweredBy: true,
            companyName: 'TerraFlow Properties',
            logoUrl: 'https://via.placeholder.com/40x40/3b82f6/white?text=T'
          }
        },
        behavior: {
          proactiveGreeting: true,
          greetingDelay: 5000,
          exitIntentTrigger: true,
          scrollTrigger: 50,
          timeOnSiteTrigger: 30
        },
        integrations: {
          googleAnalytics: true,
          facebookPixel: false,
          customEvents: ['property_view', 'schedule_visit', 'price_quote']
        }
      },
      sms: {
        enabled: true,
        templates: {
          welcome: 'Hi {{name}}, this is Terra from TerraFlow. I can help you find properties. Reply STOP to opt out.',
          followUp: '{{name}}, following up on {{property}}. Interested in a site visit? Reply YES to schedule.',
          urgent: '{{name}}, {{property}} has limited availability! Book now: {{booking_link}} or call {{phone}}',
          confirmation: 'Confirmed {{name}}! Site visit on {{date}} at {{time}}. Address: {{address}}. Contact: {{phone}}'
        },
        characterLimit: 160,
        optOutMessage: 'You have been unsubscribed. Reply START to resubscribe.',
        senderId: 'TERRAFLW',
        rateLimit: '1 msg per 5 minutes'
      }
    }
  },
};

