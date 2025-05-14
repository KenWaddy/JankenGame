import { useState } from 'react'
import './App.css'
import { Hand, Scissors, FileText } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'

type Choice = 'rock' | 'paper' | 'scissors' | null;
type Result = 'win' | 'lose' | 'draw' | null;

function App() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);
  const [showResult, setShowResult] = useState(false);

  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const getRandomChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const handleChoice = (choice: Choice) => {
    setPlayerChoice(choice);
    const computerSelection = getRandomChoice();
    setComputerChoice(computerSelection);
    setResult(determineWinner(choice, computerSelection));
    setShowResult(true);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setShowResult(false);
  };

  const getChoiceIcon = (choice: Choice, size = 48) => {
    switch (choice) {
      case 'rock':
        return <Hand size={size} className="text-gray-700" />;
      case 'paper':
        return <FileText size={size} className="text-blue-500" />;
      case 'scissors':
        return <Scissors size={size} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getResultText = () => {
    switch (result) {
      case 'win':
        return 'You Win!';
      case 'lose':
        return 'You Lose!';
      case 'draw':
        return 'It\'s a Draw!';
      default:
        return '';
    }
  };

  const getResultClass = () => {
    switch (result) {
      case 'win':
        return 'text-green-600 font-bold';
      case 'lose':
        return 'text-red-600 font-bold';
      case 'draw':
        return 'text-yellow-600 font-bold';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center bg-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">じゃんけん (Janken)</CardTitle>
          <CardDescription className="text-indigo-100">Rock-Paper-Scissors Game</CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          {!showResult ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center mb-4">Make your choice:</h2>
              <div className="flex justify-center gap-4">
                {choices.map((choice) => (
                  <Button
                    key={choice}
                    onClick={() => handleChoice(choice)}
                    className="flex flex-col items-center p-4 h-auto"
                    variant="outline"
                  >
                    {getChoiceIcon(choice)}
                    <span className="mt-2 capitalize">{choice}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold text-center ${getResultClass()}`}>
                {getResultText()}
              </h2>
              
              <div className="flex justify-between items-center mt-6">
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-gray-500">Your Choice</p>
                  <div className="flex justify-center">
                    {getChoiceIcon(playerChoice)}
                  </div>
                  <p className="capitalize font-medium">{playerChoice}</p>
                </div>
                
                <div className="text-2xl font-bold">VS</div>
                
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-gray-500">Computer's Choice</p>
                  <div className="flex justify-center">
                    {getChoiceIcon(computerChoice)}
                  </div>
                  <p className="capitalize font-medium">{computerChoice}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center p-4 bg-gray-50 rounded-b-lg">
          {showResult && (
            <Button onClick={resetGame} className="bg-indigo-600 hover:bg-indigo-700">
              Play Again
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
