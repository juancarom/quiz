const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./all-questions.json', 'utf8'));
const ruby = data.ruby;

const empty = ruby.filter(q => !q.explanation || q.explanation.trim() === '');
const completed = ruby.length - empty.length;

console.log('📊 Estadísticas de explicaciones Ruby:');
console.log('✅ Con explicación:', completed);
console.log('❌ Sin explicación:', empty.length);
console.log('📝 Total:', ruby.length);
console.log('📈 Progreso:', Math.round((completed / ruby.length) * 100) + '%');

if (empty.length > 0) {
  console.log('\n❌ Preguntas sin explicación:');
  empty.forEach((q, idx) => {
    console.log(`${idx + 1}. ${q.question}`);
  });
}
