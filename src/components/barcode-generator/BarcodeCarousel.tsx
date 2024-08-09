'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { barcodeTypes } from '@/config/barcode-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

export function BarcodeCarousel() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1]
  const currentCodeFormat = pathname.split('/')[2]

  const [selectedIndex, setSelectedIndex] = useState(() => {
    const flattenedTypes = barcodeTypes.flatMap((category, index) =>
      category.types.map((type) => ({ ...type, categoryIndex: index })),
    )
    const typeIndex = flattenedTypes.findIndex(
      (type) => type.value?.toUpperCase() === currentCodeFormat?.toUpperCase(),
    )
    return typeIndex !== -1 ? flattenedTypes[typeIndex].categoryIndex : 0
  })

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-4">
        {barcodeTypes.map((category, index) => (
          <CarouselItem
            key={category.name}
            className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-1/6"
          >
            <Link
              href={`/${locale}/${category.types[0].value}`}
              onClick={() => setSelectedIndex(index)}
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
                  <p className="mt-2 text-sm text-gray-600">
                    {category.types[0].name}
                  </p>
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
