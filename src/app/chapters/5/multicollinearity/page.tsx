"use client";
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import ChapterNavigation from '@/app/components/ChapterNavigation';

type Statement = {
  id: string;
  text: string;
  isTrue: boolean;
  explanation: string;
};

export default function Multicollinearity() {
  const [statements] = useState<Statement[]>([
    { id: "1", text: "Increases the standard errors of the coefficients", isTrue: true, explanation: "Multicollinearity increases standard errors" },
    { id: "2", text: "Makes coefficients more sensitive to small changes in the data", isTrue: true, explanation: "Small data changes have bigger effects on coefficients" },
    { id: "3", text: "Affects the precision of coefficient estimates", isTrue: true, explanation: "Precision of estimates is reduced with high VIF" },
    { id: "4", text: "Is more problematic for descriptive modeling than predictive modeling", isTrue: true, explanation: "Descriptive models need precise coefficients" },
    { id: "A", text: "Makes the overall model invalid", isTrue: false, explanation: "The model can still make good predictions" },
    { id: "B", text: "Always leads to poor predictions", isTrue: false, explanation: "Predictive accuracy is generally not affected" },
    { id: "C", text: "Cannot be detected or measured", isTrue: false, explanation: "VIF is a reliable measure of multicollinearity" },
    { id: "D", text: "Affects all types of regression equally", isTrue: false, explanation: "More important in descriptive than predictive models" }
  ]);
  
  const [trueColumn, setTrueColumn] = useState<string[]>([]);
  const [falseColumn, setFalseColumn] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  
  const remainingStatements = statements.filter(s => 
    !trueColumn.includes(s.id) && !falseColumn.includes(s.id)
  );
  
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("statementId", id);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDropToTrue = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("statementId");
    if (!trueColumn.includes(id)) {
      setTrueColumn([...trueColumn, id]);
      if (falseColumn.includes(id)) {
        setFalseColumn(falseColumn.filter(i => i !== id));
      }
    }
  };
  
  const handleDropToFalse = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("statementId");
    if (!falseColumn.includes(id)) {
      setFalseColumn([...falseColumn, id]);
      if (trueColumn.includes(id)) {
        setTrueColumn(trueColumn.filter(i => i !== id));
      }
    }
  };
  
  const handleRemoveFromColumn = (id: string, column: 'true' | 'false') => {
    if (column === 'true') {
      setTrueColumn(trueColumn.filter(i => i !== id));
    } else {
      setFalseColumn(falseColumn.filter(i => i !== id));
    }
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
  };
  
  const handleReset = () => {
    setTrueColumn([]);
    setFalseColumn([]);
    setSubmitted(false);
  };
  
  const calculateScore = () => {
    let correct = 0;
    trueColumn.forEach(id => {
      const statement = statements.find(s => s.id === id);
      if (statement && statement.isTrue) {
        correct++;
      }
    });
    
    falseColumn.forEach(id => {
      const statement = statements.find(s => s.id === id);
      if (statement && !statement.isTrue) {
        correct++;
      }
    });
    
    return correct;
  };

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/chapters/5" className="text-[#ff8200] hover:text-[#ff9933]">
            ← Back to Multiple Regression
          </Link>
        </div>

        {/* Title Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#e7e7e7] rounded-lg p-4">
              <span role="img" aria-label="multicollinearity" className="text-4xl">🔄</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#58595b]">Multicollinearity</h1>
              <p className="text-xl text-gray-600 mt-2">Understanding correlated predictors in regression</p>
            </div>
          </div>
        </div>

        {/* Top Navigation */}
        <ChapterNavigation showBottomNavigation={false} />

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Party Food Analogy */}
          <section className="mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#f8f4e3] px-6 py-4">
                <h2 className="text-xl font-bold text-[#58595b]">Understanding Multicollinearity: The Party Food Analogy</h2>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#58595b] mb-3">🎉 Imagine You're Planning a Party</h3>
                  <p className="text-gray-700 mb-4">
                    You're hosting a party and asking friends to bring different types of food. Each person contributes something unique to make the party successful. 
                    But what happens when multiple people bring the same type of food?
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700 font-medium mb-2">
                      <strong>Multicollinearity is all about predictors bringing redundant information.</strong>
                    </p>
                    <p className="text-gray-700">
                      Just like having too many desserts at a party creates redundancy, having highly correlated predictors in regression 
                      means they're bringing similar information to "predict the party's success."
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#58595b] mb-3">Party Food Contributors & Their "VIF" Values</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left border">Person</th>
                          <th className="px-4 py-2 text-left border">Food Brought</th>
                          <th className="px-4 py-2 text-left border">VIF</th>
                          <th className="px-4 py-2 text-left border">Redundancy Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border">Sarah</td>
                          <td className="px-4 py-2 border">Pizza</td>
                          <td className="px-4 py-2 border text-green-600">1.2</td>
                          <td className="px-4 py-2 border text-green-600">Unique - No one else brought main dishes like this</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Mike</td>
                          <td className="px-4 py-2 border">Salad</td>
                          <td className="px-4 py-2 border text-green-600">1.5</td>
                          <td className="px-4 py-2 border text-green-600">Mostly unique - Healthy option, little overlap</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Emma</td>
                          <td className="px-4 py-2 border">Chocolate Cake</td>
                          <td className="px-4 py-2 border text-yellow-600">6.2</td>
                          <td className="px-4 py-2 border text-yellow-600">High redundancy - Jessica also brought dessert</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Jessica</td>
                          <td className="px-4 py-2 border">Brownies</td>
                          <td className="px-4 py-2 border text-red-600">8.7</td>
                          <td className="px-4 py-2 border text-red-600">Very high redundancy - Too similar to Emma's cake</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Alex</td>
                          <td className="px-4 py-2 border">Chips & Dip</td>
                          <td className="px-4 py-2 border text-green-600">2.1</td>
                          <td className="px-4 py-2 border text-green-600">Somewhat unique - Snack category</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Taylor</td>
                          <td className="px-4 py-2 border">Ice Cream</td>
                          <td className="px-4 py-2 border text-red-600">9.4</td>
                          <td className="px-4 py-2 border text-red-600">Extreme redundancy - Third dessert contributor!</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#58595b] mb-3">What This Means for Your Party (and Your Regression!)</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h5 className="font-semibold text-green-800 mb-2">✅ Low VIF (Good Diversity)</h5>
                      <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                        <li><strong>Sarah's Pizza (VIF 1.2):</strong> Brings unique main course value</li>
                        <li><strong>Mike's Salad (VIF 1.5):</strong> Adds healthy option no one else covered</li>
                        <li><strong>Alex's Chips (VIF 2.1):</strong> Provides snack category</li>
                      </ul>
                      <p className="text-green-700 text-sm mt-2 font-medium">
                        Each person contributes distinct information about what makes a party successful!
                      </p>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                      <h5 className="font-semibold text-red-800 mb-2">❌ High VIF (Too Much Redundancy)</h5>
                      <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                        <li><strong>Emma's Cake (VIF 6.2):</strong> Overlaps with other desserts</li>
                        <li><strong>Jessica's Brownies (VIF 8.7):</strong> Very similar to cake</li>
                        <li><strong>Taylor's Ice Cream (VIF 9.4):</strong> Third dessert - extreme overlap!</li>
                      </ul>
                      <p className="text-red-700 text-sm mt-2 font-medium">
                        Too many people bringing the same type of information (desserts)!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-yellow-800 mb-2">🔍 The Key Insight</h4>
                  <p className="text-yellow-700 mb-2">
                    When Jessica and Taylor show up with desserts, they're not adding much <em>new</em> information about what makes the party successful. 
                    Emma already covered the "sweet treats" category!
                  </p>
                  <p className="text-yellow-700 font-medium">
                    <strong>In regression terms:</strong> When predictors are highly correlated (high VIF), they're bringing redundant information. 
                    It becomes hard to determine who's <em>really</em> responsible for the party's success - Emma, Jessica, or Taylor?
                  </p>
                </div>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🎯 Bottom Line</h4>
                  <p className="text-blue-700">
                    <strong>Multicollinearity = Redundant Information.</strong> Just like you'd prefer diverse food contributions at your party, 
                    regression works best when each predictor brings unique, non-overlapping information to explain your outcome variable.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Drag and Drop Matching Activity */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#58595b] mb-4">Multicollinearity Myths vs. Reality</h2>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#f8f4e3] px-6 py-4">
                <h3 className="text-lg font-bold text-[#58595b]">Drag & Drop Activity</h3>
                <p className="text-gray-600 mt-1">Drag each statement to the TRUE or FALSE column</p>
              </div>
              
              <div className="p-6">
                <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2 font-medium">Key insight:</p>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="text-gray-700">
                      <strong>Multicollinearity does not invalidate a regression model.</strong> It affects how well we can interpret individual predictors, 
                      not the overall predictive performance of the model.
                    </p>
                  </div>
                </div>
                
                {!submitted && (
                  <>
                    <div className="mb-6">
                      <h4 className="font-semibold text-[#58595b] mb-3">Statements to Categorize:</h4>
                      <div className="flex flex-wrap gap-2">
                        {remainingStatements.map(statement => (
                          <div 
                            key={statement.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, statement.id)}
                            className="p-3 bg-gray-100 rounded-lg cursor-move border border-gray-300 hover:bg-gray-200 transition-colors"
                          >
                            {statement.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={handleDropToTrue}
                    className={`border-2 ${submitted ? (trueColumn.length === 4 ? 'border-green-500' : 'border-red-500') : 'border-blue-300'} rounded-lg p-4 min-h-[200px]`}
                  >
                    <h4 className="font-semibold text-[#58595b] mb-3 pb-2 border-b">TRUE about Multicollinearity</h4>
                    {trueColumn.length === 0 && !submitted && (
                      <div className="text-gray-500 italic text-center mt-8">Drop statements here</div>
                    )}
                    <ul className="space-y-3">
                      {trueColumn.map(id => {
                        const statement = statements.find(s => s.id === id);
                        if (!statement) return null;
                        
                        return (
                          <li 
                            key={id} 
                            className={`p-3 rounded-lg flex items-start ${
                              submitted 
                                ? statement.isTrue 
                                  ? 'bg-green-100 border border-green-300' 
                                  : 'bg-red-100 border border-red-300'
                                : 'bg-gray-50 border border-gray-300'
                            }`}
                          >
                            <span className={`inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full font-bold ${
                              submitted
                                ? statement.isTrue
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-200 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {statement.id}
                            </span>
                            <div className="flex-1">
                              <div>{statement.text}</div>
                              {submitted && (
                                <div className={`text-sm mt-1 ${statement.isTrue ? 'text-green-700' : 'text-red-700'}`}>
                                  {statement.isTrue ? '✓ Correct' : '✗ Incorrect - This is FALSE'}
                                </div>
                              )}
                            </div>
                            {!submitted && (
                              <button 
                                onClick={() => handleRemoveFromColumn(id, 'true')}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                              >
                                ✕
                              </button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={handleDropToFalse}
                    className={`border-2 ${submitted ? (falseColumn.length === 4 ? 'border-green-500' : 'border-red-500') : 'border-red-300'} rounded-lg p-4 min-h-[200px]`}
                  >
                    <h4 className="font-semibold text-[#58595b] mb-3 pb-2 border-b">FALSE about Multicollinearity</h4>
                    {falseColumn.length === 0 && !submitted && (
                      <div className="text-gray-500 italic text-center mt-8">Drop statements here</div>
                    )}
                    <ul className="space-y-3">
                      {falseColumn.map(id => {
                        const statement = statements.find(s => s.id === id);
                        if (!statement) return null;
                        
                        return (
                          <li 
                            key={id} 
                            className={`p-3 rounded-lg flex items-start ${
                              submitted 
                                ? !statement.isTrue 
                                  ? 'bg-green-100 border border-green-300' 
                                  : 'bg-red-100 border border-red-300'
                                : 'bg-gray-50 border border-gray-300'
                            }`}
                          >
                            <span className={`inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full font-bold ${
                              submitted
                                ? !statement.isTrue
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-200 text-red-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {statement.id}
                            </span>
                            <div className="flex-1">
                              <div>{statement.text}</div>
                              {submitted && (
                                <div className={`text-sm mt-1 ${!statement.isTrue ? 'text-green-700' : 'text-red-700'}`}>
                                  {!statement.isTrue ? '✓ Correct' : '✗ Incorrect - This is TRUE'}
                                </div>
                              )}
                            </div>
                            {!submitted && (
                              <button 
                                onClick={() => handleRemoveFromColumn(id, 'false')}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                              >
                                ✕
                              </button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mb-6">
                  {!submitted ? (
                    <button
                      onClick={handleSubmit}
                      disabled={trueColumn.length + falseColumn.length !== 8}
                      className={`px-6 py-2 rounded-lg font-medium ${
                        trueColumn.length + falseColumn.length === 8
                          ? 'bg-[#ff8200] text-white hover:bg-[#ff9933]'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={handleReset}
                      className="px-6 py-2 rounded-lg font-medium bg-gray-700 text-white hover:bg-gray-600"
                    >
                      Try Again
                    </button>
                  )}
                </div>
                
                {submitted && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#58595b] mb-3">Results</h4>
                    <div className="mb-4">
                      <p className="text-lg font-medium">
                        Score: <span className={`font-bold ${calculateScore() === 8 ? 'text-green-600' : calculateScore() >= 6 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {calculateScore()} / 8
                        </span>
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">True Statements:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600 text-sm">
                          <li>1: Multicollinearity increases standard errors</li>
                          <li>2: Small data changes have bigger effects on coefficients</li>
                          <li>3: Precision of estimates is reduced with high VIF</li>
                          <li>4: Descriptive models need precise coefficients</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium">False Statements:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600 text-sm">
                          <li>A: The model can still make good predictions</li>
                          <li>B: Predictive accuracy is generally not affected</li>
                          <li>C: VIF is a reliable measure of multicollinearity</li>
                          <li>D: More important in descriptive than predictive models</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-gray-700">
                        <strong>Key takeaway:</strong> Multicollinearity primarily affects our ability to interpret 
                        individual predictors and is more problematic for descriptive modeling. It doesn't invalidate 
                        the model's overall predictive power.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <ChapterNavigation showBottomNavigation={true} />
      </div>
    </main>
  );
} 