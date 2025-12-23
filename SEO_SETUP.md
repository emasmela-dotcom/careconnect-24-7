# SEO Setup Guide for CareConnect 24/7

## ✅ What's Been Configured

### 1. **Metadata & Meta Tags** (`app/layout.tsx`)
- ✅ Title with template support
- ✅ Comprehensive description
- ✅ Keywords for search engines
- ✅ Open Graph tags for social sharing (Facebook, LinkedIn)
- ✅ Twitter Card metadata
- ✅ Canonical URLs
- ✅ Robots meta tags
- ✅ Search engine verification support

### 2. **Structured Data (JSON-LD)**
- ✅ Schema.org WebApplication markup
- ✅ Accessibility features
- ✅ Audience targeting
- ✅ Feature list

### 3. **Sitemap** (`app/sitemap.ts`)
- ✅ Automatic sitemap generation
- ✅ All main routes included
- ✅ Priority and change frequency set
- ✅ Accessible at `/sitemap.xml`

### 4. **Robots.txt** (`app/robots.ts` & `public/robots.txt`)
- ✅ Allows all search engines
- ✅ Blocks API and internal routes
- ✅ Points to sitemap

### 5. **Manifest** (`public/manifest.json`)
- ✅ Updated for personal health management
- ✅ PWA-ready

## 🔧 Environment Variables Needed

Create a `.env.local` file in the root directory:

```env
# Required: Your actual domain URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: Search Engine Verification Codes
# Get these from:
# - Google Search Console: https://search.google.com/search-console
# - Yandex Webmaster: https://webmaster.yandex.com
# - Yahoo Site Explorer: https://search.yahoo.com/webmaster

NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code
NEXT_PUBLIC_YANDEX_VERIFICATION=your-yandex-verification-code
NEXT_PUBLIC_YAHOO_VERIFICATION=your-yahoo-verification-code
```

## 📝 Adding Page-Specific Metadata

For server component pages, add metadata export:

```typescript
// app/medications/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Medications',
  description: 'Manage your medications with reminders, schedules, and pill photos',
  openGraph: {
    title: 'My Medications - CareConnect 24/7',
    description: 'Manage your medications with reminders, schedules, and pill photos',
  },
}

export default function MedicationsPage() {
  // ... your component
}
```

For client components (like the home page), metadata is inherited from the layout.

## 🖼️ Social Media Images

Create an Open Graph image at `public/og-image.png`:
- **Size**: 1200x630 pixels
- **Format**: PNG or JPG
- **Content**: Should include "CareConnect 24/7" branding

## 🔍 SEO Checklist

### Before Launch:
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your actual domain
- [ ] Create and upload `public/og-image.png` (1200x630px)
- [ ] Verify all pages have unique, descriptive titles
- [ ] Test sitemap at `/sitemap.xml`
- [ ] Test robots.txt at `/robots.txt`
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Add verification codes to `.env.local`

### After Launch:
- [ ] Monitor Google Search Console for errors
- [ ] Check page speed with Google PageSpeed Insights
- [ ] Verify mobile-friendliness
- [ ] Test structured data with Google Rich Results Test
- [ ] Monitor Core Web Vitals

## 🚀 Testing SEO

1. **Test Sitemap**: Visit `http://localhost:3002/sitemap.xml`
2. **Test Robots**: Visit `http://localhost:3002/robots.txt`
3. **Test Structured Data**: Use [Google Rich Results Test](https://search.google.com/test/rich-results)
4. **Test Meta Tags**: Use [Meta Tags Preview](https://metatags.io/)

## 📊 Key SEO Features

- **Mobile-First**: Responsive design optimized for mobile
- **Accessibility**: Large text, high contrast, clear navigation
- **Fast Loading**: Optimized Next.js build
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: All images should have descriptive alt text
- **Internal Linking**: Clear navigation structure

## 🔗 Important URLs

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Manifest: `/manifest.json`

## 📚 Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

