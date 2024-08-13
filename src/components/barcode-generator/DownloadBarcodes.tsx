import React, { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useBarcodeContext } from './BarcodeContext'
import JsBarcode from 'jsbarcode'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Download } from 'lucide-react'

export const DownloadBarcodes: React.FC = () => {
  const { input, barcodeLength, barcodeHeight, showText, codeFormat } =
    useBarcodeContext()

  const downloadBarcodes = useCallback(async () => {
    const values = input.split('\n').filter((value) => value.trim() !== '')
    const zip = new JSZip()

    const generateBarcode = (value: string): Promise<Blob> => {
      return new Promise((resolve) => {
        const scaleFactor = 2 // 增加缩放因子以提高清晰度
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
          'image/png',
          1,
        ) // 使用最高质量设置
      })
    }

    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      const barcodeBlob = await generateBarcode(value)
      zip.file(`barcode_${i + 1}.png`, barcodeBlob)
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'barcodes.zip')
    })
  }, [input, barcodeHeight, showText, barcodeLength, codeFormat])

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={downloadBarcodes}
      title="下载条形码"
    >
      <Download className="h-5 w-5" />
    </Button>
  )
}
