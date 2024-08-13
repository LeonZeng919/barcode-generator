'use client'

import { useEffect } from 'react'

type Props = {
  error: Error
  reset(): void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('Error details:', error)
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
  }, [error])

  return (
    <html>
      <body>
        <div>
          <h1>An error occurred</h1>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  )
}
