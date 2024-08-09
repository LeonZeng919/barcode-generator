import { barcodeTypes } from '@/config/barcode-types'
import React, { createContext, useState, useContext, useMemo } from 'react'

interface BarcodeContextType {
  input: string
  setInput: (input: string) => void
  output: string
  setOutput: (output: string) => void
  barcodeLength: number
  setBarcodeLength: (length: number) => void
  barcodeHeight: number
  setBarcodeHeight: (height: number) => void
  showText: boolean
  setShowText: (show: boolean) => void
  showOptions: boolean
  setShowOptions: (show: boolean) => void
  hasOverflow: boolean
  setHasOverflow: (overflow: boolean) => void
  codeFormat: string
  setCodeFormat: (format: string) => void
}

const BarcodeContext = createContext<BarcodeContextType | undefined>(undefined)

export const BarcodeProvider: React.FC<{
  children: React.ReactNode
  value: {
    initCodeFormat: string
    initialData: string
  }
}> = ({ children, value: { initCodeFormat, initialData } }) => {
  const initData =
    barcodeTypes
      .flatMap((barcode) => barcode.types)
      .findLast((barcode) => barcode.value === initCodeFormat)?.initData || ''

  const [input, setInput] = useState<string>(initData)
  const [output, setOutput] = useState<string>('')
  const [barcodeLength, setBarcodeLength] = useState<number>(200)
  const [barcodeHeight, setBarcodeHeight] = useState<number>(60)
  const [showText, setShowText] = useState<boolean>(true)
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [hasOverflow, setHasOverflow] = useState<boolean>(false)
  const [codeFormat, setCodeFormat] = useState(initCodeFormat)

  const value = useMemo(
    () => ({
      input,
      setInput,
      output,
      setOutput,
      barcodeLength,
      setBarcodeLength,
      barcodeHeight,
      setBarcodeHeight,
      showText,
      setShowText,
      showOptions,
      setShowOptions,
      hasOverflow,
      setHasOverflow,
      codeFormat,
      setCodeFormat,
    }),
    [
      input,
      output,
      barcodeLength,
      barcodeHeight,
      showText,
      showOptions,
      hasOverflow,
      codeFormat,
    ],
  )

  return (
    <BarcodeContext.Provider value={value}>{children}</BarcodeContext.Provider>
  )
}

export const useBarcodeContext = () => {
  const context = useContext(BarcodeContext)
  if (context === undefined) {
    throw new Error('useBarcodeContext must be used within a BarcodeProvider')
  }
  return context
}
