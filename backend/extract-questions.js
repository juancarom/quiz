const fs = require('fs');
const path = require('path');

// Leer el archivo test-app.js
const content = fs.readFileSync(path.join(__dirname, '../test-app.js'), 'utf-8');

// Extraer el objeto questionsDatabase usando una expresión regular
const regex = /const questionsDatabase = \{([\s\S]*?)\n\};/;
const match = content.match(regex);

if (!match) {
    console.error('❌ No se pudo encontrar questionsDatabase en test-app.js');
    process.exit(1);
}

// Evaluar el código para obtener el objeto
const dbCode = '{' + match[1] + '\n}';
const questionsDatabase = eval('(' + dbCode + ')');

// Convertir al formato de MongoDB
const convertedData = {};

Object.entries(questionsDatabase).forEach(([topic, questions]) => {
    convertedData[topic] = questions.map(q => ({
        question: q.question,
        options: q.options.map((text, idx) => ({
            text: text,
            isCorrect: q.correct.includes(idx)
        })),
        isMultipleChoice: q.type === 'multiple'
    }));
});

// Guardar como JSON
const outputPath = path.join(__dirname, 'questions-extracted.json');
fs.writeFileSync(outputPath, JSON.stringify(convertedData, null, 2));

console.log('✅ Preguntas extraídas exitosamente!');
console.log('\n📊 Resumen por tema:');
Object.entries(convertedData).forEach(([topic, questions]) => {
    console.log(`   ${topic}: ${questions.length} preguntas`);
});

const total = Object.values(convertedData).reduce((sum, qs) => sum + qs.length, 0);
console.log(`\n📝 Total: ${total} preguntas`);
console.log(`💾 Archivo guardado en: ${outputPath}`);
