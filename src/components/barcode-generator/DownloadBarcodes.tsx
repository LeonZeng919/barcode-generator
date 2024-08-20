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
import JsBarcode from 'jsbarcode'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Download } from 'lucide-react'
import { ImageFormat } from '@/types/image'

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
        if (imageFormat === 'svg') {
          const svg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg',
          )
          JsBarcode(svg, value, {
            format: codeFormat.toUpperCase(),
            width: 2,
            height: barcodeHeight,
            displayValue: showText,
            font: 'Arial',
            fontSize: 20,
            textMargin: 2,
            margin: 10,
            background: '#ffffff',
          })
          svg.setAttribute('width', `${barcodeLength}`)
          svg.setAttribute('height', `${barcodeHeight}`)
          resolve(new XMLSerializer().serializeToString(svg))
        } else {
          const canvas = document.createElement('canvas')
          canvas.width = barcodeLength * scaleFactor
          canvas.height = barcodeHeight * scaleFactor

          JsBarcode(canvas, value, {
            format: codeFormat.toUpperCase(),
            width: 2 * scaleFactor,
            height: barcodeHeight * scaleFactor,
            displayValue: showText,
            font: 'Arial',
            fontSize: 20 * scaleFactor,
            textMargin: 2 * scaleFactor,
            margin: 10 * scaleFactor,
            background: '#ffffff',
          })

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
        FileSaver.saveAs(blob, `barcode-${codeFormat}.${imageFormat}`)
      } else {
        FileSaver.saveAs(
          barcodeData as Blob,
          `barcode-${codeFormat}.${imageFormat}`,
        )
      }
    } else {
      const zip = new JSZip()

      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        const barcodeData = await generateBarcode(value)
        if (imageFormat === 'svg') {
          zip.file(
            `barcode-${codeFormat}_${i + 1}.${imageFormat}`,
            barcodeData as string,
          )
        } else {
          zip.file(
            `barcode-${codeFormat}_${i + 1}.${imageFormat}`,
            barcodeData as Blob,
          )
        }
      }

      zip.generateAsync({ type: 'blob' }).then((content) => {
        FileSaver.saveAs(content, 'barcodes(barcode-maker).zip')
      })
    }
  }, [input, generateBarcode, imageFormat, codeFormat])

  return (
    <div className="flex flex-wrap items-center justify-center space-x-2 space-y-2">
      <Button
        size="lg"
        variant="outline"
        onClick={downloadBarcodes}
        title="download barcodes"
        className="h-10 border-none bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 px-6 text-white hover:from-blue-700 hover:via-purple-700 hover:to-red-700"
      >
        <Download className="mr-2 h-4 w-4" />
        <span className="text-sm">Download</span>
      </Button>
      <span className="text-sm"> as</span>
      <Select
        value={imageFormat}
        onValueChange={(value: ImageFormat) => setImageFormat(value)}
      >
        <SelectTrigger className="h-8 w-[70px] bg-white">
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
