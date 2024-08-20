'use client'
import React, { useState } from 'react'
import { BarcodeProvider } from './BarcodeContext'
import { BarcodeCarousel } from './BarcodeCarousel'
import {
  InputComponent,
  OptionsComponent,
  OutputComponent,
} from './BarcodeComponents'
import { useBarcodeGenerator } from './useBarcodeGenerator'
import { Locale } from '@/i18n'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable'
import { DownloadBarcodes } from './DownloadBarcodes'
import { Separator } from '../ui/separator'

const BarcodeGeneratorContent: React.FC = () => {
  useBarcodeGenerator()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const defaultLayout = [20, 50, 30]
  const navCollapsedSize = 4

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full max-h-[800px] items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={5}
        maxSize={22}
        onCollapse={() => setIsCollapsed(true)}
        onExpand={() => setIsCollapsed(false)}
      >
        <div className="p-4">
          <BarcodeCarousel isCollapsed={isCollapsed} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <div className="flex flex-col gap-4 p-4">
          <div>
            <InputComponent />
          </div>
          <div>
            <OutputComponent />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
        <div className="flex h-full flex-col p-4">
          <div className="">
            <OptionsComponent />
          </div>
          <div className="">
            <Separator className="my-4" />
            <DownloadBarcodes />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

const BarcodeGenerator: React.FC<{
  codeFormat: string
  initialData: string
  locale: Locale
}> = ({ codeFormat, initialData, locale }) => {
  return (
    <BarcodeProvider value={{ initCodeFormat: codeFormat, initialData }}>
      <div className="overflow-hidden rounded-[0.5rem] border shadow  dark:bg-slate-100 dark:text-slate-900">
        <BarcodeGeneratorContent />
      </div>
    </BarcodeProvider>
  )
}

export default BarcodeGenerator
