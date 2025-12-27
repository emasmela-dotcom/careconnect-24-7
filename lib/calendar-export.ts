// Calendar Export Utility
// Generates .ics files for Google Calendar, Apple Calendar, etc.

export interface CalendarEvent {
  title: string
  description: string
  startDate: Date
  endDate?: Date
  location?: string
  url?: string
}

// Generate .ics file content
export function generateICS(events: CalendarEvent[]): string {
  const now = new Date()
  const timestamp = formatDate(now)
  
  let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CareConnect 24/7//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`
  
  events.forEach((event, index) => {
    const uid = `careconnect-${Date.now()}-${index}@careconnect.local`
    const start = formatDate(event.startDate)
    const end = event.endDate ? formatDate(event.endDate) : formatDate(addHours(event.startDate, 1))
    
    ics += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${timestamp}
DTSTART:${start}
DTEND:${end}
SUMMARY:${escapeText(event.title)}
DESCRIPTION:${escapeText(event.description)}
`
    
    if (event.location) {
      ics += `LOCATION:${escapeText(event.location)}\n`
    }
    
    if (event.url) {
      ics += `URL:${event.url}\n`
    }
    
    ics += `END:VEVENT
`
  })
  
  ics += `END:VCALENDAR`
  
  return ics
}

// Format date for ICS (YYYYMMDDTHHmmssZ)
function formatDate(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}

// Add hours to date
function addHours(date: Date, hours: number): Date {
  const result = new Date(date)
  result.setHours(result.getHours() + hours)
  return result
}

// Escape text for ICS format
function escapeText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

// Download .ics file
export function downloadICS(events: CalendarEvent[], filename: string = 'careconnect-calendar.ics') {
  const icsContent = generateICS(events)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Generate Google Calendar URL
export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatGoogleDate(event.startDate)}/${formatGoogleDate(event.endDate || addHours(event.startDate, 1))}`,
    details: event.description,
  })
  
  if (event.location) {
    params.append('location', event.location)
  }
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

// Format date for Google Calendar (YYYYMMDDTHHmmssZ)
function formatGoogleDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`
}


