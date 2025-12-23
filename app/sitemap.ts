import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careconnect-24-7.com'

  const routes = [
    '',
    '/medications',
    '/appointments',
    '/vitals',
    '/symptoms',
    '/health-records',
    '/caregivers',
    '/schedules',
    '/activities',
    '/family',
    '/residents',
    '/safety',
    '/caregiver-mobile',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}

