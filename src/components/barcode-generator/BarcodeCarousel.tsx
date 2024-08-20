'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { barcodeTypes } from '@/config/barcode-types'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Separator } from '../ui/separator'
import { useTranslations } from 'next-intl'
import { Search } from 'lucide-react' // Added this line for the search icon

interface BarcodeCarouselProps {
  isCollapsed: boolean
}

export function BarcodeCarousel({ isCollapsed }: BarcodeCarouselProps) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1]
  const currentCodeFormat = pathname.split('/')[2]

  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredTypes = useMemo(() => {
    return barcodeTypes
      .map((category) => ({
        ...category,
        types: category.types.filter(
          (type) =>
            (type.name?.toLowerCase() || '').includes(
              searchTerm.toLowerCase(),
            ) ||
            (type.value?.toLowerCase() || '').includes(
              searchTerm.toLowerCase(),
            ),
        ),
      }))
      .filter((category) => category.types.length > 0)
  }, [searchTerm])

  const t = useTranslations('Barcode')

  return (
    <div className={cn('flex-1 ', isCollapsed && 'hidden')}>
      <span className="label-text text-lg font-semibold">
        {t('select-format.name')}
      </span>
      <Separator className="my-2" />
      <div className="relative my-4">
        <Input
          type="text"
          placeholder={t('select-format.search-placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white pl-10"
        />
        <Search className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
      <ScrollArea className=" h-[calc(82vh-6rem)] pr-3">
        <nav>
          {filteredTypes.map((category, index) => (
            <div key={category.name} className="mb-4">
              <h3 className="px-3 py-2 text-sm font-medium text-gray-500">
                {category.name}
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                {category.types.map((type) => (
                  <li key={type.value}>
                    <Link href={`/${locale}/${type.value}`}>
                      <Card
                        className={cn(
                          'flex flex-col items-center justify-center bg-gray-100 p-1 text-gray-700 transition-colors',
                          currentCodeFormat?.toUpperCase() ===
                            type.value.toUpperCase()
                            ? 'bg-indigo-600 text-white' // Changed to blue-purple background and white text
                            : 'hover:bg-indigo-600 hover:text-white',
                        )}
                      >
                        <div className="relative flex h-12 w-full items-center justify-center">
                          <Image
                            src={`/barcode/barcode-${type.value}.svg`}
                            alt="Barcode icon"
                            fill
                            className="mt-1 h-12 w-12"
                          />
                        </div>
                        <h4 className="text-center text-sm font-medium">
                          {type.name}
                        </h4>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
