"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Mic, PenTool, Headphones, BookOpen, Clock, AlertTriangle, AlertCircle, Target, CheckCircle2, Bot, ArrowRight, Home, RefreshCw, LogOut, CheckSquare, PlayCircle, Loader2 } from "lucide-react";
import styles from "./simulator.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type ModuleId = "listening" | "reading" | "writing" | "speaking";
type Phase = "setup" | "exam" | "results";
type QuestionType = "choice" | "match" | "gap" | "text" | "voice";

interface Question {
  id: string;
  part: number;
  partLabel: string;
  type: QuestionType;
  audioScript?: string;     // For listening: read aloud via TTS
  context?: string;         // Reading passage or audio description
  prompt: string;
  options?: string[];
  correct?: number | string;
  matchItems?: { profile: string; texts: { id: string; title: string; desc: string }[] };
  gapSentences?: string[];  // For gap fill: sentences to choose from
  minWords?: number;
  timeSeconds?: number;     // For speaking: per-question time limit
}

// ─────────────────────────────────────────────────────────────────────────────
// LISTENING — 20 questions across 4 parts
// (Transcripts are read aloud via Web Speech API TTS)
// ─────────────────────────────────────────────────────────────────────────────
const listeningQuestions: Question[] = [
  // PART 1: 5 questions — multiple choice, identify image/option from short dialogues
  {
    id: "L1-1", part: 1, partLabel: "Parte 1: Opción múltiple — diálogos cortos",
    type: "choice",
    audioScript: "Boy: I had such an amazing holiday! I didn't think I'd enjoy the mountains as much as the sea, but I actually did. I managed to go windsurfing on a lake there, which was brilliant. I also tried cycling, which was exciting. I wanted to try horse riding but we ran out of time. But of all the sports I tried, windsurfing is still my favourite.",
    prompt: "¿Qué actividad deportiva fue la favorita del chico durante las vacaciones?",
    options: ["Ciclismo", "Windsurf en el lago", "Equitación"],
    correct: 1,
  },
  {
    id: "L1-2", part: 1, partLabel: "Parte 1: Opción múltiple — diálogos cortos",
    type: "choice",
    audioScript: "Woman: Hi Mark, I'm calling about the meeting tomorrow. Are we still meeting at the coffee shop on Green Street? Man: Actually no, Laura changed it. We're meeting at the library now — the one near the park, not the main one in the city centre. Woman: Oh right, the small one. Got it, thanks!",
    prompt: "¿Dónde se celebrará la reunión de mañana?",
    options: ["La cafetería en Green Street", "La biblioteca principal del centro", "La biblioteca pequeña cerca del parque"],
    correct: 2,
  },
  {
    id: "L1-3", part: 1, partLabel: "Parte 1: Opción múltiple — diálogos cortos",
    type: "choice",
    audioScript: "Teacher: Class, for the project you can choose between three formats: a written report, a poster presentation, or a short video. Remember that whichever you choose, it must include at least three sources. The deadline is Friday. Student: Can we work in pairs? Teacher: Only for the video option — the other two must be individual.",
    prompt: "¿Para qué formato del proyecto se permite trabajar en parejas?",
    options: ["Informe escrito", "Presentación con póster", "Vídeo corto"],
    correct: 2,
  },
  {
    id: "L1-4", part: 1, partLabel: "Parte 1: Opción múltiple — diálogos cortos",
    type: "choice",
    audioScript: "Man: Excuse me, I'm looking for the sports centre. Woman: It's not far. Go straight on and turn left at the traffic lights. Pass the supermarket and it's right next to the post office — you can't miss it, it has a big blue sign. Man: Perfect, thank you so much!",
    prompt: "¿Dónde está el centro deportivo?",
    options: ["Frente al supermercado", "Al lado de la oficina de correos", "Detrás del semáforo"],
    correct: 1,
  },
  {
    id: "L1-5", part: 1, partLabel: "Parte 1: Opción múltiple — diálogos cortos",
    type: "choice",
    audioScript: "Girl: Mum, can I go to Anna's birthday party on Saturday? It starts at six. Mum: This Saturday? But we're visiting grandma! Girl: Oh no. Can we visit grandma on Sunday instead? Mum: I suppose so, but you'll need to be home by nine. Girl: Great, thanks!",
    prompt: "¿Qué acuerdo alcanzan la chica y su madre?",
    options: ["Ir a la fiesta el domingo", "Visitar a la abuela el domingo y ir a la fiesta el sábado", "Cancelar la visita a la abuela"],
    correct: 1,
  },

  // PART 2: 5 questions — monologue, note completion / MC
  {
    id: "L2-1", part: 2, partLabel: "Parte 2: Monólogo — preguntas de comprensión",
    type: "choice",
    audioScript: "Welcome to City FM. This weekend we have an exciting event: the Annual Street Food Festival at Riverside Park. The event runs Saturday and Sunday from 10am to 8pm. Entry is completely free and visitors can sample food from over 30 countries. There will be live music all day and cooking demonstrations every two hours starting at 11am. Please note: most stalls accept card payments, but it's always a good idea to carry some cash just in case. Parking is limited, so organisers recommend taking public transport.",
    prompt: "¿Cuál es la recomendación de los organizadores respecto al transporte?",
    options: ["Utilizar el transporte público", "Aparcar en el parque Riverside", "Llegar antes de las 10am para encontrar aparcamiento"],
    correct: 0,
  },
  {
    id: "L2-2", part: 2, partLabel: "Parte 2: Monólogo — preguntas de comprensión",
    type: "choice",
    audioScript: "Welcome to City FM. This weekend we have an exciting event: the Annual Street Food Festival at Riverside Park. The event runs Saturday and Sunday from 10am to 8pm. Entry is completely free and visitors can sample food from over 30 countries. There will be live music all day and cooking demonstrations every two hours starting at 11am. Please note: most stalls accept card payments, but it's always a good idea to carry some cash just in case. Parking is limited, so organisers recommend taking public transport.",
    prompt: "¿Cuándo comienza la primera demostración de cocina?",
    options: ["A las 10am", "A las 11am", "A las 12pm"],
    correct: 1,
  },
  {
    id: "L2-3", part: 2, partLabel: "Parte 2: Monólogo — preguntas de comprensión",
    type: "choice",
    audioScript: "Good morning, students. I'm here today to tell you about our new after-school programme. Starting next month, we'll be offering three new clubs: a coding club on Mondays, a drama club on Wednesdays, and a photography club on Thursdays. All clubs are free, but you need to sign up in advance. The coding club has limited spaces — only fifteen students — so hurry. The drama and photography clubs can each take up to thirty students. Sign-up sheets are on the noticeboard outside the main office.",
    prompt: "¿Cuántos estudiantes puede aceptar el club de programación?",
    options: ["15 estudiantes", "20 estudiantes", "30 estudiantes"],
    correct: 0,
  },
  {
    id: "L2-4", part: 2, partLabel: "Parte 2: Monólogo — preguntas de comprensión",
    type: "choice",
    audioScript: "Good morning, students. I'm here today to tell you about our new after-school programme. Starting next month, we'll be offering three new clubs: a coding club on Mondays, a drama club on Wednesdays, and a photography club on Thursdays. All clubs are free, but you need to sign up in advance. The coding club has limited spaces — only fifteen students — so hurry. The drama and photography clubs can each take up to thirty students. Sign-up sheets are on the noticeboard outside the main office.",
    prompt: "¿Dónde están las hojas de inscripción para los clubs?",
    options: ["En la recepción de la escuela", "En el tablón de anuncios fuera de la oficina principal", "En la página web de la escuela"],
    correct: 1,
  },
  {
    id: "L2-5", part: 2, partLabel: "Parte 2: Monólogo — preguntas de comprensión",
    type: "choice",
    audioScript: "Good morning, students. I'm here today to tell you about our new after-school programme. Starting next month, we'll be offering three new clubs: a coding club on Mondays, a drama club on Wednesdays, and a photography club on Thursdays. All clubs are free, but you need to sign up in advance. The coding club has limited spaces — only fifteen students — so hurry. The drama and photography clubs can each take up to thirty students. Sign-up sheets are on the noticeboard outside the main office.",
    prompt: "¿Cuál es el día del club de fotografía?",
    options: ["Lunes", "Miércoles", "Jueves"],
    correct: 2,
  },

  // PART 3: 5 questions — dialogue, match opinions to speakers
  {
    id: "L3-1", part: 3, partLabel: "Parte 3: Diálogo — ¿quién dice qué?",
    type: "choice",
    audioScript: "Anna: I've been reading about working from home. I think it's absolutely brilliant — I'm so much more productive without all the office interruptions. Hugo: Really? I find it hard to stay focused at home. There are too many distractions. But I do appreciate the flexibility with my schedule. Anna: True, the flexibility is great. Though I do miss the social side sometimes. Hugo: Exactly! And for younger employees, being in the office helps them learn from more experienced colleagues. I think companies should offer a mix — some days in, some days from home. Anna: I agree with that. A hybrid model seems ideal.",
    prompt: "¿Quién menciona que trabajar desde casa puede ser perjudicial para los empleados jóvenes?",
    options: ["Solo Anna", "Solo Hugo", "Ambos (Anna y Hugo)"],
    correct: 1,
  },
  {
    id: "L3-2", part: 3, partLabel: "Parte 3: Diálogo — ¿quién dice qué?",
    type: "choice",
    audioScript: "Anna: I've been reading about working from home. I think it's absolutely brilliant — I'm so much more productive without all the office interruptions. Hugo: Really? I find it hard to stay focused at home. There are too many distractions. But I do appreciate the flexibility with my schedule. Anna: True, the flexibility is great. Though I do miss the social side sometimes. Hugo: Exactly! And for younger employees, being in the office helps them learn from more experienced colleagues. I think companies should offer a mix — some days in, some days from home. Anna: I agree with that. A hybrid model seems ideal.",
    prompt: "¿Quién cree que un modelo híbrido sería la mejor solución?",
    options: ["Solo Anna", "Solo Hugo", "Ambos (Anna y Hugo)"],
    correct: 2,
  },
  {
    id: "L3-3", part: 3, partLabel: "Parte 3: Diálogo — ¿quién dice qué?",
    type: "choice",
    audioScript: "Sara: What do you think about social media? I think it's great for staying in touch with people. Tom: I agree it has its uses, but I honestly think it makes people feel worse about themselves — all that comparing. Sara: That's true. I've heard it can cause anxiety, especially for teenagers. But it also allows people to find communities they wouldn't have access to locally. Tom: That's a good point. I suppose the key is how you use it. Sara: Exactly. And I think parents have a responsibility to teach children how to use it safely.",
    prompt: "¿Quién menciona que las redes sociales pueden provocar ansiedad en los adolescentes?",
    options: ["Solo Sara", "Solo Tom", "Ambos"],
    correct: 0,
  },
  {
    id: "L3-4", part: 3, partLabel: "Parte 3: Diálogo — ¿quién dice qué?",
    type: "choice",
    audioScript: "Sara: What do you think about social media? I think it's great for staying in touch with people. Tom: I agree it has its uses, but I honestly think it makes people feel worse about themselves — all that comparing. Sara: That's true. I've heard it can cause anxiety, especially for teenagers. But it also allows people to find communities they wouldn't have access to locally. Tom: That's a good point. I suppose the key is how you use it. Sara: Exactly. And I think parents have a responsibility to teach children how to use it safely.",
    prompt: "¿Quién cree que las redes sociales ayudan a crear comunidades que no serían posibles localmente?",
    options: ["Solo Sara", "Solo Tom", "Ambos"],
    correct: 0,
  },
  {
    id: "L3-5", part: 3, partLabel: "Parte 3: Diálogo — ¿quién dice qué?",
    type: "choice",
    audioScript: "Sara: What do you think about social media? I think it's great for staying in touch with people. Tom: I agree it has its uses, but I honestly think it makes people feel worse about themselves — all that comparing. Sara: That's true. I've heard it can cause anxiety, especially for teenagers. But it also allows people to find communities they wouldn't have access to locally. Tom: That's a good point. I suppose the key is how you use it. Sara: Exactly. And I think parents have a responsibility to teach children how to use it safely.",
    prompt: "¿Quién considera que los padres tienen responsabilidad en el uso de redes sociales por parte de sus hijos?",
    options: ["Solo Sara", "Solo Tom", "Ambos"],
    correct: 0,
  },

  // PART 4: 5 questions — 5 short situations, identify main message/purpose
  {
    id: "L4-1", part: 4, partLabel: "Parte 4: Situaciones cortas — identificar el propósito",
    type: "choice",
    audioScript: "Man: Hi, I'm calling about the job I applied for last week. I just wanted to check if you've had a chance to look at my application yet. I'm very interested in the position and I'm happy to come in for an interview at any time. Please call me back when you can. Thanks.",
    prompt: "¿Cuál es el propósito principal de este mensaje?",
    options: ["Cancelar una entrevista de trabajo", "Preguntar por el estado de una solicitud de empleo", "Quejarse por no haber recibido respuesta"],
    correct: 1,
  },
  {
    id: "L4-2", part: 4, partLabel: "Parte 4: Situaciones cortas — identificar el propósito",
    type: "choice",
    audioScript: "Teacher: Children tend to pick things up pretty quickly. Adults, on the other hand, often worry too much about looking foolish or making mistakes. They feel embarrassed when they fall off the bike, whereas children just laugh and get back on. That's why teaching adults to cycle can actually be more challenging than teaching kids.",
    prompt: "Según el profesor, ¿por qué enseñar ciclismo a adultos puede ser más difícil?",
    options: ["Los adultos no tienen tiempo para practicar", "Los adultos se avergüenzan más de cometer errores", "Los adultos tienen menos fuerza física"],
    correct: 1,
  },
  {
    id: "L4-3", part: 4, partLabel: "Parte 4: Situaciones cortas — identificar el propósito",
    type: "choice",
    audioScript: "Woman on phone: Hi Lucy! Listen, I'm really sorry but I'm going to be about twenty minutes late to lunch. The traffic is terrible and I'm stuck on the motorway. Can you order me a sparkling water and maybe let the restaurant know? I'll be there as soon as I can. Thanks so much!",
    prompt: "¿Por qué llama esta mujer?",
    options: ["Para cancelar el almuerzo", "Para avisar de que llegará tarde y pedir un favor", "Para pedir indicaciones al restaurante"],
    correct: 1,
  },
  {
    id: "L4-4", part: 4, partLabel: "Parte 4: Situaciones cortas — identificar el propósito",
    type: "choice",
    audioScript: "Presenter: And now, a word about our museum's temporary exhibition. 'Colours of the Amazon' runs until the end of September. Tickets are available online or at the door — adults pay twelve pounds and children under 12 enter free. Members of the museum get a 20% discount. Don't miss this unique opportunity!",
    prompt: "¿Qué información se da sobre la entrada al museo?",
    options: ["La entrada es gratuita para todos", "Los niños menores de 12 años no pagan", "Los socios pagan el precio completo"],
    correct: 1,
  },
  {
    id: "L4-5", part: 4, partLabel: "Parte 4: Situaciones cortas — identificar el propósito",
    type: "choice",
    audioScript: "Student: I've been studying English for three years and I still make so many mistakes. I'm starting to feel like I'll never be fluent. Professor: That's completely normal. Everyone goes through a plateau phase. The key is to keep exposing yourself to the language — watch films, read books, talk to native speakers. Progress isn't always visible, but it's happening.",
    prompt: "¿Qué consejo da el profesor al estudiante?",
    options: ["Estudiar más gramática", "Seguir exponiéndose al idioma de distintas formas", "Tomarse un descanso del estudio"],
    correct: 1,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// READING — 22 questions across 4 parts
// ─────────────────────────────────────────────────────────────────────────────
const readingQuestions: Question[] = [
  // PART 1: 6 short texts, one MC question each
  {
    id: "R1-1", part: 1, partLabel: "Parte 1: Textos cortos — opción múltiple",
    type: "choice",
    context: ` Anuncio en un tablón:\n\n"LOST: Black and white cat named Oreo. Missing since Tuesday 14th. Last seen near Maple Street. Very friendly. Reward offered. Please call 07845 221 033 or email pets@localmail.com"`,
    prompt: "¿Qué quiere el dueño del gato?",
    options: ["Dar el gato en adopción", "Que le llamen o escriban si alguien lo ve", "Reportar el gato a las autoridades"],
    correct: 1,
  },
  {
    id: "R1-2", part: 1, partLabel: "Parte 1: Textos cortos — opción múltiple",
    type: "choice",
    context: ` Nota en la oficina:\n\n"Hi team — the printer on the second floor is out of order. Please use the one in the IT room on the ground floor until further notice. Sorry for the inconvenience. — Management"`,
    prompt: "¿Qué deben hacer los empleados mientras se arregla la impresora del segundo piso?",
    options: ["Usar la impresora del tercer piso", "Usar la impresora de la sala de informática en la planta baja", "Esperar hasta que la impresora esté reparada"],
    correct: 1,
  },
  {
    id: "R1-3", part: 1, partLabel: "Parte 1: Textos cortos — opción múltiple",
    type: "choice",
    context: ` Mensaje de texto:\n\n"Hey! Don't forget the cinema tonight. Film starts at 7:30. I'll be outside from 7:15. Grab your student card — they might ask for ID at the desk. See you later! "`,
    prompt: "¿Por qué menciona la persona el carnet de estudiante?",
    options: ["Para conseguir descuento en las entradas", "Porque podrían pedir identificación", "Para reservar los asientos con antelación"],
    correct: 1,
  },
  {
    id: "R1-4", part: 1, partLabel: "Parte 1: Textos cortos — opción múltiple",
    type: "choice",
    context: ` Correo electrónico:\n\n"Dear all, as discussed in our last meeting, the presentation date has been moved from Thursday 10th to Tuesday 15th due to the conference clash. Please update your diaries. The time remains the same: 2pm in Room 4. Best, David"`,
    prompt: "¿Por qué se cambió la fecha de la presentación?",
    options: ["Porque David no podía asistir el jueves", "Debido a un conflicto con una conferencia", "Porque la sala no estaba disponible el jueves"],
    correct: 1,
  },
  {
    id: "R1-5", part: 1, partLabel: "Parte 1: Textos cortos — opción múltiple",
    type: "choice",
    context: ` Aviso en la piscina:\n\n"NOTICE: The outdoor pool will be closed for maintenance from 1st to 7th August. During this period, all members may use the indoor pool at no extra charge. We apologise for the inconvenience."`,
    prompt: "¿Qué pueden hacer los socios durante el cierre de la piscina exterior?",
    options: ["Pagar una tarifa especial para usar la piscina interior", "Usar la piscina interior sin coste adicional", "Esperar hasta el 7 de agosto para nadar"],
    correct: 1,
  },
  {
    id: "R1-6", part: 1, partLabel: "Parte 1: Textos cortos — opción múltiple",
    type: "choice",
    context: ` Mensaje de WhatsApp:\n\n"Hi Sam! Are you coming to Jake's leaving party on Friday? It's at The Blue Door bar — you know, the one near the station. Starts at 8. Bring some cash as the bar doesn't take cards. Hope you can make it! "`,
    prompt: "¿Por qué dice que traiga dinero en efectivo?",
    options: ["Para pagar la entrada a la fiesta", "Porque el bar no acepta tarjetas", "Porque el transporte al bar es caro"],
    correct: 1,
  },

  // PART 2: 6 matching questions — profiles + texts
  {
    id: "R2-1", part: 2, partLabel: "Parte 2: Emparejamiento múltiple — perfiles y textos",
    type: "choice",
    context: ` Textos sobre cómo mantenerse en forma:\n\nTexto A — "¿Te falta tiempo? Haz ejercicio en casa". Explica rutinas de 20 minutos que no requieren equipamiento.\nTexto B — "Duerme más, vive mejor". Habla sobre cómo el sueño afecta el peso y el estado de ánimo.\nTexto C — "Únete a un club deportivo". Sobre los beneficios sociales y físicos de los deportes de equipo.\nTexto D — "Come más despacio y presta atención". Sobre el concepto de 'mindful eating' y la relación con la salud.`,
    prompt: "Samantha tiene una vida muy ocupada, trabaja largas horas y le resulta imposible ir al gimnasio. Quiere ponerse en forma sin salir de casa. ¿Qué texto le conviene más?",
    options: ["Texto A", "Texto B", "Texto C", "Texto D"],
    correct: 0,
  },
  {
    id: "R2-2", part: 2, partLabel: "Parte 2: Emparejamiento múltiple — perfiles y textos",
    type: "choice",
    context: ` Textos sobre cómo mantenerse en forma:\n\nTexto A — "¿Te falta tiempo? Haz ejercicio en casa"\nTexto B — "Duerme más, vive mejor"\nTexto C — "Únete a un club deportivo"\nTexto D — "Come más despacio y presta atención"`,
    prompt: "Carlos se siente solo desde que se mudó a una ciudad nueva y quiere conocer gente mientras mejora su condición física. ¿Qué texto le conviene más?",
    options: ["Texto A", "Texto B", "Texto C", "Texto D"],
    correct: 2,
  },
  {
    id: "R2-3", part: 2, partLabel: "Parte 2: Emparejamiento múltiple — perfiles y textos",
    type: "choice",
    context: ` Textos sobre cómo mantenerse en forma:\n\nTexto A — "¿Te falta tiempo? Haz ejercicio en casa"\nTexto B — "Duerme más, vive mejor"\nTexto C — "Únete a un club deportivo"\nTexto D — "Come más despacio y presta atención"`,
    prompt: "Diana siempre se siente cansada, come de forma apresurada entre reuniones y no entiende por qué engorda aunque no come en exceso. ¿Qué texto le conviene más?",
    options: ["Texto A", "Texto B", "Texto C", "Texto D"],
    correct: 3,
  },
  {
    id: "R2-4", part: 2, partLabel: "Parte 2: Emparejamiento múltiple — perfiles y textos",
    type: "choice",
    context: ` Textos sobre cursos de idiomas:\n\nCurso A — "FlexLearn Online": plataforma de autoaprendizaje, a tu ritmo, suscripción mensual de €9,99.\nCurso B — "Conversación Libre": sesiones semanales gratuitas en la biblioteca, voluntarios nativos.\nCurso C — "Academia Presencial Riverside": clases tradicionales, grupos pequeños, 3 veces/semana.\nCurso D — "Intensive Summer Camp": programa intensivo de 4 semanas, inmersión total, internado.`,
    prompt: "Marc es universitario y quiere mejorar su Speaking antes de una entrevista de trabajo. Solo puede permitirse opciones gratuitas o muy baratas. ¿Qué curso le conviene?",
    options: ["Curso A", "Curso B", "Curso C", "Curso D"],
    correct: 1,
  },
  {
    id: "R2-5", part: 2, partLabel: "Parte 2: Emparejamiento múltiple — perfiles y textos",
    type: "choice",
    context: ` Textos sobre cursos de idiomas:\n\nCurso A — "FlexLearn Online": plataforma de autoaprendizaje\nCurso B — "Conversación Libre": gratuito, biblioteca\nCurso C — "Academia Presencial Riverside": presencial, grupos pequeños\nCurso D — "Intensive Summer Camp": intensivo, 4 semanas, internado`,
    prompt: "Luisa trabaja a jornada completa y tiene dos hijos pequeños. Necesita un método flexible que pueda hacer a cualquier hora, con su propio ritmo. ¿Qué le conviene?",
    options: ["Curso A", "Curso B", "Curso C", "Curso D"],
    correct: 0,
  },
  {
    id: "R2-6", part: 2, partLabel: "Parte 2: Emparejamiento múltiple — perfiles y textos",
    type: "choice",
    context: ` Textos sobre cursos de idiomas:\n\nCurso A — "FlexLearn Online"\nCurso B — "Conversación Libre": gratuito, biblioteca\nCurso C — "Academia Presencial Riverside": presencial, grupos pequeños, sin tecnología\nCurso D — "Intensive Summer Camp": intensivo, internado`,
    prompt: "Diana tiene 65 años y se ha jubilado recientemente. Le gusta el contacto humano y las clases estructuradas. No se siente cómoda con la tecnología. ¿Qué le conviene?",
    options: ["Curso A", "Curso B", "Curso C", "Curso D"],
    correct: 2,
  },

  // PART 3: 6 gap fill questions
  {
    id: "R3-1", part: 3, partLabel: "Parte 3: Completar huecos — insertar frases",
    type: "choice",
    context: ` Texto: "¿Es una buena idea eliminar el plástico de un solo uso?"\n\nEl plástico de un solo uso ha sido objeto de debate global. [HUECO 1] Estas partículas entran en la cadena alimentaria a través del agua y los alimentos, planteando riesgos para la salud todavía no del todo comprendidos. Sin embargo, alternativas como el papel o el vidrio también tienen un impacto ambiental significativo en su producción.`,
    prompt: "¿Qué frase completa mejor el hueco [HUECO 1]?",
    options: [
      "El plástico no se descompone completamente, sino que se rompe en micropartículas que persisten durante siglos.",
      "El plástico fue inventado a principios del siglo XX y revolucionó la industria alimentaria.",
      "Algunos países han prohibido completamente el uso de bolsas de plástico en supermercados.",
    ],
    correct: 0,
  },
  {
    id: "R3-2", part: 3, partLabel: "Parte 3: Completar huecos — insertar frases",
    type: "choice",
    context: ` Texto: "El fenómeno del 'detox digital'"\n\nCada vez más personas optan por periodos de desconexión total de dispositivos electrónicos. [HUECO] Algunos afirman sentirse más creativos y descansados después de unos días sin pantallas, mientras que otros retoman sus hábitos digitales al poco tiempo.`,
    prompt: "¿Qué frase completa mejor el hueco?",
    options: [
      "Sin embargo, la investigación sobre los beneficios reales del detox digital no es concluyente.",
      "Los smartphones se inventaron en la década de 1990 y han transformado la sociedad.",
      "La mayoría de los expertos recomiendan usar el móvil al menos tres horas al día.",
    ],
    correct: 0,
  },
  {
    id: "R3-3", part: 3, partLabel: "Parte 3: Completar huecos — insertar frases",
    type: "choice",
    context: ` Texto: "La semana laboral de cuatro días"\n\nVarias empresas de todo el mundo han experimentado con la semana laboral de cuatro días. Los resultados han sido, en general, prometedores. [HUECO] No obstante, los sectores de servicios y sanidad se enfrentan a retos estructurales que hacen difícil aplicar este modelo de forma generalizada.`,
    prompt: "¿Qué frase completa mejor el hueco?",
    options: [
      "Los trabajadores reportan mayor satisfacción y productividad sin reducción salarial.",
      "La jornada laboral de ocho horas fue establecida en el siglo XIX por sindicalistas.",
      "Muchas empresas han decidido reducir los salarios para compensar el día libre.",
    ],
    correct: 0,
  },
  {
    id: "R3-4", part: 3, partLabel: "Parte 3: Completar huecos — insertar frases",
    type: "choice",
    context: ` Texto: "Aprendiendo de los pingüinos"\n\nLos científicos han encontrado una forma innovadora de localizar colonias de pingüinos Adelia desde el espacio. [HUECO] Gracias a esta coloración, los satélites pueden identificar con precisión las zonas donde viven estas aves sin necesidad de expediciones al terreno.`,
    prompt: "¿Qué frase completa mejor el hueco?",
    options: [
      "Las heces de estos pingüinos, teñidas de rosa por su dieta de krill, son visibles desde los satélites.",
      "Los pingüinos Adelia son las aves más grandes del continente antártico.",
      "Las expediciones científicas al Antártico cuestan millones de dólares cada año.",
    ],
    correct: 0,
  },
  {
    id: "R3-5", part: 3, partLabel: "Parte 3: Completar huecos — insertar frases",
    type: "choice",
    context: ` Texto: "Ciudades inteligentes"\n\nLas ciudades inteligentes utilizan tecnología para mejorar la calidad de vida de sus ciudadanos. [HUECO] Esto permite, por ejemplo, ajustar semáforos en tiempo real para reducir atascos o detectar fugas de agua antes de que se conviertan en problemas mayores.`,
    prompt: "¿Qué frase completa mejor el hueco?",
    options: [
      "Mediante sensores y análisis de datos, los gobiernos locales pueden tomar decisiones más eficientes.",
      "Las ciudades más grandes del mundo son Tokio, Delhi y Shanghai.",
      "La construcción de edificios inteligentes es muy cara y solo apta para países ricos.",
    ],
    correct: 0,
  },
  {
    id: "R3-6", part: 3, partLabel: "Parte 3: Completar huecos — insertar frases",
    type: "choice",
    context: ` Texto: "Bienestar mental en el trabajo"\n\nEl bienestar mental de los empleados se ha convertido en una prioridad para muchas empresas. [HUECO] Las compañías que invierten en programas de bienestar reportan menor absentismo y mayor retención del talento.`,
    prompt: "¿Qué frase completa mejor el hueco?",
    options: [
      "Se estima que el estrés laboral cuesta a la economía global cientos de miles de millones de dólares al año.",
      "La mayoría de los empleados prefieren trabajar desde casa de forma permanente.",
      "El bienestar mental es un concepto nuevo que surgió en los años 2000.",
    ],
    correct: 0,
  },

  // PART 4: 4 comprehension questions on a long text
  {
    id: "R4-1", part: 4, partLabel: "Parte 4: Texto largo — comprensión lectora",
    type: "choice",
    context: ` Texto: "El jardín de la ciudad"\n\nLa jardinería urbana ha experimentado un auge sin precedentes en las grandes ciudades. Cada vez más residentes que carecen de espacios al aire libre han comenzado a cultivar verduras y hierbas aromáticas en balcones, azoteas e incluso en repisas de ventanas. Los huertos comunitarios, donde los vecinos comparten una parcela de terreno, también han florecido. Estas iniciativas no solo proporcionan alimentos frescos, sino que también contribuyen a reducir el estrés, estrechar lazos comunitarios y fomentar la biodiversidad urbana. Algunos ayuntamientos han empezado a apoyar estos proyectos proporcionando semillas gratuitas y talleres de formación. A pesar de estos avances, los expertos advierten que la jardinería urbana no puede sustituir a la agricultura convencional en términos de escala y producción.`,
    prompt: "¿Cuál es la idea principal del texto?",
    options: [
      "La jardinería urbana puede reemplazar completamente a la agricultura convencional.",
      "La jardinería urbana crece en popularidad y aporta beneficios, aunque tiene limitaciones.",
      "Los ayuntamientos deberían prohibir los huertos en los balcones por razones de seguridad.",
    ],
    correct: 1,
  },
  {
    id: "R4-2", part: 4, partLabel: "Parte 4: Texto largo — comprensión lectora",
    type: "choice",
    context: ` Texto: "El jardín de la ciudad" (ver texto anterior)`,
    prompt: "Según el texto, ¿qué han hecho algunos ayuntamientos para apoyar la jardinería urbana?",
    options: [
      "Han construido parques nuevos en el centro de la ciudad.",
      "Han proporcionado semillas gratuitas y talleres de formación.",
      "Han obligado a todos los vecinos a tener un huerto en casa.",
    ],
    correct: 1,
  },
  {
    id: "R4-3", part: 4, partLabel: "Parte 4: Texto largo — comprensión lectora",
    type: "choice",
    context: ` Texto: "El jardín de la ciudad" (ver texto anterior)`,
    prompt: "¿Qué limitación de la jardinería urbana menciona el texto?",
    options: [
      "Es demasiado cara para la mayoría de los ciudadanos.",
      "No puede competir con la agricultura convencional en escala ni producción.",
      "Solo funciona en ciudades con clima cálido.",
    ],
    correct: 1,
  },
  {
    id: "R4-4", part: 4, partLabel: "Parte 4: Texto largo — comprensión lectora",
    type: "choice",
    context: ` Texto: "El jardín de la ciudad" (ver texto anterior)`,
    prompt: "¿Qué significa 'han florecido' en el contexto del texto?",
    options: ["Han producido flores", "Han crecido y prosperado", "Han desaparecido gradualmente"],
    correct: 1,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// WRITING — 2 tasks with detailed prompts
// ─────────────────────────────────────────────────────────────────────────────
const writingQuestions: Question[] = [
  {
    id: "W1", part: 1, partLabel: "Tarea 1: Email (80-130 palabras)",
    type: "text",
    context: "️ Has recibido este email de la directora del centro de ciencias local:",
    prompt: `"Dear student,\n\nWe are delighted to invite your class to visit our Science Centre next month. We would love to show you our new robotics exhibition and interactive lab sessions.\n\nCould you please let us know:\n• How many students will be coming?\n• Which date works best for you?\n• Would you like a guided tour?\n\nWe look forward to hearing from you.\nBest wishes,\nSarah Johnson, Director"\n\nEscribe un email de respuesta. Responde a los TRES puntos. (80-130 palabras)`,
    minWords: 80,
  },
  {
    id: "W2", part: 2, partLabel: "Tarea 2: Elige entre Ensayo, Artículo o Reseña (100-160 palabras)",
    type: "text",
    context: " Elige UNA de las siguientes opciones y escríbela en inglés:",
    prompt: `OPCIÓN A — ENSAYO:\n"¿Qué pueden hacer los ciudadanos individuales para ayudar a proteger el medio ambiente? Da al menos dos ideas concretas y tu opinión personal."\n\nOPCIÓN B — ARTÍCULO:\n"Escribe un artículo para una revista estudiantil sobre los beneficios de aprender un idioma extranjero. Menciona al menos dos ventajas específicas."\n\nOPCIÓN C — RESEÑA:\n"Escribe una reseña de una película, serie o libro que hayas visto o leído recientemente. Di de qué trata y recomienda (o no) por qué la gente debería verlo/leerlo."\n\n(100-160 palabras)`,
    minWords: 100,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SPEAKING — 17 questions across 4 parts — uses Web Speech Recognition
// ─────────────────────────────────────────────────────────────────────────────
const speakingQuestions: Question[] = [
  // Part 1: 8 interview questions
  { id: "SP1-1", part: 1, partLabel: "Parte 1: Entrevista (8 preguntas — ~10-20 seg cada una)", type: "voice",
    prompt: "What is your name and where are you from?", timeSeconds: 15 },
  { id: "SP1-2", part: 1, partLabel: "Parte 1: Entrevista", type: "voice",
    prompt: "Tell me about your daily routine. What do you usually do in the mornings?", timeSeconds: 20 },
  { id: "SP1-3", part: 1, partLabel: "Parte 1: Entrevista", type: "voice",
    prompt: "What do you enjoy doing in your free time? Do you prefer indoor or outdoor activities?", timeSeconds: 20 },
  { id: "SP1-4", part: 1, partLabel: "Parte 1: Entrevista", type: "voice",
    prompt: "Tell me about your studies or job. What do you like most about it?", timeSeconds: 20 },
  { id: "SP1-5", part: 1, partLabel: "Parte 1: Entrevista", type: "voice",
    prompt: "When was the last time you tried something new and exciting? What was it?", timeSeconds: 25 },
  { id: "SP1-6", part: 1, partLabel: "Parte 1: Entrevista", type: "voice",
    prompt: "How has technology changed the way people spend their free time compared to 20 years ago?", timeSeconds: 30 },
  { id: "SP1-7", part: 1, partLabel: "Parte 1: Entrevista", type: "voice",
    prompt: "What is your favourite type of food or restaurant? Why do you like it?", timeSeconds: 20 },
  { id: "SP1-8", part: 1, partLabel: "Parte 1: Entrevista", type: "voice",
    prompt: "Do you prefer spending time with a large group of friends or a small group? Why?", timeSeconds: 25 },

  // Part 2: 2 voice messages
  { id: "SP2-1", part: 2, partLabel: "Parte 2: Mensaje de voz — dejar un mensaje (40 seg)", type: "voice",
    context: " Tu amigo Sam te ha dejado este mensaje:",
    prompt: `"Hey! I'm planning a birthday party next Saturday evening. I'd love you to come! Can you make it? What time works best for you? And could you bring something to eat or drink?"\n\nDeja tu respuesta en voz. Responde a los TRES puntos. (40 segundos)`,
    timeSeconds: 40 },
  { id: "SP2-2", part: 2, partLabel: "Parte 2: Mensaje de voz — responder (40 seg)", type: "voice",
    context: " Mensaje de un compañero de trabajo:",
    prompt: `"Hi! This is Alex from the office. I need some help with the presentation for the client meeting on Thursday. Could you give me some advice on how to structure it? Also, do you have any templates I could use? Thanks!"\n\nResponde al mensaje de Alex. Sé útil y usa un tono semi-formal. (40 segundos)`,
    timeSeconds: 40 },

  // Part 3: 1 monologue — compare images
  { id: "SP3-1", part: 3, partLabel: "Parte 3: Monólogo comparativo (1 minuto)", type: "voice",
    context: "️ Imagina que ves estas dos imágenes:",
    prompt: `Imagen A: Personas estudiando solas en una biblioteca silenciosa, con auriculares y libros.\nImagen B: Un grupo de estudiantes estudiando juntos en una cafetería, hablando y compartiendo apuntes.\n\nCompara las dos formas de estudiar. ¿Cuáles son las ventajas y desventajas de cada una? ¿Cuál prefieres tú y por qué?\n\n(Habla durante 1 minuto aproximadamente)`,
    timeSeconds: 60 },

  // Part 4: 6 follow-up questions
  { id: "SP4-1", part: 4, partLabel: "Parte 4: Follow-up questions (6 preguntas)", type: "voice",
    prompt: "How much time do you usually spend studying each day? Do you think it's enough?", timeSeconds: 30 },
  { id: "SP4-2", part: 4, partLabel: "Parte 4: Follow-up questions", type: "voice",
    prompt: "Do you think studying in groups is always beneficial, or can it sometimes be a distraction?", timeSeconds: 35 },
  { id: "SP4-3", part: 4, partLabel: "Parte 4: Follow-up questions", type: "voice",
    prompt: "How important is it to have a quiet environment to study effectively?", timeSeconds: 30 },
  { id: "SP4-4", part: 4, partLabel: "Parte 4: Follow-up questions", type: "voice",
    prompt: "What role does technology play in the way students study today compared to in the past?", timeSeconds: 35 },
  { id: "SP4-5", part: 4, partLabel: "Parte 4: Follow-up questions", type: "voice",
    prompt: "Do you think teachers should assign more group projects or more individual work? Why?", timeSeconds: 35 },
  { id: "SP4-6", part: 4, partLabel: "Parte 4: Follow-up questions", type: "voice",
    prompt: "If you could change one thing about the education system in your country, what would it be?", timeSeconds: 40 },
];

const allModuleQuestions: Record<ModuleId, Question[]> = {
  listening: listeningQuestions,
  reading: readingQuestions,
  writing: writingQuestions,
  speaking: speakingQuestions,
};

const moduleConfig = {
  listening: { icon: <Headphones size={15}/>, label: "Listening", time: 30, color: "listening", totalQ: 20 },
  reading:   { icon: <BookOpen size={15}/>, label: "Reading",   time: 35, color: "reading",   totalQ: 22 },
  writing:   { icon: <PenTool size={15}/>, label: "Writing",   time: 45, color: "writing",   totalQ: 2 },
  speaking:  { icon: <Mic size={15}/>, label: "Speaking",  time: 15, color: "speaking",  totalQ: 17 },
};

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// LISTENING AUDIO — Web Speech API TTS
// ─────────────────────────────────────────────────────────────────────────────
function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.88;
    utterance.pitch = 1;
    // Try to pick a British English voice
    const voices = window.speechSynthesis.getVoices();
    const british = voices.find(v => v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en"));
    if (british) utterance.voice = british;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => { setIsSpeaking(false); setPlayCount(c => c + 1); };
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, playCount };
}

// ─────────────────────────────────────────────────────────────────────────────
// SPEAKING — Web Speech Recognition
// ─────────────────────────────────────────────────────────────────────────────
function useSpeechRecognition(onResult: (text: string) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const startRecording = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    let finalText = "";
    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript + " ";
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      const combined = (finalText + interim).trim();
      setTranscript(combined);
      onResult(combined);
    };
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => setIsRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setTranscript("");
  }, [onResult]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  return { startRecording, stopRecording, isRecording, isSupported, transcript };
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function SimulatorPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [selectedModules, setSelectedModules] = useState<ModuleId[]>(["listening", "reading", "writing", "speaking"]);
  const [activeModIdx, setActiveModIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimeWarning, setIsTimeWarning] = useState(false);
  const [playedAudio, setPlayedAudio] = useState<Record<string, number>>({}); // how many times played per question
  const [voiceAnswer, setVoiceAnswer] = useState("");

  const { speak, stop, isSpeaking, playCount } = useTextToSpeech();
  const handleVoiceResult = useCallback((text: string) => {
    setVoiceAnswer(text);
    setAnswers(prev => ({ ...prev, [activeQ?.id ?? ""]: text }));
  }, []);
  const { startRecording, stopRecording, isRecording, isSupported: speechSupported, transcript } = useSpeechRecognition(handleVoiceResult);

  const activeMod = selectedModules[activeModIdx] as ModuleId;
  const questions = allModuleQuestions[activeMod] || [];
  const activeQ = questions[qIdx];

  // Reset voice answer on question change
  useEffect(() => { setVoiceAnswer(""); }, [qIdx, activeModIdx]);

  const nextModule = useCallback(() => {
    stop();
    stopRecording();
    if (activeModIdx < selectedModules.length - 1) {
      const ni = activeModIdx + 1;
      setActiveModIdx(ni);
      setQIdx(0);
      const nm = selectedModules[ni] as ModuleId;
      setTimeLeft(moduleConfig[nm].time * 60);
      setIsTimeWarning(false);
    } else {
      setPhase("results");
    }
  }, [activeModIdx, selectedModules, stop, stopRecording]);

  // Timer
  useEffect(() => {
    if (phase !== "exam") return;
    if (timeLeft <= 0) { nextModule(); return; }
    setIsTimeWarning(timeLeft <= 120);
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft, nextModule]);

  const startExam = () => {
    if (!selectedModules.length) return;
    setActiveModIdx(0);
    setQIdx(0);
    setAnswers({});
    setPlayedAudio({});
    const fm = selectedModules[0] as ModuleId;
    setTimeLeft(moduleConfig[fm].time * 60);
    setIsTimeWarning(false);
    setPhase("exam");
  };

  const playAudio = () => {
    if (!activeQ?.audioScript) return;
    const count = playedAudio[activeQ.id] || 0;
    if (count >= 2) return; // max 2 plays
    speak(activeQ.audioScript);
    setPlayedAudio(prev => ({ ...prev, [activeQ.id]: count + 1 }));
  };

  const setAnswer = (key: string, val: string | number) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
  };

  const canAdvance = (() => {
    if (!activeQ) return false;
    if (activeQ.type === "choice") return answers[activeQ.id] !== undefined;
    if (activeQ.type === "text") {
      const wc = ((answers[activeQ.id] as string) || "").trim().split(/\s+/).filter(Boolean).length;
      return wc >= (activeQ.minWords ? activeQ.minWords * 0.3 : 20);
    }
    if (activeQ.type === "voice") {
      return (answers[activeQ.id] as string || "").trim().length > 10;
    }
    return false;
  })();

  // Results calc
  const calcResults = () => {
    const byModule: Record<string, { correct: number; total: number }> = {};
    selectedModules.forEach(mid => {
      const qs = allModuleQuestions[mid as ModuleId];
      let correct = 0, total = 0;
      qs.forEach(q => {
        if (q.type === "choice") {
          total++;
          if (answers[q.id] === q.correct) correct++;
        }
      });
      byModule[mid] = { correct, total };
    });
    return byModule;
  };

  const moduleOrder: ModuleId[] = ["listening", "reading", "writing", "speaking"];

  return (
    <>
      {phase !== "exam" && (
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0.875rem 1.5rem", background: "rgba(10,14,26,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span></span><span style={{ fontWeight: 800, color: "#f1f5f9" }}>OTE<span style={{ color: "#fbbf24" }}>Master</span></span>
          </Link>
          <Link href="/dashboard" className="btn btn-ghost btn-sm">← Dashboard</Link>
        </nav>
      )}

      <main className={`${styles.main} ${phase === "exam" ? styles.examMode : ""}`}>

        {/* ── SETUP ── */}
        {phase === "setup" && (
          <div className={styles.setupPage}>
            <div className={styles.setupHeader}>
              <span className="badge badge-gold"> Simulador Oficial</span>
              <h1 className={styles.setupTitle}>Simulador Oxford Test of English</h1>
              <p className={styles.setupSub}>
                Examen completo con <strong>59 preguntas reales</strong>: Listening con audio, Reading con textos, Speaking con tu voz y Writing con feedback
              </p>
            </div>

            {/* Module grid */}
            <div className={styles.modulePicker}>
              {moduleOrder.map(mid => {
                const m = moduleConfig[mid];
                const sel = selectedModules.includes(mid);
                return (
                  <button key={mid}
                    className={`${styles.modCard} ${sel ? styles.modCardActive : ""} ${styles[`mod_${m.color}`]}`}
                    onClick={() => setSelectedModules(p => sel ? p.filter(x => x !== mid) : [...p, mid])}>
                    <div className={styles.modCardTop}>
                      <span className={styles.modCardIcon}>{m.icon}</span>
                      <span className={`badge badge-${m.color}`}>{m.label}</span>
                      {sel && <span className={styles.modCheck}>✓</span>}
                    </div>
                    <div className={styles.modCardStats}>
                      <span> {m.time} min</span>
                      <span> {m.totalQ} preguntas</span>
                      <span> 4 partes</span>
                    </div>
                    <div className={styles.modCardFeature}>
                      {mid === "listening" && " Audio real con TTS"}
                      {mid === "reading" && " Textos oficiales OTE"}
                      {mid === "writing" && "️ 2 tareas con feedback"}
                      {mid === "speaking" && " Reconocimiento de voz"}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={styles.setupSummary}>
              <div className={styles.sumItem}><span className={styles.sumNum}>{selectedModules.reduce((a, m) => a + moduleConfig[m as ModuleId].totalQ, 0)}</span><span className={styles.sumLabel}>preguntas</span></div>
              <div className={styles.sumItem}><span className={styles.sumNum}>{selectedModules.reduce((a, m) => a + moduleConfig[m as ModuleId].time, 0)}</span><span className={styles.sumLabel}>minutos</span></div>
              <div className={styles.sumItem}><span className={styles.sumNum}>{selectedModules.length}</span><span className={styles.sumLabel}>módulos</span></div>
            </div>

            <div className={styles.setupNote}>
              <p> <strong>Listening</strong>: el audio se reproduce directamente en tu navegador (Web Speech API)</p>
              <p> <strong>Speaking</strong>: usa el micrófono de tu dispositivo para responder en voz alta (requiere Chrome/Edge)</p>
            </div>

            <button className={`btn btn-primary btn-lg ${styles.startBtn}`} onClick={startExam} disabled={!selectedModules.length}>
               Comenzar examen →
            </button>
          </div>
        )}

        {/* ── EXAM ── */}
        {phase === "exam" && activeQ && (
          <div className={styles.examLayout}>
            {/* Sticky header */}
            <div className={`${styles.examBar} ${isTimeWarning ? styles.examBarWarn : ""}`}>
              <div className={styles.examBarLeft}>
                <span className={`badge badge-${moduleConfig[activeMod].color}`}>
                  {moduleConfig[activeMod].icon} {moduleConfig[activeMod].label}
                </span>
                <span className={styles.partLabel}>{activeQ.partLabel}</span>
              </div>
              <div className={`${styles.timerBox} ${isTimeWarning ? styles.timerWarn : ""}`}>
                 {formatTime(timeLeft)}
              </div>
              <div className={styles.examBarRight}>
                <span className={styles.qCounter}>{qIdx + 1} / {questions.length}</span>
              </div>
            </div>

            {/* Module progress strip */}
            <div className={styles.modStrip}>
              {selectedModules.map((mid, i) => (
                <div key={mid} className={`${styles.modStripItem} ${i === activeModIdx ? styles.modStripActive : i < activeModIdx ? styles.modStripDone : ""}`}>
                  {moduleConfig[mid as ModuleId].icon} {moduleConfig[mid as ModuleId].label}
                </div>
              ))}
            </div>

            {/* Question progress bar */}
            <div style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
              <div style={{ height: "100%", width: `${((qIdx + 1) / questions.length) * 100}%`, background: `var(--${moduleConfig[activeMod].color}-color, #fbbf24)`, transition: "width 0.4s ease" }} />
            </div>

            <div className={styles.examContent}>
              <div className={styles.examCard}>

                {/* LISTENING: Audio Player */}
                {activeMod === "listening" && activeQ.audioScript && (
                  <div className={styles.audioPanel}>
                    <div className={styles.audioPanelLeft}>
                      <div className={`${styles.audioWave} ${isSpeaking ? styles.audioWaveActive : ""}`}>
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className={styles.audioBar} style={{ animationDelay: `${i * 0.08}s` }} />
                        ))}
                      </div>
                      <div>
                        <p className={styles.audioPanelLabel}>Audio del examen</p>
                        <p className={styles.audioPanelSub}>
                          {isSpeaking ? " Reproduciendo..." : `Reproducciones: ${playedAudio[activeQ.id] || 0}/2`}
                        </p>
                      </div>
                    </div>
                    <div className={styles.audioBtns}>
                      <button
                        className={`btn ${isSpeaking ? "btn-secondary" : "btn-primary"} btn-sm`}
                        onClick={isSpeaking ? stop : playAudio}
                        disabled={(playedAudio[activeQ.id] || 0) >= 2 && !isSpeaking}
                      >
                        {isSpeaking ? " Parar" : (playedAudio[activeQ.id] || 0) === 0 ? " Escuchar audio" : " Escuchar de nuevo"}
                      </button>
                      {(playedAudio[activeQ.id] || 0) >= 2 && !isSpeaking && (
                        <span className={styles.audioLimit}>Límite de 2 reproducciones alcanzado</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Context (Reading passages) */}
                {activeQ.context && activeMod !== "listening" && (
                  <div className={styles.contextBox}>
                    {activeQ.context.split("\n").map((line, i) =>
                      line.trim() === "" ? <br key={i} /> : <p key={i}>{line}</p>
                    )}
                  </div>
                )}

                {/* Prompt */}
                <div className={styles.qPrompt}>
                  {activeQ.prompt.split("\n").map((line, i) =>
                    line.startsWith("•") ? <li key={i} style={{ marginLeft: "1.5rem", color: "#94a3b8", marginBottom: "0.25rem" }}>{line.slice(1).trim()}</li>
                    : line.trim() === "" ? <br key={i} />
                    : <p key={i}>{line}</p>
                  )}
                </div>

                {/* CHOICE */}
                {activeQ.type === "choice" && (
                  <div className={styles.optionsList}>
                    {activeQ.options!.map((opt, oi) => (
                      <button key={oi}
                        className={`${styles.optBtn} ${answers[activeQ.id] === oi ? styles.optSelected : ""}`}
                        onClick={() => setAnswer(activeQ.id, oi)}>
                        <span className={styles.optLetter}>{String.fromCharCode(65 + oi)}</span>
                        <span>{opt}</span>
                        {answers[activeQ.id] === oi && <span className={styles.optDot}>●</span>}
                      </button>
                    ))}
                  </div>
                )}

                {/* TEXT (Writing) */}
                {activeQ.type === "text" && (
                  <div className={styles.textSection}>
                    <textarea
                      className={`textarea ${styles.writingTextarea}`}
                      placeholder="Write your answer in English here..."
                      value={(answers[activeQ.id] as string) || ""}
                      onChange={e => setAnswer(activeQ.id, e.target.value)}
                      rows={10}
                    />
                    <div className={styles.wordCountBar}>
                      <span style={{
                        color: (() => {
                          const wc = ((answers[activeQ.id] as string) || "").trim().split(/\s+/).filter(Boolean).length;
                          return wc < (activeQ.minWords || 80) ? "#f87171" : "#34d399";
                        })(),
                        fontWeight: 700
                      }}>
                        {((answers[activeQ.id] as string) || "").trim().split(/\s+/).filter(Boolean).length}
                      </span>
                      <span style={{ color: "#475569" }}> / mínimo {activeQ.minWords} palabras</span>
                    </div>
                  </div>
                )}

                {/* VOICE (Speaking) */}
                {activeQ.type === "voice" && (
                  <div className={styles.voiceSection}>
                    <div className={styles.voiceTimer}>
                      <span className={styles.voiceTimerLabel}>Tiempo sugerido:</span>
                      <span className={styles.voiceTimerVal}>{activeQ.timeSeconds} segundos</span>
                    </div>

                    {speechSupported ? (
                      <div className={styles.voiceControls}>
                        <button
                          className={`btn ${isRecording ? styles.btnRecording : "btn-primary"} btn-lg ${styles.micBtn}`}
                          onClick={isRecording ? stopRecording : startRecording}
                        >
                          {isRecording ? (
                            <><span className={styles.recDot} />Detener grabación</>
                          ) : (
                            <><span></span> Hablar en inglés</>
                          )}
                        </button>

                        {isRecording && (
                          <div className={styles.recordingIndicator}>
                            <div className={styles.recWave}>
                              {[...Array(8)].map((_, i) => (
                                <div key={i} className={styles.recBar} style={{ animationDelay: `${i * 0.1}s` }} />
                              ))}
                            </div>
                            <span>Grabando... habla en inglés</span>
                          </div>
                        )}

                        {(answers[activeQ.id] as string || "").trim() && (
                          <div className={styles.transcriptResult}>
                            <p className={styles.transcriptLabel}> Lo que dijiste:</p>
                            <p className={styles.transcriptText}>{answers[activeQ.id] as string}</p>
                            <div className={styles.transcriptStats}>
                              <span>{((answers[activeQ.id] as string) || "").trim().split(/\s+/).filter(Boolean).length} palabras detectadas</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={styles.voiceFallback}>
                        <p className={styles.voiceFallbackTitle}>️ Micrófono no disponible</p>
                        <p className={styles.voiceFallbackSub}>Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge para activar esta función.</p>
                        <p className={styles.voiceFallbackAlt}>Como alternativa, escribe lo que dirías:</p>
                        <textarea
                          className={`textarea`}
                          placeholder="Write what you would say in English..."
                          value={(answers[activeQ.id] as string) || ""}
                          onChange={e => setAnswer(activeQ.id, e.target.value)}
                          rows={6}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className={styles.examNav}>
                  <button className="btn btn-ghost btn-sm" onClick={() => qIdx > 0 && setQIdx(q => q - 1)} disabled={qIdx === 0}>
                    ← Anterior
                  </button>
                  {qIdx < questions.length - 1 ? (
                    <button className="btn btn-secondary btn-sm" onClick={() => setQIdx(q => q + 1)}>
                      Siguiente →
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={nextModule}>
                      {activeModIdx < selectedModules.length - 1 ? `Módulo siguiente: ${moduleConfig[selectedModules[activeModIdx + 1] as ModuleId].label} →` : "Finalizar examen "}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {phase === "results" && (
          <div className={styles.resultsPage}>
            <div className={styles.resBadge}></div>
            <h1 className={styles.resTitle}>Examen Completado</h1>
            <p className={styles.resSub}>Resultados de tus módulos seleccionados</p>

            {(() => {
              const results = calcResults();
              const choiceTotal = Object.values(results).reduce((a, r) => a + r.total, 0);
              const choiceCorrect = Object.values(results).reduce((a, r) => a + r.correct, 0);
              const pct = choiceTotal > 0 ? Math.round((choiceCorrect / choiceTotal) * 100) : 0;
              const level = pct >= 75 ? "B2" : pct >= 55 ? "B1" : "A2";
              const levelColor = level === "B2" ? "#60a5fa" : level === "B1" ? "#34d399" : "#94a3b8";

              return (
                <>
                  <div className={styles.resScoreBox} style={{ borderColor: levelColor + "40", boxShadow: `0 0 60px ${levelColor}20` }}>
                    <div className={styles.resLevelBig} style={{ color: levelColor }}>{level}</div>
                    <div className={styles.resScoreNum}>{pct}%</div>
                    <div className={styles.resScoreSub}>{choiceCorrect}/{choiceTotal} preguntas objectivas correctas</div>
                  </div>

                  <div className={styles.resModules}>
                    {selectedModules.map(mid => {
                      const r = results[mid] || { correct: 0, total: 0 };
                      const mc = moduleConfig[mid as ModuleId];
                      const mpct = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
                      const hasVoice = allModuleQuestions[mid as ModuleId].some(q => q.type === "voice");
                      const hasText = allModuleQuestions[mid as ModuleId].some(q => q.type === "text");
                      return (
                        <div key={mid} className={`${styles.resModule} ${styles[`resMod_${mc.color}`]}`}>
                          <div className={styles.resModIcon}>{mc.icon}</div>
                          <div className={styles.resModInfo}>
                            <p className={styles.resModName}>{mc.label}</p>
                            {r.total > 0 && <p className={styles.resModScore} style={{ color: "#34d399" }}>{r.correct}/{r.total} correctas ({mpct}%)</p>}
                            {hasText && <p className={styles.resModPending} style={{ color: "#fbbf24" }}>️ Writing: requiere revisión por examinador</p>}
                            {hasVoice && <p className={styles.resModPending} style={{ color: "#a78bfa" }}> Speaking: requiere evaluación oral oficial</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className={styles.resNote}>
                    ️ Este resultado es <strong>formativo</strong>. El Speaking y Writing del examen oficial son evaluados por examinadores humanos certificados. El score oficial del OTE va de 51 a 170 puntos.
                  </div>
                </>
              );
            })()}

            <div className={styles.resActions}>
              <button className="btn btn-primary btn-lg" onClick={() => { setPhase("setup"); setSelectedModules(["listening","reading","writing","speaking"]); }}>
                 Repetir simulador
              </button>
              <Link href="/dashboard" className="btn btn-secondary btn-lg">Ir al dashboard</Link>
              <Link href="/placement" className="btn btn-outline">Repetir diagnóstico de nivel</Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
