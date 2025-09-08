"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import ChapterNavigation from '../../../components/ChapterNavigation';

interface Function {
  id: number;
  name: string;
  description: string;
}

interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  functionId: number;
  descriptionId: number | null;
  isTemp: boolean;
}

export default function SummaryFunctionsGame() {
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const functions: Function[] = [
    { id: 1, name: "mean()", description: "Calculates the average of numeric values" },
    { id: 2, name: "median()", description: "Finds the middle value when data is ordered" },
    { id: 3, name: "sd()", description: "Calculates the standard deviation" },
    { id: 4, name: "IQR()", description: "Calculates the interquartile range" },
    { id: 5, name: "quantile()", description: "Calculates specified percentiles of the data" },
    { id: 6, name: "min()", description: "Finds the smallest value" },
    { id: 7, name: "max()", description: "Finds the largest value" },
    { id: 8, name: "sum()", description: "Adds up all elements in the vector" },
    { id: 9, name: "length()", description: "Counts the number of elements" },
    { id: 10, name: "unique()", description: "Returns vector of unique elements" },
    { id: 11, name: "summary()", description: "Provides a five-number summary or frequency table" },
    { id: 12, name: "table()", description: "Creates a frequency table of elements" }
  ];

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const drawLines = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all permanent lines
    lines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(line.startX, line.startY);
      ctx.lineTo(line.endX, line.endY);
      ctx.strokeStyle = matchedPairs.includes(line.functionId) ? '#22c55e' : '#ff8200';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw current line being drawn
    if (currentLine) {
      ctx.beginPath();
      ctx.moveTo(currentLine.startX, currentLine.startY);
      ctx.lineTo(currentLine.endX, currentLine.endY);
      ctx.strokeStyle = '#ff8200';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  // Draw connection lines when components mount
  useEffect(() => {
    drawLines();
  }, [drawLines]);

  const handleFunctionClick = (functionId: number, event: React.MouseEvent) => {
    if (matchedPairs.includes(functionId)) return;

    // If clicking the currently selected function, unselect it
    if (selectedFunction === functionId) {
      setSelectedFunction(null);
      setCurrentLine(null);
      return;
    }

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    setSelectedFunction(functionId);
    setCurrentLine({
      startX: rect.right - canvasRect.left,
      startY: rect.top - canvasRect.top + rect.height / 2,
      endX: rect.right - canvasRect.left,
      endY: rect.top - canvasRect.top + rect.height / 2,
      functionId,
      descriptionId: null,
      isTemp: true
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!currentLine || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    setCurrentLine({
      ...currentLine,
      endX: event.clientX - canvasRect.left,
      endY: event.clientY - canvasRect.top
    });
  };

  const handleDescriptionClick = (descriptionId: number) => {
    if (!currentLine || matchedPairs.includes(descriptionId)) return;

    if (currentLine.functionId === descriptionId) {
      // Correct match
      setMatchedPairs(prev => [...prev, descriptionId]);
      setLines(prev => [...prev, { ...currentLine, descriptionId, isTemp: false }]);

      if (matchedPairs.length + 1 === functions.length) {
        setShowCompletionModal(true);
        triggerConfetti();
      }
    }

    setCurrentLine(null);
    setSelectedFunction(null);
  };

  const restartGame = () => {
    setMatchedPairs([]);
    setLines([]);
    setCurrentLine(null);
    setSelectedFunction(null);
    setShowCompletionModal(false);
  };

  // Shuffle array using Fisher-Yates algorithm
  const shuffle = (array: Function[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Create shuffled arrays for both columns
  const [shuffledFunctions] = useState(shuffle(functions));
  const [shuffledDescriptions] = useState(shuffle(functions));

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Game Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="game" className="text-4xl">🎲</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Summary Functions</h1>
              <p className="text-xl text-gray-600 mt-2">
                Draw lines to match each R function with its description!
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-[#ff8200] rounded-full transition-all duration-300"
                style={{ width: `${(matchedPairs.length / functions.length) * 100}%` }}
              />
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Matched: {matchedPairs.length} of {functions.length} pairs
            </p>
          </div>

          {/* Game Grid */}
          <div className="relative flex justify-between" onMouseMove={handleMouseMove}>
            {/* Canvas for drawing lines */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none"
              width={1000}
              height={800}
            />

            {/* Functions Column */}
            <div className="w-1/3 space-y-4">
              <h2 className="text-xl font-bold text-[#58595b] mb-4">Functions</h2>
              {shuffledFunctions.map(func => (
                <button
                  key={func.id}
                  onClick={(e) => handleFunctionClick(func.id, e)}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    matchedPairs.includes(func.id)
                      ? 'bg-green-100 text-green-800'
                      : selectedFunction === func.id
                      ? 'bg-[#ff8200] text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  disabled={matchedPairs.includes(func.id)}
                >
                  <code className="font-mono">{func.name}</code>
                </button>
              ))}
            </div>

            {/* Descriptions Column */}
            <div className="w-1/3 space-y-4">
              <h2 className="text-xl font-bold text-[#58595b] mb-4">Descriptions</h2>
              {shuffledDescriptions.map(func => (
                <button
                  key={func.id}
                  onClick={() => handleDescriptionClick(func.id)}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    matchedPairs.includes(func.id)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  disabled={matchedPairs.includes(func.id)}
                >
                  {func.description}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />

        {/* Completion Modal */}
        {showCompletionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform animate-bounce-gentle">
              <div className="text-center">
                <span className="text-6xl mb-4 inline-block">🎉</span>
                <h2 className="text-3xl font-bold text-[#58595b] mb-4">
                  Congratulations!
                </h2>
                <p className="text-gray-600 mb-8">
                  You've mastered R summary functions! Ready for another round?
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={restartGame}
                    className="px-6 py-3 bg-[#ff8200] text-white rounded-lg hover:bg-[#ff9933] transition-colors"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => setShowCompletionModal(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
      `}</style>
    </main>
  );
} 