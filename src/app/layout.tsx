import '@/styles/globals.css'

// RootLayout is mandatory for app dir, but it is effectively returning just the children
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
