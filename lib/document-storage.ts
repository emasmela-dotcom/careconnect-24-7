// Document Storage Utilities
// For production, use Cloudinary, AWS S3, or similar

export interface Document {
  id: string
  name: string
  type: string
  url: string
  size: number
  uploadedAt: string
  category?: 'prescription' | 'lab-result' | 'insurance' | 'medical-record' | 'other'
}

// Upload document (simplified - in production use cloud storage)
export async function uploadDocument(
  file: File,
  category: Document['category'] = 'other'
): Promise<Document> {
  // In production, upload to Cloudinary, AWS S3, or similar
  // For now, create a data URL (base64)
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const document: Document = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type,
        url: reader.result as string, // In production, this would be a cloud URL
        size: file.size,
        uploadedAt: new Date().toISOString(),
        category,
      }
      resolve(document)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Validate file type
export function validateFileType(file: File): boolean {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/pdf',
    'application/pdf',
    'image/jpg',
  ]
  return allowedTypes.includes(file.type)
}

// Validate file size (max 10MB)
export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}


