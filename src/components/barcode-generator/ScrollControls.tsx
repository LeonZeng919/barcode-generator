'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
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
import { useBarcodeContext } from './BarcodeContext'

const ScrollControls = ({
  outputRef,
}: {
  outputRef: React.RefObject<HTMLElement>
}) => {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(2)
  const [showSettings, setShowSettings] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const lastScrollTime = useRef(0)
  const animationFrameId = useRef<number | null>(null)
  const { output } = useBarcodeContext()

  useEffect(() => {
    const checkScrollable = () => {
      if (outputRef.current) {
        const isScrollable =
          outputRef.current.scrollHeight > outputRef.current.clientHeight
        setShowControls(isScrollable)
      }
    }

    checkScrollable()
    window.addEventListener('resize', checkScrollable)

    return () => {
      window.removeEventListener('resize', checkScrollable)
    }
  }, [outputRef, output])

  useEffect(() => {
    const scrollStep = (timestamp: number) => {
      if (!lastScrollTime.current) lastScrollTime.current = timestamp
      const deltaTime = timestamp - lastScrollTime.current
      const scrollAmount = (scrollSpeed * deltaTime) / 16 // 16ms is roughly one frame at 60fps

      if (outputRef.current) {
        outputRef.current.scrollTop += scrollAmount
        const { scrollTop, scrollHeight, clientHeight } = outputRef.current

        if (scrollTop + clientHeight >= scrollHeight) {
          setIsScrolling(false)
        } else if (isScrolling) {
          animationFrameId.current = requestAnimationFrame(scrollStep)
        }
      }

      lastScrollTime.current = timestamp
    }

    if (isScrolling) {
      lastScrollTime.current = 0
      animationFrameId.current = requestAnimationFrame(scrollStep)
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isScrolling, scrollSpeed, outputRef])

  const toggleScrolling = () => setIsScrolling(!isScrolling)

  const handleSpeedChange = (value: number[]) => setScrollSpeed(value[0])

  const scrollToTop = () => {
    setIsScrolling(false)
    if (outputRef.current) {
      outputRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const t = useTranslations('scroll')

  if (!showControls) return null

  return (
    <TooltipProvider>
      <div className="relative flex items-center space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" onClick={toggleScrolling} variant="ghost">
              {isScrolling ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{isScrolling ? t('pause-scroll') : t('start-scroll')}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" onClick={scrollToTop} variant="ghost">
              <ArrowUp className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t('to-top')}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              variant="ghost"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t('setting')}</p>
          </TooltipContent>
        </Tooltip>
        {showSettings && (
          <div className="absolute bottom-full right-0">
            <Slider
              orientation="horizontal"
              value={[scrollSpeed]}
              onValueChange={handleSpeedChange}
              max={10}
              step={1}
              className="h-4 w-24 rounded-lg border"
            />
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

export default ScrollControls
