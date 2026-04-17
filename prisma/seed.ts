import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@tarapith.travel'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create packages
  const packages = await Promise.all([
    prisma.package.upsert({
      where: { slug: 'basic-tarapith' },
      update: {},
      create: {
        name: 'Basic Tarapith Package',
        slug: 'basic-tarapith',
        description: `Experience the divine energy of Tarapith with our Basic Package. This essential pilgrimage includes darshan at the sacred Tarapith Kali Mandir, one of the 51 Shakti Peethas, where Goddess Tara is worshipped in her fierce yet benevolent form.

Our experienced guide will share the rich history and mythology of this ancient temple, ensuring a meaningful spiritual experience. Convenient pickup and drop from the nearest railway station makes your journey hassle-free.

**Note:** This is a simple, spiritual-focused package ideal for devotees seeking a straightforward temple visit without extended tours or accommodations.`,
        shortDesc: 'Essential temple darshan with station pickup/drop and guided tour.',
        price: 5000,
        duration: '1 Day',
        bestFor: 'Solo travelers, Devotees, Budget-conscious pilgrims',
        inclusions: [
          'Station pickup and drop (Rampurhat)',
          'Guided temple visit and darshan assistance',
          'Local sightseeing around the temple',
          'Refreshments (tea/snacks)',
          'Travel insurance',
        ],
        exclusions: [
          'Accommodation',
          'Meals (lunch/dinner)',
          'Personal expenses',
          'Special pooja arrangements (available on request)',
          'Photography services',
        ],
        itinerary: {
          days: [
            {
              day: 1,
              title: 'Temple Darshan Day',
              activities: [
                { time: '06:00 AM', activity: 'Pickup from Rampurhat station' },
                { time: '07:00 AM', activity: 'Arrival at Tarapith, freshen up' },
                { time: '08:00 AM', activity: 'Temple darshan and guided tour' },
                { time: '10:30 AM', activity: 'Tea break and local exploration' },
                { time: '12:00 PM', activity: 'Visit cremation ground area (respectful distance)' },
                { time: '01:00 PM', activity: 'Lunch break (self-arranged)' },
                { time: '03:00 PM', activity: 'Return journey to station' },
                { time: '04:30 PM', activity: 'Drop at Rampurhat station' },
              ],
            },
          ],
        },
        images: [],
        featured: true,
        sortOrder: 1,
      },
    }),
    prisma.package.upsert({
      where: { slug: 'standard-tarapith' },
      update: {},
      create: {
        name: 'Standard Tarapith Package',
        slug: 'standard-tarapith',
        description: `Our most popular package! The Standard Tarapith Package offers a comprehensive experience combining spiritual devotion with exploration of the region's cultural heritage.

Stay at a comfortable hotel near the temple and enjoy guided visits to both Tarapith Kali Mandir and one nearby destination of your choice - Birchandrapur or Nitai Bari. 

Our knowledgeable guides share fascinating stories about the tantric traditions, the legendary saint Bamakhyapa, and the unique spiritual practices of this region, all presented in a respectful and educational manner.

**Recommended for:** Those wanting a balanced experience of spirituality and cultural exploration without rushing.`,
        shortDesc: 'Temple darshan + 1 night hotel + one side destination tour.',
        price: 7500,
        duration: '2 Days / 1 Night',
        bestFor: 'Couples, Small groups, First-time visitors',
        inclusions: [
          'Station pickup and drop (Rampurhat)',
          '1 night accommodation (budget/mid-range hotel)',
          'Breakfast at hotel',
          'Guided temple visit and darshan assistance',
          'One side destination tour (Birchandrapur OR Nitai Bari)',
          'Local transportation',
          'Refreshments during tours',
          'Travel insurance',
        ],
        exclusions: [
          'Lunch and dinner',
          'Personal expenses',
          'Special pooja arrangements',
          'Photography services',
          'Folklore night experience (available as add-on)',
        ],
        itinerary: {
          days: [
            {
              day: 1,
              title: 'Arrival & Temple Darshan',
              activities: [
                { time: '09:00 AM', activity: 'Pickup from Rampurhat station' },
                { time: '10:00 AM', activity: 'Check-in at hotel, freshen up' },
                { time: '11:30 AM', activity: 'Temple darshan and guided tour' },
                { time: '02:00 PM', activity: 'Lunch break' },
                { time: '04:00 PM', activity: 'Explore local market and temple surroundings' },
                { time: '06:30 PM', activity: 'Evening aarti at temple' },
                { time: '08:00 PM', activity: 'Return to hotel, dinner (self-arranged)' },
              ],
            },
            {
              day: 2,
              title: 'Side Destination & Departure',
              activities: [
                { time: '07:00 AM', activity: 'Breakfast at hotel' },
                { time: '08:30 AM', activity: 'Check-out and visit side destination' },
                { time: '12:00 PM', activity: 'Lunch break' },
                { time: '02:00 PM', activity: 'Return to Tarapith' },
                { time: '03:30 PM', activity: 'Drop at Rampurhat station' },
              ],
            },
          ],
        },
        images: [],
        featured: true,
        sortOrder: 2,
      },
    }),
    prisma.package.upsert({
      where: { slug: 'premium-tarapith' },
      update: {},
      create: {
        name: 'Premium Tarapith Experience',
        slug: 'premium-tarapith',
        description: `The ultimate Tarapith experience for those seeking deep immersion in the spiritual and cultural heritage of this mystical land.

Our Premium Package includes comfortable premium hotel accommodation, multiple side destination visits, and our exclusive **Guided Folklore Night Experience** - a respectful, storytelling-based night walk near the cremation grounds where you'll learn about the fascinating traditions, legends, and spiritual practices of Tarapith.

**⚠️ Important: The folklore experience is a guided cultural tour focused on history and storytelling. We strictly follow all local rules, maintain respectful distance from sacred areas, and operate only with proper permissions. No trespassing, occult practices, or disrespectful behavior. 18+ recommended.**

This premium package is designed for travelers who want the complete Tarapith experience with comfort and depth.`,
        shortDesc: 'Full experience with premium stay, multiple destinations, and guided folklore night walk.',
        price: 10000,
        duration: '3 Days / 2 Nights',
        bestFor: 'Groups, Adventure seekers, Cultural enthusiasts',
        inclusions: [
          'Station pickup and drop (Rampurhat)',
          '2 nights premium accommodation',
          'All meals (breakfast, lunch, dinner)',
          'Guided temple visit with special darshan assistance',
          'Multiple side destinations (Birchandrapur AND Nitai Bari)',
          'Guided Folklore Night Experience (cultural storytelling walk)',
          'All local transportation (AC vehicle)',
          'Dedicated guide throughout',
          'Refreshments and bottled water',
          'Travel insurance',
        ],
        exclusions: [
          'Personal expenses',
          'Special pooja arrangements (available on request)',
          'Professional photography/videography',
          'Alcoholic beverages',
        ],
        itinerary: {
          days: [
            {
              day: 1,
              title: 'Arrival & Temple Exploration',
              activities: [
                { time: '09:00 AM', activity: 'Pickup from Rampurhat station' },
                { time: '10:00 AM', activity: 'Check-in at premium hotel' },
                { time: '11:00 AM', activity: 'Freshen up, welcome refreshments' },
                { time: '12:30 PM', activity: 'Lunch at hotel' },
                { time: '02:30 PM', activity: 'Temple darshan with detailed guided tour' },
                { time: '05:30 PM', activity: 'Tea break, temple surroundings exploration' },
                { time: '07:00 PM', activity: 'Evening aarti at temple' },
                { time: '08:30 PM', activity: 'Dinner at hotel' },
              ],
            },
            {
              day: 2,
              title: 'Side Destinations & Folklore Night',
              activities: [
                { time: '07:30 AM', activity: 'Breakfast at hotel' },
                { time: '09:00 AM', activity: 'Visit Birchandrapur' },
                { time: '12:00 PM', activity: 'Lunch' },
                { time: '02:00 PM', activity: 'Visit Nitai Bari' },
                { time: '05:00 PM', activity: 'Return to hotel, rest' },
                { time: '07:00 PM', activity: 'Dinner' },
                { time: '09:00 PM', activity: 'Guided Folklore Night Experience (approx 2 hrs)' },
                { time: '11:00 PM', activity: 'Return to hotel' },
              ],
            },
            {
              day: 3,
              title: 'Morning Darshan & Departure',
              activities: [
                { time: '05:30 AM', activity: 'Early morning temple darshan (optional)' },
                { time: '07:30 AM', activity: 'Breakfast at hotel' },
                { time: '09:00 AM', activity: 'Check-out, free time for shopping' },
                { time: '11:00 AM', activity: 'Lunch (packed or local)' },
                { time: '01:00 PM', activity: 'Drop at Rampurhat station' },
              ],
            },
          ],
        },
        images: [],
        featured: true,
        sortOrder: 3,
      },
    }),
  ])
  console.log('✅ Packages created:', packages.length)

  // Create destinations
  const destinations = await Promise.all([
    prisma.destination.upsert({
      where: { slug: 'tarapith' },
      update: {},
      create: {
        name: 'Tarapith',
        slug: 'tarapith',
        description: `Tarapith is one of the most revered pilgrimage sites in India, located in the Birbhum district of West Bengal. It is home to the famous **Tarapith Kali Mandir**, one of the 51 Shakti Peethas where parts of Goddess Sati's body fell.

The temple houses the deity Tara Ma, a fierce form of the goddess who is worshipped with tantric rituals. The town is also famous for being the spiritual home of **Bamakhyapa**, a legendary saint and tantric practitioner who lived and performed sadhana at the cremation ground adjacent to the temple.

**Key Highlights:**
- Ancient Shakti Peetha temple dating back centuries
- Unique tantric worship traditions
- Samadhi (memorial) of Saint Bamakhyapa
- Vibrant spiritual atmosphere with continuous rituals

**Note:** The cremation ground (shamshan) is a sacred space used for traditional Hindu cremation. Visitors should maintain respectful distance and follow local guidelines.`,
        shortDesc: 'Sacred Shakti Peetha temple dedicated to Goddess Tara with rich tantric heritage.',
        distance: 'Main destination',
        travelTime: 'Starting point',
        highlights: [
          'Tarapith Kali Mandir - Shakti Peetha',
          'Bamakhyapa Samadhi',
          'Temple complex and sacred pond',
          'Traditional tantric rituals',
          'Spiritual market and local crafts',
        ],
        images: [],
        isPrimary: true,
        isSide: false,
        sortOrder: 1,
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'birchandrapur' },
      update: {},
      create: {
        name: 'Birchandrapur',
        slug: 'birchandrapur',
        description: `Birchandrapur (also spelled Birchandapur) is a small village near Tarapith known for its serene atmosphere and historical significance. The village has several old temples and is said to have been an important center for tantric practitioners in ancient times.

The area offers a peaceful contrast to the busy temple town of Tarapith, with scenic rural landscapes and traditional Bengali village life. Local guides share stories of saints and spiritual seekers who practiced meditation and sadhana in this quiet region.

**What to expect:**
- Quiet village atmosphere
- Small historic temples
- Scenic countryside views
- Stories of local saints and history
- Authentic rural Bengal experience`,
        shortDesc: 'Historic village with ancient temples and peaceful rural atmosphere.',
        distance: '~12 km from Tarapith',
        travelTime: '~25-30 minutes',
        highlights: [
          'Ancient village temples',
          'Rural Bengal scenery',
          'Historical significance',
          'Peaceful meditation spots',
          'Local village life experience',
        ],
        images: [],
        isPrimary: false,
        isSide: true,
        sortOrder: 2,
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'nitai-bari' },
      update: {},
      create: {
        name: 'Nitai Bari',
        slug: 'nitai-bari',
        description: `Nitai Bari (Nityananda's House) is a sacred site associated with Lord Nityananda, one of the principal associates of Sri Chaitanya Mahaprabhu and a key figure in the Gaudiya Vaishnava tradition.

According to tradition, this location has connections to Nityananda Prabhu's life and is visited by devotees of the Hare Krishna movement and other Vaishnava traditions. The site offers a different spiritual flavor compared to Tarapith's tantric traditions, showcasing the religious diversity of the Bengal region.

**What to expect:**
- Temple/site associated with Lord Nityananda
- Peaceful devotional atmosphere
- Vaishnava traditions and kirtan
- Beautiful natural surroundings
- Historical religious significance`,
        shortDesc: 'Sacred site associated with Lord Nityananda and Gaudiya Vaishnava tradition.',
        distance: '~15 km from Tarapith',
        travelTime: '~30-35 minutes',
        highlights: [
          'Nityananda Prabhu connection',
          'Gaudiya Vaishnava heritage',
          'Devotional atmosphere',
          'Traditional kirtan experience',
          'Scenic location',
        ],
        images: [],
        isPrimary: false,
        isSide: true,
        sortOrder: 3,
      },
    }),
  ])
  console.log('✅ Destinations created:', destinations.length)

  // Create add-ons
  const addOns = await Promise.all([
    prisma.addOn.upsert({
      where: { id: 'addon-extra-night' },
      update: {},
      create: {
        id: 'addon-extra-night',
        name: 'Extra Night Stay',
        description: 'Additional night at the hotel',
        price: 1500,
        category: 'accommodation',
        sortOrder: 1,
      },
    }),
    prisma.addOn.upsert({
      where: { id: 'addon-premium-hotel' },
      update: {},
      create: {
        id: 'addon-premium-hotel',
        name: 'Premium Hotel Upgrade',
        description: 'Upgrade to premium hotel with better amenities',
        price: 2000,
        category: 'accommodation',
        sortOrder: 2,
      },
    }),
    prisma.addOn.upsert({
      where: { id: 'addon-private-car' },
      update: {},
      create: {
        id: 'addon-private-car',
        name: 'Private AC Car',
        description: 'Dedicated private AC car for transportation',
        price: 1500,
        category: 'transport',
        sortOrder: 3,
      },
    }),
    prisma.addOn.upsert({
      where: { id: 'addon-special-pickup' },
      update: {},
      create: {
        id: 'addon-special-pickup',
        name: 'Airport/Special Station Pickup',
        description: 'Pickup from Kolkata airport or other distant stations',
        price: 3000,
        category: 'transport',
        sortOrder: 4,
      },
    }),
    prisma.addOn.upsert({
      where: { id: 'addon-folklore-experience' },
      update: {},
      create: {
        id: 'addon-folklore-experience',
        name: 'Guided Folklore Night Experience',
        description: 'Cultural storytelling walk near cremation grounds (18+ recommended, permissions obtained)',
        price: 1000,
        category: 'experience',
        sortOrder: 5,
      },
    }),
    prisma.addOn.upsert({
      where: { id: 'addon-side-destination' },
      update: {},
      create: {
        id: 'addon-side-destination',
        name: 'Additional Side Destination',
        description: 'Visit one more nearby destination',
        price: 800,
        category: 'experience',
        sortOrder: 6,
      },
    }),
    prisma.addOn.upsert({
      where: { id: 'addon-special-pooja' },
      update: {},
      create: {
        id: 'addon-special-pooja',
        name: 'Special Pooja Arrangement',
        description: 'Arranged special pooja at the temple with priest',
        price: 1100,
        category: 'experience',
        sortOrder: 7,
      },
    }),
    prisma.addOn.upsert({
      where: { id: 'addon-personal-guide' },
      update: {},
      create: {
        id: 'addon-personal-guide',
        name: 'Dedicated Personal Guide',
        description: 'Personal guide for your group throughout the trip',
        price: 1500,
        category: 'experience',
        sortOrder: 8,
      },
    }),
  ])
  console.log('✅ Add-ons created:', addOns.length)

  // Create FAQs
  const faqs = await Promise.all([
    prisma.fAQ.upsert({
      where: { id: 'faq-booking' },
      update: {},
      create: {
        id: 'faq-booking',
        question: 'How do I book a package?',
        answer: 'You can book by filling out the inquiry form on our website, calling us directly, or sending a WhatsApp message. We will contact you within 24 hours to confirm details and finalize your booking.',
        category: 'booking',
        sortOrder: 1,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-payment' },
      update: {},
      create: {
        id: 'faq-payment',
        question: 'What payment methods do you accept?',
        answer: 'We accept UPI payments, bank transfers, and cash on arrival. For advance bookings, we may require a 30% deposit which can be paid via UPI or bank transfer.',
        category: 'booking',
        sortOrder: 2,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-cancellation' },
      update: {},
      create: {
        id: 'faq-cancellation',
        question: 'What is your cancellation policy?',
        answer: 'Cancellations made 7+ days before the trip: Full refund minus processing fees. 3-7 days before: 50% refund. Less than 3 days: No refund. We recommend travel insurance for unexpected situations.',
        category: 'booking',
        sortOrder: 3,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-safety' },
      update: {},
      create: {
        id: 'faq-safety',
        question: 'Is the "haunted experience" safe?',
        answer: 'Yes, absolutely! Our folklore experience is a guided cultural and storytelling walk. We maintain respectful distance from sacred areas, follow all local rules, and operate with proper permissions. It is NOT about provoking spirits or occult practices - it is about learning the rich history and legends of Tarapith.',
        category: 'safety',
        sortOrder: 4,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-age-limit' },
      update: {},
      create: {
        id: 'faq-age-limit',
        question: 'Is there an age limit for the folklore night experience?',
        answer: 'We recommend participants be 18 years or older. The experience involves walking at night and hearing stories about death, cremation traditions, and local legends. Those with heart conditions, anxiety disorders, or those easily frightened should consider skipping this activity.',
        category: 'safety',
        sortOrder: 5,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-best-time' },
      update: {},
      create: {
        id: 'faq-best-time',
        question: 'What is the best time to visit Tarapith?',
        answer: 'Tarapith can be visited year-round. October to March offers pleasant weather. Special times include Kali Puja (October/November), Bengali New Year (April), and Tuesdays and Saturdays which are considered auspicious for Goddess Tara.',
        category: 'general',
        sortOrder: 6,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-reach' },
      update: {},
      create: {
        id: 'faq-reach',
        question: 'How do I reach Tarapith?',
        answer: 'The nearest railway station is Rampurhat (about 6 km from Tarapith). Trains run frequently from Kolkata (Sealdah). From Kolkata Airport, you can take a train or hire a car (approximately 5-6 hours drive).',
        category: 'general',
        sortOrder: 7,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-dress-code' },
      update: {},
      create: {
        id: 'faq-dress-code',
        question: 'Is there a dress code for the temple?',
        answer: 'Traditional/modest attire is recommended. For men: dhoti/kurta or full-length pants with a shirt. For women: saree, salwar kameez, or modest full-length outfits. Avoid shorts, sleeveless tops, and very tight/revealing clothing.',
        category: 'general',
        sortOrder: 8,
      },
    }),
    prisma.fAQ.upsert({
      where: { id: 'faq-photography' },
      update: {},
      create: {
        id: 'faq-photography',
        question: 'Is photography allowed?',
        answer: 'Photography is restricted inside the main temple and near the cremation grounds. Always follow guide instructions. Photography of rituals or other visitors without consent is discouraged. Drones are not permitted.',
        category: 'general',
        sortOrder: 9,
      },
    }),
  ])
  console.log('✅ FAQs created:', faqs.length)

  // Create testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.upsert({
      where: { id: 'testimonial-1' },
      update: {},
      create: {
        id: 'testimonial-1',
        name: 'Rajesh Kumar',
        location: 'Delhi',
        rating: 5,
        content: 'Amazing experience! The guide was very knowledgeable about the temple history. The folklore night walk was respectful and fascinating - learned so much about Bamakhyapa and local traditions. Highly recommended for anyone interested in spiritual tourism.',
        featured: true,
        approved: true,
        sortOrder: 1,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 'testimonial-2' },
      update: {},
      create: {
        id: 'testimonial-2',
        name: 'Priya Sharma',
        location: 'Kolkata',
        rating: 5,
        content: 'Perfect organization! Pickup from station was on time, hotel was clean and comfortable. The premium package was worth every rupee - visiting both Birchandrapur and Nitai Bari gave us a complete picture of the region spiritual heritage.',
        featured: true,
        approved: true,
        sortOrder: 2,
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 'testimonial-3' },
      update: {},
      create: {
        id: 'testimonial-3',
        name: 'Amit Das',
        location: 'Mumbai',
        rating: 4,
        content: 'Good experience overall. The temple visit was well-organized and the guide helped us understand the significance of the rituals. One suggestion: provide more water during summer visits. Otherwise excellent service!',
        featured: false,
        approved: true,
        sortOrder: 3,
      },
    }),
  ])
  console.log('✅ Testimonials created:', testimonials.length)

  // Create site settings
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Tarapith Haunted Travel Experience',
      tagline: 'Discover the Mystical Side of Tarapith',
      contactEmail: 'info@tarapith.travel',
      contactPhone: '+91 98765 43210',
      whatsappNumber: '+919876543210',
      address: 'Tarapith, Birbhum District, West Bengal, India - 731233',
      safetyDisclaimer: `⚠️ IMPORTANT SAFETY NOTICE ⚠️

Our "haunted experience" is a GUIDED FOLKLORE AND STORYTELLING NIGHT-WALK. It is designed to be respectful, safe, and permission-based.

WE DO NOT ENCOURAGE:
• Trespassing or entering restricted areas
• Unsafe or reckless behavior
• Disrespecting cremation grounds, graveyards, or sacred sites
• Any occult practices or attempts to "provoke spirits"

All tours operate with proper permissions and follow local rules. Photography may be restricted in certain areas. Please respect all guidelines provided by our guides.

AGE GUIDANCE: 18+ recommended
HEALTH WARNING: Not suitable for those with heart conditions, anxiety disorders, or those who are easily frightened

By booking with us, you acknowledge and accept these terms.`,
    },
  })
  console.log('✅ Site settings created')

  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📋 Login credentials:')
  console.log(`   Email: ${adminEmail}`)
  console.log(`   Password: ${adminPassword}`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
