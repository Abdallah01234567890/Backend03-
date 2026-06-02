/*
  ================================================
  PORTFOLIO BACKEND API — Abdallah Sodangu
  Deploy: Render.com
  Frontend URL: https://abdallahsodangutech.vercel.app
  ================================================
*/

const express = require('express');
const cors    = require('cors');
const app     = express();

const PORT = process.env.PORT || 3001;

// ------------------------------------------------
// CORS — Ruhusu frontend yako ya Vercel kufikia API
// ------------------------------------------------
const allowedOrigins = [
  'https://abdallahsodangutech.vercel.app',  
  'http://127.0.0.1:5500',                   
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    // Ruhusu requests bila origin (Postman, curl) wakati wa development
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// ------------------------------------------------
// ROUTE 1: Health Check
// GET https://backend03-1.onrender.com/api/health
// ------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status:    'ok',
    message:   'Abdallah Sodangu Portfolio API is running!',
    timestamp: new Date().toISOString(),
  });
});

// ------------------------------------------------
// ROUTE 2: Personal Info
// GET https://backend03-1.onrender.com/api/info
// ------------------------------------------------
app.get('/api/info', (req, res) => {
  res.json({
    name:     'Abdallah Sodangu',
    title:    'Data Scientist & Cloud Developer',
    location: 'Dar es Salaam, Tanzania',
    email:    'sodangua@gmail.com',
    phone:    '+255 622 726 900',
    linkedin: 'linkedin.com/in/AbdallahSodangu',
    github:   'github.com/Abdallah01234567890',
    bio:      'A passionate Data Scientist and Cloud Developer studying at Eastern Africa Statistical Training Centre, specializing in data analysis, software engineering, and cloud platforms.',
  });
});

// ------------------------------------------------
// ROUTE 3: Skills
// GET https://backend03-1.onrender.com/api/skills
// ------------------------------------------------
app.get('/api/skills', (req, res) => {
  res.json({
    categories: [
      { id: 1, category: 'Cloud Platforms',      items: ['Vercel', 'Render', 'AWS', 'Firebase'] },
      { id: 2, category: 'Frontend',              items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'] },
      { id: 3, category: 'Backend',               items: ['Node.js', 'Express', 'Python', 'Flask', 'REST APIs'] },
      { id: 4, category: 'Data Science',          items: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'] },
      { id: 5, category: 'Databases',             items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
      { id: 6, category: 'DevOps & Tools',        items: ['Git', 'GitHub', 'Docker', 'Linux', 'VS Code'] },
      { id: 7, category: 'Other',                 items: ['UI/UX Design', 'Figma', 'Agile', 'REST APIs'] },
    ]
  });
});

// ------------------------------------------------
// ROUTE 4: Projects
// GET https://backend03-1.onrender.com/api/projects
// ------------------------------------------------
app.get('/api/projects', (req, res) => {
  res.json({
    total: 3,
    projects: [
      {
        id:           1,
        number:       '01',
        title:        'Personal Portfolio Website',
        description:  'A fully deployed personal portfolio website with a React frontend hosted on Vercel and an Express.js backend API hosted on Render. Features contact form, project showcase, and dark/light mode.',
        technologies: ['React', 'Node.js', 'Vercel', 'Render'],
        liveUrl:      'https://abdallahsodangutech.vercel.app',
        githubUrl:    null,
        year:         2026,
      },
      {
        id:           2,
        number:       '02',
        title:        'Finance Dashboard',
        description:  'A full-stack web application for managing personal financial records, monitoring, and help or support in decision making. Users can track expenses, set budgets, and visualize.',
        technologies: ['HTML/CSS', 'Python/Flask', 'PostgreSQL', 'Bootstrap'],
        liveUrl:      null,
        githubUrl:    'https://github.com/Abdallah01234567890/Finance-Dashbord_01.git',
        year:         2025,
      },
      {
        id:           3,
        number:       '03',
        title:        'E-Commerce API',
        description:  'A RESTful API for an e-commerce platform supporting product listings, user authentication with JWT, shopping cart, and order management with Stripe payment integration.',
        technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
        liveUrl:      null,
        githubUrl:    'https://github.com/Abdallah01234567890/Seles-Dashbord-03.git',
        year:         2025,
      },
    ]
  });
});

// ------------------------------------------------
// ROUTE 5: Education / Qualifications
// GET https://backend03-1.onrender.com/api/education
// ------------------------------------------------
app.get('/api/education', (req, res) => {
  res.json({
    education: [
      {
        id:          1,
        period:      '2026 – Present',
        degree:      'BSc Data Science',
        institution: 'Eastern Africa Statistical Training Centre, Dar es Salaam, Tanzania',
        description: 'Majoring in Data Analysis and Software Engineering. Relevant coursework: Distributed Systems, Database Management, Web Development, and Network Security.',
      },
      {
        id:          2,
        period:      '2025',
        degree:      'AWS Cloud Practitioner Certification',
        institution: 'Amazon Web Services (AWS)',
        description: 'Foundational certification covering core AWS services, cloud concepts, security, pricing, and support.',
      },
      {
        id:          3,
        period:      '2019 – 2021',
        degree:      'Advanced Certificate of Secondary Education (ACSE)',
        institution: 'Ndanda High School',
        description: 'Physics, Mathematics, and Computer Studies (PCM/PCS combination).',
      },
      {
        id:          4,
        period:      '2024',
        degree:      'Power Learn Project — Software Developer Certificate',
        institution: 'Coursera / Power Learn Project',
        description: 'Completed professional certificate covering React, UX/UI principles, and modern frontend development practices.',
      },
    ]
  });
});

// ------------------------------------------------
// ROUTE 6: Contact Form  ← HAPA NDIO MUHIMU SANA
// POST https://backend03-1.onrender.com/api/contact
//
// Frontend inatuma:
//   { name: "...", email: "...", message: "..." }
// ------------------------------------------------
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error:   'Fields zote zinahitajika: name, email, message',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error:   'Email si sahihi',
    });
  }

  // Log kwenye Render console (unaweza kuona kwenye dashboard)
  console.log('\n📩 ===== NEW CONTACT MESSAGE =====');
  console.log(`   From:    ${name} <${email}>`);
  console.log(`   Message: ${message}`);
  console.log(`   Time:    ${new Date().toLocaleString('sw-TZ', { timeZone: 'Africa/Dar_es_Salaam' })}`);
  console.log('=====================================\n');

  // Jibu kwa frontend
  res.status(200).json({
    success: true,
    message: 'Asante! Ujumbe wako umepokelewa. Nitajibu hivi karibuni.',
  });
});

// ------------------------------------------------
// ROOT route — kuepuka 404 kwenye browser
// GET https://backend03-1.onrender.com/
// ------------------------------------------------
app.get('/', (req, res) => {
  res.json({
    api:     'Abdallah Sodangu Portfolio API',
    status:  'running',
    routes: [
      'GET  /api/health',
      'GET  /api/info',
      'GET  /api/skills',
      'GET  /api/projects',
      'GET  /api/education',
      'POST /api/contact',
    ],
  });
});

// ------------------------------------------------
// 404 Handler
// ------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ error: `Route '${req.path}' haipatikani` });
});

// ------------------------------------------------
// START
// ------------------------------------------------
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio API imeanza kwenye port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
