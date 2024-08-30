import { useCallback, useEffect } from 'react'
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
      const barcodes = values.map((value) => {
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

        return `<div class="barcode-item">${svg.outerHTML}</div>`
      })

      setOutput(barcodes) // Changed: Now setting an array of strings
    } catch (error) {
      console.error('Error generating barcodes:', error)
      setOutput([
        `<p>Error generating barcodes. ${error}, Please check your input and selected format.</p>`,
      ]) // Changed: Now setting an array with a single error message
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
