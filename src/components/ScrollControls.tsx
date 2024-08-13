'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Play, Pause, ArrowUp, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'

const AutoScrollComponent = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(1)
  const [showButton, setShowButton] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const checkScrollable = useCallback(() => {
    const body = document.body
    const html = document.documentElement
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    )
    setShowButton(height > window.innerHeight)
  }, [])

  useEffect(() => {
    checkScrollable()
    window.addEventListener('resize', checkScrollable)
    return () => window.removeEventListener('resize', checkScrollable)
  }, [checkScrollable])

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout
    if (isScrolling) {
      scrollInterval = setInterval(() => {
        window.scrollBy(0, scrollSpeed)
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          setIsScrolling(false)
        }
      }, 20)
    }
    return () => clearInterval(scrollInterval)
  }, [isScrolling, scrollSpeed])

  const toggleScrolling = () => setIsScrolling(!isScrolling)

  const handleSpeedChange = (value: number[]) => setScrollSpeed(value[0])

  const scrollToTop = () => {
    setIsScrolling(false)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const t = useTranslations('scroll')

  if (!showButton) return null
  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 flex flex-col items-center space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={toggleScrolling}
              className="h-10 w-10 rounded-full bg-white shadow-lg hover:bg-gray-100"
              variant="outline"
            >
              {isScrolling ? (
                <Pause className="text-gray-700" size={20} />
              ) : (
                <Play className="text-gray-700" size={20} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isScrolling ? t('pause-scroll') : t('start-scroll')}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full bg-white shadow-lg hover:bg-gray-100"
              variant="outline"
            >
              <ArrowUp className="text-gray-700" size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{t('to-top')}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="h-10 w-10 rounded-full bg-white shadow-lg hover:bg-gray-100"
              variant="outline"
            >
              <Settings className="text-gray-700" size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{t('setting')}</p>
          </TooltipContent>
        </Tooltip>
        {showSettings && (
          <div className="rounded-lg bg-white p-2 shadow-lg">
            <Slider
              orientation="vertical"
              value={[scrollSpeed]}
              onValueChange={handleSpeedChange}
              max={10}
              step={1}
              className="h-24"
            />
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

export default AutoScrollComponent
