import { useState, useEffect } from 'react'
import axios from 'axios'

const Quiz = ({ topic, config, onComplete }) => {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [shuffledOptions, setShuffledOptions] = useState([])

  useEffect(() => {
    loadQuestions()
  }, [topic])

  useEffect(() => {
    if (currentQuestion) {
      // Mezclar opciones cada vez que cambia la pregunta
      const shuffled = currentQuestion.options
        .map((option, originalIndex) => ({ ...option, originalIndex }))
        .sort(() => Math.random() - 0.5)
      setShuffledOptions(shuffled)
    }
  }, [currentIndex, questions])

  const loadQuestions = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/questions/${topic}`, {
        params: { limit: config.numQuestions }
      })
      setQuestions(response.data)
      setLoading(false)
    } catch (err) {
      setError('Error cargando las preguntas')
      setLoading(false)
    }
  }

  const currentQuestion = questions[currentIndex]

  const handleOptionClick = (optionIndex) => {
    if (showFeedback) return

    if (currentQuestion.isMultipleChoice) {
      // Selección múltiple: toggle
      if (selectedOptions.includes(optionIndex)) {
        setSelectedOptions(selectedOptions.filter(i => i !== optionIndex))
      } else {
        setSelectedOptions([...selectedOptions, optionIndex])
      }
    } else {
      // Selección simple
      setSelectedOptions([optionIndex])
    }
  }

  const checkAnswer = () => {
    // Mapear las opciones mezcladas a sus índices originales
    const originalIndices = selectedOptions.map(idx => shuffledOptions[idx].originalIndex)
    
    const correctIndices = currentQuestion.options
      .map((opt, idx) => opt.isCorrect ? idx : -1)
      .filter(idx => idx !== -1)

    const selectedSet = new Set(originalIndices)
    const correctSet = new Set(correctIndices)

    const isAnswerCorrect = 
      selectedSet.size === correctSet.size &&
      [...selectedSet].every(idx => correctSet.has(idx))

    setIsCorrect(isAnswerCorrect)
    setShowFeedback(true)

    if (isAnswerCorrect) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOptions([])
      setShowFeedback(false)
      setIsCorrect(false)
    } else {
      // Quiz completado
      finishQuiz()
    }
  }

  const finishQuiz = async () => {
    const results = {
      topic: getTopicName(topic),
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100)
    }

    try {
      await axios.post('/api/results', results)
    } catch (err) {
      console.error('Error guardando resultados:', err)
    }

    onComplete(results)
  }

  const getTopicName = (topicId) => {
    const names = {
      nestjs: 'NestJS',
      ruby: 'Ruby',
      rails: 'Ruby on Rails',
      sql: 'SQL',
      mysql: 'MySQL',
      mongodb: 'MongoDB',
      poo: 'POO',
      docker: 'Docker',
      aws: 'AWS',
      graphql: 'GraphQL',
      mixed: 'Todos Mezclados'
    }
    return names[topicId] || topicId
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando preguntas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="container">
        <div className="error">
          <p>No hay preguntas disponibles para este tema</p>
        </div>
      </div>
    )
  }

  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="container">
      <div className="header">
        <h1>{getTopicName(topic)}</h1>
        <p>Pregunta {currentIndex + 1} de {questions.length}</p>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="question-card">
        <div className="question-number">
          Pregunta {currentIndex + 1}
        </div>
        <div className="question-text">
          {currentQuestion.question}
        </div>
        <div className="question-type">
          {currentQuestion.isMultipleChoice ? 
            '☐ Selección múltiple (puede haber más de una respuesta correcta)' : 
            '● Selección simple (solo una respuesta correcta)'}
        </div>

        <div className="options">
          {shuffledOptions.map((option, index) => {
            const isSelected = selectedOptions.includes(index)
            const isCorrectOption = option.isCorrect
            
            let optionClass = 'option'
            if (isSelected) optionClass += ' selected'
            if (showFeedback) {
              if (isCorrectOption) {
                optionClass += ' correct'
              } else if (isSelected && !isCorrectOption) {
                optionClass += ' incorrect'
              }
              optionClass += ' disabled'
            }

            return (
              <div
                key={index}
                className={optionClass}
                onClick={() => handleOptionClick(index)}
              >
                <div className={`option-indicator ${currentQuestion.isMultipleChoice ? 'checkbox' : ''}`}></div>
                <div className="option-text">{option.text}</div>
              </div>
            )
          })}
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? 
              '✓ ¡Correcto! Bien hecho.' : 
              '✗ Intenta de nuevo. Selecciona todas las respuestas correctas.'}
          </div>
        )}
      </div>

      <div className="buttons">
        {!showFeedback ? (
          <button
            className="btn btn-primary"
            onClick={checkAnswer}
            disabled={selectedOptions.length === 0}
          >
            Verificar Respuesta
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={nextQuestion}
          >
            {currentIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Quiz
