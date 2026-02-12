import { v4 as uuidv4 } from 'uuid'

export const TEMPLATES = {
  commercial: {
    id: 'commercial',
    name: 'General Contractor',
    primaryColor: '#f97316',
    accentColor: '#ea580c',
    bgColor: '#f8fafc',
    textColor: '#1e293b',
    cssClass: 'construction',
  },
  residential: {
    id: 'residential',
    name: 'Landscaper',
    primaryColor: '#16a34a',
    accentColor: '#15803d',
    bgColor: '#f0fdf4',
    textColor: '#14532d',
    cssClass: 'landscaping',
  },
}

export function createDefaultDocument(template = 'commercial') {
  return {
    docId: uuidv4(),
    template,
    companyName: 'Your Company Name',
    companyTagline: 'Quality Work, Guaranteed',
    companyPhone: '(555) 123-4567',
    companyEmail: 'info@yourcompany.com',
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    projectDate: new Date().toISOString().split('T')[0],
    blocks: createDefaultBlocks(template),
  }
}

export function createDefaultBlocks(template) {
  const isLandscaping = template === 'residential'

  return [
    {
      id: uuidv4(),
      type: 'hero',
      visible: true,
      data: {
        title: isLandscaping
          ? 'Landscape Design Proposal'
          : 'Construction Proposal',
        subtitle: 'Prepared exclusively for your project',
        backgroundImage: isLandscaping
          ? 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&q=80'
          : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
      },
    },
    {
      id: uuidv4(),
      type: 'serviceList',
      visible: true,
      data: {
        heading: 'Our Services',
        services: isLandscaping
          ? [
              { icon: 'Trees', label: 'Tree Planting', description: 'Native and ornamental trees' },
              { icon: 'Flower2', label: 'Garden Design', description: 'Custom garden layouts' },
              { icon: 'Droplets', label: 'Irrigation', description: 'Sprinkler systems & drip lines' },
              { icon: 'Fence', label: 'Hardscaping', description: 'Patios, walkways & retaining walls' },
            ]
          : [
              { icon: 'Hammer', label: 'Framing', description: 'Structural framing & carpentry' },
              { icon: 'Paintbrush', label: 'Finishing', description: 'Interior & exterior finishes' },
              { icon: 'Wrench', label: 'Plumbing', description: 'Full plumbing installation' },
              { icon: 'Zap', label: 'Electrical', description: 'Wiring & panel upgrades' },
            ],
      },
    },
    {
      id: uuidv4(),
      type: 'pricingTable',
      visible: true,
      data: {
        heading: 'Project Estimate',
        items: [
          { qty: 1, description: 'Site Preparation & Cleanup', unitCost: 500 },
          { qty: 1, description: 'Materials & Supplies', unitCost: 2500 },
          { qty: 40, description: 'Labor (hours)', unitCost: 75 },
        ],
        taxRate: 0,
        notes: 'Estimate valid for 30 days. Final pricing may vary based on site conditions.',
      },
    },
    {
      id: uuidv4(),
      type: 'gallery',
      visible: true,
      data: {
        heading: 'Previous Work',
        images: isLandscaping
          ? [
              'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
              'https://images.unsplash.com/photo-1598902108854-d1446677925c?w=600&q=80',
              'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
            ]
          : [
              'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
              'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
              'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
            ],
      },
    },
    {
      id: uuidv4(),
      type: 'team',
      visible: true,
      data: {
        heading: 'Your Project Team',
        members: [
          { name: 'John Smith', role: 'Project Manager', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80' },
          { name: 'Sarah Johnson', role: 'Lead Estimator', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80' },
          { name: 'Mike Davis', role: 'Site Supervisor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80' },
        ],
      },
    },
    {
      id: uuidv4(),
      type: 'terms',
      visible: true,
      data: {
        heading: 'Terms & Conditions',
        content:
          '1. Payment Terms: 50% deposit required upon acceptance. Balance due upon completion.\n\n2. Timeline: Work will commence within 5 business days of deposit receipt. Estimated completion is noted in the project scope.\n\n3. Changes: Any changes to the scope of work must be agreed upon in writing and may affect the final price and timeline.\n\n4. Warranty: All workmanship is guaranteed for 1 year from completion date.\n\n5. Insurance: We carry full liability insurance and workers\' compensation coverage.\n\n6. Cancellation: Client may cancel with written notice. Deposit is non-refundable if work has commenced.',
      },
    },
  ]
}
