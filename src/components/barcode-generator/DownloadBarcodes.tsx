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

  const generateBarcode = useCallback(
    (value: string): Promise<Blob> => {
      return new Promise((resolve) => {
        const scaleFactor = 1 // 增加缩放因子以提高清晰度
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
    },
    [barcodeLength, barcodeHeight, showText, codeFormat],
  )

  const downloadBarcodes = useCallback(async () => {
    const values = input.split('\n').filter((value) => value.trim() !== '')

    if (values.length === 1) {
      // 如果只有一个值，直接下载图片
      const barcodeBlob = await generateBarcode(values[0])
      FileSaver.saveAs(barcodeBlob, 'barcode.png')
    } else {
      // 如果有多个值，创建ZIP文件
      const zip = new JSZip()

      for (let i = 0; i < values.length; i++) {
        const value = values[i]
        const barcodeBlob = await generateBarcode(value)
        zip.file(`barcode_${i + 1}.png`, barcodeBlob)
      }

      zip.generateAsync({ type: 'blob' }).then((content) => {
        FileSaver.saveAs(content, 'barcodes.zip')
      })
    }
  }, [input, generateBarcode])

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
