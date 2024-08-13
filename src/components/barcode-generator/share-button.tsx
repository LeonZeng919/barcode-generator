import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Share2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useBarcodeContext } from './BarcodeContext'

interface ShareButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  variant,
  className,
  size,
}) => {
  const { input, codeFormat } = useBarcodeContext()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const generateShareLink = () => {
    const currentData = input
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL + pathname
    const shareUrl = `${baseUrl}?data=${encodeURIComponent(currentData)}`
    return shareUrl
  }

  const generateBarcodeLink = () => {
    const currentData = input
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    return `${baseUrl}/api/barcode/${codeFormat}/${encodeURIComponent(currentData)}`
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className} size={size}>
          <Copy className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Copy Barcode Link</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">
              Link to This Barcode Image
            </p>
            <div className="flex items-center space-x-2">
              <Input
                className="flex-1"
                value={generateBarcodeLink()}
                readOnly
              />
              <Button onClick={() => handleCopy(generateBarcodeLink())}>
                Copy
              </Button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Link to This Page</p>
            <div className="flex items-center space-x-2">
              <Input className="flex-1" value={generateShareLink()} readOnly />
              <Button onClick={() => handleCopy(generateShareLink())}>
                Copy
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
