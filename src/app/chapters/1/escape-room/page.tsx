"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface Puzzle {
  id: number;
  title: string;
  story: string;
  question: string;
  type: 'multiple-choice' | 'drag-drop' | 'table-analysis' | 'code-analysis';
  data?: any;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  difficulty: number;
}

interface GameState {
  currentPuzzle: number;
  solvedPuzzles: number[];
  timeElapsed: number;
  showHint: boolean;
  gameCompleted: boolean;
  lastFeedback: {
    isCorrect: boolean;
    message: string;
  } | null;
}

export default function EscapeRoom() {
  const [gameState, setGameState] = useState<GameState>({
    currentPuzzle: 0,
    solvedPuzzles: [],
    timeElapsed: 0,
    showHint: false,
    gameCompleted: false,
    lastFeedback: null
  });
  
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [gameStarted, setGameStarted] = useState(false);
  const [draggedItems, setDraggedItems] = useState<{[key: string]: string}>({});

  const puzzles: Puzzle[] = [
    {
      id: 1,
      title: "The Laboratory Door Lock",
      story: "You're trapped in Dr. Data's research lab! The first lock requires you to identify what type of variable the lab ID numbers represent.",
      question: "The lab's security system shows these ID numbers for different experiments: EXP001, EXP002, EXP003, LAB045, LAB046. What type of variable are these IDs?",
      type: 'multiple-choice',
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Identifier Variable"],
      correctAnswer: "Identifier Variable",
      explanation: "Lab ID numbers are identifier variables - they uniquely identify each experiment but aren't used for analysis or have meaningful order.",
      hint: "Think about the purpose of these codes - are they for identification or measurement?",
      difficulty: 1
    },
    {
      id: 2,
      title: "The Chemical Storage Cabinet",
      story: "Great! The door is open. Now you need to access the chemical storage cabinet. The lock shows different chemical states and asks you to classify them.",
      question: "The cabinet displays these chemical states: Solid, Liquid, Gas, Plasma. How should these be classified?",
      type: 'multiple-choice',
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Nominal",
      explanation: "Chemical states are categories with no inherent order. 'Solid' isn't greater than or less than 'Liquid' in any meaningful ranking.",
      hint: "Can these states be arranged in a meaningful order from least to greatest?",
      difficulty: 2
    },
    {
      id: 3,
      title: "The Equipment Scanner",
      story: "The cabinet opens! Inside, you find a scanner that reads equipment data. To activate it, you must correctly classify survey response data.",
      question: "The scanner shows customer satisfaction ratings from a survey:",
      type: 'table-analysis',
      data: {
        title: "Customer Satisfaction Survey Results",
        headers: ["Customer_ID", "Rating", "Age", "Purchase_Amount"],
        rows: [
          ["CUST001", "Very Satisfied", 28, 156.50],
          ["CUST002", "Satisfied", 34, 89.25],
          ["CUST003", "Neutral", 45, 234.75],
          ["CUST004", "Dissatisfied", 29, 67.00],
          ["CUST005", "Very Dissatisfied", 52, 123.80]
        ],
        highlightColumn: 1
      },
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Categorical - Ordinal",
      explanation: "Satisfaction ratings have a clear order from 'Very Dissatisfied' to 'Very Satisfied', making them ordinal categorical variables.",
      hint: "Look at the highlighted column - do these categories have a natural ranking?",
      difficulty: 3
    },
    {
      id: 4,
      title: "The Data Classification Console",
      story: "Excellent! The scanner activates and reveals a data classification console. You must drag and drop variables into their correct categories to unlock the exit sequence.",
      question: "Classify these variables by dragging them to the correct category:",
      type: 'drag-drop',
      data: {
        variables: [
          "Number of Students",
          "Student Blood Type", 
          "Height in Meters",
          "Course Grade (A, B, C, D, F)",
          "Social Security Number"
        ],
        categories: [
          "Categorical - Nominal",
          "Categorical - Ordinal", 
          "Quantitative - Discrete",
          "Quantitative - Continuous",
          "Identifier Variable"
        ],
        correctMappings: {
          "Number of Students": "Quantitative - Discrete",
          "Student Blood Type": "Categorical - Nominal",
          "Height in Meters": "Quantitative - Continuous",
          "Course Grade (A, B, C, D, F)": "Categorical - Ordinal",
          "Social Security Number": "Identifier Variable"
        }
      },
      correctAnswer: "All variables correctly classified",
      explanation: "Each variable type serves a different purpose: discrete counts, nominal categories, continuous measurements, ordinal rankings, and unique identifiers.",
      hint: "Think about what each variable measures and whether it has order, can be counted, or identifies something unique.",
      difficulty: 4
    },
    {
      id: 5,
      title: "The Final Code Analyzer",
      story: "Almost there! The console activates a final security measure. You must analyze this research code snippet to identify the variable type that will unlock your escape.",
      question: "Dr. Data's research code contains this variable declaration. What type is the 'participant_age' variable?",
      type: 'code-analysis',
      data: {
        code: `# Research Study Data Collection
participants = {
    'participant_id': ['P001', 'P002', 'P003', 'P004'],
    'participant_age': [23, 31, 28, 45, 37, 29],
    'study_group': ['Control', 'Treatment A', 'Treatment B', 'Control'],
    'satisfaction_score': [4.2, 3.8, 4.7, 3.1, 4.9, 4.0]
}

# Analysis focus: participant_age values`,
        highlight: "participant_age"
      },
      options: ["Categorical - Nominal", "Categorical - Ordinal", "Quantitative - Discrete", "Quantitative - Continuous"],
      correctAnswer: "Quantitative - Discrete",
      explanation: "Participant age is typically recorded as whole numbers (discrete) and represents countable quantities. While age could theoretically be continuous, it's commonly collected as discrete integer values.",
      hint: "Look at the age values - are they whole numbers that can be counted, or could they be any value in a range?",
      difficulty: 5
    }
  ];

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameState.gameCompleted) {
      timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [gameState.timeElapsed, gameStarted, gameState.gameCompleted]);

  const startGame = () => {
    console.log('Start game clicked!'); // Debug log
    setGameStarted(true);
    setGameState({
      currentPuzzle: 0,
      solvedPuzzles: [],
      timeElapsed: 0,
      showHint: false,
      gameCompleted: false,
      lastFeedback: null
    });
    setSelectedAnswer('');
    setDraggedItems({});
  };

  const handleAnswerSubmit = () => {
    const currentPuzzleData = puzzles[gameState.currentPuzzle];
    let isCorrect = false;

    if (currentPuzzleData.type === 'drag-drop') {
      // Check if all drag-drop items are correctly placed
      const correctMappings = currentPuzzleData.data.correctMappings;
      isCorrect = Object.keys(correctMappings).every(
        variable => draggedItems[variable] === correctMappings[variable]
      );
    } else {
      isCorrect = selectedAnswer === currentPuzzleData.correctAnswer;
    }

    setGameState(prev => ({
      ...prev,
      lastFeedback: {
        isCorrect,
        message: isCorrect ? currentPuzzleData.explanation : `Incorrect. ${currentPuzzleData.explanation}`
      }
    }));

    if (isCorrect) {
      setTimeout(() => {
        const newSolvedPuzzles = [...gameState.solvedPuzzles, gameState.currentPuzzle];
        
        if (newSolvedPuzzles.length === puzzles.length) {
          // Game completed!
          setGameState(prev => ({
            ...prev,
            gameCompleted: true,
            solvedPuzzles: newSolvedPuzzles
          }));
          
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
        } else {
          // Move to next puzzle
          setGameState(prev => ({
            ...prev,
            currentPuzzle: prev.currentPuzzle + 1,
            solvedPuzzles: newSolvedPuzzles,
            showHint: false,
            lastFeedback: null
          }));
          setSelectedAnswer('');
          setDraggedItems({});
        }
      }, 3000);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleDragStart = (e: React.DragEvent, variable: string) => {
    e.dataTransfer.setData('text/plain', variable);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault();
    const variable = e.dataTransfer.getData('text/plain');
    setDraggedItems(prev => ({
      ...prev,
      [variable]: category
    }));
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-purple-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-10 w-2 h-2 bg-indigo-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-1/3 w-1 h-1 bg-white rounded-full animate-ping"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto p-8 text-white">
          {/* Header */}
          <div className="mb-8">
            <Link href="/chapters/1" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-all transform hover:scale-105">
              <span className="text-xl">←</span> Back to Variable Types
            </Link>
          </div>

          {/* Game Introduction */}
          <div className="text-center mb-12">
            {/* Animated Lab Door */}
            <div className="relative mb-8">
              <div className="w-48 h-48 mx-auto relative">
                {/* Door Frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg border-4 border-gray-600 shadow-2xl"></div>
                {/* Door */}
                <div className="absolute inset-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded border-2 border-gray-700">
                  {/* Door Handle */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-3 h-6 bg-yellow-600 rounded-full shadow-lg"></div>
                  {/* Keypad */}
                  <div className="absolute left-4 top-4 w-16 h-12 bg-red-900 rounded border border-red-600 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
                      ))}
                    </div>
                  </div>
                  {/* Warning Signs */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xs">
                    🔒 LOCKED
                  </div>
                </div>
                {/* Glowing Effect */}
                <div className="absolute inset-0 bg-red-500 opacity-20 rounded-lg animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-purple-300 to-blue-300 bg-clip-text text-transparent animate-pulse">
              Dr. Data's Escape Room
            </h1>
            <div className="text-2xl text-red-400 font-bold mb-4 animate-bounce">
              🚨 LABORATORY LOCKDOWN ACTIVE 🚨
            </div>
            <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              You're trapped in Dr. Data's high-security research laboratory! The AI defense system has activated and sealed all exits. 
              The only way to escape is to prove your mastery of variable types by solving 5 increasingly challenging puzzles. 
              <span className="text-yellow-300 font-semibold">Use your statistical knowledge to crack the codes and regain your freedom!</span>
            </p>
          </div>

          {/* Security Console */}
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 mb-8 border-2 border-red-500/50 shadow-2xl relative overflow-hidden">
            {/* Console Screen Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
            
            <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-3 font-mono">
              <span className="animate-spin">⚡</span> SECURITY CONSOLE <span className="animate-ping">🔴</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4 font-mono">🎯 MISSION PARAMETERS</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-green-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-mono">Solve 5 security puzzles</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-mono">Each unlock grants access</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-mono">Use hints for assistance</span>
                  </div>
                  <div className="flex items-center gap-3 text-red-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                    <span className="font-mono">Time is critical!</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4 font-mono">🧩 SECURITY PROTOCOLS</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 p-3 rounded border border-purple-500/30">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400">🔍</span>
                      <span className="text-sm font-mono text-purple-200">CLASSIFICATION PROTOCOL</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 p-3 rounded border border-blue-500/30">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">📊</span>
                      <span className="text-sm font-mono text-blue-200">DATA ANALYSIS PROTOCOL</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-900/50 to-indigo-800/50 p-3 rounded border border-indigo-500/30">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400">🎯</span>
                      <span className="text-sm font-mono text-indigo-200">SORTING PROTOCOL</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-violet-900/50 to-violet-800/50 p-3 rounded border border-violet-500/30">
                    <div className="flex items-center gap-2">
                      <span className="text-violet-400">💻</span>
                      <span className="text-sm font-mono text-violet-200">CODE ANALYSIS PROTOCOL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Level Display */}
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-6 mb-8 border border-red-500/30 relative">
            <div className="absolute top-2 right-2 text-red-400 animate-ping">🚨</div>
            <h3 className="text-xl font-bold text-red-400 mb-6 font-mono flex items-center gap-2">
              <span className="animate-pulse">🔐</span> SECURITY LEVEL ANALYSIS
            </h3>
            <div className="flex justify-between items-end gap-4">
              {puzzles.map((puzzle, index) => (
                <div key={puzzle.id} className="text-center flex-1">
                  {/* Security Level Bars */}
                  <div className="relative h-24 mb-3">
                    <div className="absolute bottom-0 w-full bg-gray-800 rounded">
                      <div 
                        className={`w-full rounded transition-all duration-1000 ${
                          puzzle.difficulty <= 2 ? 'bg-gradient-to-t from-green-600 to-green-400' :
                          puzzle.difficulty <= 3 ? 'bg-gradient-to-t from-yellow-600 to-yellow-400' :
                          puzzle.difficulty <= 4 ? 'bg-gradient-to-t from-orange-600 to-orange-400' : 
                          'bg-gradient-to-t from-red-600 to-red-400'
                        }`}
                        style={{ height: `${(puzzle.difficulty / 5) * 100}%` }}
                      ></div>
                    </div>
                    {/* Level Indicator */}
                    <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 ${
                      puzzle.difficulty <= 2 ? 'bg-green-600 border-green-400 animate-pulse' :
                      puzzle.difficulty <= 3 ? 'bg-yellow-600 border-yellow-400 animate-pulse' :
                      puzzle.difficulty <= 4 ? 'bg-orange-600 border-orange-400 animate-pulse' : 
                      'bg-red-600 border-red-400 animate-ping'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className={`text-xs font-mono ${
                    puzzle.difficulty <= 2 ? 'text-green-400' :
                    puzzle.difficulty <= 3 ? 'text-yellow-400' :
                    puzzle.difficulty <= 4 ? 'text-orange-400' : 'text-red-400'
                  }`}>
                    {puzzle.difficulty <= 2 ? 'BASIC' :
                     puzzle.difficulty <= 3 ? 'SECURED' :
                     puzzle.difficulty <= 4 ? 'FORTIFIED' : 'MAXIMUM'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    LEVEL {puzzle.difficulty}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            {/* Animated Entry Button */}
            <div className="relative inline-block">
              {/* Glowing Effect - Behind button */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-600 rounded-lg blur-xl opacity-30 animate-pulse scale-110 pointer-events-none"></div>
              
              <button
                onClick={startGame}
                className="relative z-20 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white font-bold py-6 px-16 rounded-lg text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-yellow-400/50 font-mono cursor-pointer"
              >
                <span className="relative z-30 pointer-events-none">🔓 INITIATE ESCAPE SEQUENCE</span>
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 opacity-30 animate-pulse pointer-events-none"></div>
              </button>
            </div>
            
            <div className="mt-4 text-yellow-300 font-mono text-sm animate-bounce">
              ⚠️ WARNING: HIGH SECURITY ZONE DETECTED ⚠️
            </div>
            
            {/* Backup Simple Button for Testing */}
            <div className="mt-8">
              <button
                onClick={startGame}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
              >
                Simple Start (Backup)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState.gameCompleted) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Victory Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900"></div>
        
        {/* Animated Success Effects */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto p-8 text-white text-center">
          {/* Victory Animation */}
          <div className="mb-8">
            {/* Open Door Animation */}
            <div className="w-64 h-64 mx-auto relative mb-8">
              {/* Door Frame */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg border-4 border-green-400 shadow-2xl">
                <div className="absolute inset-0 bg-green-400/20 rounded animate-pulse"></div>
              </div>
              {/* Open Door */}
              <div className="absolute inset-2 bg-gradient-to-b from-green-100 to-green-300 rounded border-2 border-green-400">
                {/* Exit Light */}
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-200 to-white rounded animate-pulse"></div>
                {/* Success Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl animate-bounce">🎉</div>
                </div>
              </div>
              {/* Glowing Effect */}
              <div className="absolute inset-0 bg-green-400 opacity-30 rounded-lg animate-pulse scale-110"></div>
            </div>
          </div>

          <div className="text-8xl mb-6 animate-bounce">🏆</div>
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-green-300 to-emerald-300 bg-clip-text text-transparent animate-pulse font-mono">
            MISSION COMPLETE!
          </h1>
          <div className="text-3xl text-green-400 font-bold mb-4 animate-pulse font-mono">
            🚨 LABORATORY LOCKDOWN DEACTIVATED 🚨
          </div>
          <p className="text-2xl text-green-200 mb-8 max-w-4xl mx-auto">
            <span className="text-yellow-300 font-bold">CONGRATULATIONS, AGENT!</span> You've successfully breached Dr. Data's security system and escaped the laboratory! 
            Your mastery of variable types has proven you're ready for any data challenge!
          </p>
          
          <div className="bg-black/30 rounded-lg p-8 mb-8 backdrop-blur-sm border border-green-500/30">
            <h2 className="text-2xl font-bold text-green-300 mb-4">🏆 Escape Statistics</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-300">{formatTime(gameState.timeElapsed)}</div>
                <div className="text-green-200">Total Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-300">{puzzles.length}</div>
                <div className="text-green-200">Puzzles Solved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-300">100%</div>
                <div className="text-green-200">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-6 mb-8 backdrop-blur-sm border border-green-500/30">
            <h3 className="text-xl font-bold text-green-300 mb-4">🎓 What You've Mastered</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <ul className="space-y-2 text-green-200">
                <li>✅ Identifier Variables</li>
                <li>✅ Categorical - Nominal</li>
                <li>✅ Categorical - Ordinal</li>
              </ul>
              <ul className="space-y-2 text-green-200">
                <li>✅ Quantitative - Discrete</li>
                <li>✅ Quantitative - Continuous</li>
                <li>✅ Real-world Applications</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-all"
            >
              🔄 Play Again
            </button>
            <Link
              href="/chapters/1"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all"
            >
              📚 Back to Lessons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentPuzzle = puzzles[gameState.currentPuzzle];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/chapters/1" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-all transform hover:scale-105 font-mono">
            <span className="animate-pulse">🚨</span> ABORT MISSION
          </Link>
          <div className="text-right bg-black/50 rounded-lg p-4 border border-red-500/30">
            <div className="text-sm text-red-300 font-mono">⏱️ ELAPSED TIME</div>
            <div className="text-3xl font-mono font-bold text-red-400 animate-pulse">
              {formatTime(gameState.timeElapsed)}
            </div>
          </div>
        </div>

        {/* Security Progress Dashboard */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-6 mb-8 border-2 border-cyan-500/50 relative overflow-hidden">
          {/* Scanner Line Effect */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-cyan-400 font-mono flex items-center gap-3">
              <span className="animate-spin">🔄</span> SECURITY BREACH PROGRESS
            </h2>
            <div className="bg-black/70 rounded-lg p-3 border border-green-500/30">
              <div className="text-sm text-green-400 font-mono">PUZZLES SOLVED</div>
              <div className="text-2xl font-bold text-green-400 font-mono">
                {gameState.solvedPuzzles.length}/{puzzles.length}
              </div>
            </div>
          </div>
          
          {/* Visual Progress Bars */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            {puzzles.map((puzzle, index) => (
              <div key={puzzle.id} className="text-center">
                <div className={`h-12 rounded border-2 transition-all duration-500 ${
                  gameState.solvedPuzzles.includes(index)
                    ? 'bg-green-500 border-green-400 animate-pulse'
                    : index === gameState.currentPuzzle
                      ? 'bg-yellow-500 border-yellow-400 animate-bounce'
                      : 'bg-gray-700 border-gray-600'
                }`}>
                  <div className="h-full flex items-center justify-center text-white font-bold">
                    {gameState.solvedPuzzles.includes(index) ? '✓' :
                     index === gameState.currentPuzzle ? '⚡' : (index + 1)}
                  </div>
                </div>
                <div className={`text-xs mt-2 font-mono ${
                  gameState.solvedPuzzles.includes(index) ? 'text-green-400' :
                  index === gameState.currentPuzzle ? 'text-yellow-400' : 'text-gray-500'
                }`}>
                  {gameState.solvedPuzzles.includes(index) ? 'BREACHED' :
                   index === gameState.currentPuzzle ? 'ACTIVE' : 'LOCKED'}
                </div>
              </div>
            ))}
          </div>
          
          {/* Overall Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-4 border border-gray-600">
            <div
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full transition-all duration-1000 relative overflow-hidden"
              style={{ width: `${((gameState.currentPuzzle + 1) / puzzles.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div className="text-center mt-2 text-cyan-300 font-mono text-sm">
            SECURITY BREACH: {Math.round(((gameState.currentPuzzle + 1) / puzzles.length) * 100)}%
          </div>
        </div>

        {/* Current Puzzle */}
        <div className="bg-black/30 rounded-lg p-8 backdrop-blur-sm border border-purple-500/30">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-3">
              🔐 {currentPuzzle.title}
            </h2>
            <div className="bg-purple-800/30 rounded-lg p-4 mb-6">
              <p className="text-purple-100 italic">
                "{currentPuzzle.story}"
              </p>
            </div>
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              {currentPuzzle.question}
            </h3>
          </div>

          {/* Puzzle Content */}
          <div className="mb-8">
            {currentPuzzle.type === 'multiple-choice' && (
              <div className="space-y-3">
                {currentPuzzle.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => !gameState.lastFeedback && setSelectedAnswer(option)}
                    disabled={!!gameState.lastFeedback}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === option
                        ? gameState.lastFeedback
                          ? selectedAnswer === currentPuzzle.correctAnswer
                            ? 'border-green-500 bg-green-900/50 text-green-200'
                            : 'border-red-500 bg-red-900/50 text-red-200'
                          : 'border-purple-400 bg-purple-800/50'
                        : gameState.lastFeedback && option === currentPuzzle.correctAnswer
                          ? 'border-green-500 bg-green-900/50 text-green-200'
                          : 'border-purple-600/50 bg-purple-900/30 hover:border-purple-400'
                    } ${gameState.lastFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentPuzzle.type === 'table-analysis' && currentPuzzle.data && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-4">
                  {currentPuzzle.data.title}
                </h4>
                <div className="overflow-x-auto bg-black/50 rounded-lg border border-purple-500/30">
                  <table className="min-w-full">
                    <thead className="bg-purple-800/50">
                      <tr>
                        {currentPuzzle.data.headers.map((header: string, index: number) => (
                          <th 
                            key={index} 
                            className={`px-4 py-3 text-left text-sm font-semibold border-b border-purple-500/30 ${
                              index === currentPuzzle.data.highlightColumn 
                                ? 'bg-yellow-600/50 text-yellow-200' 
                                : 'text-purple-200'
                            }`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentPuzzle.data.rows.map((row: any[], rowIndex: number) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-purple-900/20' : 'bg-purple-900/40'}>
                          {row.map((cell: any, cellIndex: number) => (
                            <td 
                              key={cellIndex} 
                              className={`px-4 py-3 text-sm border-b border-purple-500/20 font-mono ${
                                cellIndex === currentPuzzle.data.highlightColumn
                                  ? 'bg-yellow-600/30 text-yellow-200 font-bold'
                                  : 'text-purple-100'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="space-y-3 mt-6">
                  {currentPuzzle.options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => !gameState.lastFeedback && setSelectedAnswer(option)}
                      disabled={!!gameState.lastFeedback}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === option
                          ? gameState.lastFeedback
                            ? selectedAnswer === currentPuzzle.correctAnswer
                              ? 'border-green-500 bg-green-900/50 text-green-200'
                              : 'border-red-500 bg-red-900/50 text-red-200'
                            : 'border-purple-400 bg-purple-800/50'
                          : gameState.lastFeedback && option === currentPuzzle.correctAnswer
                            ? 'border-green-500 bg-green-900/50 text-green-200'
                            : 'border-purple-600/50 bg-purple-900/30 hover:border-purple-400'
                      } ${gameState.lastFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentPuzzle.type === 'drag-drop' && currentPuzzle.data && (
              <div>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Variables to drag */}
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-4">Variables to Classify:</h4>
                    <div className="space-y-3">
                      {currentPuzzle.data.variables.map((variable: string) => (
                        <div
                          key={variable}
                          draggable={!gameState.lastFeedback}
                          onDragStart={(e) => handleDragStart(e, variable)}
                          className={`p-3 rounded-lg border-2 cursor-move transition-all ${
                            draggedItems[variable] 
                              ? 'border-green-500 bg-green-900/30 text-green-200'
                              : 'border-purple-500 bg-purple-800/50 text-purple-200 hover:border-purple-400'
                          } ${gameState.lastFeedback ? 'cursor-not-allowed opacity-75' : ''}`}
                        >
                          🔸 {variable}
                          {draggedItems[variable] && (
                            <div className="text-sm text-green-300 mt-1">
                              → {draggedItems[variable]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Drop zones */}
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-4">Categories:</h4>
                    <div className="space-y-3">
                      {currentPuzzle.data.categories.map((category: string) => (
                        <div
                          key={category}
                          onDragOver={handleDragOver}
                          onDrop={(e) => !gameState.lastFeedback && handleDrop(e, category)}
                          className="p-4 rounded-lg border-2 border-dashed border-blue-500/50 bg-blue-900/20 min-h-[60px] transition-all hover:border-blue-400/70 hover:bg-blue-900/30"
                        >
                          <div className="font-semibold text-blue-300 mb-2">{category}</div>
                          <div className="space-y-1">
                            {Object.entries(draggedItems)
                              .filter(([_, cat]) => cat === category)
                              .map(([variable, _]) => (
                                <div key={variable} className="text-sm text-blue-200 bg-blue-800/50 rounded px-2 py-1">
                                  {variable}
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPuzzle.type === 'code-analysis' && currentPuzzle.data && (
              <div className="mb-6">
                <div className="bg-gray-900 rounded-lg p-4 mb-6 border border-gray-600">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{currentPuzzle.data.code}</code>
                  </pre>
                </div>
                <div className="space-y-3">
                  {currentPuzzle.options?.map((option) => (
                    <button
                      key={option}
                      onClick={() => !gameState.lastFeedback && setSelectedAnswer(option)}
                      disabled={!!gameState.lastFeedback}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === option
                          ? gameState.lastFeedback
                            ? selectedAnswer === currentPuzzle.correctAnswer
                              ? 'border-green-500 bg-green-900/50 text-green-200'
                              : 'border-red-500 bg-red-900/50 text-red-200'
                            : 'border-purple-400 bg-purple-800/50'
                          : gameState.lastFeedback && option === currentPuzzle.correctAnswer
                            ? 'border-green-500 bg-green-900/50 text-green-200'
                            : 'border-purple-600/50 bg-purple-900/30 hover:border-purple-400'
                      } ${gameState.lastFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hint */}
          {gameState.showHint && !gameState.lastFeedback && (
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">💡</span>
                <span className="font-semibold text-yellow-300">Hint:</span>
              </div>
              <p className="text-yellow-100">{currentPuzzle.hint}</p>
            </div>
          )}

          {/* Controls */}
          {!gameState.lastFeedback && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setGameState(prev => ({ ...prev, showHint: !prev.showHint }))}
                className="text-yellow-300 hover:text-yellow-100 transition-colors flex items-center gap-2"
              >
                💡 {gameState.showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              <button
                onClick={handleAnswerSubmit}
                disabled={
                  (currentPuzzle.type === 'drag-drop' 
                    ? Object.keys(draggedItems).length !== currentPuzzle.data.variables.length
                    : !selectedAnswer) || !!gameState.lastFeedback
                }
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all"
              >
                🔓 Unlock Next Area
              </button>
            </div>
          )}

          {/* Feedback */}
          {gameState.lastFeedback && (
            <div className={`p-6 rounded-lg border-2 ${
              gameState.lastFeedback.isCorrect 
                ? 'border-green-500 bg-green-900/30' 
                : 'border-red-500 bg-red-900/30'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">
                  {gameState.lastFeedback.isCorrect ? '🎉' : '❌'}
                </span>
                <span className={`font-bold text-xl ${
                  gameState.lastFeedback.isCorrect ? 'text-green-300' : 'text-red-300'
                }`}>
                  {gameState.lastFeedback.isCorrect ? 'Puzzle Solved!' : 'Try Again!'}
                </span>
              </div>
              <p className={`text-lg ${
                gameState.lastFeedback.isCorrect ? 'text-green-200' : 'text-red-200'
              }`}>
                {gameState.lastFeedback.message}
              </p>
              {gameState.lastFeedback.isCorrect && (
                <div className="mt-4 text-green-300 font-semibold">
                  🚪 Moving to the next area...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
