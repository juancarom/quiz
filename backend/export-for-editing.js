// Script para exportar preguntas a archivos de texto editables
const fs = require('fs');
const path = require('path');

const data = require('./all-questions.json');

Object.keys(data).forEach(topic => {
  let content = `# Explicaciones para ${topic.toUpperCase()}\n\n`;
  content += `Total de preguntas: ${data[topic].length}\n\n`;
  content += `Instrucciones: Edita las explicaciones directamente en este archivo.\n`;
  content += `Después ejecuta el script import-explanations.js para aplicar los cambios.\n\n`;
  content += `═══════════════════════════════════════════════════════════════\n\n`;
  
  data[topic].forEach((q, idx) => {
    const correctAnswers = q.options.filter(o => o.isCorrect).map(o => o.text);
    content += `## Pregunta ${idx + 1}\n\n`;
    content += `**Pregunta:** ${q.question}\n\n`;
    content += `**Respuesta(s) correcta(s):**\n`;
    correctAnswers.forEach(a => content += `- ${a}\n`);
    content += `\n**Explicación actual:**\n${q.explanation || '(Sin explicación)'}\n\n`;
    content += `**NUEVA EXPLICACIÓN:** (edita aquí)\n\n\n`;
    content += `───────────────────────────────────────────────────────────────\n\n`;
  });
  
  fs.writeFileSync(path.join(__dirname, `explanations-edit-${topic}.txt`), content);
  console.log(`✅ Creado: explanations-edit-${topic}.txt`);
});

console.log('\n📝 Archivos creados. Puedes editarlos y luego ejecutar import-explanations.js');
