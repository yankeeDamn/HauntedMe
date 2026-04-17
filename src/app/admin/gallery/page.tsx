import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Image, Plus, Upload, Camera } from 'lucide-react'

export default async function AdminGalleryPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
              <p className="text-gray-600">Manage photos shown on your website</p>
            </div>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          </div>

          <Card>
            <CardContent className="py-16 text-center">
              <Camera className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">No images uploaded yet</h3>
              <p className="text-muted-foreground mb-6">
                Upload photos from your tours to showcase on the website gallery.
              </p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Your First Image
              </Button>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-2">📸 Image Guidelines</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Use high-quality images (minimum 1200x800 pixels)</li>
              <li>• Ensure you have permission to use all images</li>
              <li>• Avoid images with identifiable faces without consent</li>
              <li>• Do not upload images from restricted areas (inside temple, cremation grounds)</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
