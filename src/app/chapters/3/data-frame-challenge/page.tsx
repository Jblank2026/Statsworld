"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import ChapterNavigation from '../../../components/ChapterNavigation';

interface Challenge {
  id: number;
  title: string;
  task: string;
  correctAnswer: string;
  displayAnswer: string;
  explanation: string;
  hint: string;
}

export default function DataFrameChallenge() {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: string; message: string } | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [currentChallengeId, setCurrentChallengeId] = useState(1);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Create Data Frame",
      task: "Create a data frame named STUDENTS with three columns: Age (c(18, 19, 20)), Height (c(5.5, 6.0, 5.8)), and Weight (c(150, 160, 155)). Write the complete code to create this data frame.",
      correctAnswer: "AGE<-c(18,19,20)\nHEIGHT<-c(5.5,6.0,5.8)\nWEIGHT<-c(150,160,155)\nSTUDENTS<-data.frame(Age=AGE,Height=HEIGHT,Weight=WEIGHT)",
      displayAnswer: "AGE<-c(18,19,20)\nHEIGHT<-c(5.5,6.0,5.8)\nWEIGHT<-c(150,160,155)\nSTUDENTS<-data.frame(Age=AGE,Height=HEIGHT,Weight=WEIGHT)",
      explanation: "This code creates three vectors and combines them into a data frame with named columns.",
      hint: "First create three vectors (AGE, HEIGHT, WEIGHT), then use data.frame() to combine them."
    },
    {
      id: 2,
      title: "Check Dimensions",
      task: "Write the R command to display the number of rows and columns in the STUDENTS data frame.",
      correctAnswer: "dim(STUDENTS)",
      displayAnswer: "dim(STUDENTS)",
      explanation: "dim() returns a vector containing the number of rows and columns in the data frame.",
      hint: "Use dim() to get both dimensions at once."
    },
    {
      id: 3,
      title: "View First Rows",
      task: "Display the first 3 rows of the STUDENTS data frame.",
      correctAnswer: "head(STUDENTS,3)",
      displayAnswer: "head(STUDENTS,3)",
      explanation: "head() shows the first n rows of a data frame.",
      hint: "Use head() with two arguments: the data frame and number of rows."
    },
    {
      id: 4,
      title: "Select Column",
      task: "Select and display the Height column from the STUDENTS data frame.",
      correctAnswer: "STUDENTS$Height",
      displayAnswer: "STUDENTS$Height",
      explanation: "Use the $ operator to access a specific column in a data frame.",
      hint: "Use the $ operator followed by the column name."
    },
    {
      id: 5,
      title: "Rename Column",
      task: "Rename the Height column to Height_in_Feet in the STUDENTS data frame.",
      correctAnswer: "names(STUDENTS)[which(names(STUDENTS)==\"Height\")]<-\"Height_in_Feet\"",
      displayAnswer: "names(STUDENTS)[which(names(STUDENTS)==\"Height\")]<-\"Height_in_Feet\"",
      explanation: "This code finds the position of 'Height' in the column names and replaces it.",
      hint: "Use names() to access column names and which() to find the position."
    },
    {
      id: 6,
      title: "Add Column",
      task: "Add a BMI column to STUDENTS using the formula: BMI = 703 * Height / Weight^2",
      correctAnswer: "STUDENTS$BMI<-703*STUDENTS$Height_in_Feet/STUDENTS$Weight^2",
      displayAnswer: "STUDENTS$BMI<-703*STUDENTS$Height_in_Feet/STUDENTS$Weight^2",
      explanation: "Create a new column using $ and assign the calculated BMI values.",
      hint: "Use $ to reference existing columns and create the new BMI column."
    },
    {
      id: 7,
      title: "Remove Column",
      task: "Remove the BMI column from the STUDENTS data frame.",
      correctAnswer: "STUDENTS$BMI<-NULL",
      displayAnswer: "STUDENTS$BMI<-NULL",
      explanation: "Assign NULL to a column to remove it from the data frame.",
      hint: "Set the column to NULL using the $ operator."
    },
    {
      id: 8,
      title: "Subset Rows",
      task: "Subset and display rows where Age is greater than or equal to 19.",
      correctAnswer: "subset(STUDENTS,Age>=19)",
      displayAnswer: "subset(STUDENTS,Age>=19)",
      explanation: "subset() selects rows based on a logical condition.",
      hint: "Use subset() with the data frame and a logical condition."
    },
    {
      id: 9,
      title: "Create with Types",
      task: "Create a data frame named SURVEY with three columns: ID (numeric: 1,2,3), Response (character: \"Yes\",\"No\",\"Maybe\"), and Score (numeric: 4.5,3.2,5.0). Use stringsAsFactors=FALSE.",
      correctAnswer: "ID<-c(1,2,3)\nRESPONSE<-c(\"Yes\",\"No\",\"Maybe\")\nSCORE<-c(4.5,3.2,5.0)\nSURVEY<-data.frame(ID=ID,Response=RESPONSE,Score=SCORE,stringsAsFactors=FALSE)",
      displayAnswer: "ID<-c(1,2,3)\nRESPONSE<-c(\"Yes\",\"No\",\"Maybe\")\nSCORE<-c(4.5,3.2,5.0)\nSURVEY<-data.frame(ID=ID,Response=RESPONSE,Score=SCORE,stringsAsFactors=FALSE)",
      explanation: "Create vectors with appropriate types and use stringsAsFactors=FALSE to keep character columns as character type.",
      hint: "Create three vectors with correct types, then use data.frame() with stringsAsFactors=FALSE"
    },
    {
      id: 10,
      title: "Convert to Factor",
      task: "Convert the Response column in SURVEY to a factor type.",
      correctAnswer: "SURVEY$Response<-as.factor(SURVEY$Response)",
      displayAnswer: "SURVEY$Response<-as.factor(SURVEY$Response)",
      explanation: "Use as.factor() to convert a character column to a factor type.",
      hint: "Use as.factor() on the Response column"
    },
    {
      id: 11,
      title: "Convert to Character",
      task: "Convert the Response column back to character type.",
      correctAnswer: "SURVEY$Response<-as.character(SURVEY$Response)",
      displayAnswer: "SURVEY$Response<-as.character(SURVEY$Response)",
      explanation: "Use as.character() to convert a factor column back to character type.",
      hint: "Use as.character() on the Response column"
    },
    {
      id: 12,
      title: "Check Column Types",
      task: "Display the data types of all columns in the SURVEY data frame.",
      correctAnswer: "str(SURVEY)",
      displayAnswer: "str(SURVEY)",
      explanation: "str() shows the structure of a data frame, including the data type of each column.",
      hint: "Use str() to see the structure and types of all columns"
    },
    {
      id: 13,
      title: "Find Element",
      task: "Given SURVEY data frame, find the Score value for ID 2.",
      correctAnswer: "SURVEY$Score[SURVEY$ID==2]",
      displayAnswer: "SURVEY$Score[SURVEY$ID==2]",
      explanation: "Use logical indexing with $ to find a specific element based on a condition in another column.",
      hint: "Use $ to access the Score column and logical indexing with ID==2"
    },
    {
      id: 14,
      title: "Multiple Elements",
      task: "Given SURVEY data frame, find all Scores where Response is \"Yes\".",
      correctAnswer: "SURVEY$Score[SURVEY$Response==\"Yes\"]",
      displayAnswer: "SURVEY$Score[SURVEY$Response==\"Yes\"]",
      explanation: "Use logical indexing to find elements in one column based on a condition in another column.",
      hint: "Use $ to access the Score column and logical indexing with Response==\"Yes\""
    },
    {
      id: 15,
      title: "Greater Than Search",
      task: "Given SURVEY data frame, find all Responses where Score is greater than 4.",
      correctAnswer: "SURVEY$Response[SURVEY$Score>4]",
      displayAnswer: "SURVEY$Response[SURVEY$Score>4]",
      explanation: "Use logical indexing to find elements in one column based on a numeric condition in another column.",
      hint: "Use $ to access the Response column and logical indexing with Score>4"
    },
    {
      id: 16,
      title: "Complex Search",
      task: "Given SURVEY data frame, find all Scores where ID is less than 3 AND Response is not \"No\".",
      correctAnswer: "SURVEY$Score[SURVEY$ID<3&SURVEY$Response!=\"No\"]",
      displayAnswer: "SURVEY$Score[SURVEY$ID<3&SURVEY$Response!=\"No\"]",
      explanation: "Combine multiple conditions with & to find elements that satisfy all conditions.",
      hint: "Use $ to access the Score column and combine conditions with &"
    }
  ];

  const currentChallenge = challenges.find(c => c.id === currentChallengeId) || challenges[0];

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });

    fire(0.2, {
      spread: 60
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
      startVelocity: 45
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setAnswer(prev => prev + '\n');
    }
  };

  const checkAnswer = async () => {
    if (isLoading) return;
    
    // Normalize answers by removing all whitespace and line breaks
    const normalizedUserAnswer = answer
      .replace(/[\s\n\r]+/g, '')
      .toLowerCase();
    
    const correctAnswers = currentChallenge.correctAnswer
      .split("||")
      .map(ans => ans.replace(/[\s\n\r]+/g, '').toLowerCase());

    const isCorrect = correctAnswers.some(ans => ans === normalizedUserAnswer);

    if (isCorrect) {
      setIsLoading(true);
      setFeedback({ type: "success", message: currentChallenge.explanation });
      if (!completedChallenges.includes(currentChallenge.id)) {
        const newCompletedChallenges = [...completedChallenges, currentChallenge.id];
        setCompletedChallenges(newCompletedChallenges);
        if (newCompletedChallenges.length === challenges.length) {
          setShowCompletionModal(true);
          triggerConfetti();
        }
      }
      setWrongAttempts(0);
      setTimeout(() => {
        setIsLoading(false);
        if (currentChallengeId < challenges.length) {
          setCurrentChallengeId(currentChallengeId + 1);
          setAnswer('');
          setFeedback(null);
        }
      }, 2000);
    } else {
      setFeedback({ type: "error", message: "Try again!" });
      setWrongAttempts(prev => prev + 1);
    }
  };

  const jumpToQuestion = (challengeId: number) => {
    setCurrentChallengeId(challengeId);
    setAnswer('');
    setFeedback(null);
    setWrongAttempts(0);
    setIsMenuOpen(false);
  };

  const restartGame = () => {
    setCompletedChallenges([]);
    setCurrentChallengeId(1);
    setAnswer('');
    setFeedback(null);
    setWrongAttempts(0);
    setShowCompletionModal(false);
  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Menu */}
        <div className="flex justify-end items-center mb-8">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </div>
          </button>
        </div>

        {/* Title and Challenge Content Combined */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="game" className="text-4xl">🎲</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Data Frame Challenge</h1>
              <p className="text-xl text-gray-600 mt-2">
                Practice creating and manipulating data frames in R!
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full mb-2">
            <div 
              className="h-2 bg-[#ff8200] rounded-full transition-all duration-300"
              style={{ width: `${(completedChallenges.length / challenges.length) * 100}%` }}
            />
          </div>
          <p className="text-gray-600 text-sm mb-8">
            Challenge {currentChallenge.id} of {challenges.length}
          </p>
          <p className="text-gray-600 text-sm mb-8">
            Completed: {completedChallenges.length} challenges
          </p>

          {/* Challenge */}
          <h2 className="text-2xl font-bold text-[#58595b] mb-4">
            {currentChallenge.task}
          </h2>

          <div className="space-y-4">
            <textarea
              value={answer}
              onChange={(e) => !isLoading && setAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your R code here..."
              rows={4}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8200] font-mono text-sm resize-none ${
                isLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
              }`}
              disabled={isLoading}
            />

            <div className="flex justify-between items-center">
              <button
                onClick={checkAnswer}
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#ff8200] hover:bg-[#ff9933]'
                }`}
              >
                {isLoading ? "Loading..." : "Check"}
              </button>

              <button
                onClick={() => setShowHint(!showHint)}
                className="text-[#ff8200] hover:text-[#ff9933]"
              >
                Show Hint
              </button>
            </div>

            {/* Hint Display */}
            {showHint && (
              <div className="mt-4 p-4 bg-[#fff4e6] rounded-lg">
                <p className="text-gray-700">{currentChallenge.hint}</p>
              </div>
            )}

            {/* Reveal Answer Button */}
            {wrongAttempts >= 3 && !showAnswer && (
              <button
                onClick={() => setShowAnswer(true)}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Reveal Answer
              </button>
            )}

            {/* Answer Display */}
            {wrongAttempts >= 3 && showAnswer && (
              <div className="mt-4 p-4 bg-[#fff4e6] rounded-lg">
                <p className="text-gray-700 mb-2">Need help? Here's the answer:</p>
                <pre className="font-mono text-sm bg-gray-100 p-2 rounded">
                  {currentChallenge.displayAnswer}
                </pre>
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <div
                className={`p-4 rounded-lg mt-4 whitespace-pre-wrap ${
                  feedback.type === "success" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {feedback.message}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg p-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#58595b]">Challenges</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {challenges.map(challenge => (
                <button
                  key={challenge.id}
                  onClick={() => jumpToQuestion(challenge.id)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    completedChallenges.includes(challenge.id)
                      ? 'bg-green-100 text-green-800'
                      : currentChallengeId === challenge.id
                      ? 'bg-[#ff8200] text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {challenge.id}. {challenge.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
                You've mastered data frames in R! Ready for another round?
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