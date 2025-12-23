import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { FavoritesProvider } from '@/components/FavoritesContext'
import { DataProvider } from '@/components/DataContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CareConnect 24/7 - Simplify Your Health Management',
    template: '%s | CareConnect 24/7',
  },
  description: 'Simple, easy-to-use tools for active elderly people to manage medications, appointments, health records, and daily activities. Designed for seniors with large text, clear navigation, and intuitive interface.',
  keywords: [
    'elderly health management',
    'senior health app',
    'medication reminders',
    'health records for seniors',
    'elderly care app',
    'senior medication tracker',
    'health management for elderly',
    'elderly appointment tracker',
    'senior health records',
    'accessible health app',
  ],
  authors: [{ name: 'CareConnect 24/7' }],
  creator: 'CareConnect 24/7',
  publisher: 'CareConnect 24/7',
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://careconnect-24-7.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'CareConnect 24/7',
    title: 'CareConnect 24/7 - Simplify Your Health Management',
    description: 'Simple, easy-to-use tools for active elderly people to manage medications, appointments, health records, and daily activities.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CareConnect 24/7 - Health Management for Active Seniors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareConnect 24/7 - Simplify Your Health Management',
    description: 'Simple, easy-to-use tools for active elderly people to manage medications, appointments, and health records.',
    images: ['/og-image.png'],
    creator: '@careconnect247',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CareConnect 24/7',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careconnect-24-7.com'

  // Structured Data (JSON-LD) for better SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CareConnect 24/7',
    description: 'Simple, easy-to-use tools for active elderly people to manage medications, appointments, health records, and daily activities',
    url: baseUrl,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Medication reminders and tracking',
      'Appointment management',
      'Health records storage',
      'Vital signs tracking',
      'Symptom logging',
      'Family sharing',
    ],
    accessibilityFeature: [
      'largeText',
      'highContrast',
      'simpleNavigation',
      'clearLabels',
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Senior Citizens',
      geographicArea: {
        '@type': 'Country',
        name: 'United States',
      },
    },
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="canonical" href={baseUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <FavoritesProvider>
          <DataProvider>
            <Navigation />
            <main className="min-h-screen bg-senior-offwhite-50">
              <div className="py-8">
                {children}
              </div>
            </main>
          </DataProvider>
        </FavoritesProvider>
      </body>
    </html>
  )
}

