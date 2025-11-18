import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer } from 'socket.io';

export const config = { api: { bodyParser: false } };

function getAIResponse(leadMessage: string): string {
  const responses = {
    'What are the amenities available?': 'We offer world-class amenities including a swimming pool, gym, clubhouse, children\'s play area, landscaped gardens, 24/7 security, and covered parking. Would you like to know more about any specific amenity?',
    'Can you share the floor plan?': 'I\'d be happy to share the floor plans! We have 2BHK, 3BHK, and 4BHK options. Which configuration are you interested in? I can also email you detailed floor plans with measurements.',
    'What\'s the possession date?': 'The possession date varies by tower. Our Phase 1 is ready for possession, Phase 2 will be ready by March 2025, and Phase 3 by December 2025. Which phase are you interested in?',
    'Do you offer home loans?': 'Yes! We have tie-ups with leading banks including HDFC, SBI, ICICI, and Axis Bank. They offer competitive interest rates and up to 80% financing. I can arrange a meeting with our loan consultant.',
    'Is there a clubhouse?': 'Yes! We have a premium clubhouse spanning 25,000 sq ft with facilities like a swimming pool, gym, yoga studio, indoor games, party hall, and co-working space. It\'s perfect for both relaxation and socializing.',
    'I want to schedule a site visit': 'Excellent! I\'d be happy to arrange a site visit for you. We have slots available this Saturday and Sunday. What time works best for you?',
    'What\'s the price per sq ft?': 'Our prices range from ₹4,500 to ₹6,200 per sq ft depending on the tower and floor. The exact rate varies based on the unit size and location within the project. Would you like specific pricing for a particular unit?',
    'Are there any discounts available?': 'We currently have early bird discounts of 2-3% for bookings made this month. Additionally, we offer special pricing for bulk bookings and referrals. Let me check what offers apply to your requirements.'
  };
  
  return responses[leadMessage as keyof typeof responses] || 'That\'s a great question! Let me get you detailed information about this. Our sales team will be happy to assist you with all the specifics.';
}

function analyzeLeadMessage(message: string, conversation: any) {
  const insights = {
    scoreChange: 0,
    newStatus: null as string | null,
    sentiment: null as string | null,
    schedulingReason: null as string | null
  };
  
  // Intent-based scoring
  const positiveIntents = ['schedule', 'visit', 'book', 'interested', 'buy', 'ready'];
  const negativeIntents = ['expensive', 'costly', 'budget', 'delay', 'problem', 'issue'];
  const qualificationIntents = ['price', 'loan', 'payment', 'possession', 'amenities'];
  
  const messageLower = message.toLowerCase();
  
  // Score updates based on intent
  if (positiveIntents.some(intent => messageLower.includes(intent))) {
    insights.scoreChange += 5;
  }
  
  if (negativeIntents.some(intent => messageLower.includes(intent))) {
    insights.scoreChange -= 3;
  }
  
  if (qualificationIntents.some(intent => messageLower.includes(intent))) {
    insights.scoreChange += 2;
  }
  
  // Status updates based on score and intent
  if (conversation.score >= 85 && messageLower.includes('visit')) {
    insights.newStatus = 'Scheduled';
    insights.schedulingReason = 'Lead requested site visit with high score';
  } else if (conversation.score >= 75 && qualificationIntents.some(intent => messageLower.includes(intent))) {
    insights.newStatus = 'Qualified';
  } else if (conversation.score < 60 && conversation.messages.length > 5) {
    insights.newStatus = 'Unresponsive';
  }
  
  // Sentiment analysis
  const positiveWords = ['great', 'perfect', 'excellent', 'love', 'amazing', 'wonderful', 'good', 'nice'];
  const negativeWords = ['expensive', 'bad', 'poor', 'disappointed', 'terrible', 'awful', 'not good'];
  
  if (positiveWords.some(word => messageLower.includes(word))) {
    insights.sentiment = 'Positive';
    insights.scoreChange += 2;
  } else if (negativeWords.some(word => messageLower.includes(word))) {
    insights.sentiment = 'Negative';
    insights.scoreChange -= 2;
  }
  
  return insights;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  if (!res.socket.server.io) {
    // @ts-ignore
    const io = new IOServer(res.socket.server, { path: '/api/socketio' });
    // @ts-ignore
    res.socket.server.io = io;

    let conversationsToday = 247;
    let qualified = 89;
    let scheduled = 24;

    const conversations = [
      { 
        id: '1', 
        name: 'Rajesh Kumar', 
        avatar: 'https://i.pravatar.cc/150?u=rajesh', 
        status: 'Active', 
        sentiment: 'Positive', 
        score: 87, 
        lastMessage: 'Terra: Great! I can schedule a site visit...', 
        time: '2 min ago', 
        channel: 'WhatsApp',
        messages: [
          { id: 'm1', sender: 'lead', text: 'Hi, I\'m interested in 2BHK apartments', timestamp: '2024-01-15T10:30:00Z' },
          { id: 'm2', sender: 'ai', text: 'Hello Rajesh! I\'d be happy to help you find the perfect 2BHK. What\'s your budget range?', timestamp: '2024-01-15T10:30:15Z' },
          { id: 'm3', sender: 'lead', text: 'Around 80-90 lakhs', timestamp: '2024-01-15T10:31:00Z' },
          { id: 'm4', sender: 'ai', text: 'Great! I have several options in that range. Great! I can schedule a site visit for you this weekend.', timestamp: '2024-01-15T10:31:30Z' }
        ]
      },
      { 
        id: '2', 
        name: 'Priya Sharma', 
        avatar: 'https://i.pravatar.cc/150?u=priya', 
        status: 'Qualified', 
        sentiment: 'Positive', 
        score: 92, 
        lastMessage: 'Terra: Perfect! Let me book that...', 
        time: '15 min ago', 
        channel: 'Webchat',
        messages: [
          { id: 'm5', sender: 'lead', text: 'Do you have any ready-to-move properties?', timestamp: '2024-01-15T10:15:00Z' },
          { id: 'm6', sender: 'ai', text: 'Yes! We have several ready-to-move options. Would you like to see availability?', timestamp: '2024-01-15T10:15:20Z' },
          { id: 'm7', sender: 'lead', text: 'Yes please, 3BHK preferred', timestamp: '2024-01-15T10:16:00Z' },
          { id: 'm8', sender: 'ai', text: 'Perfect! Let me book that appointment for you.', timestamp: '2024-01-15T10:16:45Z' }
        ]
      },
      { 
        id: '3', 
        name: 'Amit Patel', 
        avatar: 'https://i.pravatar.cc/150?u=amit', 
        status: 'Unresponsive', 
        sentiment: 'Neutral', 
        score: 65, 
        lastMessage: 'Terra: Are you still interested?', 
        time: '1 hour ago', 
        channel: 'SMS',
        messages: [
          { id: 'm9', sender: 'lead', text: 'Tell me about your payment plans', timestamp: '2024-01-15T09:00:00Z' },
          { id: 'm10', sender: 'ai', text: 'We offer flexible payment plans including construction-linked and possession-linked options. Which would you prefer?', timestamp: '2024-01-15T09:00:30Z' },
          { id: 'm11', sender: 'ai', text: 'Are you still interested in learning about our payment plans?', timestamp: '2024-01-15T09:30:00Z' }
        ]
      },
      { 
        id: '4', 
        name: 'Sunita Reddy', 
        avatar: 'https://i.pravatar.cc/150?u=sunita', 
        status: 'Scheduled', 
        sentiment: 'Positive', 
        score: 88, 
        lastMessage: 'You: Confirmed for Saturday at 11 AM.', 
        time: '3 hours ago', 
        channel: 'WhatsApp',
        messages: [
          { id: 'm12', sender: 'lead', text: 'I\'d like to visit your site this weekend', timestamp: '2024-01-15T07:00:00Z' },
          { id: 'm13', sender: 'ai', text: 'Absolutely! We have slots available on Saturday and Sunday. What time works best?', timestamp: '2024-01-15T07:01:00Z' },
          { id: 'm14', sender: 'lead', text: 'Saturday 11 AM works for me', timestamp: '2024-01-15T07:02:00Z' },
          { id: 'm15', sender: 'ai', text: 'Confirmed for Saturday at 11 AM. I\'ll send you the location details.', timestamp: '2024-01-15T07:02:30Z' }
        ]
      },
    ];

    io.on('connection', socket => {
      socket.emit('metrics:update', {
        conversationsToday,
        qualified,
        scheduled,
        responseTime: '< 30 seconds',
      });
      socket.emit('conversation:bootstrap', conversations);
    });

    setInterval(() => {
      conversationsToday += Math.floor(Math.random() * 3);
      if (Math.random() > 0.7) qualified += 1;
      if (Math.random() > 0.85) scheduled += 1;
      // @ts-ignore
      io.emit('metrics:update', {
        conversationsToday,
        qualified,
        scheduled,
        responseTime: '< 30 seconds',
      });
    }, 3000);

    setInterval(() => {
      const idx = Math.floor(Math.random() * conversations.length);
      const c = conversations[idx];
      const statuses = ['Active', 'Qualified', 'Scheduled', 'Unresponsive'];
      const sentiments = ['Positive', 'Neutral', 'Negative'];
      const nextStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const nextSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      c.status = nextStatus;
      c.sentiment = nextSentiment;
      c.score = Math.max(50, Math.min(99, c.score + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3)));
      c.lastMessage = nextStatus === 'Scheduled' ? 'Terra: Your visit is confirmed.' : c.lastMessage;
      // @ts-ignore
      io.emit('conversation:update', c);
    }, 4000);

    // Simulate incoming messages and streaming responses with AI-driven updates
    setInterval(() => {
      const idx = Math.floor(Math.random() * conversations.length);
      const conversation = conversations[idx];
      
      // Simulate incoming lead message
      const leadMessages = [
        'What are the amenities available?',
        'Can you share the floor plan?',
        'What\'s the possession date?',
        'Do you offer home loans?',
        'Is there a clubhouse?',
        'I want to schedule a site visit',
        'What\'s the price per sq ft?',
        'Are there any discounts available?'
      ];
      
      if (Math.random() > 0.7 && conversation.status === 'Active') {
        const leadMessage = {
          id: `m${Date.now()}`,
          sender: 'lead',
          text: leadMessages[Math.floor(Math.random() * leadMessages.length)],
          timestamp: new Date().toISOString()
        };
        
        conversation.messages.push(leadMessage);
        conversation.lastMessage = `Lead: ${leadMessage.text}`;
        
        // Emit the incoming message
        io.emit('conversation:message', { conversationId: conversation.id, message: leadMessage });
        
        // AI-driven lead scoring and status updates
        const aiInsights = analyzeLeadMessage(leadMessage.text, conversation);
        
        // Update conversation based on AI insights
        if (aiInsights.scoreChange !== 0) {
          conversation.score = Math.max(50, Math.min(99, conversation.score + aiInsights.scoreChange));
        }
        
        if (aiInsights.newStatus && aiInsights.newStatus !== conversation.status) {
          conversation.status = aiInsights.newStatus;
          
          // Emit status update
          io.emit('conversation:update', conversation);
          
          // Trigger scheduling if lead is qualified
          if (aiInsights.newStatus === 'Qualified' || aiInsights.newStatus === 'Scheduled') {
            setTimeout(() => {
              io.emit('scheduling:triggered', {
                conversationId: conversation.id,
                leadName: conversation.name,
                leadScore: conversation.score,
                reason: aiInsights.schedulingReason || 'Lead qualified for site visit'
              });
            }, 2000);
          }
        }
        
        if (aiInsights.sentiment && aiInsights.sentiment !== conversation.sentiment) {
          conversation.sentiment = aiInsights.sentiment;
        }
        
        // Simulate AI streaming response after a delay
        setTimeout(() => {
          const aiResponse = {
            id: `m${Date.now() + 1}`,
            sender: 'ai' as const,
            text: '',
            timestamp: new Date().toISOString()
          };
          
          const fullResponse = getAIResponse(leadMessage.text);
          
          // Start streaming
          io.emit('conversation:message:stream:start', { conversationId: conversation.id, message: aiResponse });
          
          // Stream chunks
          const chunks = fullResponse.split(' ');
          chunks.forEach((chunk, i) => {
            setTimeout(() => {
              io.emit('conversation:message:stream:chunk', { 
                conversationId: conversation.id, 
                chunk: (i > 0 ? ' ' : '') + chunk 
              });
            }, i * 200);
          });
          
          // End streaming and add final message
          setTimeout(() => {
            io.emit('conversation:message:stream:end', { conversationId: conversation.id });
            aiResponse.text = fullResponse;
            conversation.messages.push(aiResponse);
            conversation.lastMessage = `Terra: ${fullResponse}`;
            io.emit('conversation:message', { conversationId: conversation.id, message: aiResponse });
          }, chunks.length * 200 + 500);
        }, 1000);
      }
    }, 8000);
  }
  res.end();
}
