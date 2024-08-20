'use client'
import React, { useState, useEffect } from 'react'
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
import { Button } from '../ui/button'
import { Menu, Sliders } from 'lucide-react'

const BarcodeGeneratorContent: React.FC = () => {
  useBarcodeGenerator()

  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [activePanel, setActivePanel] = useState<
    'main' | 'carousel' | 'options'
  >('main')
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false)
  const defaultLayout = [20, 50, 30]
  const navCollapsedSize = 4

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const togglePanel = (panel: 'carousel' | 'options') => {
    setActivePanel(activePanel === panel ? 'main' : panel)
  }

  if (isSmallScreen) {
    return (
      <div className="flex h-full max-h-[800px] flex-col">
        <div className="flex items-center justify-between p-2">
          <Button
            onClick={() => togglePanel('carousel')}
            variant="ghost"
            size="icon"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => togglePanel('options')}
            variant="ghost"
            size="icon"
          >
            <Sliders className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-grow overflow-auto">
          {activePanel === 'main' && (
            <div className="flex flex-col gap-4 p-4">
              <InputComponent />
              <OutputComponent />
              <DownloadBarcodes />
            </div>
          )}
          {activePanel === 'carousel' && (
            <div className="p-4">
              <BarcodeCarousel isCollapsed={false} />
            </div>
          )}
          {activePanel === 'options' && (
            <div className="p-4">
              <OptionsComponent />
            </div>
          )}
        </div>
      </div>
    )
  }

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
        onCollapse={() => setIsLeftPanelCollapsed(true)}
        onExpand={() => setIsLeftPanelCollapsed(false)}
      >
        <div className="p-4">
          <BarcodeCarousel isCollapsed={isLeftPanelCollapsed} />
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
      <div className="container overflow-hidden rounded-[0.5rem] border shadow dark:bg-slate-100 dark:text-slate-900">
        <BarcodeGeneratorContent />
      </div>
    </BarcodeProvider>
  )
}

export default BarcodeGenerator
