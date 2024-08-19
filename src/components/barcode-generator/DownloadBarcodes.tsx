import React, { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBarcodeContext } from './BarcodeContext'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Download } from 'lucide-react'
import { ImageFormat } from '@/types/image'
import bwipjs, { RenderOptions } from 'bwip-js/browser'

export const DownloadBarcodes: React.FC = () => {
  const {
    input,
    barcodeLength,
    barcodeHeight,
    showText,
    codeFormat,
    imageFormat,
    setImageFormat,
  } = useBarcodeContext()

  const generateBarcode = useCallback(
    (value: string): Promise<Blob | string> => {
      return new Promise((resolve) => {
        const scaleFactor = 1
        const options: RenderOptions = {
          bcid: codeFormat.toLowerCase(),
          text: value,
          scale: 3,
          height: barcodeHeight / 3,
          includetext: showText,
          textxalign: 'center',
          backgroundcolor: '#ffffff',
        }
        if (imageFormat === 'svg') {
          const svg = bwipjs.toSVG(options)
          resolve(svg)
        } else {
          const canvas = document.createElement('canvas')
          canvas.width = barcodeLength * scaleFactor
          canvas.height = barcodeHeight * scaleFactor
          bwipjs.toCanvas(canvas, options)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob)
              }
            },
            `image/${imageFormat}`,
            imageFormat === 'jpg' ? 0.9 : 1,
          )
        }
      })
    },
    [barcodeLength, barcodeHeight, showText, codeFormat, imageFormat],
  )

  const downloadBarcodes = useCallback(async () => {
    const values = input.split('\n').filter((value) => value.trim() !== '')

    if (values.length === 1) {
      const barcodeData = await generateBarcode(values[0])
      if (imageFormat === 'svg') {
        const blob = new Blob([barcodeData as string], {
          type: 'image/svg+xml;charset=utf-8',
        })
        FileSaver.saveAs(blob, `barcode.${imageFormat}`)
      } else {
        FileSaver.saveAs(barcodeData as Blob, `barcode.${imageFormat}`)
      }
    } else {
      const zip = new JSZip()

      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        const barcodeData = await generateBarcode(value)
        if (imageFormat === 'svg') {
          zip.file(
            `barcode_${i + 1}(barcode-maker).${imageFormat}`,
            barcodeData as string,
          )
        } else {
          zip.file(
            `barcode_${i + 1}(barcode-maker).${imageFormat}`,
            barcodeData as Blob,
          )
        }
      }

      zip.generateAsync({ type: 'blob' }).then((content) => {
        FileSaver.saveAs(content, 'barcodes(barcode-maker).zip')
      })
    }
  }, [input, generateBarcode, imageFormat])

  return (
    <div className="flex items-center space-x-2">
      <Button
        size="sm"
        variant="outline"
        onClick={downloadBarcodes}
        title="Download Barcodes"
        className="h-8 px-3"
      >
        <Download className="mr-2 h-4 w-4" />
        <span className="text-sm">Download</span>
      </Button>
      <span className="text-sm"> as</span>
      <Select
        value={imageFormat}
        onValueChange={(value: ImageFormat) => setImageFormat(value)}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder="Format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="png">PNG</SelectItem>
          <SelectItem value="jpg">JPG</SelectItem>
          <SelectItem value="gif">GIF</SelectItem>
          <SelectItem value="svg">SVG</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
