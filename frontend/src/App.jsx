import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import TopicSelection from './components/TopicSelection'
import QuizConfig from './components/QuizConfig'
import Quiz from './components/Quiz'
import Results from './components/Results'
import AuthModal from './components/AuthModal'
import UserMenu from './components/UserMenu'
import './App.css'

function App() {
  const [screen, setScreen] = useState('topics') // 'topics', 'config', 'quiz', 'results'
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [quizConfig, setQuizConfig] = useState(null)
  const [quizResults, setQuizResults] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const { user, loading } = useAuth()

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

  if (loading) {
    return (
      <div className="app loading">
        <div className="loading-spinner">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Header con botón de login/usuario */}
      <div className="app-header">
        <div className="app-logo">
          <h1>🎯 Training App</h1>
        </div>
        <div className="auth-section">
          {user ? (
            <UserMenu />
          ) : (
            <button 
              className="login-button"
              onClick={() => setShowAuthModal(true)}
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="app-content">
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

      {/* Modal de autenticación */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  )
}

export default App
