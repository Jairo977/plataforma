export const officialSources = [
  {
    id: "OTE-OF-002",
    label: "OUP useful documents",
    url: "https://elt.oup.com/feature/global/oxford-test-of-english/documents",
  },
  {
    id: "OTE-OF-007",
    label: "Test specifications, July 2025",
    url: "https://www.colegioakros.cl/wp-content/uploads/2025/12/ote_global_oxford_test_of_english_test_specifications_2025.pdf",
  },
  {
    id: "OTE-OF-008",
    label: "Guide for test takers",
    url: "https://online.oupe.es/ELT/OTE/pdf-web/OTE-A-Guide-for-Test-Takers.pdf",
  },
];

export const examFacts = [
  {
    title: "Objetivo real",
    body: "El Oxford Test of English normal mide A2, B1 y B2. Para esta plataforma el objetivo principal es llegar a B2 en cada modulo, no solo subir un promedio.",
    sourceIds: ["OTE-OF-007", "OTE-OF-008"],
  },
  {
    title: "Formato",
    body: "Tiene cuatro modulos: Speaking, Listening, Reading y Writing. Se pueden tomar juntos, por separado o en combinacion.",
    sourceIds: ["OTE-OF-007", "OTE-OF-008"],
  },
  {
    title: "Regla critica",
    body: "En el examen no puedes volver a una pregunta despues de pulsar Next o cuando se acaba el tiempo. La practica debe entrenar decision rapida.",
    sourceIds: ["OTE-OF-008"],
  },
  {
    title: "Resultados",
    body: "Si haces los cuatro modulos recibes certificado con nivel y score general. Si haces menos, recibes Module Report Card.",
    sourceIds: ["OTE-OF-008"],
  },
];

export const scoreBands = [
  { level: "Below A2", range: "0-50", goal: "No certifica A2. Hay que reforzar base gramatical y comprension." },
  { level: "A2", range: "51-80", goal: "Puede funcionar en situaciones simples, pero no basta para objetivo B1/B2." },
  { level: "B1", range: "81-110", goal: "Objetivo minimo funcional. Hay que estabilizar cada modulo para no depender del promedio." },
  { level: "B2", range: "111-140", goal: "Objetivo fuerte para universidad, trabajo o requisitos tipo ACLES cuando piden B2 por modulo." },
];

export const moduleBlueprint = [
  {
    module: "Speaking",
    time: "Aprox. 15 min",
    scoreFocus: "Pronunciation, fluency, grammar, lexis",
    sourceIds: ["OTE-OF-007", "OTE-OF-008"],
    parts: [
      "Part 1: entrevista con 8 preguntas cortas; las 2 primeras son practica no evaluada.",
      "Part 2: dos mensajes de voz de 40 segundos, con 20 segundos de preparacion.",
      "Part 3: charla de 1 minuto basada en prompts visuales/auditivos, con 30 segundos de preparacion.",
      "Part 4: seis preguntas de seguimiento sobre el tema de la charla.",
    ],
    train: [
      "Responder siempre con estructura corta: respuesta directa, razon, ejemplo.",
      "Grabar respuestas de 20, 40 y 60 segundos para automatizar duracion.",
      "Preparar conectores orales: well, actually, in my opinion, for example, on the other hand.",
      "No memorizar discursos completos; entrenar bloques reutilizables por tema.",
    ],
  },
  {
    module: "Listening",
    time: "Aprox. 30 min",
    scoreFocus: "Comprension de informacion especifica, opinion, actitud, proposito y significado implicito",
    sourceIds: ["OTE-OF-007", "OTE-OF-008"],
    parts: [
      "Part 1: cinco audios cortos con opciones visuales.",
      "Part 2: monologo largo con note-completion de cinco items.",
      "Part 3: dialogo largo para identificar opiniones y quien las expresa.",
      "Part 4: cinco audios cortos con preguntas de opcion multiple.",
    ],
    train: [
      "Antes del audio, predecir tipo de respuesta: lugar, razon, actitud, opinion o detalle.",
      "Primera escucha: gist y descarte. Segunda escucha: confirmacion.",
      "Entrenar sinonimos: la respuesta correcta normalmente parafrasea, no repite literal.",
      "Anotar cambios de opinion: but, however, actually, in the end, although.",
    ],
  },
  {
    module: "Reading",
    time: "35 min",
    scoreFocus: "Gist, detalle, matching, cohesion textual y comprension de textos largos",
    sourceIds: ["OTE-OF-007", "OTE-OF-008"],
    parts: [
      "Part 1: seis textos cortos con una pregunta cada uno.",
      "Part 2: matching entre perfiles y textos/descripciones.",
      "Part 3: insertar seis oraciones extraidas en un texto largo.",
      "Part 4: texto largo con cuatro preguntas.",
    ],
    train: [
      "Leer primero la pregunta para saber que buscar.",
      "Subrayar referencias: this, these, such, however, therefore, although.",
      "En matching, comparar requisitos obligatorios antes que gustos generales.",
      "Practicar lectura cronometrada: no quedarse bloqueado mas de dos minutos.",
    ],
  },
  {
    module: "Writing",
    time: "45 min",
    scoreFocus: "Task fulfilment, organization, grammar, lexis",
    sourceIds: ["OTE-OF-007", "OTE-OF-008"],
    parts: [
      "Part 1: email de 80-130 palabras.",
      "Part 2: essay, magazine article o review de 100-160 palabras.",
    ],
    train: [
      "Part 1: cubrir los tres prompts. Si falta uno, se pierden marcas.",
      "Controlar registro: informal para amigo, neutral/formal para tienda, trabajo o institucion.",
      "Part 2: planificar tesis, dos ideas y cierre antes de escribir.",
      "Reservar los ultimos minutos para revisar: tiempos verbales, articulos, conectores y spelling.",
    ],
  },
];

export const passPlan = [
  {
    phase: "1. Mapa del examen",
    output: "Saber partes, tiempos, criterios y errores que bajan nota.",
    practice: "Leer la guia oficial y hacer diagnostico por habilidad.",
  },
  {
    phase: "2. B1 estable",
    output: "Responder todas las tareas sin quedarse en blanco.",
    practice: "Ejercicios cortos diarios: 1 listening, 1 reading, 1 speaking, 1 writing mini-task.",
  },
  {
    phase: "3. Salto B2",
    output: "Mas precision, mejores conectores, vocabulario por tema y respuestas desarrolladas.",
    practice: "Reescribir respuestas B1 a B2 y grabar versiones cronometradas.",
  },
  {
    phase: "4. Simulacro",
    output: "Resistencia, tiempo y decision sin volver atras.",
    practice: "Simulador completo + revision de errores por modulo.",
  },
];

export const priorityMistakes = [
  "Speaking: responder con una sola frase o dejar silencios largos.",
  "Writing: no cubrir todos los puntos del email o escribir fuera del rango de palabras.",
  "Listening: elegir la palabra que suena igual en vez de la idea parafraseada.",
  "Reading: perder tiempo en una pregunta y no completar las partes finales.",
  "General: buscar solo promedio B2 cuando la institucion puede exigir B2 en cada modulo.",
];
