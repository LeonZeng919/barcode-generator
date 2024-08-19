import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import bwipjs from 'bwip-js/browser'

interface BarcodeItemProps {
  value: string
  index: number
  showNumber: boolean
  codeFormat: string
  barcodeHeight: number
  showText: boolean
  barcodeLength: number
}

const BarcodeItemComponent: React.FC<BarcodeItemProps> = ({
  value,
  index,
  showNumber,
  codeFormat,
  barcodeHeight,
  showText,
  barcodeLength,
}) => {
  const [barcodeUrl, setBarcodeUrl] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const generateBarcode = () => {
      // 重置错误状态
      setError('')

      try {
        const canvas = document.createElement('canvas')
        bwipjs.toCanvas(canvas, {
          bcid: codeFormat.toLowerCase(),
          text: value,
          scale: 3,
          height: barcodeHeight / 3,
          includetext: showText,
          textxalign: 'center',
        })
        setBarcodeUrl(canvas.toDataURL('image/png'))
      } catch (err) {
        console.error('生成条形码时出错:', err)
        setError(`${err}`)
      }
    }

    generateBarcode()
  }, [value, codeFormat, barcodeHeight, showText])

  return (
    <div className="barcode-item mb-2 flex items-center">
      {showNumber && <span className="barcode-number mr-2">{index + 1}.</span>}
      <div className="barcode-canvas">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : barcodeUrl ? (
          <div
            style={{
              width: `${barcodeLength}px`,
              height: `${barcodeHeight}px`,
              position: 'relative',
            }}
          >
            <Image
              src={barcodeUrl}
              alt={`Barcode for ${value}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : (
          <p>generating...</p>
        )}
      </div>
    </div>
  )
}

export const BarcodeItem = React.memo(BarcodeItemComponent)
