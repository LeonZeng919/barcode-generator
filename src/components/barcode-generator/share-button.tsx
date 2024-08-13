import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Share2 } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  Dialog,
  DialogContent,
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
  const { input } = useBarcodeContext()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const generateShareLink = () => {
    const currentData = input
    const baseUrl = window.location.origin + pathname
    const shareUrl = `${baseUrl}?data=${encodeURIComponent(currentData)}`
    return shareUrl
  }

  const handleCopy = () => {
    const shareLink = generateShareLink()
    navigator.clipboard.writeText(shareLink)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className} size={size}>
          <Share2 className="mr-2 h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input className="flex-1" value={generateShareLink()} readOnly />
          <Button onClick={handleCopy}>Copy</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
