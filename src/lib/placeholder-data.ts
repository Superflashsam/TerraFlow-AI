import { Users, Briefcase, CheckSquare, DollarSign, Percent, BarChart, FileText, Bot, Building2 } from 'lucide-react';

// Main Dashboard Data
export const kpiData = [
  {
    title: "New Leads",
    value: "124",
    change: 15.2,
    icon: Users,
  },
  {
    title: "Deals Won",
    value: "32",
    change: 8.1,
    icon: Briefcase,
  },
  {
    title: "Tasks Due",
    value: "8",
    change: -10.0,
    icon: CheckSquare,
  },
  {
    title: "Revenue",
    value: "$1.2M",
    change: 21.5,
    icon: DollarSign,
  },
  {
    title: "Conversion Rate",
    value: "25.8%",
    change: 2.3,
    icon: Percent,
  },
];

export const leadsChartData = [
  { month: "January", leads: 186 },
  { month: "February", leads: 305 },
  { month: "March", leads: 237 },
  { month: "April", leads: 273 },
  { month: "May", leads: 209 },
  { month: "June", leads: 214 },
];

export const pipelineChartData = [
  { stage: "New", value: 450000 },
  { stage: "Qual.", value: 320000 },
  { stage: "Visit", value: 250000 },
  { stage: "Nego.", value: 180000 },
  { stage: "Won", value: 150000 },
];

export type RecentActivityType = {
  id: string;
  user: {
    name: string;
    avatarId: string;
  };
  action: 'New Lead' | 'Deal Won' | 'Task Completed' | 'Message Sent';
  details: string;
  time: string;
};

export const recentActivities: RecentActivityType[] = [
  { id: '1', user: { name: 'Alex Johnson', avatarId: 'avatar-1' }, action: 'New Lead', details: 'Added "Greenwood Villa" prospect', time: '5m ago' },
  { id: '2', user: { name: 'Samantha Roe', avatarId: 'avatar-2' }, action: 'Deal Won', details: 'Closed "Oceanview Penthouse" for $2.5M', time: '30m ago' },
  { id: '3', user: { name: 'Bot', avatarId: 'bot-avatar' }, action: 'Task Completed', details: 'Sent follow-up sequence to 5 leads', time: '1h ago' },
  { id: '4', user: { name: 'Marcus Brown', avatarId: 'avatar-3' }, action: 'Message Sent', details: 'Replied to inquiry about "Hillside Estate"', time: '2h ago' },
  { id: '5', user: { name: 'Alex Johnson', avatarId: 'avatar-1' }, action: 'Task Completed', details: 'Marked "Call Jane Smith" as done', time: '4h ago' },
];


// Leads Page Data
export const leadsData = [
    { id: 'LEAD-001', name: 'John Doe', email: 'john.d@example.com', source: 'Website', score: 92, stage: 'Qualified', assigned: 'Alex Johnson', lastContacted: '2023-10-26' },
    { id: 'LEAD-002', name: 'Jane Smith', email: 'jane.s@example.com', source: 'Referral', score: 85, stage: 'Contacted', assigned: 'Samantha Roe', lastContacted: '2023-10-25' },
    { id: 'LEAD-003', name: 'Peter Jones', email: 'peter.j@example.com', source: 'Ad Campaign', score: 78, stage: 'New', assigned: 'Marcus Brown', lastContacted: '2023-10-24' },
    { id: 'LEAD-004', name: 'Mary Williams', email: 'mary.w@example.com', source: 'Website', score: 95, stage: 'Qualified', assigned: 'Alex Johnson', lastContacted: '2023-10-26' },
    { id: 'LEAD-005', name: 'David Brown', email: 'david.b@example.com', source: 'Social Media', score: 65, stage: 'Lost', assigned: 'Samantha Roe', lastContacted: '2023-10-20' },
    { id: 'LEAD-006', name: 'Susan Davis', email: 'susan.d@example.com', source: 'Referral', score: 88, stage: 'Negotiation', assigned: 'Alex Johnson', lastContacted: '2023-10-27' },
    { id: 'LEAD-007', name: 'Robert Miller', email: 'robert.m@example.com', source: 'Website', score: 72, stage: 'New', assigned: 'Marcus Brown', lastContacted: '2023-10-27' },
];


// Deals Page Data
export const dealsData = {
  new: [
    { id: 'DEAL-001', title: 'Downtown Office Space', value: 75000, agent: 'Alex Johnson' },
    { id: 'DEAL-002', title: 'Suburban Family Home', value: 450000, agent: 'Samantha Roe' },
  ],
  qualified: [
    { id: 'DEAL-003', title: 'Luxury Penthouse', value: 1200000, agent: 'Alex Johnson' },
  ],
  'site-visit': [
    { id: 'DEAL-004', title: 'Lakeside Cabin', value: 250000, agent: 'Marcus Brown' },
    { id: 'DEAL-005', title: 'Retail Storefront', value: 300000, agent: 'Samantha Roe' },
  ],
  negotiation: [
    { id: 'DEAL-006', title: 'Beachfront Villa', value: 2500000, agent: 'Alex Johnson' },
  ],
  'closed-won': [],
  'closed-lost': [],
};

// Marketing Page Data
export const generatedContent = {
    "property-description": `**Escape to Your Private Oasis!** \n\nDiscover tranquility in this stunning 4-bedroom, 3-bathroom sanctuary nestled in the heart of the serene Green Valley. Boasting 2,500 sq. ft. of elegant living space, this home is perfect for families seeking both comfort and style. \n\nEntertain guests in your gourmet kitchen with state-of-the-art appliances, or unwind by the sparkling private pool. The spacious backyard is an entertainer's dream, complete with a built-in BBQ and fire pit. Enjoy exclusive access to community amenities including a modern gym and scenic walking trails. \n\nWith breathtaking mountain views and a contemporary open-concept design, this property is more than a home—it's a lifestyle. \n\n#DreamHome #LuxuryLiving #GreenValleyRealEstate #ForSale`,
    "social-media-post": `🏡 Just Listed in Green Valley! 🌳 This 4-bed, 3-bath gem is the definition of luxury. With a private pool, gourmet kitchen, and stunning mountain views, it’s the perfect family retreat. DM for a private tour! #RealEstate #NewListing #HomeForSale`
};

// Inbox Page Data
export const conversations = [
  { id: 1, name: 'Alice', message: 'Hi, I saw your listing for the downtown apartment...', time: '2:45 PM', unread: 2, channel: 'WhatsApp', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 2, name: 'Bob', message: 'Can you send me more details about the property on Elm St?', time: '1:30 PM', unread: 0, channel: 'Email', avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 3, name: 'Charlie', message: 'Is the open house still on for this Saturday?', time: '11:10 AM', unread: 0, channel: 'SMS', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 4, name: 'Diana', message: 'Thank you for the information! I will review and get back to you.', time: 'Yesterday', unread: 0, channel: 'Email', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 5, name: 'Ethan', message: '[Image] What do you think of this kitchen design?', time: 'Yesterday', unread: 1, channel: 'WhatsApp', avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
];

export const selectedConversation = {
  name: 'Alice',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
  messages: [
    { from: 'Alice', text: 'Hi, I saw your listing for the downtown apartment and I\'m very interested. Is it still available?', time: '2:45 PM' },
    { from: 'Agent', text: 'Hello Alice! Yes, it is. It\'s a beautiful 2-bedroom with great city views. Are you free for a viewing this week?', time: '2:46 PM' },
    { from: 'Alice', text: 'That sounds perfect! How about Thursday afternoon?', time: '2:47 PM' },
    { from: 'Alice', text: 'Around 3 PM?', time: '2:47 PM' },
  ]
};

// Other Pages Placeholder Data
export const automationWorkflows = [
  { id: 1, name: 'New Lead Follow-Up', description: 'Assigns and sends a welcome message to new leads.', status: 'Active', icon: Bot },
  { id: 2, name: 'Post Site-Visit Survey', description: 'Sends a feedback form 24 hours after a site visit.', status: 'Active', icon: Bot },
  { id: 3, name: 'Deal Won Onboarding', description: 'Sends contract and welcome pack when a deal is won.', status: 'Inactive', icon: Bot },
];

export const documents = [
  { id: 1, name: 'Oceanview-Penthouse-Agreement.pdf', type: 'Sales Agreement', size: '2.4MB', linkedTo: 'DEAL-006', icon: FileText },
  { id: 2, name: 'RERA-Compliance-Form-A.pdf', type: 'RERA Form', size: '800KB', linkedTo: 'DEAL-006', icon: FileText },
  { id: 3, name: 'Greenwood-Villa-Brochure.pdf', type: 'Brochure', size: '5.1MB', linkedTo: 'PROP-001', icon: FileText },
];

export const properties = [
    {
      id: '1',
      title: '3BHK Luxury Apartment in Baner',
      price: '₹85,00,000',
      address: 'Baner, Pune',
      type: 'apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: '1,450 sq ft',
      status: 'active',
      daysOnMarket: 28,
      views: 245,
      inquiries: 12,
      showings: 8,
      imageId: 'property-1',
      alt: 'Modern 3BHK luxury apartment with spacious living room and contemporary furniture',
      description: 'A beautiful, spacious 3-bedroom apartment in the heart of Baner. This modern home features a modular kitchen, large balcony, and is part of a community with a swimming pool and gym. Perfect for families looking for a blend of comfort and convenience.',
      features: ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Lift', 'Power Backup'],
      listingDate: '2025-09-19',
      agent: 'Priya Sharma',
      performance: {
        conversionRate: 4.9,
        avgTimeOnSite: '3:24',
        inquiryQuality: 'High'
      },
      images: [
        { id: '1-1', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Living Room', alt: 'Spacious living room with modern furniture', isMain: true },
        { id: '1-2', url: 'https://images.unsplash.com/photo-1600585152225-3579fe9d7ae2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Kitchen', alt: 'Modern kitchen with island', isMain: false },
        { id: '1-3', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Bedroom', alt: 'Cozy bedroom with large bed', isMain: false },
        { id: '1-4', url: 'https://images.unsplash.com/photo-1600585153639-6e93545b7346?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Bathroom', alt: 'Elegant bathroom with bathtub', isMain: false },
      ]
    },
    {
      id: '2',
      title: 'Premium Villa in Koregaon Park',
      price: '₹2,50,00,000',
      address: 'Koregaon Park, Pune',
      type: 'villa',
      bedrooms: 4,
      bathrooms: 4,
      area: '3,200 sq ft',
      status: 'pending',
      daysOnMarket: 45,
      views: 189,
      inquiries: 22,
      showings: 15,
      imageId: 'property-2',
      alt: 'Luxurious 4BHK villa with private garden and modern architecture',
      description: 'An exquisite 4-bedroom villa offering unparalleled luxury and privacy in the upscale neighborhood of Koregaon Park. Features a private garden, state-of-the-art security, and access to an exclusive clubhouse. A perfect choice for those who demand the best.',
      features: ['Private Garden', 'Parking', 'Security', 'Clubhouse', 'Servant Quarters', 'Gated Community'],
      listingDate: '2025-09-02',
      agent: 'Rajesh Kumar',
      performance: {
        conversionRate: 11.6,
        avgTimeOnSite: '4:12',
        inquiryQuality: 'Very High'
      },
      images: [
        { id: '2-1', url: 'https://images.unsplash.com/photo-1600585153492-f045d7b38a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Exterior', alt: 'Modern villa exterior', isMain: true },
        { id: '2-2', url: 'https://images.unsplash.com/photo-1600607687920-40da0c4d4458?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Living Area', alt: 'Spacious living area with high ceilings', isMain: false },
        { id: '2-3', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Garden View', alt: 'Lush green garden view from inside', isMain: false },
        { id: '2-4', url: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Master Suite', alt: 'Luxurious master suite with balcony', isMain: false },
      ]
    },
    {
      id: '3',
      title: '2BHK Modern Flat in Wakad',
      price: '₹65,00,000',
      address: 'Wakad, Pune',
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,180 sq ft',
      status: 'sold',
      daysOnMarket: 62,
      views: 328,
      inquiries: 28,
      showings: 18,
      imageId: 'property-3',
      alt: 'Contemporary 2BHK apartment with modern kitchen and balcony views',
      description: 'A smartly designed 2-bedroom flat in the rapidly developing area of Wakad. This home offers a perfect blend of style and functionality with a modern kitchen, spacious balcony, and essential amenities like power backup and lift.',
      features: ['Balcony', 'Parking', 'Lift', 'Power Backup', 'Play Area'],
      listingDate: '2025-08-15',
      agent: 'Sneha Patel',
      performance: {
        conversionRate: 8.5,
        avgTimeOnSite: '2:56',
        inquiryQuality: 'Medium'
      },
       images: [
        { id: '3-1', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Building Front', alt: 'Front view of apartment building', isMain: true },
        { id: '3-2', url: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Interior', alt: 'Bright apartment interior', isMain: false },
        { id: '3-3', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Living Space', alt: 'Cozy living space with a sofa', isMain: false },
        { id: '3-4', url: 'https://images.unsplash.com/photo-1556912173-3539f3c55b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Kitchenette', alt: 'Small and modern kitchen area', isMain: false },
      ]
    },
    {
      id: '4',
      title: 'Luxury Penthouse in Kalyani Nagar',
      price: '₹3,80,00,000',
      address: 'Kalyani Nagar, Pune',
      type: 'penthouse',
      bedrooms: 5,
      bathrooms: 5,
      area: '4,500 sq ft',
      status: 'active',
      daysOnMarket: 18,
      views: 156,
      inquiries: 9,
      showings: 6,
      imageId: 'property-4',
      alt: 'Exclusive penthouse with panoramic city views and premium finishes',
      description: 'The pinnacle of urban living. This 5-bedroom penthouse in Kalyani Nagar offers breathtaking city views and unmatched luxury. Features include a private terrace garden, jacuzzi, home theater, and a wine cellar. For the discerning buyer who appreciates the finer things in life.',
      features: ['Terrace Garden', 'Jacuzzi', 'Home Theater', 'Wine Cellar', 'Private Lift', 'Concierge Service'],
      listingDate: '2025-09-29',
      agent: 'Amit Desai',
      performance: {
        conversionRate: 5.8,
        avgTimeOnSite: '5:48',
        inquiryQuality: 'Very High'
      },
       images: [
        { id: '4-1', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'View from Penthouse', alt: 'Stunning city view from penthouse', isMain: true },
        { id: '4-2', url: 'https://images.unsplash.com/photo-1613553507747-8914587a8f15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Rooftop Terrace', alt: 'Spacious rooftop terrace with seating', isMain: false },
        { id: '4-3', url: 'https://images.unsplash.com/photo-1617104679092-b25c3534a7f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Entertainment Room', alt: 'Modern entertainment room with a large screen', isMain: false },
        { id: '4-4', url: 'https://images.unsplash.com/photo-1567016526105-6441b18aa34e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Grand Living Room', alt: 'Expansive living room with high ceilings', isMain: false },
      ]
    }
  ];

export const analyticsReports = [
  { id: 1, title: "Lead Source Performance", description: "Breakdown of leads by source channel over the last quarter.", icon: BarChart },
  { id: 2, title: "Agent Conversion Rates", description: "Individual agent performance from lead to deal.", icon: Percent },
  { id: 3, title: "Property Sales by Type", description: "Sales volume categorized by property type (Villa, Apartment, etc.).", icon: Building2 },
  { id: 4, title: "Q3 Revenue Report", description: "Detailed financial report for the third quarter.", icon: DollarSign },
  { id: 5, title: "Task Completion Analysis", description: "Productivity metrics for team task management.", icon: CheckSquare },
  { id: 6, title: "Custom Report Builder", description: "Create and save your own custom report templates.", icon: FileText },
];

export const teamMembers = [
    { id: 'me', name: 'Me', avatarId: 'user-avatar' },
    { id: 'priya-sharma', name: 'Priya Sharma', avatarId: 'avatar-priya' },
    { id: 'rajesh-kumar', name: 'Rajesh Kumar', avatarId: 'avatar-rajesh' },
    { id: 'amit-patel', name: 'Amit Patel', avatarId: 'avatar-amit' },
    { id: 'deepa-nair', name: 'Deepa Nair', avatarId: 'avatar-sunita' },
    { id: 'vikram-rao', name: 'Vikram Rao', avatarId: 'avatar-1' }
];

export const initialTasks = [
  {
    id: '1',
    title: "Follow-up with Rajesh Kumar",
    description: "Discuss property options in Bandra. High potential client.",
    status: 'todo',
    priority: 'high',
    dueDate: '2025-10-31T15:00:00Z',
    createdDate: '2025-10-30T09:00:00Z',
    linkedTo: { type: 'lead', name: 'Rajesh Kumar' },
    tags: ['Follow-up', 'High-Priority'],
    assignee: { name: 'Priya Sharma', avatarId: 'avatar-priya' }
  },
  {
    id: '2',
    title: "Send property brochure to Priya Sharma",
    description: "Client is interested in 2BHK apartments in Juhu.",
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-11-01T18:00:00Z',
    createdDate: '2025-10-30T11:00:00Z',
    linkedTo: { type: 'lead', name: 'Priya Sharma' },
    tags: ['Site Visit'],
    assignee: { name: 'Rajesh Kumar', avatarId: 'avatar-rajesh' }
  },
  {
    id: '3',
    title: "RERA documentation check",
    description: "Verify all RERA compliance documents for the Whitefield Villa deal.",
    status: 'todo',
    priority: 'low',
    dueDate: '2025-11-10T23:59:00Z',
    createdDate: '2025-10-29T14:00:00Z',
    linkedTo: { type: 'deal', name: 'Whitefield Villa' },
    tags: ['Legal', 'Documentation'],
    assignee: { name: 'Amit Patel', avatarId: 'avatar-amit' }
  },
  {
    id: '4',
    title: "Site visit preparation - Sobha property",
    description: "Arrange keys and prepare property showcase for Amit Patel's visit.",
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-10-31T17:00:00Z',
    createdDate: '2025-10-31T10:00:00Z',
    linkedTo: { type: 'lead', name: 'Amit Patel' },
    tags: ['Site Visit'],
    assignee: { name: 'Me', avatarId: 'user-avatar' }
  },
  {
    id: '5',
    title: "Finalize mortgage pre-approval for Kavya Reddy",
    description: "Coordinate with bank representative and client.",
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2025-11-01T23:59:00Z',
    createdDate: '2025-10-28T16:00:00Z',
    linkedTo: { type: 'deal', name: 'Prestige Lakeside' },
    tags: ['Finance'],
    assignee: { name: 'Deepa Nair', avatarId: 'avatar-sunita' }
  },
  {
    id: '6',
    title: "Call with Anjali Singh regarding budget",
    description: "Client call completed, budget confirmed.",
    status: 'done',
    priority: 'high',
    dueDate: '2025-10-31T11:00:00Z',
    createdDate: '2025-10-30T18:00:00Z',
    linkedTo: { type: 'lead', name: 'Anjali Singh' },
    tags: ['Follow-up'],
    assignee: { name: 'Vikram Rao', avatarId: 'avatar-1' }
  },
   {
    id: '7',
    title: "Draft sale agreement for Arjun Mehta",
    description: "Initial draft for the commercial space in BKC.",
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-11-03T18:00:00Z',
    createdDate: '2025-10-31T12:00:00Z',
    linkedTo: { type: 'deal', name: 'BKC Office Deal' },
    tags: ['Legal', 'Documentation'],
    assignee: { name: 'Amit Patel', avatarId: 'avatar-amit' }
  },
  {
    id: '8',
    title: "Price negotiation call with Suresh Iyer",
    description: "Scheduled call to discuss the final offer for the Juhu apartment.",
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-10-31T16:00:00Z',
    createdDate: '2025-10-30T17:00:00Z',
    linkedTo: { type: 'lead', name: 'Suresh Iyer' },
    tags: ['Negotiation'],
    assignee: { name: 'Me', avatarId: 'user-avatar' }
  },
  {
    id: '9',
    title: "Send updated property list to Neha Gupta",
    description: "Client requested more options in the Lower Parel area.",
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-11-02T14:00:00Z',
    createdDate: '2025-10-31T09:30:00Z',
    linkedTo: { type: 'lead', name: 'Neha Gupta' },
    tags: ['Follow-up'],
    assignee: { name: 'Priya Sharma', avatarId: 'avatar-priya' }
  },
  {
    id: '10',
    title: "Onboard new agent Vikram Rao",
    description: "Training session and system walkthrough.",
    status: 'done',
    priority: 'low',
    dueDate: '2025-10-30T18:00:00Z',
    createdDate: '2025-10-28T10:00:00Z',
    linkedTo: null,
    tags: ['Internal'],
    assignee: { name: 'Me', avatarId: 'user-avatar' }
  }
];
