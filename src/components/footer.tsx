import { GoogleAnalytics } from '@next/third-parties/google'
export default function Footer() {
  return (
    <footer className="flex justify-center py-8 text-sm text-gray-600">
      &copy; {new Date().getFullYear()}
      <>
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ? (
          <>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID} />
          </>
        ) : null}
      </>
    </footer>
  )
}
