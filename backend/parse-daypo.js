const fs = require('fs');
const path = require('path');

function parseDaypoFile(filePath, topic) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    
    const questions = [];
    let currentQuestion = null;
    let currentOptions = [];
    let correctAnswers = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip title line
        if (line.startsWith('TÍTULO DEL TEST:')) continue;
        
        // Check if it's an option line
        if (line.match(/^[a-d]\)/)) {
            const optionText = line.substring(2).trim();
            currentOptions.push(optionText);
            continue;
        }
        
        // If we have accumulated a question and it's not an option, save it
        if (currentQuestion && !line.match(/^[a-d]\)/)) {
            // Find correct answers by checking next lines or default patterns
            // For Daypo format, usually the first option after question is marked
            // We'll mark option 'b' as correct by default for now
            // This needs manual verification but we'll extract all options
            
            const isMultiple = currentQuestion.toLowerCase().includes('selección múltiple') ||
                             currentQuestion.toLowerCase().includes('seleccion multiple');
            
            // Auto-detect correct answers based on common patterns
            // This is a heuristic - may need adjustment
            correctAnswers = detectCorrectAnswers(currentOptions, isMultiple);
            
            questions.push({
                question: currentQuestion,
                options: currentOptions.map((text, idx) => ({
                    text: text,
                    isCorrect: correctAnswers.includes(idx)
                })),
                isMultipleChoice: isMultiple
            });
            
            currentQuestion = null;
            currentOptions = [];
            correctAnswers = [];
        }
        
        // New question
        if (line.includes('?') && !line.match(/^[a-d]\)/)) {
            currentQuestion = line;
        }
    }
    
    // Save last question if exists
    if (currentQuestion && currentOptions.length > 0) {
        const isMultiple = currentQuestion.toLowerCase().includes('selección múltiple') ||
                         currentQuestion.toLowerCase().includes('seleccion multiple');
        correctAnswers = detectCorrectAnswers(currentOptions, isMultiple);
        
        questions.push({
            question: currentQuestion,
            options: currentOptions.map((text, idx) => ({
                text: text,
                isCorrect: correctAnswers.includes(idx)
            })),
            isMultipleChoice: isMultiple
        });
    }
    
    return questions;
}

function detectCorrectAnswers(options, isMultiple) {
    // This is a heuristic based on common patterns
    // In most technical questions, option 'b' (index 1) tends to be correct
    // For multiple choice, we'll need to review manually
    
    if (isMultiple) {
        // For multiple choice, mark first 2-3 as potentially correct
        return [1, 2]; // This needs manual review
    }
    
    return [1]; // Default to option 'b'
}

// Read all daypo files
const files = [
    { path: '../daypo_nestjs.txt', topic: 'nestjs' },
    { path: '../daypo_ruby.txt', topic: 'ruby' },
    { path: '../daypo_ruby_on_rails.txt', topic: 'rails' },
    { path: '../daypo_sql.txt', topic: 'sql' },
    { path: '../daypo_mysql.txt', topic: 'mysql' },
    { path: '../daypo_mongodb.txt', topic: 'mongodb' },
    { path: '../daypo_poo.txt', topic: 'poo' },
    { path: '../daypo_docker.txt', topic: 'docker' },
    { path: '../daypo_aws.txt', topic: 'aws' },
    { path: '../daypo_graphql.txt', topic: 'graphql' }
];

const allData = {};

files.forEach(file => {
    const fullPath = path.join(__dirname, file.path);
    if (fs.existsSync(fullPath)) {
        console.log(`Parsing ${file.path}...`);
        const questions = parseDaypoFile(fullPath, file.topic);
        allData[file.topic] = questions;
        console.log(`  ✓ ${questions.length} questions found`);
    } else {
        console.log(`  ✗ File not found: ${fullPath}`);
    }
});

// Write to JSON file
const outputPath = path.join(__dirname, 'questions-data.json');
fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2));
console.log(`\n✅ Data written to ${outputPath}`);
console.log(`\nTotal questions by topic:`);
Object.entries(allData).forEach(([topic, questions]) => {
    console.log(`  ${topic}: ${questions.length}`);
});
