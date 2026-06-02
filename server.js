/*
  =============================================
  PORTFOLIO BACKEND API — server.js
  Hosted on: Render (render.com)
  
  Hatua za deploy kwenye Render:
  1. Pakia folder hii ya "backend" kwenye GitHub repo
  2. Nenda render.com → New → Web Service
  3. Connect GitHub repo yako
  4. Build Command: npm install
  5. Start Command: node server.js
  6. Weka Environment Variables:
     PORT=3001
     ALLOWED_ORIGIN=https://your-vercel-app.vercel.app
  =============================================
*/

const express = require('express');
const cors    = require('cors');
const app     = express();

// =============================================
// CONFIGURATION
// BADILISHA: Weka URL ya Vercel app yako hapa
// =============================================
const PORT           = process.env.PORT || 3001;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://vercel.com/abdallah-sodangu-s-projects/frontend-bvry/DEskRJJ7pk8U7Ld4BK8hQSojMyuw';

// Middleware
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

// =============================================
// ROUTE 1: Health Check
// Test: https://your-app.onrender.com/api/health
// =============================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Portfolio API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// =============================================
// ROUTE 2: GET — Personal Info
// Test: https://your-app.onrender.com/api/info
// =============================================
app.get('/api/info', (req, res) => {
  res.json({
    name:     'Abdallah Sodangu',      
    title:    'Data Scientist & Full-Stack Developer', 
    location: 'Dar es Salaam, Tanzania',     
    email:    'sodangua@gmail.com',           
    phone:    '+255 622 726 900',            
    bio:      'A passionate in data analiysis and visualization, finding tha information hidden in insight of data, developer specializing in cloud platforms, modern web development, and scalable backend systems. I love turning ideas into real, deployed applications.',
    linkedin: 'linkedin.com/in/abdallahsodangu',    
    github:   'github.com/Abdallah01234567890',       
  });
});

// =============================================
// ROUTE 3: GET — Skills
// Test: https://your-app.onrender.com/api/skills
// =============================================
app.get('/api/skills', (req, res) => {
  const skills = [
    {
      id: 1,
      category: 'Cloud Platforms',
      items: ['Vercel', 'Render', 'AWS', 'Firebase', 'Heroku']  
    },
    {
      id: 2,
      category: 'Frontend',
      items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'] 
    },
    {
      id: 3,
      category: 'Backend',
      items: ['Node.js', 'Express', 'Python', 'Flask', 'REST APIs'] 
    },
    {
      id: 4,
      category: 'Databases',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase'] 
    },
    {
      id: 5,
      category: 'DevOps & Tools',
      items: ['Git', 'GitHub', 'Docker', 'Linux', 'VS Code'] 
    }
  ];

  res.json({
    total: skills.reduce((sum, s) => sum + s.items.length, 0),
    categories: skills
  });
});

// =============================================
// ROUTE 4: GET — Projects
// Test: https://your-app.onrender.com/api/projects
// =============================================
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title:       'Personal Portfolio Website',   
      description: 'A fully deployed personal portfolio website with React frontend on Vercel and Express backend on Render.', 
      technologies: ['React', 'Node.js', 'Vercel', 'Render'], 
      liveUrl:     'https://vercel.com/abdallah-sodangu-s-projects/portpholio/CyBQsbKELUNSWVw9gTRnpoMWVFBk',        
      githubUrl:   'https://github.com/Abdallah01234567890/Portipholio-02.git',     
      year:        2026  
    },
    {
      id: 2,
      title:       'Finance Dashbord',    
      description: 'A full-stack web application for managing personal financial records, monitoring, and help or support in decission making. Users can track expenses, set budgets, and visualize.',
      technologies: ['HTML/CSS', 'Flask', 'PostgreSQL', 'Bootstrap'], 
      liveUrl:     'https://student-mgmt.onrender.com', 
      githubUrl:   'https://github.com/Abdallah01234567890/Finance-Dashbord_01.git', 
      year:        2025 
    },
    {
      id: 3,
      title:       'E-Commerce REST API', 
      description: 'RESTful API for e-commerce platform with JWT auth, cart management, and Stripe payment integration.', // BADILISHA
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'], 
      liveUrl:     null,
      githubUrl:   'https://github.com/Abdallah01234567890/Seles-Dashbord-03.git', 
      year:        2025 
    }
    
  ];

  res.json({
    total: projects.length,
    projects
  });
});

// =============================================
// ROUTE 5: GET — Single Project by ID
// Test: https://your-app.onrender.com/api/projects/1
// =============================================
app.get('/api/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // Re-use projects array (in real app, use a database)
  const project = { id, title: `Project ${id}`, description: 'Detailed info here' };
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid project ID' });
  }
  res.json(project);
});

// =============================================
// ROUTE 6: POST — Contact Form
// Frontend posts to: https://your-app.onrender.com/api/contact
// =============================================
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required: name, email, message'
    });
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format'
    });
  }

  // Log the message (in production, send an email using nodemailer or similar)
  console.log('📩 New contact message received:');
  console.log(`   Name:    ${name}`);
  console.log(`   Email:   ${email}`);
  console.log(`   Message: ${message}`);
  console.log(`   Time:    ${new Date().toISOString()}`);

  /*
    OPTIONAL — Send email using Nodemailer:
    npm install nodemailer
    
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,    // weka kwenye Render env vars
        pass: process.env.EMAIL_PASS,    // app password ya Gmail
      }
    });
    await transporter.sendMail({
      from:    email,
      to:      'sodangua@gmail.com',  
      subject: `Portfolio Contact from ${name}`,
      text:    message,
    });
  */

  res.status(200).json({
    success: true,
    message: 'Thank you! Your message has been received. I will reply soon.'
  });
});

// =============================================
// 404 Handler
// =============================================
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    availableRoutes: [
      'GET  /api/health',
      'GET  /api/info',
      'GET  /api/skills',
      'GET  /api/projects',
      'GET  /api/projects/:id',
      'POST /api/contact',
    ]
  });
});

// =============================================
// START SERVER
// =============================================
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio API running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Projects:     http://localhost:${PORT}/api/projects`);
  console.log(`   Skills:       http://localhost:${PORT}/api/skills\n`);
});
