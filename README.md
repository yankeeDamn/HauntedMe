# Tarapith Haunted Travel Experience

A production-ready MVP website for a travel business offering packaged trips to Tarapith Kali Mandir area with optional side-destination tours and station pickup/drop.

## ⚠️ Important Safety Notice

This application promotes **respectful, legal, and permission-based** cultural tourism. The "haunted experience" is a **guided folklore and storytelling night-walk** - NOT occult practices or ghost hunting. All tours:
- Operate with proper permissions
- Follow local rules and regulations
- Maintain respectful distance from sacred sites
- Are designed for cultural education and storytelling

## Features

### Public Website
- **Landing Page**: Hero section, package highlights, testimonials, CTAs
- **Packages Page**: 3 base packages (Basic ₹5k, Standard ₹7.5k, Premium ₹10k)
- **Destinations**: Tarapith main + side destinations (Birchandrapur, Nitai Bari)
- **Trip Customizer**: Build-your-own-trip form with dynamic pricing
- **Sample Itineraries**: 1-day, 2-day, and 3-day schedules
- **FAQ & Safety**: Comprehensive safety information and disclaimers
- **Contact Form**: Lead capture with WhatsApp integration
- **Gallery**: Photo showcase (admin-managed)

### Admin Panel
- Role-based authentication (Admin/Staff)
- Package management (CRUD)
- Lead/inquiry management with status tracking
- Destination management
- Testimonials management
- Gallery management
- FAQ management
- Site settings (contact info, payment settings)
- CSV export for leads

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Custom shadcn/ui-style components
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yankeeDamn/HauntedMe.git
   cd HauntedMe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your values:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/tarapith_travel"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ADMIN_EMAIL="admin@tarapith.travel"
   ADMIN_PASSWORD="your-secure-password"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database**
   ```bash
   npx tsx prisma/seed.ts
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open the application**
   - Public site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin/login

### Default Admin Credentials

After seeding, log in with:
- **Email**: admin@tarapith.travel (or value from ADMIN_EMAIL)
- **Password**: admin123 (or value from ADMIN_PASSWORD)

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages (packages, destinations, etc.)
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   │   ├── admin/         # Protected admin APIs
│   │   ├── auth/          # NextAuth routes
│   │   └── ...            # Public APIs
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Landing page
├── components/
│   ├── admin/             # Admin-specific components
│   ├── layout/            # Header, Footer
│   └── ui/                # Reusable UI components
├── lib/
│   ├── auth-utils.ts      # Auth helper functions
│   ├── prisma.ts          # Prisma client
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Zod schemas
└── types/
    └── next-auth.d.ts     # Type extensions
prisma/
├── schema.prisma          # Database schema
└── seed.ts                # Seed script
```

## Database Schema

### Core Models
- **User**: Admin/Staff accounts
- **Package**: Travel packages with pricing, inclusions, itinerary
- **Destination**: Primary and side destinations
- **AddOn**: Optional add-ons for customization
- **Lead**: Customer inquiries with status tracking
- **Testimonial**: Customer reviews
- **GalleryImage**: Photo gallery
- **FAQ**: Frequently asked questions
- **SiteSettings**: Site configuration

## API Endpoints

### Public
- `GET /api/packages` - List packages
- `GET /api/destinations` - List destinations
- `GET /api/testimonials` - List approved testimonials
- `GET /api/gallery` - List gallery images
- `GET /api/faqs` - List FAQs
- `GET /api/addons` - List add-ons
- `GET /api/settings` - Public site settings
- `POST /api/inquiry` - Submit inquiry (rate-limited)

### Admin (Protected)
- `GET|POST /api/admin/packages` - Package CRUD
- `GET|PUT|DELETE /api/admin/packages/[id]`
- `GET|POST /api/admin/leads` - Lead management
- `GET|PUT|DELETE /api/admin/leads/[id]`
- `GET|POST /api/admin/destinations` - Destination CRUD
- `GET|POST /api/admin/testimonials` - Testimonial CRUD
- `GET|POST /api/admin/gallery` - Gallery CRUD
- `GET|POST /api/admin/faqs` - FAQ CRUD
- `GET|PUT /api/admin/settings` - Site settings

## Deployment

### Deploy to Vercel

1. **Create a Vercel account** at https://vercel.com

2. **Set up a PostgreSQL database**
   - Use Vercel Postgres, Supabase, Neon, or Railway
   - Get your connection string

3. **Import your repository**
   - Connect your GitHub repo to Vercel
   - Set environment variables:
     - `DATABASE_URL`
     - `NEXTAUTH_URL` (your production URL)
     - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
     - `ADMIN_EMAIL`
     - `ADMIN_PASSWORD`

4. **Deploy**
   - Vercel will auto-build and deploy
   - Run database migrations via Vercel's CLI or dashboard

5. **Seed production database**
   ```bash
   npx prisma db seed
   ```

### Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Run database migrations
- [ ] Seed initial data
- [ ] Test admin login
- [ ] Test inquiry form submission
- [ ] Update contact information in admin settings
- [ ] Add real images to gallery
- [ ] Customize package details

## Security Features

- Rate limiting on inquiry endpoint (5 requests/minute)
- Input sanitization (XSS prevention)
- Server-side validation with Zod
- Role-based access control
- Secure authentication with NextAuth.js
- Protected admin routes

## Customization

### Updating Contact Information
1. Log in to admin panel
2. Go to Settings
3. Update phone, WhatsApp, email, address

### Managing Packages
1. Go to Packages in admin
2. Edit prices, inclusions, itinerary
3. Mark packages as featured/active

### Adding Content
- **Testimonials**: Add customer reviews in admin
- **Gallery**: Upload images via admin panel
- **FAQs**: Add/edit frequently asked questions
- **Destinations**: Update distance/travel time estimates

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

This project is proprietary. All rights reserved.

---

**Disclaimer**: This application is designed for legitimate cultural tourism business. All "haunted" or "mystical" experiences must be presented as guided, educational folklore tours that respect local customs, laws, and sacred sites.
