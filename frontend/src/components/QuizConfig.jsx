import { useState } from 'react'

const QuizConfig = ({ topic, onComplete, onBack }) => {
  const [numQuestions, setNumQuestions] = useState(10)

  const topicInfo = {
    nestjs: { name: 'NestJS', icon: '🦅', total: 59 },
    ruby: { name: 'Ruby', icon: '💎', total: 74 },
    rails: { name: 'Ruby on Rails', icon: '🚂', total: 75 },
    sql: { name: 'SQL', icon: '🗄️', total: 83 },
    mysql: { name: 'MySQL', icon: '🐬', total: 83 },
    mongodb: { name: 'MongoDB', icon: '🍃', total: 84 },
    poo: { name: 'POO', icon: '🎯', total: 92 },
    docker: { name: 'Docker', icon: '🐳', total: 88 },
    aws: { name: 'AWS', icon: '☁️', total: 88 },
    graphql: { name: 'GraphQL', icon: '◈', total: 88 },
    mixed: { name: 'Todos Mezclados', icon: '🎲', total: 814 }
  }

  const info = topicInfo[topic] || { name: topic, icon: '📚', total: 20 }
  const maxQuestions = Math.min(info.total, 50) // Máximo 50 preguntas por test

  const presetOptions = [5, 10, 15, 20, 30].filter(n => n <= maxQuestions)

  const handleStart = () => {
    onComplete({ numQuestions })
  }

  return (
    <div className="container">
      <div className="header">
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
          {info.icon}
        </div>
        <h1>{info.name}</h1>
        <p className="topic-total">{info.total} preguntas disponibles</p>
      </div>

      <div className="config-card">
        <h2 className="config-title">¿Cuántas preguntas quieres responder?</h2>
        
        <div className="preset-buttons">
          {presetOptions.map(num => (
            <button
              key={num}
              className={`preset-btn ${numQuestions === num ? 'active' : ''}`}
              onClick={() => setNumQuestions(num)}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="slider-container">
          <input
            type="range"
            min="5"
            max={maxQuestions}
            step="5"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            className="slider"
          />
          <div className="slider-value">{numQuestions} preguntas</div>
        </div>

        <div className="config-info">
          <div className="info-item">
            <span className="info-icon">⏱️</span>
            <span>Tiempo estimado: ~{Math.ceil(numQuestions * 1.5)} minutos</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🎯</span>
            <span>Sin límite de tiempo</span>
          </div>
          <div className="info-item">
            <span className="info-icon">♾️</span>
            <span>Intentos ilimitados por pregunta</span>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Cambiar Tema
        </button>
        <button className="btn btn-primary" onClick={handleStart}>
          Comenzar Test →
        </button>
      </div>
    </div>
  )
}

export default QuizConfig
