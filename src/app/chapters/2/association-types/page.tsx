"use client";
import Link from 'next/link';
import { useState } from 'react';
import ChapterNavigation from '../../../components/ChapterNavigation';

const associationTypes = [
  {
    id: 'qq',
    label: 'Quantitative-Quantitative',
    fields: [
      { key: 'visual', label: 'Visual', answer: 'Scatterplot' },
      { key: 'test', label: 'Test', answer: 'Pearson/Spearman' },
      { key: 'look', label: 'Look for', answer: 'First: Monotonic, then heteroskedasticity, non-linear, outlier' },
    ],
  },
  {
    id: 'qc',
    label: 'Quantitative-Categorical',
    fields: [
      { key: 'visual', label: 'Visual', answer: 'Side by Side box plots' },
      { key: 'test', label: 'Test', answer: 'Mean and medians' },
      { key: 'look', label: 'Look for', answer: 'QQ Plots' },
    ],
  },
  {
    id: 'cc',
    label: 'Categorical-Categorical',
    fields: [
      { key: 'visual', label: 'Visual', answer: 'Mosaic' },
      { key: 'test', label: 'Test', answer: 'Chi squared' },
      { key: 'look', label: 'Look for', answer: 'Differences in conditional distribution' },
    ],
  },
];

const draggableItems = [
  { id: 'Chi squared', label: 'Chi squared' },
  { id: 'Side by Side box plots', label: 'Side by Side box plots' },
  { id: 'First: Monotonic, then heteroskedasticity, non-linear, outlier', label: 'First: Monotonic, then heteroskedasticity, non-linear, outlier' },
  { id: 'Mosaic', label: 'Mosaic' },
  { id: 'Pearson/Spearman', label: 'Pearson/Spearman' },
  { id: 'QQ Plots', label: 'QQ Plots' },
  { id: 'Differences in conditional distribution', label: 'Differences in conditional distribution' },
  { id: 'Scatterplot', label: 'Scatterplot' },
  { id: 'Mean and medians', label: 'Mean and medians' },
];

export default function AssociationTypes() {
  const [dropped, setDropped] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropKey: string, answer: string) => {
    const draggedId = e.dataTransfer.getData('text');
    setDropped((prev) => ({ ...prev, [dropKey]: draggedId }));
    setFeedback((prev) => ({
      ...prev,
      [dropKey]: draggedId === answer ? 'correct' : 'incorrect',
    }));
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('text', id);
  };

  const resetGame = () => {
    setDropped({});
    setFeedback({});
  };

  // Disable dragging if already dropped
  const isDraggable = (id: string) => !Object.values(dropped).includes(id);

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/2" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Associations
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="association types" className="text-4xl">🔗</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#58595b]">Association Types</h1>
              <p className="text-lg text-gray-600 mt-2">
                Drag the correct answer to each box for every association type below!
              </p>
            </div>
          </div>
        </div>

        {/* Drag and Drop Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {associationTypes.map((type) => (
            <div key={type.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 border-2 border-gray-200">
              <h2 className="text-xl font-bold text-[#58595b] mb-2 text-center">{type.label}</h2>
              {type.fields.map((field) => {
                const dropKey = `${type.id}-${field.key}`;
                return (
                  <div key={field.key} className="mb-4">
                    <div className="font-semibold text-gray-700 mb-1">{field.label}</div>
                    <div
                      onDrop={(e) => handleDrop(e, dropKey, field.answer)}
                      onDragOver={(e) => e.preventDefault()}
                      className={`min-h-[48px] flex items-center justify-center rounded-lg border-2 transition-colors px-2 py-2 text-center ${
                        feedback[dropKey] === 'correct'
                          ? 'border-green-400 bg-green-50'
                          : feedback[dropKey] === 'incorrect'
                          ? 'border-red-400 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      {dropped[dropKey] ? (
                        <span
                          className={`text-sm font-bold px-2 py-1 rounded-lg shadow ${
                            feedback[dropKey] === 'correct'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {dropped[dropKey]}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic text-sm">Drop here</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Draggable Answers */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#58595b] mb-2">Drag these answers:</h2>
          <div className="flex flex-wrap gap-4">
            {draggableItems.map((item) => (
              <div
                key={item.id}
                draggable={isDraggable(item.id)}
                onDragStart={(e) => handleDragStart(e, item.id)}
                className={`cursor-grab bg-[#ff8200] text-white px-4 py-2 rounded-lg shadow font-bold text-base hover:bg-[#ff9933] transition-colors ${
                  !isDraggable(item.id) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetGame}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg shadow"
        >
          Reset
        </button>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 