'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Play, Pause, ArrowUp } from 'lucide-react'

interface AutoScrollProps {
  targetRef: React.RefObject<HTMLElement>
}

const AutoScroll: React.FC<AutoScrollProps> = ({ targetRef }) => {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(1)
  const [showToTop, setShowToTop] = useState(false)
  const animationFrameRef = useRef<number | null>(null)

  const scroll = useCallback(() => {
    if (targetRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = targetRef.current
      if (scrollTop + clientHeight >= scrollHeight) {
        stopScroll()
        setShowToTop(true)
        return
      }
      targetRef.current.scrollTop += scrollSpeed
      animationFrameRef.current = requestAnimationFrame(scroll)
    }
  }, [targetRef, scrollSpeed])

  const startScroll = useCallback(() => {
    if (!animationFrameRef.current) {
      setIsScrolling(true)
      setShowToTop(false)
      animationFrameRef.current = requestAnimationFrame(scroll)
    }
  }, [scroll])

  const stopScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    setIsScrolling(false)
  }, [])

  const toggleScroll = () => {
    if (isScrolling) {
      stopScroll()
    } else {
      startScroll()
    }
  }

  const scrollToTop = () => {
    if (targetRef.current) {
      targetRef.current.scrollTop = 0
      setShowToTop(false)
    }
  }

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isScrolling) {
      stopScroll()
      startScroll()
    }
  }, [scrollSpeed, isScrolling, stopScroll, startScroll])

  return (
    <div className="flex items-center space-x-2">
      <Button
        size="sm"
        variant={isScrolling ? 'secondary' : 'outline'}
        onClick={toggleScroll}
        disabled={showToTop}
      >
        {isScrolling ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
        <span className="ml-2">{isScrolling ? 'Stop' : 'Auto scroll'}</span>
      </Button>
      <Input
        type="number"
        min="0.1"
        max="10"
        step="0.1"
        value={scrollSpeed}
        onChange={(e) => setScrollSpeed(Number(e.target.value))}
        className="h-8 w-16"
      />
      <span className="text-sm">px/frame</span>
      {showToTop && (
        <Button size="sm" variant="outline" onClick={scrollToTop}>
          <ArrowUp className="h-4 w-4" />
          <span className="ml-2">Top</span>
        </Button>
      )}
    </div>
  )
}

export default AutoScroll
