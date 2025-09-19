"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface ScatterplotExample {
  name: string;
  context: string;
  xVariable: string;
  yVariable: string;
  xUnit: string;
  yUnit: string;
  data: Array<{ x: number; y: number }>;
  direction: 'positive' | 'negative' | 'none';
  strength: 'strong' | 'moderate' | 'weak';
  form: 'linear' | 'curved' | 'none';
  interpretation: string;
  practicalImplication: string;
  correlation?: number;
}

interface Challenge {
  id: number;
  scenario: string;
  plotDescription: string;
  questionType: 'direction' | 'strength' | 'form' | 'interpretation';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  skillFocus: string;
  data: Array<{ x: number; y: number }>;
  xLabel: string;
  yLabel: string;
  direction: 'positive' | 'negative' | 'none';
  strength: 'strong' | 'moderate' | 'weak';
  form: 'linear' | 'curved' | 'none';
}

// Simple canvas-based scatter plot component
const ScatterPlot = ({ data, xLabel, yLabel, title, direction, strength, form }: {
  data: Array<{ x: number; y: number }>;
  xLabel: string;
  yLabel: string;
  title: string;
  direction: string;
  strength: string;
  form: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up dimensions
    const padding = 60;
    const width = canvas.width - 2 * padding;
    const height = canvas.height - 2 * padding;

    // Find data ranges
    const xMin = Math.min(...data.map(p => p.x));
    const xMax = Math.max(...data.map(p => p.x));
    const yMin = Math.min(...data.map(p => p.y));
    const yMax = Math.max(...data.map(p => p.y));

    // Add some padding to ranges
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const xPadding = xRange * 0.1;
    const yPadding = yRange * 0.1;

    const xStart = xMin - xPadding;
    const xEnd = xMax + xPadding;
    const yStart = yMin - yPadding;
    const yEnd = yMax + yPadding;

    // Helper functions
    const scaleX = (x: number) => padding + ((x - xStart) / (xEnd - xStart)) * width;
    const scaleY = (y: number) => canvas.height - padding - ((y - yStart) / (yEnd - yStart)) * height;

    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    // Draw grid lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 1; i < 5; i++) {
      const x = padding + (width * i) / 5;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 1; i < 5; i++) {
      const y = padding + (height * i) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw data points
    ctx.fillStyle = direction === 'positive' ? '#10B981' : 
                   direction === 'negative' ? '#EF4444' : '#6B7280';
    
    data.forEach(point => {
      ctx.beginPath();
      ctx.arc(scaleX(point.x), scaleY(point.y), 6, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Always draw trend line for relationships (even weak ones and curved ones for educational purposes)
    // Also draw for "none" direction if it's the Student ID example to show how meaningless the line is
    if (direction !== 'none' || title.includes('Student ID')) {
      // Simple linear regression for all relationships (even curved ones - to show r measures linear fit)
      const n = data.length;
      const sumX = data.reduce((sum, p) => sum + p.x, 0);
      const sumY = data.reduce((sum, p) => sum + p.y, 0);
      const sumXY = data.reduce((sum, p) => sum + p.x * p.y, 0);
      const sumX2 = data.reduce((sum, p) => sum + p.x * p.x, 0);
      
      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;
      
      const startY = slope * xStart + intercept;
      const endY = slope * xEnd + intercept;
      
      // Color and style based on direction and strength
      ctx.strokeStyle = direction === 'positive' ? '#059669' : 
                       direction === 'negative' ? '#DC2626' : '#6B7280';
      ctx.lineWidth = strength === 'strong' ? 3 : strength === 'moderate' ? 2.5 : 2;
      
      // Different line styles for different relationship types
      if (strength === 'weak' || direction === 'none') {
        // Dashed line for weak relationships or no relationship
        ctx.setLineDash([10, 5]);
      } else if (form === 'curved') {
        // Dotted line for curved relationships (shows linear fit doesn't capture the curve)
        ctx.setLineDash([5, 5]);
      }
      
      ctx.beginPath();
      ctx.moveTo(scaleX(xStart), scaleY(startY));
      ctx.lineTo(scaleX(xEnd), scaleY(endY));
      ctx.stroke();
      
      // Reset line dash
      ctx.setLineDash([]);
    }

    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = '14px system-ui';
    ctx.textAlign = 'center';
    
    // X-axis label
    ctx.fillText(xLabel, canvas.width / 2, canvas.height - 20);
    
    // Y-axis label
    ctx.save();
    ctx.translate(20, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();

    // Title
    ctx.font = '16px system-ui';
    ctx.fillText(title, canvas.width / 2, 30);

  }, [data, xLabel, yLabel, title, direction, form]);

  return (
    <div className="bg-white p-4 rounded-lg border">
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="w-full max-w-md mx-auto"
        style={{ maxHeight: '300px' }}
      />
      <div className="text-center mt-4 space-y-2">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-semibold">Direction:</span>
            <div className={`capitalize ${
              direction === 'positive' ? 'text-green-600' :
              direction === 'negative' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {direction}
            </div>
          </div>
          <div>
            <span className="font-semibold">Form:</span>
            <div className="text-blue-600 capitalize">{form}</div>
          </div>
          <div>
            <span className="font-semibold">Strength:</span>
            <div className={`capitalize ${
              strength === 'strong' ? 'text-green-600' :
              strength === 'moderate' ? 'text-orange-600' : 'text-red-600'
            }`}>
              {strength}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Scatterplots() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const examples: ScatterplotExample[] = [
    {
      name: "Study Time vs Test Scores",
      context: "Students tracking study hours and exam performance",
      xVariable: "Study Hours",
      yVariable: "Test Score",
      xUnit: "hours",
      yUnit: "points",
      data: [
        { x: 2, y: 65 }, { x: 4, y: 72 }, { x: 6, y: 78 }, { x: 8, y: 85 },
        { x: 10, y: 90 }, { x: 3, y: 68 }, { x: 5, y: 75 }, { x: 7, y: 82 },
        { x: 9, y: 88 }, { x: 1, y: 60 }, { x: 11, y: 92 }, { x: 12, y: 95 }
      ],
      direction: 'positive',
      strength: 'strong',
      form: 'linear',
      interpretation: "Strong positive linear relationship: more study time consistently leads to higher test scores.",
      practicalImplication: "Students can expect approximately 3-4 point improvement per additional study hour.",
      correlation: 0.95
    },
    {
      name: "Car Age vs Value",
      context: "Used car marketplace data showing depreciation",
      xVariable: "Car Age",
      yVariable: "Market Value",
      xUnit: "years",
      yUnit: "thousands $",
      data: [
        { x: 1, y: 28 }, { x: 2, y: 24 }, { x: 3, y: 20 }, { x: 4, y: 17 },
        { x: 5, y: 14 }, { x: 6, y: 12 }, { x: 7, y: 10 }, { x: 8, y: 8 },
        { x: 9, y: 7 }, { x: 10, y: 6 }, { x: 11, y: 5 }, { x: 12, y: 4 }
      ],
      direction: 'negative',
      strength: 'strong',
      form: 'linear',
      interpretation: "Strong negative linear relationship: as cars age, their market value decreases consistently.",
      practicalImplication: "Cars lose approximately $2,000-2,500 in value per year on average.",
      correlation: -0.92
    },
    {
      name: "Height vs Shoe Size",
      context: "Adult height and shoe size correlation study",
      xVariable: "Height",
      yVariable: "Shoe Size",
      xUnit: "inches",
      yUnit: "US size",
      data: [
        { x: 60, y: 7.5 }, { x: 62, y: 6.8 }, { x: 64, y: 9.2 }, { x: 66, y: 8.1 },
        { x: 68, y: 10.5 }, { x: 70, y: 9.8 }, { x: 72, y: 11.7 }, { x: 74, y: 12.3 },
        { x: 61, y: 6.2 }, { x: 63, y: 8.7 }, { x: 65, y: 7.9 }, { x: 67, y: 10.8 },
        { x: 69, y: 9.4 }, { x: 71, y: 12.1 }, { x: 73, y: 11.0 }, { x: 75, y: 13.2 }
      ],
      direction: 'positive',
      strength: 'moderate',
      form: 'linear',
      interpretation: "Moderate positive linear relationship: taller people tend to have larger shoe sizes, but with individual variation.",
      practicalImplication: "Height gives a reasonable prediction of shoe size, but there's noticeable individual variation.",
      correlation: 0.65
    },
    {
      name: "Exercise vs Resting Heart Rate",
      context: "Weekly exercise hours vs resting heart rate (curved relationship)",
      xVariable: "Exercise Hours/Week",
      yVariable: "Resting Heart Rate",
      xUnit: "hours",
      yUnit: "bpm",
      data: [
        { x: 0, y: 85 }, { x: 2, y: 72 }, { x: 4, y: 64 }, { x: 6, y: 60 },
        { x: 8, y: 58 }, { x: 10, y: 57 }, { x: 12, y: 57 }, { x: 1, y: 78 },
        { x: 3, y: 68 }, { x: 5, y: 62 }, { x: 7, y: 59 }, { x: 9, y: 58 },
        { x: 14, y: 58 }, { x: 16, y: 59 }, { x: 18, y: 61 }, { x: 20, y: 64 }
      ],
      direction: 'negative',
      strength: 'strong',
      form: 'curved',
      interpretation: "Strong curved relationship: exercise improves heart rate with diminishing returns, then plateaus, and excessive exercise may increase it.",
      practicalImplication: "Exercise benefits heart rate most in early hours (0-10), with minimal additional benefit beyond 12 hours, and potential negative effects with overtraining.",
      correlation: -0.65
    },
    {
      name: "Income vs Happiness",
      context: "Annual income vs happiness survey scores",
      xVariable: "Annual Income",
      yVariable: "Happiness Score",
      xUnit: "thousands $",
      yUnit: "scale 1-10",
      data: [
        { x: 30, y: 5.2 }, { x: 45, y: 6.1 }, { x: 60, y: 6.8 }, { x: 75, y: 7.0 },
        { x: 90, y: 7.3 }, { x: 105, y: 7.1 }, { x: 35, y: 4.8 }, { x: 50, y: 7.2 },
        { x: 65, y: 5.9 }, { x: 80, y: 8.1 }, { x: 95, y: 6.5 }, { x: 110, y: 7.8 },
        { x: 40, y: 6.7 }, { x: 55, y: 5.4 }, { x: 70, y: 7.9 }, { x: 85, y: 6.2 }
      ],
      direction: 'positive',
      strength: 'weak',
      form: 'linear',
      interpretation: "Weak positive linear relationship: higher income is slightly associated with higher happiness, but with lots of scatter.",
      practicalImplication: "Money has some association with happiness, but many other factors are more important.",
      correlation: 0.35
    },
    {
      name: "Student ID vs GPA",
      context: "Random student ID numbers vs academic performance",
      xVariable: "Student ID",
      yVariable: "GPA",
      xUnit: "ID number",
      yUnit: "GPA",
      data: [
        { x: 1001, y: 3.2 }, { x: 1005, y: 2.8 }, { x: 1010, y: 3.7 }, { x: 1015, y: 2.9 },
        { x: 1020, y: 3.5 }, { x: 1025, y: 3.1 }, { x: 1030, y: 2.6 }, { x: 1035, y: 3.8 },
        { x: 1040, y: 3.0 }, { x: 1045, y: 3.4 }, { x: 1050, y: 2.7 }, { x: 1055, y: 3.6 }
      ],
      direction: 'none',
      strength: 'weak',
      form: 'none',
      interpretation: "No relationship: points are randomly scattered with no discernible pattern.",
      practicalImplication: "ID numbers are assigned arbitrarily and have no logical connection to academic performance.",
      correlation: 0.02
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      scenario: "Student GPA vs Hours of Sleep",
      plotDescription: "Points generally trend upward from left to right, with students getting more sleep having higher GPAs",
      questionType: 'direction',
      question: "What is the direction of the relationship between hours of sleep and GPA?",
      options: [
        "Positive - more sleep is associated with higher GPA",
        "Negative - more sleep is associated with lower GPA",
        "No relationship - sleep and GPA are unrelated",
        "Cannot determine from the description"
      ],
      correctAnswer: "Positive - more sleep is associated with higher GPA",
      explanation: "When points trend upward from left to right, it indicates a positive relationship. As one variable increases (sleep), the other variable also increases (GPA).",
      skillFocus: "Identifying positive relationships from scatterplot patterns",
      data: [
        { x: 4, y: 2.1 }, { x: 5, y: 2.4 }, { x: 6, y: 2.8 }, { x: 7, y: 3.2 },
        { x: 8, y: 3.5 }, { x: 9, y: 3.7 }, { x: 5.5, y: 2.6 }, { x: 6.5, y: 3.0 },
        { x: 7.5, y: 3.4 }, { x: 8.5, y: 3.6 }, { x: 4.5, y: 2.3 }, { x: 7.2, y: 3.1 }
      ],
      xLabel: "Hours of Sleep",
      yLabel: "GPA",
      direction: 'positive',
      strength: 'strong',
      form: 'linear'
    },
    {
      id: 2,
      scenario: "Social Media Usage vs Face-to-Face Conversations",
      plotDescription: "Points show a clear downward trend, with heavy social media users having fewer in-person conversations",
      questionType: 'direction',
      question: "What type of relationship does this scatterplot show?",
      options: [
        "Positive relationship",
        "Negative relationship",
        "No relationship",
        "Curved relationship only"
      ],
      correctAnswer: "Negative relationship",
      explanation: "A downward trend indicates a negative relationship. As social media usage increases, face-to-face conversations decrease. This is the hallmark of a negative association.",
      skillFocus: "Recognizing negative relationships from downward trending patterns",
      data: [
        { x: 1, y: 45 }, { x: 2, y: 42 }, { x: 3, y: 38 }, { x: 4, y: 35 },
        { x: 5, y: 30 }, { x: 6, y: 28 }, { x: 7, y: 22 }, { x: 8, y: 18 },
        { x: 1.5, y: 43 }, { x: 2.5, y: 40 }, { x: 3.5, y: 36 }, { x: 4.5, y: 32 }
      ],
      xLabel: "Social Media Hours/Day",
      yLabel: "Face-to-Face Conversations/Week",
      direction: 'negative',
      strength: 'strong',
      form: 'linear'
    },
    {
      id: 3,
      scenario: "Advertising Spend vs Sales Revenue",
      plotDescription: "Points are tightly clustered around an upward sloping line with very little scatter",
      questionType: 'strength',
      question: "How would you describe the strength of this relationship?",
      options: [
        "Weak - lots of variability around the pattern",
        "Moderate - some scatter but clear pattern",
        "Strong - points closely follow the pattern with little scatter",
        "No relationship - points are randomly scattered"
      ],
      correctAnswer: "Strong - points closely follow the pattern with little scatter",
      explanation: "When points are tightly clustered around a clear pattern with little scatter, it indicates a strong relationship. You can predict sales revenue quite accurately from advertising spend.",
      skillFocus: "Assessing relationship strength based on how closely points follow a pattern",
      data: [
        { x: 10, y: 125 }, { x: 20, y: 148 }, { x: 30, y: 172 }, { x: 40, y: 195 },
        { x: 50, y: 220 }, { x: 60, y: 242 }, { x: 15, y: 137 }, { x: 25, y: 160 },
        { x: 35, y: 184 }, { x: 45, y: 208 }, { x: 55, y: 231 }, { x: 65, y: 255 }
      ],
      xLabel: "Advertising Spend ($1000s)",
      yLabel: "Sales Revenue ($1000s)",
      direction: 'positive',
      strength: 'strong',
      form: 'linear'
    },
    {
      id: 4,
      scenario: "Age vs Reaction Time",
      plotDescription: "Points show an upward curve that starts gradually and becomes steeper as age increases",
      questionType: 'form',
      question: "What is the form of this relationship?",
      options: [
        "Linear - points follow a straight line pattern",
        "Curved - points follow a curved, non-linear pattern",
        "No pattern - points are randomly distributed",
        "Clustered - points form distinct groups"
      ],
      correctAnswer: "Curved - points follow a curved, non-linear pattern",
      explanation: "When points follow a curved rather than straight-line pattern, the relationship is nonlinear or curved. Age-related changes often accelerate, creating curved relationships.",
      skillFocus: "Distinguishing between linear and curved relationship patterns",
      data: [
        { x: 20, y: 180 }, { x: 30, y: 185 }, { x: 40, y: 195 }, { x: 50, y: 210 },
        { x: 60, y: 235 }, { x: 70, y: 270 }, { x: 80, y: 320 }, { x: 25, y: 182 },
        { x: 35, y: 190 }, { x: 45, y: 202 }, { x: 55, y: 220 }, { x: 65, y: 250 }
      ],
      xLabel: "Age (years)",
      yLabel: "Reaction Time (ms)",
      direction: 'positive',
      strength: 'strong',
      form: 'curved'
    },
    {
      id: 5,
      scenario: "Employee ID Number vs Salary",
      plotDescription: "Points appear randomly scattered with no discernible pattern or trend",
      questionType: 'interpretation',
      question: "What can you conclude about this relationship?",
      options: [
        "Strong positive relationship exists",
        "Moderate negative relationship exists",
        "No meaningful relationship exists",
        "Curved relationship exists"
      ],
      correctAnswer: "No meaningful relationship exists",
      explanation: "Employee ID numbers are assigned arbitrarily and have no logical connection to salary. Random scatter with no pattern indicates no relationship between these variables.",
      skillFocus: "Recognizing when variables have no meaningful relationship",
      data: [
        { x: 1001, y: 45000 }, { x: 1005, y: 62000 }, { x: 1010, y: 38000 }, { x: 1015, y: 75000 },
        { x: 1020, y: 52000 }, { x: 1025, y: 41000 }, { x: 1030, y: 68000 }, { x: 1035, y: 58000 },
        { x: 1040, y: 47000 }, { x: 1045, y: 71000 }, { x: 1050, y: 43000 }, { x: 1055, y: 65000 }
      ],
      xLabel: "Employee ID",
      yLabel: "Salary ($)",
      direction: 'none',
      strength: 'weak',
      form: 'none'
    },
    {
      id: 6,
      scenario: "Hours Worked vs Job Satisfaction",
      plotDescription: "Points form an inverted U-shape, with satisfaction increasing up to about 40 hours then decreasing",
      questionType: 'interpretation',
      question: "What does this pattern suggest about work hours and satisfaction?",
      options: [
        "More work always leads to higher satisfaction",
        "Less work always leads to higher satisfaction",
        "There's an optimal amount of work for maximum satisfaction",
        "Work hours and satisfaction are unrelated"
      ],
      correctAnswer: "There's an optimal amount of work for maximum satisfaction",
      explanation: "An inverted U-shape indicates that moderate work hours (around 40) maximize satisfaction, while both too few and too many hours reduce satisfaction. This shows a nonlinear relationship with an optimal point.",
      skillFocus: "Interpreting complex curved relationships in real-world contexts",
      data: [
        { x: 10, y: 4.2 }, { x: 20, y: 6.1 }, { x: 30, y: 7.8 }, { x: 40, y: 8.5 },
        { x: 50, y: 7.9 }, { x: 60, y: 6.8 }, { x: 70, y: 5.2 }, { x: 15, y: 5.1 },
        { x: 25, y: 6.9 }, { x: 35, y: 8.2 }, { x: 45, y: 8.1 }, { x: 55, y: 7.3 }
      ],
      xLabel: "Hours Worked/Week",
      yLabel: "Job Satisfaction (1-10)",
      direction: 'positive',
      strength: 'strong',
      form: 'curved'
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setCurrentChallenge(0);
    setScore(0);
    setGameEnded(false);
    setShowFeedback(false);
    setSelectedAnswer('');
  };

  const handleSubmit = () => {
    const challenge = challenges[currentChallenge];
    const isCorrect = selectedAnswer === challenge.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(prev => prev + 1);
        setSelectedAnswer('');
      } else {
        setGameEnded(true);
      }
    }, 4000);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentChallenge(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedAnswer('');
  };

  if (gameStarted && !gameEnded) {
    const currentChallengeData = challenges[currentChallenge];

    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/chapters/6" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Correlation
            </Link>
          </div>

          {/* Game Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#58595b]">Scatterplot Expert</h1>
                <p className="text-gray-600">Challenge {currentChallenge + 1} of {challenges.length}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Score: <span className="font-bold">{score}</span></div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-[#ff8200] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Challenge */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#58595b] mb-4">
                📊 {currentChallengeData.scenario}
              </h2>
              
              {/* Scatterplot Visualization */}
              <div className="flex justify-center mb-6">
                <ScatterPlot
                  data={currentChallengeData.data}
                  xLabel={currentChallengeData.xLabel}
                  yLabel={currentChallengeData.yLabel}
                  title={currentChallengeData.scenario}
                  direction={currentChallengeData.direction}
                  strength={currentChallengeData.strength}
                  form={currentChallengeData.form}
                />
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="border-l-4 border-[#ff8200] pl-4">
                  <p className="font-medium text-[#58595b]">{currentChallengeData.question}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {currentChallengeData.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    selectedAnswer === option
                      ? 'border-[#ff8200] bg-[#fff4e6]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer || showFeedback}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  !selectedAnswer || showFeedback
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#ff8200] hover:bg-[#ff9933] text-white'
                }`}
              >
                Submit Answer
              </button>
            </div>
          </div>

          {/* Feedback Modal */}
          {showFeedback && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-lg w-full mx-4">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">
                    {selectedAnswer === currentChallengeData.correctAnswer ? '✅' : '❌'}
                  </div>
                  <h3 className="text-2xl font-bold text-[#58595b] mb-2">
                    {selectedAnswer === currentChallengeData.correctAnswer ? 'Excellent!' : 'Not Quite Right'}
                  </h3>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">💡 Explanation</h4>
                    <p className="text-blue-600 text-sm">{currentChallengeData.explanation}</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">🎯 Skill Focus</h4>
                    <p className="text-green-600 text-sm">{currentChallengeData.skillFocus}</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">Next challenge in 4 seconds...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  if (gameEnded) {
    return (
      <main className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/chapters/6" className="text-[#ff8200] hover:text-[#ff9933]">
              ← Back to Correlation
            </Link>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 5 ? '🎉' : score >= 4 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-[#58595b] mb-4">
              {score >= 5 ? 'Scatterplot Expert!' : score >= 4 ? 'Great Work!' : 'Keep Learning!'}
            </h1>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">{score}</div>
                <div className="text-sm text-gray-600">out of {challenges.length}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#58595b]">
                  {Math.round((score / challenges.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={restartGame}
                className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-6 rounded-lg mr-4"
              >
                Try Again
              </button>
              <Link
                href="/chapters/6"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg"
              >
                Next Topic
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const selectedScatterExample = examples[selectedExample];

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/6" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Correlation
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="scatterplot" className="text-4xl">📈</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Scatterplots: Direction, Form & Strength</h1>
              <p className="text-xl text-gray-600 mt-2">
                Master the foundation of correlation analysis! Learn to visualize and interpret relationships between two quantitative variables using the three key characteristics.
              </p>
            </div>
          </div>
        </div>

        {/* What Are Scatterplots */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎯 What Are Scatterplots?</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Your Relationship Detective Tool</h3>
                  <p className="text-yellow-600">
                    Scatterplots are graphs that show the relationship between two quantitative variables. Each point represents 
                    one observation, with its position determined by the values of both variables. They're the starting point 
                    for all correlation and regression analysis!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-blue-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-blue-700 mb-2">📏 Structure</h4>
                <ul className="text-blue-600 text-sm space-y-1">
                  <li>• X-axis: Explanatory variable</li>
                  <li>• Y-axis: Response variable</li>
                  <li>• Each point: One observation</li>
                  <li>• Pattern reveals relationship</li>
                </ul>
              </div>

              <div className="border border-green-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-green-700 mb-2">🔍 What to Look For</h4>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>• Direction: positive/negative</li>
                  <li>• Form: linear/curved</li>
                  <li>• Strength: strong/weak</li>
                  <li>• Outliers: unusual points</li>
                </ul>
              </div>

              <div className="border border-purple-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-purple-700 mb-2">💡 Why They Matter</h4>
                <ul className="text-purple-600 text-sm space-y-1">
                  <li>• Reveal hidden relationships</li>
                  <li>• Guide analysis decisions</li>
                  <li>• Identify outliers</li>
                  <li>• Support predictions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* The Three Key Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🔑 The Three Key Features Framework</h2>
          
          <div className="space-y-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🔑</span>
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Your Complete Analysis Toolkit</h3>
                  <p className="text-yellow-600">
                    Every scatterplot relationship can be completely described using just three characteristics: 
                    Direction (which way?), Form (what shape?), and Strength (how close?). Master these three, 
                    and you can analyze any relationship like a pro!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Direction */}
              <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">1️⃣ Direction</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-green-600 mb-2 text-center">📈 Positive</div>
                    <div className="text-sm text-gray-600 text-center">As X increases, Y increases</div>
                    <div className="text-xs text-green-600 mt-2 text-center italic">"Upward trend"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-red-600 mb-2 text-center">📉 Negative</div>
                    <div className="text-sm text-gray-600 text-center">As X increases, Y decreases</div>
                    <div className="text-xs text-red-600 mt-2 text-center italic">"Downward trend"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-gray-600 mb-2 text-center">➡️ None</div>
                    <div className="text-sm text-gray-600 text-center">No consistent direction</div>
                    <div className="text-xs text-gray-600 mt-2 text-center italic">"Random scatter"</div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-gradient-to-b from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">2️⃣ Form</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-blue-600 mb-2 text-center">📏 Linear</div>
                    <div className="text-sm text-gray-600 text-center">Points follow straight line</div>
                    <div className="text-xs text-blue-600 mt-2 text-center italic">"Constant rate of change"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-purple-600 mb-2 text-center">🌙 Curved</div>
                    <div className="text-sm text-gray-600 text-center">Points follow curved pattern</div>
                    <div className="text-xs text-purple-600 mt-2 text-center italic">"Rate of change varies"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-gray-600 mb-2 text-center">❓ No Pattern</div>
                    <div className="text-sm text-gray-600 text-center">No clear shape</div>
                    <div className="text-xs text-gray-600 mt-2 text-center italic">"Random arrangement"</div>
                  </div>
                </div>
              </div>

              {/* Strength */}
              <div className="bg-gradient-to-b from-orange-50 to-orange-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-orange-700 mb-4 text-center">3️⃣ Strength</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-green-600 mb-2 text-center">💪 Strong</div>
                    <div className="text-sm text-gray-600 text-center">Points close to pattern</div>
                    <div className="text-xs text-green-600 mt-2 text-center italic">"High predictability"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-orange-600 mb-2 text-center">👌 Moderate</div>
                    <div className="text-sm text-gray-600 text-center">Some scatter around pattern</div>
                    <div className="text-xs text-orange-600 mt-2 text-center italic">"Fair predictability"</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-red-600 mb-2 text-center">🤏 Weak</div>
                    <div className="text-sm text-gray-600 text-center">Lots of scatter</div>
                    <div className="text-xs text-red-600 mt-2 text-center italic">"Low predictability"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples with Visual Plots */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌍 Real Scatterplot Examples</h2>
          
          {/* Example Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedExample(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedExample === index
                    ? 'bg-[#ff8200] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {example.name}
              </button>
            ))}
          </div>

          {/* Selected Example Display */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#58595b] mb-2">{selectedScatterExample.name}</h3>
              <p className="text-gray-600 mb-4">{selectedScatterExample.context}</p>
            </div>

            {/* Scatterplot Visualization */}
            <div className="flex justify-center">
              <ScatterPlot
                data={selectedScatterExample.data}
                xLabel={`${selectedScatterExample.xVariable} (${selectedScatterExample.xUnit})`}
                yLabel={`${selectedScatterExample.yVariable} (${selectedScatterExample.yUnit})`}
                title={selectedScatterExample.name}
                direction={selectedScatterExample.direction}
                strength={selectedScatterExample.strength}
                form={selectedScatterExample.form}
              />
            </div>

            {/* Variables and Data Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-4">📊 Variable Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>X-Variable:</span>
                    <span className="font-bold">{selectedScatterExample.xVariable} ({selectedScatterExample.xUnit})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Y-Variable:</span>
                    <span className="font-bold">{selectedScatterExample.yVariable} ({selectedScatterExample.yUnit})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sample Size:</span>
                    <span className="font-bold">{selectedScatterExample.data.length} observations</span>
                  </div>
                  {selectedScatterExample.correlation && (
                    <div className="flex justify-between">
                      <span>Correlation (r):</span>
                      <span className="font-bold">{selectedScatterExample.correlation}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-4">🔍 Relationship Analysis</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Direction:</span>
                    <span className={`font-bold capitalize ${
                      selectedScatterExample.direction === 'positive' ? 'text-green-600' :
                      selectedScatterExample.direction === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>{selectedScatterExample.direction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Form:</span>
                    <span className="font-bold capitalize text-blue-600">{selectedScatterExample.form}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Strength:</span>
                    <span className={`font-bold capitalize ${
                      selectedScatterExample.strength === 'strong' ? 'text-green-600' :
                      selectedScatterExample.strength === 'moderate' ? 'text-orange-600' : 'text-red-600'
                    }`}>{selectedScatterExample.strength}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis and Implications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-700 mb-2">🔍 Interpretation</h4>
                <p className="text-blue-600 text-sm">{selectedScatterExample.interpretation}</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-2">💼 Practical Implication</h4>
                <p className="text-green-600 text-sm">{selectedScatterExample.practicalImplication}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Decision Tree */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🌳 Step-by-Step Analysis Process</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-[#58595b] mb-4">How to Analyze Any Scatterplot:</h3>
              <div className="space-y-6">
                
                {/* Step 1: Direction */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-700 mb-3">Step 1: Determine Direction 📊</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <strong className="text-green-600">Ask:</strong> "As X increases, what happens to Y?"
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-orange-600">Look for:</strong> Overall trend in the cloud of points
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-purple-600">Ignore:</strong> Individual points that don't follow the trend
                    </div>
                  </div>
                </div>

                {/* Step 2: Form */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-bold text-purple-700 mb-3">Step 2: Identify Form 🎨</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <strong className="text-blue-600">Linear:</strong> Could you draw a straight line through the pattern?
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-purple-600">Curved:</strong> Does the rate of change speed up or slow down?
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-gray-600">None:</strong> Is there any pattern at all?
                    </div>
                  </div>
                </div>

                {/* Step 3: Strength */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-bold text-orange-700 mb-3">Step 3: Assess Strength 💪</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <strong className="text-green-600">Strong:</strong> Points hug the pattern line closely
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-orange-600">Moderate:</strong> Clear pattern with some scatter
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong className="text-red-600">Weak:</strong> Pattern barely visible through the scatter
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Challenge */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#58595b] mb-6">🎮 Scatterplot Analysis Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">Master These Skills</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Analyze scatterplot patterns and relationships</li>
                <li>• Identify direction, form, and strength</li>
                <li>• Interpret relationships in real-world contexts</li>
                <li>• Make evidence-based conclusions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#58595b] mb-4">You'll Practice</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Visual pattern recognition</li>
                <li>• Relationship characterization</li>
                <li>• Data interpretation skills</li>
                <li>• Professional statistical analysis</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-[#ff8200] hover:bg-[#ff9933] text-white font-bold py-3 px-8 rounded-lg shadow transition-colors"
            >
              Master Scatterplot Analysis
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}