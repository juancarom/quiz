const Results = ({ results, onRestart }) => {
  const getGrade = (percentage) => {
    if (percentage >= 90) return { text: '¡Excelente!', emoji: '🌟' }
    if (percentage >= 70) return { text: 'Muy Bien', emoji: '👏' }
    if (percentage >= 50) return { text: 'Bien', emoji: '👍' }
    return { text: 'Sigue Practicando', emoji: '💪' }
  }

  const grade = getGrade(results.percentage)

  return (
    <div className="container">
      <div className="results-container">
        <div className="header">
          <h1>{grade.emoji} {grade.text}</h1>
          <p>Has completado el test de {results.topic}</p>
        </div>

        <div className="score-circle">
          <div className="score-text">
            {results.percentage}%
          </div>
        </div>

        <div className="results-stats">
          <div className="stat-card">
            <div className="stat-label">Correctas</div>
            <div className="stat-value">{results.score}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Incorrectas</div>
            <div className="stat-value">
              {results.totalQuestions - results.score}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total</div>
            <div className="stat-value">{results.totalQuestions}</div>
          </div>
        </div>

        <div className="buttons">
          <button className="btn btn-primary" onClick={onRestart}>
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results
