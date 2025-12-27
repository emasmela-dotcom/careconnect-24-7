'use client'

import { useState, useEffect } from 'react'
import { Upload, FileText, Image, File, Trash, Download, Eye } from 'lucide-react'
import { uploadDocument, validateFileType, validateFileSize } from '@/lib/document-storage'

interface Document {
  id: string
  name: string
  type: string
  url: string
  size: number
  category?: string
  createdAt: string
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [uploading, setUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('other')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const response = await fetch('/api/documents')
      if (response.ok) {
        const data = await response.json()
        setDocuments(data)
      }
    } catch (error) {
      console.error('Error loading documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    if (!validateFileType(file)) {
      alert('Invalid file type. Please upload PDF, JPG, or PNG files.')
      return
    }

    if (!validateFileSize(file)) {
      alert('File too large. Maximum size is 10MB.')
      return
    }

    setUploading(true)
    try {
      const doc = await uploadDocument(file, selectedCategory as any)
      
      // Save to database
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc),
      })

      if (!response.ok) throw new Error('Failed to save document')

      const savedDoc = await response.json()
      setDocuments(prev => [savedDoc, ...prev])
      alert('Document uploaded successfully!')
    } catch (error) {
      console.error('Error uploading document:', error)
      alert('Failed to upload document')
    } finally {
      setUploading(false)
      // Reset file input
      e.target.value = ''
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return

    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete document')

      setDocuments(prev => prev.filter(d => d.id !== id))
    } catch (error) {
      console.error('Error deleting document:', error)
      alert('Failed to delete document')
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image size={24} />
    if (type === 'application/pdf') return <FileText size={24} />
    return <File size={24} />
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Document Storage</h1>
        <p className="text-xl text-gray-700">Upload and manage your medical records, prescriptions, and documents</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white border-4 border-blue-300 p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Document</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Document Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 text-lg border-4 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="prescription">Prescription</option>
              <option value="lab-result">Lab Result</option>
              <option value="insurance">Insurance Document</option>
              <option value="medical-record">Medical Record</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Select File (PDF, JPG, PNG - Max 10MB)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                />
                <div className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-center font-semibold border-4 border-blue-700">
                  {uploading ? 'Uploading...' : 'Choose File'}
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Documents</h2>
        {loading ? (
          <div className="bg-white border-4 border-gray-300 p-12 text-center rounded-xl">
            <p className="text-gray-600">Loading documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="bg-white border-4 border-gray-300 p-12 text-center rounded-xl">
            <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
            <p className="text-gray-600">Upload your medical records, prescriptions, and other important documents.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map(doc => (
              <div key={doc.id} className="bg-white border-4 border-gray-300 p-6 rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getFileIcon(doc.type)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">{doc.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{doc.category || 'other'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">Size: {formatFileSize(doc.size)}</p>
                  <p className="text-sm text-gray-600">
                    Uploaded: {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View
                  </a>
                  <a
                    href={doc.url}
                    download={doc.name}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
                  >
                    <Download size={16} />
                  </a>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

