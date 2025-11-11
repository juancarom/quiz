# 📚 Sistema de Explicaciones Educativas

## Estado Actual

- ✅ **874 preguntas** tienen explicación
- ✅ **22 explicaciones detalladas** (Ruby, JavaScript, SQL)
- ⚙️ **852 explicaciones automáticas** (generadas basadas en respuesta correcta)

## Cómo Mejorar las Explicaciones

### Opción 1: Editar manualmente

1. Abre `backend/explanations.js`
2. Agrega explicaciones siguiendo este formato:

```javascript
const nestjsExplanations = {
  "¿Qué pregunta?": "Explicación educativa detallada aquí...",
};
```

3. Ejecuta: `node backend/add-explanations.js`

### Opción 2: Usar el template

1. Revisa `backend/explanations-template.json`
2. Completa el campo `suggestedExplanation` para cada pregunta
3. Ejecuta el script de importación

### Estructura de una Buena Explicación

Una explicación educativa debe:

1. **Explicar el concepto**: ¿Qué es y para qué sirve?
2. **Dar contexto**: ¿Cuándo se usa?
3. **Mencionar alternativas**: ¿Hay otras formas de hacer lo mismo?
4. **Ejemplo si es código**: Mostrar uso práctico

**Ejemplo bueno:**
```
El método select en Ruby crea una nueva colección (array o hash) que contiene 
solo los elementos de la colección original que cumplen una condición dada en 
un bloque. Es un método de filtrado que itera sobre la colección, evalúa el 
bloque para cada elemento y devuelve los que resultan en true.
```

**Ejemplo malo:**
```
select filtra elementos
```

## Temas que Necesitan Explicaciones Detalladas

- [ ] NestJS (59 preguntas)
- [x] Ruby (74 preguntas) - 12 completadas
- [ ] Rails (75 preguntas)
- [x] SQL (83 preguntas) - 5 completadas  
- [ ] MySQL (83 preguntas)
- [ ] MongoDB (84 preguntas)
- [ ] POO (92 preguntas)
- [ ] Docker (88 preguntas)
- [ ] AWS (88 preguntas)
- [ ] GraphQL (88 preguntas)
- [x] Practice (60 preguntas) - 5 completadas

## Roadmap

### Fase 1: Fundamentos ✅
- [x] Sistema de explicaciones implementado
- [x] Explicaciones automáticas para todas las preguntas
- [x] 22 explicaciones detalladas de ejemplo

### Fase 2: Expansión (En Progreso)
- [ ] 100 explicaciones detalladas más prioritarias
- [ ] Script para importar explicaciones desde CSV
- [ ] Interfaz para editar explicaciones

### Fase 3: Completitud
- [ ] Todas las 874 preguntas con explicaciones detalladas
- [ ] Revisión por expertos de cada tema
- [ ] Ejemplos de código cuando aplique

## Contribuir

Si quieres ayudar a mejorar las explicaciones:

1. Elige un tema que domines
2. Revisa las preguntas en `all-questions.json`
3. Escribe explicaciones educativas en `explanations.js`
4. Ejecuta `node add-explanations.js`
5. Haz commit y push

## Scripts Disponibles

```bash
# Ver estado actual
node -e "const d=JSON.parse(require('fs').readFileSync('all-questions.json')); Object.entries(d).forEach(([t,qs]) => console.log(t + ':', qs.filter(q=>q.explanation&&q.explanation.length>50).length + '/' + qs.length));"

# Generar explicaciones automáticas
node generate-all-explanations.js

# Aplicar explicaciones manuales
node add-explanations.js

# Crear template para edición
node -e "..."  # Ver comando arriba
```

## Notas

- Las explicaciones se guardan en el campo `explanation` de cada pregunta
- Las explicaciones se muestran cuando el usuario se equivoca
- También se muestran cuando acierta (para reforzar el aprendizaje)
- Máximo recomendado: 2-3 oraciones por explicación
