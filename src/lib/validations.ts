import { z } from 'zod'

// Inquiry form validation schema
export const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15),
  travelDate: z.string().optional(),
  groupSize: z.number().min(1).max(50).default(1),
  packageId: z.string().optional(),
  message: z.string().max(1000).optional(),
  customizations: z.object({
    hotelTier: z.enum(['budget', 'mid', 'premium']).optional(),
    transportType: z.enum(['shared', 'private']).optional(),
    pickupStation: z.string().optional(),
    addOns: z.array(z.string()).optional(),
    extraNights: z.number().min(0).max(7).optional(),
  }).optional(),
})

export type InquiryInput = z.infer<typeof inquirySchema>

// Package validation schema
export const packageSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
  shortDesc: z.string().max(300).optional(),
  price: z.number().min(0),
  duration: z.string().min(1),
  bestFor: z.string().optional(),
  inclusions: z.array(z.string()),
  exclusions: z.array(z.string()),
  itinerary: z.any().optional(),
  images: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  sortOrder: z.number().default(0),
})

export type PackageInput = z.infer<typeof packageSchema>

// Destination validation schema
export const destinationSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
  shortDesc: z.string().max(300).optional(),
  distance: z.string().optional(),
  travelTime: z.string().optional(),
  highlights: z.array(z.string()),
  images: z.array(z.string()).optional(),
  isPrimary: z.boolean().default(false),
  isSide: z.boolean().default(true),
  active: z.boolean().default(true),
  sortOrder: z.number().default(0),
})

export type DestinationInput = z.infer<typeof destinationSchema>

// Lead status update schema
export const leadUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'CONFIRMED', 'CLOSED', 'CANCELLED']).optional(),
  notes: z.string().optional(),
  assignedToId: z.string().optional(),
  followUpDate: z.string().optional(),
})

export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>

// Testimonial schema
export const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  location: z.string().max(100).optional(),
  rating: z.number().min(1).max(5).default(5),
  content: z.string().min(10),
  image: z.string().url().optional().or(z.literal('')),
  tripDate: z.string().optional(),
  featured: z.boolean().default(false),
  approved: z.boolean().default(false),
  sortOrder: z.number().default(0),
})

export type TestimonialInput = z.infer<typeof testimonialSchema>

// FAQ schema
export const faqSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(10),
  category: z.string().optional(),
  sortOrder: z.number().default(0),
  active: z.boolean().default(true),
})

export type FAQInput = z.infer<typeof faqSchema>

// Site settings schema
export const siteSettingsSchema = z.object({
  siteName: z.string().min(1),
  tagline: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  address: z.string().optional(),
  facebookUrl: z.string().url().optional().or(z.literal('')),
  instagramUrl: z.string().url().optional().or(z.literal('')),
  youtubeUrl: z.string().url().optional().or(z.literal('')),
  depositEnabled: z.boolean().default(false),
  depositPercent: z.number().min(0).max(100).default(30),
  upiId: z.string().optional(),
  razorpayEnabled: z.boolean().default(false),
  razorpayKeyId: z.string().optional(),
  safetyDisclaimer: z.string().optional(),
})

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>
