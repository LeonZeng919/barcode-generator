'use client'
import { barcodeTypes } from '@/config/barcode-types'
import { ImageFormat } from '@/types/image'
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react'

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
  codeFormat: string
  setCodeFormat: (format: string) => void
  imageFormat: ImageFormat
  setImageFormat: (format: ImageFormat) => void
}

interface SavedState {
  barcodeLength: number
  barcodeHeight: number
  showText: boolean
  imageFormat: ImageFormat
}

const BarcodeContext = createContext<BarcodeContextType | undefined>(undefined)

const LOCAL_STORAGE_KEY = 'barcodeSettings'

const saveStateToLocalStorage = (state: SavedState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
}

const getStateFromLocalStorage = (): SavedState | null => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY)
    return savedState ? JSON.parse(savedState) : null
  }
  return null
}

export const BarcodeProvider: React.FC<{
  children: React.ReactNode
  value: {
    initCodeFormat: string
    initialData: string
  }
}> = ({ children, value: { initCodeFormat, initialData } }) => {
  const savedState = getStateFromLocalStorage()

  const initData =
    initialData ||
    barcodeTypes
      .flatMap((barcode) => barcode.types)
      .findLast((barcode) => barcode.value === initCodeFormat)?.initData ||
    ''

  const [input, setInput] = useState<string>(initData)
  const [output, setOutput] = useState<string>('')
  const [barcodeLength, setBarcodeLength] = useState<number>(
    savedState?.barcodeLength || 200,
  )
  const [barcodeHeight, setBarcodeHeight] = useState<number>(
    savedState?.barcodeHeight || 60,
  )
  const [showText, setShowText] = useState<boolean>(
    savedState?.showText ?? true,
  )
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [codeFormat, setCodeFormat] = useState(initCodeFormat)
  const [imageFormat, setImageFormat] = useState<ImageFormat>(
    savedState?.imageFormat || 'png',
  )

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
      codeFormat,
      setCodeFormat,
      imageFormat,
      setImageFormat,
    }),
    [
      input,
      output,
      barcodeLength,
      barcodeHeight,
      showText,
      showOptions,
      codeFormat,
      imageFormat,
    ],
  )

  useEffect(() => {
    saveStateToLocalStorage({
      barcodeLength,
      barcodeHeight,
      showText,
      imageFormat,
    })
  }, [barcodeLength, barcodeHeight, showText, imageFormat])

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
