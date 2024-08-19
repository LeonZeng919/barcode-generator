import { useEffect, useState } from 'react'
import { useBarcodeContext } from './BarcodeContext'

export const useBarcodeGenerator = () => {
  const { input, barcodeLength, barcodeHeight, showText, codeFormat } =
    useBarcodeContext()
  const [barcodes, setBarcodes] = useState<string[]>([])

  useEffect(() => {
    const values = input.split('\n').filter((value) => value.trim() !== '')
    setBarcodes(values)
  }, [input])
  return { barcodes, barcodeLength, barcodeHeight, showText, codeFormat }
}
