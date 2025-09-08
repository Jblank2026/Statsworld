"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import ChapterNavigation from '../../../components/ChapterNavigation';

interface Assumption {
  id: number;
  name: string;
  description: string;
}

interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  assumptionId: number;
  visualId: number | null;
  isTemp: boolean;
}

export default function RegressionAssumptions() {
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [selectedAssumption, setSelectedAssumption] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const assumptions: Assumption[] = [
    { id: 1, name: "Linearity", description: "The relationship between X and Y is linear" },
    { id: 2, name: "Normality", description: "Residuals should be normally distributed" },
    { id: 3, name: "Equal Variance", description: "Homoscedasticity: Equal variance across all levels of X" }
  ];

  const visuals: Assumption[] = [
    { id: 1, name: "Residual vs Fitted Plot", description: "Checks if relationship is linear and if variance is constant" },
    { id: 2, name: "Histogram of Residuals", description: "Shows the distribution of residuals" },
    { id: 3, name: "QQ Plot", description: "Compares residual distribution to a normal distribution" }
  ];

  // Replace shuffling with fixed arrays
  const [displayedAssumptions] = useState(assumptions);
  const [displayedVisuals] = useState(visuals);

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
      ctx.strokeStyle = matchedPairs.includes(line.assumptionId) ? '#22c55e' : '#ff8200';
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

  useEffect(() => {
    drawLines();
  }, [drawLines]);

  const handleAssumptionClick = (assumptionId: number, event: React.MouseEvent) => {
    if (matchedPairs.includes(assumptionId)) return;

    // If clicking the currently selected assumption, unselect it
    if (currentLine && currentLine.assumptionId === assumptionId) {
      setCurrentLine(null);
      return;
    }

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    setSelectedAssumption(assumptionId);
    setCurrentLine({
      startX: rect.right - canvasRect.left,
      startY: rect.top - canvasRect.top + rect.height / 2,
      endX: rect.right - canvasRect.left,
      endY: rect.top - canvasRect.top + rect.height / 2,
      assumptionId,
      visualId: null,
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

  const handleVisualClick = (visualId: number) => {
    if (!currentLine) return;
    
    // We don't disable visuals that are already matched, since multiple assumptions can match to same visual
    
    // Define correct matches
    const correctMatches: Record<number, number> = {
      1: 1, // Linearity -> Residual vs Fitted Plot
      2: 3, // Normality -> QQ Plot
      3: 1  // Equal Variance -> Residual vs Fitted Plot
    };

    // Check if this is a correct match
    const isCorrect = correctMatches[currentLine.assumptionId] === visualId;

    if (isCorrect) {
      // Correct match
      setMatchedPairs(prev => [...prev, currentLine.assumptionId]);
      setLines(prev => [...prev, { ...currentLine, visualId, isTemp: false }]);

      if (matchedPairs.length + 1 === assumptions.length) {
        setShowCompletionModal(true);
      }
    }

    setCurrentLine(null);
    setSelectedAssumption(null);
  };

  const restartGame = () => {
    setMatchedPairs([]);
    setLines([]);
    setCurrentLine(null);
    setSelectedAssumption(null);
    setShowCompletionModal(false);
  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="regression assumptions" className="text-4xl">📏</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Linear Regression Assumptions</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding when regression is valid</p>
            </div>
          </div>

          {/* Content Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Key Assumptions</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-6">
                Linear regression relies on several key assumptions. When these assumptions are violated, 
                the regression results may be misleading or invalid.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Linearity:</strong> The relationship between X and Y is linear</li>
                <li><strong>Normality:</strong> Residuals should be normally distributed</li>
                <li><strong>Equal Variance:</strong> Homoscedasticity: Equal variance across all levels of X</li>
              </ul>
            </div>
          </section>

          {/* CR Output Image */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#58595b] mb-3">Checking Regression Assumptions - Output</h3>
              <div className="flex justify-center mb-4">
                <Image 
                  src="/images/CR Output.png" 
                  alt="Checking Regression Assumptions Output" 
                  width={600} 
                  height={400}
                  className="rounded shadow-sm"
                />
              </div>
              <div className="text-gray-600 p-4 bg-gray-50 rounded">
                <h4 className="font-semibold mb-2">Understanding the Diagnostic Plots:</h4>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <strong>Residuals vs Fitted Plot (Top Left):</strong>
                    <p className="mt-1">This plot helps assess both <strong>linearity</strong> and <strong>equal variance</strong> (homoscedasticity).</p>
                  </li>
                  <li>
                    <strong>Histogram of Residuals (Bottom Left):</strong>
                    <p className="mt-1">This histogram shows the distribution of residuals.</p>
                  </li>
                  <li>
                    <strong>QQ Plot (Right):</strong>
                    <p className="mt-1">The Quantile-Quantile (QQ) plot checks for the <strong>normality</strong> assumption.</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Matching Game */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-[#e7e7e7] rounded-lg p-4">
                <span role="img" aria-label="game" className="text-4xl">🎲</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#58595b]">Assumption Matching Game</h2>
                <p className="text-lg text-gray-600 mt-2">
                  Draw lines to match each assumption with the best plot to check it!
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-[#ff8200] rounded-full transition-all duration-300"
                  style={{ width: `${(matchedPairs.length / assumptions.length) * 100}%` }}
                />
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Matched: {matchedPairs.length} of {assumptions.length} pairs
                <span className="text-xs ml-2 text-gray-500">(Note: Linearity and Equal Variance both match to Residual vs Fitted Plot)</span>
              </p>
            </div>

            {/* Game Grid */}
            <div className="relative flex justify-between" onMouseMove={handleMouseMove}>
              {/* Canvas for drawing lines */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                width={1000}
                height={600}
              />

              {/* Assumptions Column */}
              <div className="w-2/5 space-y-4">
                <h3 className="text-xl font-bold text-[#58595b] mb-4">Assumptions</h3>
                {displayedAssumptions.map(assumption => (
                  <button
                    key={assumption.id}
                    onClick={(e) => handleAssumptionClick(assumption.id, e)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      matchedPairs.includes(assumption.id)
                        ? 'bg-green-100 text-green-800'
                        : selectedAssumption === assumption.id
                        ? 'bg-[#ff8200] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    disabled={matchedPairs.includes(assumption.id)}
                  >
                    <div className="font-semibold">{assumption.name}</div>
                  </button>
                ))}
              </div>

              {/* Visuals Column */}
              <div className="w-2/5 space-y-4">
                <h3 className="text-xl font-bold text-[#58595b] mb-4">Visualizations</h3>
                {displayedVisuals.map(visual => (
                  <button
                    key={visual.id}
                    onClick={() => handleVisualClick(visual.id)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      lines.some(line => line.visualId === visual.id)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-semibold">{visual.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={restartGame}
                className="px-4 py-2 bg-[#ff8200] text-white rounded hover:bg-[#ff9933] transition-colors"
              >
                Reset Game
              </button>
            </div>
          </div>

          {/* CR Summary Image */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#58595b] mb-3">Checking Regression Assumptions - Summary</h3>
              <div className="flex justify-center mb-4">
                <Image 
                  src="/images/CR Summary.png" 
                  alt="Checking Regression Assumptions Summary" 
                  width={600} 
                  height={400}
                  className="rounded shadow-sm"
                />
              </div>
              <div className="text-gray-600 p-4 bg-gray-50 rounded">
                <p className="font-bold mb-4">Remember: All p-values are a result of a hypothesis test. It is simply rejecting or failing to reject a null hypothesis. It does not mean something is good or bad.</p>
                
                <p className="mb-4">In the case of the check regression summary output, the null hypothesis is that that assumptions are met. This means that a low p-value means that we are rejecting the null hypothesis that the assumptions are met.</p>
                
                <div className="mt-4 font-semibold">
                  In short:
                  <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <div className="bg-green-100 text-green-800 p-3 rounded flex-1 text-center">
                      High P-Value - <span className="font-bold">PASS</span>
                    </div>
                    <div className="bg-red-100 text-red-800 p-3 rounded flex-1 text-center">
                      Low P-Value - <span className="font-bold">FAIL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>

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
                You've matched all regression assumptions to their diagnostic plots! Ready for another round?
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