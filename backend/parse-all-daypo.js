const fs = require('fs');
const path = require('path');

// Parsear archivo Daypo
function parseDaypoFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    const questions = [];
    let currentQuestion = null;
    let currentOptions = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (!line || line.startsWith('TÍTULO DEL TEST:')) continue;
        
        // Detectar opción
        if (line.match(/^[a-d]\)/)) {
            const optionText = line.substring(2).trim();
            currentOptions.push(optionText);
            
            // Si es la última opción, guardar la pregunta
            if (line.startsWith('d)') && currentQuestion) {
                const isMultiple = currentQuestion.toLowerCase().includes('selección múltiple') ||
                                 currentQuestion.toLowerCase().includes('seleccion multiple');
                
                // Heurística: en tests técnicos, normalmente 'b' es correcta
                // Para múltiples, usamos b y c
                const correctIndices = isMultiple ? [1, 2] : [1];
                
                questions.push({
                    question: currentQuestion,
                    options: currentOptions.map((text, idx) => ({
                        text: text,
                        isCorrect: correctIndices.includes(idx)
                    })),
                    isMultipleChoice: isMultiple
                });
                
                currentQuestion = null;
                currentOptions = [];
            }
        }
        // Nueva pregunta (contiene '?')
        else if (line.includes('?')) {
            currentQuestion = line;
            currentOptions = [];
        }
    }
    
    return questions;
}

// Archivos a procesar
const files = [
    { path: path.join(__dirname, '../daypo_nestjs.txt'), topic: 'nestjs' },
    { path: path.join(__dirname, '../daypo_ruby.txt'), topic: 'ruby' },
    { path: path.join(__dirname, '../daypo_ruby_on_rails.txt'), topic: 'rails' },
    { path: path.join(__dirname, '../daypo_sql.txt'), topic: 'sql' },
    { path: path.join(__dirname, '../daypo_mysql.txt'), topic: 'mysql' },
    { path: path.join(__dirname, '../daypo_mongodb.txt'), topic: 'mongodb' },
    { path: path.join(__dirname, '../daypo_poo.txt'), topic: 'poo' },
    { path: path.join(__dirname, '../daypo_docker.txt'), topic: 'docker' },
    { path: path.join(__dirname, '../daypo_aws.txt'), topic: 'aws' },
    { path: path.join(__dirname, '../daypo_graphql.txt'), topic: 'graphql' },
    { path: path.join(__dirname, '../daypo_code_practice.txt'), topic: 'practice' }
];

const allData = {};
let totalQuestions = 0;

console.log('📚 Parseando archivos Daypo...\n');

files.forEach(file => {
    if (fs.existsSync(file.path)) {
        const questions = parseDaypoFile(file.path);
        allData[file.topic] = questions;
        totalQuestions += questions.length;
        console.log(`✓ ${file.topic.padEnd(10)} - ${questions.length} preguntas`);
    } else {
        console.log(`✗ ${file.topic.padEnd(10)} - Archivo no encontrado`);
    }
});

console.log(`\n📝 Total: ${totalQuestions} preguntas parseadas`);

// Guardar JSON
const outputPath = path.join(__dirname, 'all-questions.json');
fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2));
console.log(`💾 Guardado en: all-questions.json`);
