import React from 'react'

export default function PDFViewer({ pdf, classId }) {
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [error, setError] = React.useState(false)
  
  // Try multiple possible file paths
  const pdfPaths = [
    `/pdfs/class${classId}/${pdf.filename}`,
    `/pdfs/class${classId}/${pdf.filename.toLowerCase().replace(/\s+/g, '-')}`,
    `/pdfs/class${classId}/${pdf.filename.replace(/Class6_Mathematics_/, '').toLowerCase().replace(/\s+/g, '-')}`,
  ]
  
  const pdfUrl = pdfPaths[0] // Use the primary path
  
  const handleFullscreen = () => {
    if (!isFullscreen) {
      const element = document.getElementById(`pdf-container-${pdf.filename}`)
      if (element) {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        }
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      setIsFullscreen(false)
    }
  }
  
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{pdf.title}</h3>
          {pdf.description && (
            <p className="text-sm text-slate-600 mt-1">{pdf.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download
          </a>
          <button
            onClick={handleFullscreen}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
      
      <div
        id={`pdf-container-${pdf.filename}`}
        className="relative w-full rounded-xl border border-slate-200 bg-slate-100 overflow-hidden"
        style={{ minHeight: '600px' }}
      >
        {error ? (
          <div className="flex flex-col items-center justify-center h-[600px] p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-slate-400 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-600 font-medium mb-2">PDF not found</p>
            <p className="text-sm text-slate-500 mb-4">
              Please place the PDF file at: <code className="bg-slate-200 px-2 py-1 rounded">public/pdfs/class{classId}/{pdf.filename}</code>
            </p>
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Try Download
            </a>
          </div>
        ) : (
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full min-h-[600px]"
            title={pdf.title}
            onError={() => setError(true)}
            onLoad={(e) => {
              // Check if iframe loaded successfully
              try {
                const iframe = e.target
                if (iframe.contentDocument && iframe.contentDocument.body) {
                  setError(false)
                }
              } catch (err) {
                // Cross-origin restrictions - assume it's loading
                setError(false)
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

