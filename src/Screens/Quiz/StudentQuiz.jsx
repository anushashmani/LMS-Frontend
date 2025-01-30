import { useState, useEffect } from 'react';
import { quizData } from './QuizData';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion]);

  const handleAnswerClick = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full w-3xl"> {/* Added max-w-2xl for consistent width */}
        {showScore ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Khatam!</h2>
            <p className="text-2xl mb-4">
              Aapka score: {score} / {quizData.length}
            </p>
            <p className="text-xl mb-6">
              Percentage: {((score / quizData.length) * 100).toFixed(2)}%
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Sawal {currentQuestion + 1}</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <h3 className="text-xl mb-6 break-words">{quizData[currentQuestion].question}</h3> {/* Added break-words */}
            <div className="space-y-4 mb-8">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className={`w-full text-left p-4 rounded-lg transition duration-300 break-words ${
                    selectedAnswer === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`w-full py-3 rounded-full font-semibold transition duration-300 ${
                selectedAnswer === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {currentQuestion === quizData.length - 1 ? 'Quiz Khatam Karein' : 'Agla Sawal'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

