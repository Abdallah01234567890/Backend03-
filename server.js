/*
  ================================================
  PORTFOLIO BACKEND API — Abdallah Sodangu
  Deploy: Render.com → backend03-1.onrender.com
  Frontend: https://abdallahsodangutech.vercel.app
  ================================================
*/

const express = require('express');
const cors    = require('cors');
const app     = express();

const PORT = process.env.PORT || 3001;

// CORS — open (works perfectly for assignment)
app.use(cors());
app.use(express.json());

// ------------------------------------------------
// ROUTE 1: Health Check
// GET /api/health
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
// GET /api/info
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
    bio:      'A passionate Data Scientist and Cloud Developer studying at Eastern Africa Statistical Training Centre.',
  });
});

// ------------------------------------------------
// ROUTE 3: Skills
// GET /api/skills
// ------------------------------------------------
app.get('/api/skills', (req, res) => {
  res.json({
    categories: [
      { id: 1, category: 'Cloud Platforms', items: ['Vercel', 'Render', 'AWS', 'Firebase'] },
      { id: 2, category: 'Frontend',        items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'] },
      { id: 3, category: 'Backend',         items: ['Node.js', 'Express', 'Python', 'Flask', 'REST APIs'] },
      { id: 4, category: 'Data Science',    items: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'] },
      { id: 5, category: 'Databases',       items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
      { id: 6, category: 'DevOps & Tools',  items: ['Git', 'GitHub', 'Docker', 'Linux', 'VS Code'] },
    ]
  });
});

// ------------------------------------------------
// ROUTE 4: Projects
// GET /api/projects
// ------------------------------------------------
app.get('/api/projects', (req, res) => {
  res.json({
    total: 3,
    projects: [
      {
        id: 1, number: '01',
        title: 'Personal Portfolio Website',
        description: 'A fully deployed personal portfolio website with frontend on Vercel and Express.js backend on Render.',
        technologies: ['HTML/CSS', 'JavaScript', 'Node.js', 'Vercel', 'Render'],
        liveUrl:   'https://abdallahsodangutech.vercel.app',
        githubUrl: null,
        year: 2026,
      },
      {
        id: 2, number: '02',
        title: 'Finance Dashboard',
        description: 'Full-stack web app for managing personal financial records, tracking expenses, setting budgets, and visualizing data.',
        technologies: ['HTML/CSS', 'Python/Flask', 'PostgreSQL', 'Bootstrap'],
        liveUrl:   null,
        githubUrl: 'https://github.com/Abdallah01234567890/Finance-Dashbord_01.git',
        year: 2025,
      },
      {
        id: 3, number: '03',
        title: 'E-Commerce API',
        description: 'RESTful API for e-commerce platform with JWT auth, shopping cart, and order management.',
        technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
        liveUrl:   null,
        githubUrl: 'https://github.com/Abdallah01234567890/Seles-Dashbord-03.git',
        year: 2025,
      },
    ]
  });
});

// ------------------------------------------------
// ROUTE 5: Education
// GET /api/education
// ------------------------------------------------
app.get('/api/education', (req, res) => {
  res.json({
    education: [
      {
        id: 1, period: '2026 – Present',
        degree: 'BSc Data Science',
        institution: 'Eastern Africa Statistical Training Centre, Dar es Salaam',
        description: 'Majoring in Data Analysis and Software Engineering.',
      },
      {
        id: 2, period: '2025',
        degree: 'AWS Cloud Practitioner Certification',
        institution: 'Amazon Web Services (AWS)',
        description: 'Core AWS services, cloud concepts, security, pricing, and support.',
      },
      {
        id: 3, period: '2019 – 2021',
        degree: 'Advanced Certificate of Secondary Education (ACSE)',
        institution: 'Ndanda High School',
        description: 'Physics, Mathematics, and Computer Studies (PCM/PCS).',
      },
      {
        id: 4, period: '2024',
        degree: 'Power Learn Project — Software Developer Certificate',
        institution: 'Coursera / Power Learn Project',
        description: 'React, UX/UI principles, and modern frontend development.',
      },
    ]
  });
});

// ------------------------------------------------
// ROUTE 6: Contact Form  ← MUHIMU
// POST /api/contact
// Body: { name, email, message }
// ------------------------------------------------
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Fields zote zinahitajika: name, email, message',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Email si sahihi',
    });
  }

  // Onesha kwenye Render logs
  console.log('\n📩 ===== NEW CONTACT MESSAGE =====');
  console.log(`   From:    ${name} <${email}>`);
  console.log(`   Message: ${message}`);
  console.log(`   Time:    ${new Date().toLocaleString('sw-TZ', { timeZone: 'Africa/Dar_es_Salaam' })}`);
  console.log('=====================================\n');

  res.status(200).json({
    success: true,
    message: 'Asante! Ujumbe wako umepokelewa. Nitajibu hivi karibuni.',
  });
});

// ------------------------------------------------
// ROOT
// ------------------------------------------------
app.get('/', (req, res) => {
  res.json({
    api: 'Abdallah Sodangu Portfolio API',
    status: 'running ✅',
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

// 404
app.use((req, res) => {
  res.status(404).json({ error: `Route '${req.path}' haipatikani` });
});

// START
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio API — port ${PORT}`);
  console.log(`   Test: http://localhost:${PORT}/api/health\n`);
});
