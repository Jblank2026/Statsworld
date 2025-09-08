'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

// PDF documents list
const PDF_DOCUMENTS = [
  {
    title: 'R Studio Help Sheet',
    path: '/pdfs/R-studio help sheet.pdf',
    description: 'Quick reference guide for R Studio commands and functions'
  }
  // Add more PDFs here as needed
];

export default function Resources() {
  const [selectedPdf, setSelectedPdf] = useState(PDF_DOCUMENTS[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      pdfContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#58595b] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Learning Resources
            </h1>
          </div>
        </div>
      </div>

      {/* YouTube Banner Section */}
      <section className="relative w-full bg-gradient-to-br from-[#FF8200] via-[#58595b] to-[#121212] py-24 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-white/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-8">
            Need Extra Help?
          </h2>
          <p className="text-2xl text-white/90 mb-12">
            Visit the STAT201 Youtube for more regression content!
          </p>
          <div className="flex justify-center">
            <a 
              href="https://www.youtube.com/@Stat201atUTK" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#CC0000] transition-colors"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                <path fill="white" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Visit Channel
            </a>
          </div>
        </div>
      </section>

      {/* PDF Documents Section */}
      <section className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#58595b] mb-8">Reference Materials</h2>
          <div className="flex gap-8">
            {/* PDF Navigation Menu */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-[#f8f9fa] rounded-lg p-4">
                <h3 className="font-semibold text-[#58595b] mb-4">Documents</h3>
                <ul className="space-y-2">
                  {PDF_DOCUMENTS.map((doc) => (
                    <li key={doc.path}>
                      <button
                        onClick={() => setSelectedPdf(doc)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedPdf.path === doc.path
                            ? 'bg-[#FF8200] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {doc.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-[#f8f9fa] rounded-lg p-4">
              <div ref={pdfContainerRef} className="bg-white rounded-lg shadow-lg h-[800px]">
                <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-[#58595b]">{selectedPdf.title}</h3>
                    <p className="text-sm text-gray-600">{selectedPdf.description}</p>
                  </div>
                  <button
                    onClick={toggleFullscreen}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    {isFullscreen ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 5m-5-5v6m16-6l-5 5m5-5v6m-5 5l5 5m-5-5h6M4 20l5-5m-5 5v-6" />
                        </svg>
                        Exit Fullscreen
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0-4l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        Fullscreen
                      </>
                    )}
                  </button>
                </div>
                <object
                  data={selectedPdf.path}
                  type="application/pdf"
                  className={`w-full ${isFullscreen ? 'h-screen' : 'h-[calc(100%-64px)]'}`}
                >
                  <div className="p-4 text-center">
                    <p>Unable to display PDF. <a href={selectedPdf.path} className="text-[#FF8200] hover:underline">Download instead</a></p>
                  </div>
                </object>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Analytics Society Section */}
      <section className="w-full bg-[#f8f9fa] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#58595b] mb-4">Join the Business Analytics Society!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Scan the QR code below to learn more about joining our community of data enthusiasts.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="/images/BAS QR Code.png"
                alt="Business Analytics Society QR Code"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#58595b]">Additional Resources Coming Soon!</h2>
            <p className="mt-4 text-xl text-gray-600">
              Stay tuned for more interactive learning materials and study guides.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 