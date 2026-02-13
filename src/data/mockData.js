import { v4 as uuidv4 } from 'uuid'

export const TRADES = {
  landscaping: {
    id: 'landscaping',
    name: 'Landscaping',
    icon: 'Trees',
    primaryColor: '#16a34a',
    accentColor: '#15803d',
    bgColor: '#f0fdf4',
    textColor: '#14532d',
    defaultTerms:
      '1. Payment due upon completion unless otherwise agreed.\n2. Estimate valid for 30 days.\n3. Price may change if site conditions differ from initial visit.\n4. We are fully insured.\n5. Cancellations require 24-hour notice.',
  },
  plumbing: {
    id: 'plumbing',
    name: 'Plumbing',
    icon: 'Wrench',
    primaryColor: '#2563eb',
    accentColor: '#1d4ed8',
    bgColor: '#eff6ff',
    textColor: '#1e3a5f',
    defaultTerms:
      '1. Payment due upon completion unless otherwise agreed.\n2. Estimate valid for 30 days.\n3. Parts are billed at cost plus markup.\n4. Emergency rates apply outside normal business hours.\n5. We are licensed and insured.',
  },
  electrical: {
    id: 'electrical',
    name: 'Electrical',
    icon: 'Zap',
    primaryColor: '#d97706',
    accentColor: '#b45309',
    bgColor: '#fffbeb',
    textColor: '#78350f',
    defaultTerms:
      '1. Payment due upon completion unless otherwise agreed.\n2. Estimate valid for 30 days.\n3. All work meets local code requirements.\n4. Permits pulled where required (cost included).\n5. We are licensed, bonded, and insured.',
  },
  painting: {
    id: 'painting',
    name: 'Painting',
    icon: 'Paintbrush',
    primaryColor: '#7c3aed',
    accentColor: '#6d28d9',
    bgColor: '#f5f3ff',
    textColor: '#3b0764',
    defaultTerms:
      '1. Payment: 50% deposit, balance due on completion.\n2. Estimate valid for 30 days.\n3. Price includes paint and materials unless noted.\n4. Two coats standard; additional coats quoted separately.\n5. We are fully insured.',
  },
  handyman: {
    id: 'handyman',
    name: 'Handyman',
    icon: 'Hammer',
    primaryColor: '#f97316',
    accentColor: '#ea580c',
    bgColor: '#fff7ed',
    textColor: '#7c2d12',
    defaultTerms:
      '1. Payment due upon completion unless otherwise agreed.\n2. Estimate valid for 30 days.\n3. Hourly rate applies for work beyond estimate scope.\n4. Client provides access to work area.\n5. We are fully insured.',
  },
  cleaning: {
    id: 'cleaning',
    name: 'Cleaning',
    icon: 'Sparkles',
    primaryColor: '#0891b2',
    accentColor: '#0e7490',
    bgColor: '#ecfeff',
    textColor: '#164e63',
    defaultTerms:
      '1. Payment due upon completion unless otherwise agreed.\n2. Estimate valid for 30 days.\n3. We bring our own supplies unless specified.\n4. Cancellations require 24-hour notice.\n5. We are bonded and insured.',
  },
}

export function createDefaultDocument(tradeId = 'landscaping') {
  const trade = TRADES[tradeId] || TRADES.landscaping
  return {
    docId: uuidv4(),
    trade: tradeId,
    companyName: '',
    companyPhone: '',
    companyEmail: '',
    companyLicense: '',
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    projectDate: new Date().toISOString().split('T')[0],
    scopeOfWork: '',
    lineItems: [
      { description: '', qty: 1, unitCost: 0 },
    ],
    taxRate: 0,
    notes: 'Estimate valid for 30 days.',
    terms: trade.defaultTerms,
    showTerms: true,
  }
}
