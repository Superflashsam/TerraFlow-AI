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
  { id: 1, name: 'Alice', message: 'Hi, I saw your listing for the downtown apartment...', time: '2:45 PM', unread: 2, channel: 'WhatsApp' },
  { id: 2, name: 'Bob', message: 'Can you send me more details about the property on Elm St?', time: '1:30 PM', unread: 0, channel: 'Email' },
  { id: 3, name: 'Charlie', message: 'Is the open house still on for this Saturday?', time: '11:10 AM', unread: 0, channel: 'SMS' },
  { id: 4, name: 'Diana', message: 'Thank you for the information! I will review and get back to you.', time: 'Yesterday', unread: 0, channel: 'Email' },
  { id: 5, name: 'Ethan', message: '[Image] What do you think of this kitchen design?', time: 'Yesterday', unread: 1, channel: 'WhatsApp' },
];

export const selectedConversation = {
  name: 'Alice',
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
      features: ['Parking', 'Gym', 'Swimming Pool', 'Security'],
      listingDate: '2025-09-19',
      agent: 'Priya Sharma',
      performance: {
        conversionRate: 4.9,
        avgTimeOnSite: '3:24',
        inquiryQuality: 'High'
      }
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
      features: ['Private Garden', 'Parking', 'Security', 'Clubhouse'],
      listingDate: '2025-09-02',
      agent: 'Rajesh Kumar',
      performance: {
        conversionRate: 11.6,
        avgTimeOnSite: '4:12',
        inquiryQuality: 'Very High'
      }
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
      features: ['Balcony', 'Parking', 'Lift', 'Power Backup'],
      listingDate: '2025-08-15',
      agent: 'Sneha Patel',
      performance: {
        conversionRate: 8.5,
        avgTimeOnSite: '2:56',
        inquiryQuality: 'Medium'
      }
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
      features: ['Terrace Garden', 'Jacuzzi', 'Home Theater', 'Wine Cellar'],
      listingDate: '2025-09-29',
      agent: 'Amit Desai',
      performance: {
        conversionRate: 5.8,
        avgTimeOnSite: '5:48',
        inquiryQuality: 'Very High'
      }
    }
  ];

export const analyticsReports = [
  { id: 1, title: "Lead Source Performance", description: "Breakdown of leads by source channel over the last quarter.", icon: BarChart },
  { id: 2, title: "Agent Conversion Rates", description: "Individual agent performance from lead to deal.", icon: Percent },
  { id: 3, title: "Property Sales by Type", description: "Sales volume categorized by property type (Villa, Apartment, etc.).", icon: Building2 },
  { id: 4, title: "Q3 Revenue Report", description: "Detailed financial report for the third quarter.", icon: DollarSign },
];
