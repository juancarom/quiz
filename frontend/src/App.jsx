import { useState } from 'react'
import TopicSelection from './components/TopicSelection'
import QuizConfig from './components/QuizConfig'
import Quiz from './components/Quiz'
import Results from './components/Results'
import './App.css'

function App() {
  const [screen, setScreen] = useState('topics') // 'topics', 'config', 'quiz', 'results'
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [quizConfig, setQuizConfig] = useState(null)
  const [quizResults, setQuizResults] = useState(null)

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic)
    setScreen('config')
  }

  const handleConfigComplete = (config) => {
    setQuizConfig(config)
    setScreen('quiz')
  }

  const handleQuizComplete = (results) => {
    setQuizResults(results)
    setScreen('results')
  }

  const handleRestart = () => {
    setScreen('topics')
    setSelectedTopic(null)
    setQuizConfig(null)
    setQuizResults(null)
  }

  return (
    <div className="app">
      {screen === 'topics' && (
        <TopicSelection onSelectTopic={handleTopicSelect} />
      )}
      {screen === 'config' && (
        <QuizConfig 
          topic={selectedTopic} 
          onComplete={handleConfigComplete}
          onBack={() => setScreen('topics')}
        />
      )}
      {screen === 'quiz' && (
        <Quiz 
          topic={selectedTopic} 
          config={quizConfig}
          onComplete={handleQuizComplete} 
        />
      )}
      {screen === 'results' && (
        <Results results={quizResults} onRestart={handleRestart} />
      )}
    </div>
  )
}

export default App
