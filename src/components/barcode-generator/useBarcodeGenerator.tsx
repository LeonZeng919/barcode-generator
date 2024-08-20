import { useCallback, useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'
import { useBarcodeContext } from './BarcodeContext'

export const useBarcodeGenerator = () => {
  const {
    input,
    setOutput,
    barcodeLength,
    barcodeHeight,
    showText,
    codeFormat,
    barcodeMargin,
  } = useBarcodeContext()

  const generateBarcodes = useCallback(() => {
    const values = input.split('\n').filter((value) => value.trim() !== '')

    try {
      const barcodes = values.map((value, index) => {
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
          fontSize: 15,
          margin: barcodeMargin,
        })
        svg.setAttribute('width', `${barcodeLength}`)

        const numberSpan =
          values.length > 1
            ? `<span class="barcode-number mr-2">${index + 1}.</span>`
            : ''

        return `<div class="barcode-item flex items-center mb-2">
          ${numberSpan}
          <div class="barcode-svg">${svg.outerHTML}</div>
        </div>`
      })

      setOutput(barcodes.join(''))
    } catch (error) {
      console.error('Error generating barcodes:', error)
      setOutput(
        `<p>Error generating barcodes.${error}, Please check your input and selected format.</p>`,
      )
    }
  }, [
    input,
    setOutput,
    codeFormat,
    barcodeHeight,
    showText,
    barcodeMargin,
    barcodeLength,
  ])

  useEffect(() => {
    generateBarcodes()
  }, [generateBarcodes])

  return { generateBarcodes }
}
