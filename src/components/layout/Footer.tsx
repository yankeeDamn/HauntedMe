import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">Tarapith Travel</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Experience the mystical side of Tarapith with our guided tours. 
              Respectful, safe, and permission-based cultural experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" 
                 className="text-muted-foreground hover:text-amber-500 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-amber-500">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/packages" className="text-sm text-muted-foreground hover:text-amber-500">Packages</Link></li>
              <li><Link href="/destinations" className="text-sm text-muted-foreground hover:text-amber-500">Destinations</Link></li>
              <li><Link href="/customize" className="text-sm text-muted-foreground hover:text-amber-500">Customize Trip</Link></li>
              <li><Link href="/itinerary" className="text-sm text-muted-foreground hover:text-amber-500">Sample Itinerary</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-amber-500">FAQ & Safety</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-amber-500">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 text-amber-500" />
                <a href="tel:+919876543210" className="hover:text-amber-500">+91 98765 43210</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 text-amber-500" />
                <a href="mailto:info@tarapith.travel" className="hover:text-amber-500">info@tarapith.travel</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-amber-500" />
                <span>Tarapith, Birbhum District,<br />West Bengal, India - 731233</span>
              </li>
            </ul>
          </div>

          {/* Safety Notice */}
          <div>
            <h4 className="font-semibold mb-4 text-amber-500">Safety Notice</h4>
            <p className="text-xs text-muted-foreground">
              Our &quot;haunted experience&quot; is a guided folklore night-walk focused on storytelling and cultural heritage. 
              We do NOT encourage trespassing, unsafe behavior, or disrespecting sacred sites. 
              18+ recommended. Not suitable for those with heart conditions or anxiety.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Tarapith Haunted Travel Experience. All rights reserved.</p>
          <p className="mt-2 text-xs">
            All tours operate with proper permissions and follow local rules.
          </p>
        </div>
      </div>
    </footer>
  )
}
