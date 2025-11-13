// Script para importar explicaciones editadas desde los archivos de texto
const fs = require('fs');
const path = require('path');

const data = require('./all-questions.json');
let totalUpdated = 0;

Object.keys(data).forEach(topic => {
  const filePath = path.join(__dirname, `explanations-edit-${topic}.txt`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  No se encontró: ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Dividir por preguntas
  const sections = content.split('## Pregunta ').slice(1);
  
  sections.forEach((section, idx) => {
    // Buscar la nueva explicación (entre "NUEVA EXPLICACIÓN:" y el separador)
    const match = section.match(/\*\*NUEVA EXPLICACIÓN:\*\* \(edita aquí\)\n([\s\S]*?)\n───────────────────────────────────────────────────────────────/);
    
    if (match && match[1].trim()) {
      const newExplanation = match[1].trim();
      if (data[topic][idx]) {
        data[topic][idx].explanation = newExplanation;
        totalUpdated++;
        console.log(`✓ Actualizada: ${topic} - Pregunta ${idx + 1}`);
      }
    }
  });
});

// Guardar
fs.writeFileSync(path.join(__dirname, 'all-questions.json'), JSON.stringify(data, null, 2));

console.log(`\n✅ ${totalUpdated} explicaciones actualizadas desde archivos de texto`);
console.log(`📊 Total de preguntas: ${Object.values(data).reduce((sum, arr) => sum + arr.length, 0)}`);
