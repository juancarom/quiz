const TopicSelection = ({ onSelectTopic }) => {
  const topics = [
    { id: 'practice', name: 'Práctica de Código', icon: '💻' },
    { id: 'nestjs', name: 'NestJS', icon: '🦅' },
    { id: 'ruby', name: 'Ruby', icon: '💎' },
    { id: 'rails', name: 'Ruby on Rails', icon: '🚂' },
    { id: 'sql', name: 'SQL', icon: '🗄️' },
    { id: 'mysql', name: 'MySQL', icon: '🐬' },
    { id: 'mongodb', name: 'MongoDB', icon: '🍃' },
    { id: 'poo', name: 'POO', icon: '🎯' },
    { id: 'docker', name: 'Docker', icon: '🐳' },
    { id: 'aws', name: 'AWS', icon: '☁️' },
    { id: 'graphql', name: 'GraphQL', icon: '◈' }
  ]

  return (
    <div className="container">
      <div className="header">
        <h1>🎓 Training App</h1>
        <p>Selecciona un tema para comenzar tu test</p>
      </div>
      <div className="topics-grid">
        {topics.map(topic => (
          <button
            key={topic.id}
            className="topic-button"
            onClick={() => onSelectTopic(topic.id)}
          >
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
              {topic.icon}
            </div>
            {topic.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TopicSelection
