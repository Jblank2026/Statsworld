"use client";
import React from 'react';
import Link from 'next/link';
import ChapterNavigation from '../../../components/ChapterNavigation';

export default function RStudioSetup() {
  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#ff8200] to-[#ff9933] px-8 py-6">
            <div className="flex items-center gap-4">
              <span role="img" aria-label="setup" className="text-4xl">⚙️</span>
              <div>
                <h1 className="text-3xl font-bold text-white">Setting Up R Studio</h1>
                <p className="text-[#ffe6cc]">Get your R environment ready for data analysis</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#58595b] mb-4">Step 1: Download R</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-800 mb-4">
                  First, you need to download and install R from the official CRAN repository:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-blue-700">
                  <li>Go to <a href="https://cran.r-project.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">https://cran.r-project.org/</a></li>
                  <li>Click "Download R for Windows" (or your operating system)</li>
                  <li>Click "base" and then "Download R 4.x.x for Windows"</li>
                  <li>Run the installer with default settings</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#58595b] mb-4">Step 2: Download R Studio</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-green-800 mb-4">
                  R Studio provides a much better interface for working with R:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>Go to <a href="https://www.rstudio.com/products/rstudio/download/" target="_blank" rel="noopener noreferrer" className="text-green-600 underline hover:text-green-800">https://www.rstudio.com/products/rstudio/download/</a></li>
                  <li>Download R Studio Desktop (Free version)</li>
                  <li>Run the installer with default settings</li>
                  <li>Open R Studio when installation is complete</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#58595b] mb-4">Step 3: R Studio Interface</h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <p className="text-purple-800 mb-4">
                  R Studio has four main panes:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h3 className="font-bold text-purple-700 mb-2">📝 Script Editor (Top Left)</h3>
                    <p className="text-purple-600 text-sm">Write and save your R code here</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h3 className="font-bold text-purple-700 mb-2">💻 Console (Bottom Left)</h3>
                    <p className="text-purple-600 text-sm">Run R commands and see output</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h3 className="font-bold text-purple-700 mb-2">🌍 Environment (Top Right)</h3>
                    <p className="text-purple-600 text-sm">See your variables and data</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h3 className="font-bold text-purple-700 mb-2">📁 Files/Plots (Bottom Right)</h3>
                    <p className="text-purple-600 text-sm">Browse files and view plots</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#58595b] mb-4">Step 4: Your First R Command</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-800 mb-4">
                  Try typing this in the console and press Enter:
                </p>
                <div className="bg-gray-800 text-green-400 p-4 rounded font-mono">
                  <div className="mb-2">
                    <span className="text-blue-400">&gt;</span> print("Hello, R!")
                  </div>
                  <div className="text-white">
                    [1] "Hello, R!"
                  </div>
                </div>
                <p className="text-gray-600 mt-4 text-sm">
                  Congratulations! You've run your first R command. 🎉
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#58595b] mb-4">Quick Tips</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <ul className="space-y-2 text-yellow-800">
                  <li>💡 Use <code className="bg-yellow-200 px-2 py-1 rounded">Ctrl+Enter</code> to run code from the script editor</li>
                  <li>💡 Use <code className="bg-yellow-200 px-2 py-1 rounded">Ctrl+Shift+C</code> to comment/uncomment lines</li>
                  <li>💡 Use the up arrow in console to recall previous commands</li>
                  <li>💡 R is case-sensitive: <code className="bg-yellow-200 px-2 py-1 rounded">Print()</code> ≠ <code className="bg-yellow-200 px-2 py-1 rounded">print()</code></li>
                </ul>
              </div>
            </section>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-green-600 bg-green-100 px-4 py-2 rounded-lg">
                <span>✅</span>
                <span className="font-medium">Ready to start your R journey!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 