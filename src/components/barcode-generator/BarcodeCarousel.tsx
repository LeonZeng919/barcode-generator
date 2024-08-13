'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { barcodeTypes } from '@/config/barcode-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

export function BarcodeCarousel() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1]
  const currentCodeFormat = pathname.split('/')[2]

  const [api, setApi] = useState<CarouselApi>()

  const { initialIndex, flattenedTypes } = useMemo(() => {
    const flattenedTypes = barcodeTypes.flatMap((category, index) =>
      category.types.map((type) => ({ ...type, categoryIndex: index })),
    )
    const typeIndex = flattenedTypes.findIndex(
      (type) => type.value?.toUpperCase() === currentCodeFormat?.toUpperCase(),
    )
    const initialIndex =
      typeIndex !== -1 ? flattenedTypes[typeIndex].categoryIndex : 0
    return { initialIndex, flattenedTypes }
  }, [currentCodeFormat])

  const [selectedIndex, setSelectedIndex] = useState(initialIndex)

  useEffect(() => {
    if (!api) return
    api.scrollTo(initialIndex, true)
  }, [api, initialIndex])

  return (
    <Carousel setApi={setApi} className="w-full" opts={{ align: 'center' }}>
      <CarouselContent className="-ml-4">
        {barcodeTypes.map((category, index) => (
          <CarouselItem
            key={category.name}
            className="basis-1/2 pl-4 sm:basis-1/3 "
          >
            <Link
              href={`/${locale}/${category.types[0].value}`}
              onClick={() => {
                setSelectedIndex(index)
                api?.scrollTo(index, true)
              }}
              id={`barcode-category-${index}`}
            >
              <Card
                className={`h-full transition-colors duration-300 ${
                  selectedIndex === index
                    ? 'bg-[#00b3f0] bg-opacity-10'
                    : 'hover:bg-gray-100'
                }`}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <h2
                    className={`text-lg font-semibold ${
                      selectedIndex === index ? 'text-[#00b3f0]' : ''
                    }`}
                  >
                    {category.name}
                  </h2>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
