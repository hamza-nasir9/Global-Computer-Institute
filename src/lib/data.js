export const COURSES = [
  { id:1, iconName:"Code2",      category:"Development",    name:"Full-Stack Web Development",       description:"Master HTML, CSS, JavaScript, React, Node.js, and databases. Build production-grade web applications from scratch.", duration:"12 Months", badge:"Most Popular", badgeColor:"gold"   },
  { id:2, iconName:"Brain",      category:"Emerging Tech",  name:"Artificial Intelligence & ML",     description:"Learn Python, TensorFlow, PyTorch, and data science. Build real AI-powered projects and models.",                   duration:"14 Months", badge:"In Demand",    badgeColor:"blue"   },
  { id:3, iconName:"Palette",    category:"Creative Design",name:"Graphic & UI/UX Design",           description:"Master Adobe Creative Suite, Figma, and design thinking to craft stunning digital experiences.",                   duration:"8 Months",  badge:"Creative",     badgeColor:"purple" },
  { id:4, iconName:"Smartphone", category:"Mobile",         name:"Mobile App Development",           description:"Build iOS and Android apps using Flutter and React Native. Publish real apps on the App Store and Play Store.",     duration:"10 Months", badge:"New Batch",    badgeColor:"green"  },
  { id:5, iconName:"ShieldCheck",category:"Security",       name:"Cybersecurity & Ethical Hacking",  description:"Learn penetration testing, network security, CEH certification prep, and defensive security strategies.",           duration:"10 Months", badge:"Certified",    badgeColor:"red"    },
  { id:6, iconName:"Cloud",      category:"Cloud",          name:"Cloud Computing & DevOps",         description:"Master AWS, Azure, Docker, Kubernetes, and CI/CD pipelines for modern cloud-native development.",                  duration:"9 Months",  badge:"Hot",          badgeColor:"orange" },
  { id:7, iconName:"BarChart3",  category:"Data",           name:"Data Science & Analytics",         description:"Excel in data analysis, visualization, SQL, Power BI, and Python-based analytics pipelines.",                     duration:"11 Months", badge:"Trending",     badgeColor:"teal"   },
  { id:8, iconName:"Video",      category:"Media",          name:"Video Editing & Motion Graphics",  description:"Master Adobe Premiere Pro, After Effects, and DaVinci Resolve for professional video production.",                 duration:"6 Months",  badge:"Creative",     badgeColor:"pink"   },
];

export const WHY_FEATURES = [
  { iconName:"BadgeCheck",   title:"Industry-Certified Faculty",  description:"Learn from professionals with 10+ years of real-world experience at top tech companies and MNCs." },
  { iconName:"TrendingUp",   title:"98% Job Placement",           description:"Our dedicated career center ensures every graduate lands their dream job through partnerships with 200+ companies." },
  { iconName:"Building2",    title:"3 Modern Campuses",           description:"State-of-the-art labs, high-speed internet, collaborative spaces, and premium facilities across Karachi." },
  { iconName:"Globe",        title:"International Affiliations",  description:"Globally recognized certifications affiliated with Microsoft, Google, Adobe, and AWS." },
  { iconName:"FlaskConical", title:"Hands-On Learning",           description:"Project-based curriculum with real client projects, hackathons, and industry internships." },
  { iconName:"Users",        title:"Lifetime Alumni Network",     description:"Join 15,000+ graduates across Pakistan and worldwide. Ongoing mentorship and career support forever." },
];

export const CAMPUSES = [
  { id:1, name:"GCI Main Campus",  area:"Gulshan-e-Iqbal, Karachi",  description:"Our flagship campus with 20 computer labs, an AI research centre, auditorium, and dedicated student lounges. Established in 2005.", image:"https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80", tags:["AI Lab","Auditorium","20 Labs","Cafeteria"],      established:"Est. 2005", students:"5,000+" },
  { id:2, name:"GCI North Campus", area:"North Nazimabad, Karachi",   description:"Serving North Karachi with 12 advanced labs, a creative design studio, tech library, and dedicated female student section.",          image:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80", tags:["Design Studio","Library","12 Labs","Female Section"], established:"Est. 2012", students:"3,500+" },
  { id:3, name:"GCI South Campus", area:"Saddar, Karachi",            description:"Located in the heart of Karachi with 15 labs, a rooftop innovation hub, cybersecurity lab, and corporate training centre.",           image:"https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80", tags:["Cyber Lab","Innovation Hub","15 Labs","Corporate"],  established:"Est. 2018", students:"4,000+" },
];

export const FACULTY = [
  {
    id:1, initials:"MA", name:"Muzammil Ahmed", role:"Graphic Design Teacher",
    exp:"5+ Years Experience", bg:"from-[#1a1a2a] to-[#2a2a4a]",
    image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio:"Creative Graphic Design instructor specializing in print media, branding, typography, and Adobe Creative Suite — guiding students from beginner to professional.",
  },
  {
    id:2, initials:"MHK", name:"M. Hussain Khan", role:"Graphic Designer",
    exp:"6+ Years Experience", bg:"from-[#2a1a1a] to-[#4a2a2a]",
    image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio:"Digital media specialist in UI/UX, motion graphics, social media design, and video editing — bringing real industry trends into every class.",
  },
  {
    id:3, initials:"ST", name:"S.M Taha", role:"CIT Teacher",
    exp:"5+ Years Experience", bg:"from-[#1a2a1a] to-[#2a4a2a]",
    image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio:"SBTE-certified IT instructor preparing students for computer fundamentals, MS Office, web basics, and SBTE examinations with high pass rates.",
  },
  {
    id:4, initials:"HS", name:"Hafsa Sohail", role:"CIT Teacher",
    exp:"4+ Years Experience", bg:"from-[#2a1a2a] to-[#4a2a4a]",
    image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio:"Dedicated CIT instructor known for her student-friendly approach, helping beginners build strong IT foundations and ace SBTE exams.",
  },
  {
    id:5, initials:"AR", name:"Abdul Rehman", role:"Computer Hardware Instructor",
    exp:"7+ Years Experience", bg:"from-[#1a2a2a] to-[#2a4a4a]",
    image:"https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80",
    bio:"CompTIA A+ certified hardware expert delivering hands-on lab training in PC assembly, troubleshooting, networking, and technical support.",
  },
  {
    id:6, initials:"NAK", name:"Nubair Ahmed Khan", role:"Web Development Teacher",
    exp:"5+ Years Experience", bg:"from-[#2a2a1a] to-[#4a4a1a]",
    image:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    bio:"Full stack developer and instructor teaching Python, HTML/CSS/JS, PHP, MySQL, and WordPress with a project-based, career-focused approach.",
  },
  {
    id:7, initials:"AL", name:"Aliza", role:"IT Instructor",
    exp:"4+ Years Experience", bg:"from-[#1a2a3a] to-[#2a3a5a]",
    image:"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    bio:"Microsoft Office Specialist and Power BI expert helping students master productivity tools — Excel, Power BI, and computerized accounting.",
  },
  {
    id:8, initials:"HN", name:"Hifza Nadeem", role:"Admin",
    exp:"3+ Years Experience", bg:"from-[#3a1a2a] to-[#5a2a3a]",
    image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio:"Professional administrator managing student affairs and institute operations — ensuring a smooth journey for every GCI student.",
  },
  {
    id:9, initials:"MKH", name:"Mirha Khursheed", role:"English Language Instructor",
    exp:"4+ Years Experience", bg:"from-[#1a3a2a] to-[#2a5a3a]",
    image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    bio:"TEFL-certified English Language instructor focused on spoken English, grammar, vocabulary, and building real communication confidence.",
  },
  {
    id:10, initials:"MM", name:"Maimoona", role:"Admin",
    exp:"3+ Years Experience", bg:"from-[#2a2a3a] to-[#3a3a5a]",
    image:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio:"Dedicated admin staff member handling student coordination, enquiries, and campus operations with professionalism and care.",
  },
];

export const STATS = [
  { value:15000, suffix:"+", label:"Alumni Placed",       iconName:"GraduationCap" },
  { value:50,    suffix:"+", label:"Programs Offered",    iconName:"BookOpen"      },
  { value:98,    suffix:"%", label:"Job Placement Rate",  iconName:"Briefcase"     },
  { value:3,     suffix:"",  label:"Campus Locations",    iconName:"Building2"     },
  { value:200,   suffix:"+", label:"Industry Partners",   iconName:"Handshake"     },
  { value:20,    suffix:"+", label:"Years of Excellence", iconName:"Trophy"        },
];

export const ADMISSION_STEPS = [
  { step:1, iconName:"ClipboardList", title:"Submit Online Application", description:"Fill out our simple online application form with your basic details, desired program, and preferred campus location." },
  { step:2, iconName:"PhoneCall",     title:"Counseling Session",        description:"Our academic counselors will contact you within 24 hours to guide you through program selection and answer all your questions." },
  { step:3, iconName:"FileText",      title:"Document Submission",       description:"Submit your academic certificates, CNIC, photographs, and any other required documents at the campus or via email." },
  { step:4, iconName:"CreditCard",    title:"Fee Payment",               description:"Complete the registration by submitting the admission fee. Easy installment plans and scholarship options are available." },
  { step:5, iconName:"GraduationCap", title:"Orientation & Begin",       description:"Attend the orientation session, receive your student ID, and start your transformative journey at GCI." },
];

export const TESTIMONIALS = [
  { id:1, name:"Fatima Zaidi",  role:"Frontend Developer at Systems Ltd",  initials:"FZ", stars:5, batch:"Batch 2023", text:"GCI completely changed my life. I enrolled in the Web Development program with zero coding knowledge, and within a year, I landed a full-time developer job. The faculty was incredibly supportive, and the hands-on projects gave me real confidence." },
  { id:2, name:"Usman Tariq",   role:"AI Engineer at NetSol Technologies", initials:"UT", stars:5, batch:"Batch 2022", text:"The AI & Machine Learning program at GCI is world-class. The curriculum is updated with the latest industry trends, and the faculty brings real experience from top companies. I received three job offers before graduating." },
  { id:3, name:"Ayesha Mirza",  role:"UI/UX Designer at Gaditek",          initials:"AM", stars:5, batch:"Batch 2023", text:"GCI's design program is phenomenal. The combination of technical skills and design thinking completely transformed my creative approach. The career placement team helped me secure interviews at Pakistan's top digital agencies." },
  { id:4, name:"Ali Hassan",    role:"Cybersecurity Analyst at PTCL",      initials:"AH", stars:5, batch:"Batch 2022", text:"I chose GCI's cybersecurity program after researching all institutes in Karachi — absolutely the right decision. The lab facilities, ethical hacking simulations, and exam prep support were exceptional. Got CEH certified in 3 months." },
];

export const EVENTS = [
  { id:1, category:"Hackathon",  title:"GCI TechFest 2025 — Annual Innovation Hackathon",     date:"15", month:"JAN", time:"9:00 AM",  venue:"Main Campus Auditorium", image:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=75" },
  { id:2, category:"Career Fair", title:"Spring Job & Internship Fair 2025",                   date:"28", month:"JAN", time:"10:00 AM", venue:"All 3 Campuses",         image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=75" },
  { id:3, category:"Workshop",   title:"Free Masterclass: Getting Started with Generative AI", date:"05", month:"FEB", time:"2:00 PM",  venue:"North Campus",           image:"https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=75" },
];

export const PARTNERS = ["Microsoft","Google","AWS","Adobe","Cisco","Oracle","IBM","Meta","Samsung","HP","Dell","Autodesk"];

export const GALLERY_ITEMS = [
  { id:1, span:"col-span-2 row-span-2", image:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",  label:"AI Research Lab"     },
  { id:2, span:"",                       image:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=75",  label:"Graduation Ceremony" },
  { id:3, span:"",                       image:"https://images.unsplash.com/photo-1605379399642-870262d3d051?w=500&q=75",  label:"Coding Bootcamp"     },
  { id:4, span:"col-span-2",            image:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",  label:"Design Studio"       },
  { id:5, span:"",                       image:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=75",  label:"Hackathon Night"     },
  { id:6, span:"",                       image:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&q=75",  label:"Campus Life"         },
  { id:7, span:"",                       image:"https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=500&q=75",  label:"Awards Ceremony"     },
];

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=85",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=85",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=85",
];

export const ABOUT_IMAGE       = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=85";
export const ABOUT_HERO_IMAGE  = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=85";
export const ABOUT_STORY_IMAGE = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=85";
export const ABOUT_VISION_IMAGE= "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85";

export const MILESTONES = [
  { year:"2005", title:"Founded",        desc:"GCI opens its first campus in Gulshan-e-Iqbal with 200 students." },
  { year:"2010", title:"5,000 Alumni",   desc:"Reached 5,000 graduates and launched the AI & Data Science program." },
  { year:"2012", title:"North Campus",   desc:"Expanded to North Nazimabad, serving thousands of new students." },
  { year:"2018", title:"South Campus",   desc:"Opened our third campus in Saddar with a dedicated cybersecurity lab." },
  { year:"2021", title:"Global Partners",desc:"Became authorized partner of Microsoft, Google, AWS, and Adobe." },
  { year:"2025", title:"15,000+ Alumni", desc:"Celebrating 20 years with graduates working across 30+ countries." },
];

export const COURSE_DETAILS = [
  /* ─────────────────────────────────────────────────────────────────────── */
  /*  1. English Language Exclusive Course                                   */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'english-language-course',
    name: 'English Language Exclusive Course',
    category: 'Language',
    tagline: 'Build confidence, fluency, and career-ready communication skills',
    description: 'Build confidence, improve fluency, and boost academic and career growth. Ideal for students, professionals, and beginners.',
    fullDescription: 'Our English Language Exclusive Course is designed for students, professionals, and beginners who want to build strong English communication skills. You will learn through module-wise tests, conversation practice, workbook activities, and vocabulary-building sessions. By the end of the program you will speak, write, and communicate with confidence in academic and professional environments.',
    duration: '3 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Intermediate', seats: '20 seats per batch',
    badge: 'Popular', badgeColor: 'blue',
    iconName: 'BookOpen', fee: 'PKR 3,000',
    heroImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80',
    instructorId: 9,
    features: [
      'Module-wise Test System',
      'Internal Certificate',
      'Conversation Practice',
      'Workbook Activities',
      'Vocabulary Building',
    ],
    syllabus: [
      { week: 'Month 1', topic: 'Grammar Fundamentals', details: 'Parts of speech, tenses, sentence structure, and basic writing skills' },
      { week: 'Month 2', topic: 'Vocabulary & Reading', details: 'Vocabulary expansion, reading comprehension, workbook activities, and module tests' },
      { week: 'Month 3', topic: 'Spoken English & Fluency', details: 'Conversation practice, presentations, interviews, and final assessment' },
    ],
    outcomes: [
      'Speak English fluently with confidence',
      'Write clear and grammatically correct text',
      'Build an advanced vocabulary for academic & professional use',
      'Pass module-wise tests and earn an internal certificate',
      'Communicate effectively in job interviews and meetings',
    ],
    tools: ['Workbooks', 'Module Tests', 'Conversation Labs', 'Audio-Visual Resources'],
    careerOpportunities: [],
    certification: 'Internal GCI Certificate awarded upon successful completion.',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /*  2. CIT — Certificate Information Technology                            */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'cit-certificate-information-technology',
    name: 'CIT (Certificate in Information Technology)',
    category: 'IT Fundamentals',
    tagline: 'Government-recognised IT certification by Sindh Board of Technical Education',
    description: 'A government-registered IT foundation program covering operating systems, web programming, databases, and soft skills with SBTE certification.',
    fullDescription: 'The Certificate in Information Technology (CIT) is registered by the Sindh Board of Technical Education (SBTE) and provides a solid foundation in modern computing. You will learn to operate systems confidently, develop web pages, manage databases, and build the professional soft skills employers demand. Expert instructors guide you through hands-on labs and fully prepare you for the final SBTE examination.',
    duration: '6 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner', seats: '25 seats per batch',
    badge: 'SBTE Certified', badgeColor: 'gold',
    iconName: 'Monitor', fee: 'PKR 3,000',
    heroImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    instructorId: 3,
    coInstructorId: 4,
    features: [
      'Operating Systems',
      'Soft Skills Development',
      'Hands-on Training',
      'Web Programming Skills',
      'Database Learning',
      'Expert Instructors',
      'SBTE Certification',
      'Exam Preparation',
      'Career Support',
    ],
    syllabus: [
      { week: 'Month 1', topic: 'Computer Fundamentals & OS', details: 'Windows, file management, productivity tools, and typing' },
      { week: 'Month 2', topic: 'Microsoft Office Suite', details: 'MS Word, Excel, PowerPoint, and Access basics' },
      { week: 'Month 3', topic: 'Web Programming Basics', details: 'HTML, CSS fundamentals, and basic internet skills' },
      { week: 'Month 4', topic: 'Database Concepts', details: 'Introduction to MS Access and database design principles' },
      { week: 'Month 5', topic: 'Soft Skills & Communication', details: 'Professional communication, email etiquette, and CV writing' },
      { week: 'Month 6', topic: 'SBTE Exam Preparation', details: 'Past papers, mock tests, project submission, and final exam' },
    ],
    outcomes: [
      'Operate computers and software with confidence',
      'Build basic web pages using HTML & CSS',
      'Manage data using databases',
      'Pass the SBTE-registered CIT examination',
      'Enter the job market with a government-recognised certificate',
    ],
    tools: ['Windows OS', 'MS Office', 'HTML', 'CSS', 'MS Access'],
    careerOpportunities: ['Data Entry Operator', 'Office Administrator', 'IT Support', 'Computer Lab Assistant'],
    certification: 'Registered by Sindh Board of Technical Education (SBTE)',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /*  3. Urdu Typing Course                                                  */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'urdu-typing-course',
    name: 'Urdu Typing Course',
    category: 'Office Skills',
    tagline: 'Master Urdu typing with InPage and MS Word for jobs and assignments',
    description: 'Perfect for beginners looking to boost their skills for jobs and assignments. Learn Urdu typing, MS Word, and InPage in one short program.',
    fullDescription: 'The Urdu Typing Course is designed for students and job seekers who need to work in Urdu for government offices, media, publications, or academic assignments. You will master InPage — the industry-standard Urdu DTP software — alongside Microsoft Word and achieve professional typing speed.',
    duration: '1 Month', schedule: 'Daily sessions, flexible timings', level: 'Beginner', seats: '20 seats per batch',
    badge: 'Quick Skill', badgeColor: 'orange',
    iconName: 'Type', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80',
    instructorId: 7,
    features: ['Urdu Typing', 'MS Word', 'InPage Training'],
    syllabus: [
      { week: 'Week 1–2', topic: 'InPage Software Basics', details: 'InPage interface, keyboard layout, Nastaliq & Naskh fonts, basic document creation' },
      { week: 'Week 3–4', topic: 'Speed Building & MS Word', details: 'Speed drills, official document formatting, combining Urdu and English text' },
    ],
    outcomes: [
      'Type proficiently in Urdu using InPage',
      'Prepare official Urdu documents in MS Word',
      'Increase typing speed for professional use',
      'Handle government office documentation tasks',
    ],
    tools: ['InPage', 'MS Word'],
    careerOpportunities: ['Urdu Typist', 'Content Writer (Urdu)', 'Government Office Staff', 'Media/Publications Assistant'],
    certification: 'GCI Completion Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /*  4. Power BI Course                                                     */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'power-bi-course',
    name: 'Power BI Course',
    category: 'Data Analytics',
    tagline: 'Transform raw data into stunning business dashboards and insights',
    description: 'Master Microsoft Power BI — from VLOOKUP and Pivot Tables to DAX formulas and interactive visualisations integrated with MS Excel.',
    fullDescription: 'Power BI is the world\'s leading business intelligence tool. In this focused course you will start with Excel essentials (VLOOKUP, Pivot Tables, Data Cleaning), then move into Power BI Desktop to build interactive dashboards, use DAX formulas for advanced calculations, and publish reports to the web. Ideal for anyone in finance, business, or analytics.',
    duration: '2 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Intermediate', seats: '20 seats per batch',
    badge: 'High Demand', badgeColor: 'teal',
    iconName: 'BarChart3', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    instructorId: 7,
    features: ['VLOOKUP', 'Pivot Tables', 'Data Cleaning', 'DAX', 'Visualization', 'MS Excel Integration'],
    syllabus: [
      { week: 'Week 1–2', topic: 'Excel Essentials', details: 'VLOOKUP, HLOOKUP, Pivot Tables, Data Cleaning, conditional formatting' },
      { week: 'Week 3–4', topic: 'Power BI Desktop', details: 'Connecting data sources, building reports, cards, bar charts, and maps' },
      { week: 'Week 5–6', topic: 'DAX Formulas', details: 'Calculated columns, measures, KPIs, and time intelligence functions' },
      { week: 'Week 7–8', topic: 'Dashboard & Publishing', details: 'Interactive slicers, drill-through, publishing to Power BI Service, sharing reports' },
    ],
    outcomes: [
      'Build interactive Power BI dashboards from scratch',
      'Write DAX formulas for business calculations',
      'Connect multiple data sources and transform data',
      'Publish and share reports via Power BI Service',
      'Make data-driven decisions using visual analytics',
    ],
    tools: ['Microsoft Excel', 'Power BI Desktop', 'Power BI Service', 'DAX'],
    careerOpportunities: ['Data Analyst', 'Business Intelligence Analyst', 'Reporting Analyst', 'Financial Analyst'],
    certification: 'GCI Completion Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /*  5. Advance Excel + Power BI                                            */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'advance-excel-power-bi',
    name: 'Advance Excel + Power BI',
    category: 'Data Analytics',
    tagline: 'Master 70+ Excel functions, live projects, Power Pivot, and AI features',
    description: 'A comprehensive data analytics program covering advanced Excel, Power BI, Power Queries, dashboards, 70+ functions, live project sheets, and AI features.',
    fullDescription: 'This all-in-one analytics program takes your Excel skills from intermediate to expert and introduces you to the full Microsoft Power Platform. You will master 70+ functions, Power Queries, Power Pivot, DAX, and build multi-page interactive dashboards. Live project sheets and AI-powered features ensure you graduate job-ready for data analyst and finance roles.',
    duration: '3 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Intermediate to Advanced', seats: '20 seats per batch',
    badge: 'Complete Package', badgeColor: 'gold',
    iconName: 'TrendingUp', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    instructorId: 7,
    features: [
      'Data Analysis', 'Data Visualization', 'Formula and Function Mastery',
      'Power Queries', 'Power Pivot', 'Dashboards and Reports',
      '70+ Functions', 'Live Project Sheets', 'AI Features',
    ],
    syllabus: [
      { week: 'Month 1', topic: 'Advanced Excel Mastery', details: '70+ functions, array formulas, data validation, advanced charts, named ranges, conditional formatting' },
      { week: 'Month 2', topic: 'Power Query & Power Pivot', details: 'Data transformation, M language basics, data modelling, relationships, DAX measures' },
      { week: 'Month 3', topic: 'Power BI Dashboards & AI', details: 'Interactive dashboards, AI Insights, Power BI Copilot, forecasting, publishing & sharing' },
    ],
    outcomes: [
      'Master 70+ Excel functions with confidence',
      'Build automated reports with Power Query',
      'Create advanced Power BI dashboards',
      'Use AI features for data forecasting',
      'Work on live real-world project sheets',
    ],
    tools: ['Microsoft Excel', 'Power Query', 'Power Pivot', 'Power BI', 'DAX', 'AI Insights'],
    careerOpportunities: ['Senior Data Analyst', 'Business Analyst', 'Finance Manager', 'BI Developer'],
    certification: 'GCI Completion Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /*  6. Diploma in Python Programming                                       */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'diploma-python-programming',
    name: 'Diploma in Python Programming',
    category: 'Development',
    tagline: 'From Python basics to AI, Data Science, and real-world automation',
    description: 'A career-focused Python diploma covering Web Development, Data Science, Automation, AI, Machine Learning, Network Security, and more.',
    fullDescription: 'Python is the world\'s most versatile programming language. This diploma program takes you from Python fundamentals through to advanced applications in AI, machine learning, data analysis, and automation. You will work on real projects covering web development, desktop apps, data visualisation, and network security — making you highly employable across multiple tech sectors.',
    duration: '6 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Advanced', seats: '25 seats per batch',
    badge: 'High Demand', badgeColor: 'blue',
    iconName: 'Code2', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80',
    instructorId: 6,
    features: ['Beginner to Advanced', 'Real Projects', 'Portfolio Building', 'Career Support', 'Expert Mentorship'],
    syllabus: [
      { week: 'Month 1', topic: 'Python Fundamentals', details: 'Syntax, data types, loops, functions, OOP, file handling, and error handling' },
      { week: 'Month 2', topic: 'Web Development with Python', details: 'Flask/Django basics, REST APIs, HTML templates, database integration' },
      { week: 'Month 3', topic: 'Data Science & Analysis', details: 'NumPy, Pandas, data cleaning, Matplotlib, Seaborn visualizations' },
      { week: 'Month 4', topic: 'Machine Learning & AI', details: 'Scikit-learn, regression, classification, clustering, model evaluation' },
      { week: 'Month 5', topic: 'Automation & Scripting', details: 'Web scraping, task automation, Selenium, scheduled scripts' },
      { week: 'Month 6', topic: 'Capstone Project', details: 'End-to-end project covering web app, data pipeline, or ML model deployment' },
    ],
    outcomes: [
      'Build web applications using Python frameworks',
      'Analyse and visualise data with Pandas and Matplotlib',
      'Create and deploy machine learning models',
      'Automate repetitive tasks and workflows',
      'Build a strong Python portfolio',
    ],
    tools: ['Python', 'Flask', 'Django', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Selenium', 'Git'],
    careerOpportunities: [
      'Web Developer', 'Data Scientist', 'Automation Engineer',
      'AI/ML Engineer', 'Data Analyst', 'Network Security Specialist',
      'Game Developer', 'Desktop App Developer',
    ],
    certification: 'GCI Diploma Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /*  7. Diploma in Web — Full Stack Developer                               */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'diploma-full-stack-developer',
    name: 'Diploma in Web (Full Stack Developer)',
    category: 'Development',
    tagline: 'Become a complete developer — frontend, backend, database, and deployment',
    description: 'A complete full-stack web development diploma covering frontend, backend, databases, frameworks, portfolio building, and scholarship opportunities.',
    fullDescription: 'The Full Stack Developer Diploma is GCI\'s flagship web development program. You will master both sides of web development — building beautiful frontends with HTML, CSS, JavaScript, and React, then powerful backends with Node.js and databases. You will learn professional development methodologies, manage databases, and graduate with a complete portfolio. Scholarship opportunities and mentorship are available for top students.',
    duration: '8 Months', schedule: 'Mon–Fri, Morning & Evening batches', level: 'Beginner to Advanced', seats: '25 seats per batch',
    badge: 'Most Popular', badgeColor: 'gold',
    iconName: 'Globe', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    instructorId: 6,
    features: [
      'Full Stack Development', 'Mentorship', 'Certification',
      'Scholarship Opportunities', 'Portfolio Building',
      'Database Management', 'Frameworks', 'Development Methodologies',
    ],
    syllabus: [
      { week: 'Month 1–2', topic: 'HTML5, CSS3 & Responsive Design', details: 'Semantic HTML, Flexbox, Grid, Bootstrap, Tailwind CSS, mobile-first design' },
      { week: 'Month 3–4', topic: 'JavaScript & ES6+', details: 'Core JS, DOM manipulation, async/await, Fetch API, ES6 modules' },
      { week: 'Month 5', topic: 'React.js Frontend Framework', details: 'Components, hooks, Context API, React Router, state management' },
      { week: 'Month 6', topic: 'Node.js & Express Backend', details: 'REST APIs, authentication, JWT, middleware, file handling' },
      { week: 'Month 7', topic: 'Databases (SQL & NoSQL)', details: 'MySQL, MongoDB, CRUD operations, database design, Mongoose' },
      { week: 'Month 8', topic: 'Deployment & Final Project', details: 'Git, GitHub, Vercel/Netlify deployment, full-stack capstone project' },
    ],
    outcomes: [
      'Build complete full-stack web applications',
      'Work confidently with React and Node.js',
      'Design and manage SQL and NoSQL databases',
      'Deploy applications to production',
      'Graduate with a professional developer portfolio',
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Git', 'Vercel'],
    careerOpportunities: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Webmaster'],
    certification: 'GCI Diploma Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /*  8. Diploma in Graphics — Print Media                                   */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'diploma-graphics-print-media',
    name: 'Diploma in Graphics (Print Media)',
    category: 'Creative Design',
    tagline: 'Master print design — branding, packaging, logos, and professional print production',
    description: 'A professional diploma in print media graphic design covering branding, logos, brochures, posters, packaging, and typography using the Adobe Creative Suite.',
    fullDescription: 'The Diploma in Graphics (Print Media) is designed for creative individuals who want to build careers in print design, branding, and publication. You will master Adobe Photoshop, Illustrator, and InDesign to create stunning logos, brochures, posters, and packaging. The program focuses heavily on real-world print production with professional mentoring and a portfolio-ready final project.',
    duration: '4 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Professional', seats: '20 seats per batch',
    badge: 'Creative', badgeColor: 'purple',
    iconName: 'Palette', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    instructorId: 1,
    features: [
      'Creative Design Skills', 'Adobe Creative Suite', 'Print Production',
      'Portfolio Development', 'Real-world Projects',
    ],
    syllabus: [
      { week: 'Month 1', topic: 'Design Fundamentals & Adobe Photoshop', details: 'Colour theory, typography, composition, photo editing, and manipulation' },
      { week: 'Month 2', topic: 'Adobe Illustrator — Vector Design', details: 'Logo design, icons, branding elements, vector illustration' },
      { week: 'Month 3', topic: 'Adobe InDesign — Print Layouts', details: 'Brochures, flyers, posters, catalogues, magazine layouts, packaging' },
      { week: 'Month 4', topic: 'Portfolio & Final Project', details: 'Complete branding project, print-ready files, portfolio curation' },
    ],
    outcomes: [
      'Design logos, brochures, and posters professionally',
      'Master Adobe Photoshop, Illustrator, and InDesign',
      'Prepare print-ready files for production',
      'Build a professional design portfolio',
      'Work as a freelance or in-house print designer',
    ],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign'],
    careerOpportunities: ['Print Media Designer', 'Branding Specialist', 'Packaging Designer', 'Publication Designer'],
    certification: 'GCI Diploma Certificate',
    courseContent: ['Branding', 'Flyers', 'Brochures', 'Posters', 'Logo Designing', 'Typography', 'Packaging', 'Social Media Posts', 'Final Project'],
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /*  9. Diploma in Graphics — Digital Media                                 */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'diploma-graphics-digital-media',
    name: 'Diploma in Graphics (Digital Media)',
    category: 'Creative Design',
    tagline: 'Master UI/UX design, motion graphics, animation, and video editing',
    description: 'A creative diploma covering UI/UX design, animation, motion graphics, video editing, and the Adobe Creative Suite for the digital world.',
    fullDescription: 'The Diploma in Graphics (Digital Media) prepares you for the fast-growing digital design industry. You will learn UI/UX design principles, create animations and motion graphics, edit professional videos, and build a polished digital portfolio. The program covers the complete Adobe Creative Suite with a focus on screen-based media, social content, and digital experiences.',
    duration: '4 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Professional', seats: '20 seats per batch',
    badge: 'Trending', badgeColor: 'pink',
    iconName: 'Video', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
    instructorId: 2,
    features: [
      'UI/UX Design', 'Animation', 'Motion Graphics',
      'Video Editing', 'Adobe Creative Suite', 'Portfolio Development',
    ],
    syllabus: [
      { week: 'Month 1', topic: 'UI/UX Design Fundamentals', details: 'User research, wireframing, Figma, prototyping, and usability principles' },
      { week: 'Month 2', topic: 'Adobe Illustrator & Photoshop for Digital', details: 'Social media graphics, digital illustrations, web banners, and app icons' },
      { week: 'Month 3', topic: 'Animation & Motion Graphics', details: 'Adobe Animate, After Effects basics, GIF creation, kinetic typography' },
      { week: 'Month 4', topic: 'Video Editing & Portfolio', details: 'Adobe Premiere Pro, colour grading, social reels, final digital portfolio' },
    ],
    outcomes: [
      'Design engaging UI/UX screens and prototypes',
      'Create motion graphics and animations',
      'Edit and colour-grade professional videos',
      'Build a complete digital design portfolio',
      'Work confidently with the full Adobe Creative Suite',
    ],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe After Effects', 'Adobe Premiere Pro', 'Figma', 'Adobe Animate'],
    careerOpportunities: ['Digital Designer', 'UI/UX Designer', 'Motion Graphics Artist', 'Video Editor', 'Social Media Creative'],
    certification: 'GCI Diploma Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /* 10. Diploma in WordPress (CMS)                                          */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'diploma-wordpress-cms',
    name: 'Diploma in WordPress (CMS)',
    category: 'Development',
    tagline: 'Build professional websites and e-commerce stores with WordPress',
    description: 'A practical WordPress diploma covering theme customisation, plugins, SEO, security, e-commerce integration, and full website management.',
    fullDescription: 'WordPress powers over 40% of the world\'s websites. This diploma teaches you to build, customise, and manage professional WordPress websites from scratch. You will learn theme development, plugin integration, SEO optimisation, WooCommerce e-commerce, security hardening, and backup & restore strategies — everything needed to launch and maintain websites professionally.',
    duration: '2 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Intermediate', seats: '20 seats per batch',
    badge: 'In Demand', badgeColor: 'green',
    iconName: 'Globe', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
    instructorId: 6,
    features: ['CMS', 'Theme Customization', 'Plugins', 'SEO', 'Security', 'E-commerce Integration', 'Backup and Restore'],
    syllabus: [
      { week: 'Week 1–2', topic: 'WordPress Foundations', details: 'Installation, dashboard, themes, pages, posts, media library, and menus' },
      { week: 'Week 3–4', topic: 'Theme Customisation & Plugins', details: 'Elementor page builder, child themes, essential plugins, contact forms' },
      { week: 'Week 5–6', topic: 'SEO & Security', details: 'Yoast SEO, on-page optimisation, firewalls, SSL, malware protection, and backups' },
      { week: 'Week 7–8', topic: 'WooCommerce & Launch', details: 'Product setup, payment gateways, shipping, order management, website launch' },
    ],
    outcomes: [
      'Build a full professional WordPress website from scratch',
      'Customise themes and install plugins confidently',
      'Optimise websites for search engines (SEO)',
      'Set up and manage a WooCommerce e-commerce store',
      'Secure and maintain WordPress sites professionally',
    ],
    tools: ['WordPress', 'Elementor', 'WooCommerce', 'Yoast SEO', 'cPanel', 'FileZilla'],
    careerOpportunities: ['WordPress Developer', 'Web Designer', 'E-commerce Manager', 'Digital Agency Staff', 'Freelancer'],
    certification: 'GCI Diploma Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /* 11. Microsoft Office                                                     */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'microsoft-office',
    name: 'Microsoft Office',
    category: 'Office Skills',
    tagline: 'Master the world\'s most essential professional productivity suite',
    description: 'A comprehensive Microsoft Office course covering Word, Excel, PowerPoint, and Outlook — developing industry-standard productivity and collaboration skills.',
    fullDescription: 'Microsoft Office is the universal professional standard. This course gives you complete command over Word (documents and reports), Excel (data and formulas), PowerPoint (presentations), and Outlook (email and calendar management). You will learn real-world document workflows, collaborative tools, and best practices used in offices, businesses, and organisations worldwide.',
    duration: '2 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Intermediate', seats: '25 seats per batch',
    badge: 'Essential Skill', badgeColor: 'blue',
    iconName: 'Laptop', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    instructorId: 7,
    features: ['Productivity', 'Career Advancement', 'Collaboration', 'Universal Compatibility', 'Industry Standard Skills'],
    syllabus: [
      { week: 'Week 1–2', topic: 'Microsoft Word', details: 'Document formatting, styles, tables, mail merge, track changes, and reports' },
      { week: 'Week 3–4', topic: 'Microsoft Excel', details: 'Spreadsheets, formulas, charts, data sorting, filtering, and Pivot Tables' },
      { week: 'Week 5–6', topic: 'Microsoft PowerPoint', details: 'Slide design, animations, transitions, presenter tools, and professional decks' },
      { week: 'Week 7–8', topic: 'Microsoft Outlook & Integration', details: 'Email management, calendar, task organisation, OneDrive, and Office 365' },
    ],
    outcomes: [
      'Create professional documents and reports in Word',
      'Build spreadsheets and analyse data in Excel',
      'Design engaging presentations in PowerPoint',
      'Manage emails and schedules professionally',
      'Collaborate using Microsoft 365 cloud tools',
    ],
    tools: ['MS Word', 'MS Excel', 'MS PowerPoint', 'MS Outlook', 'OneDrive', 'Microsoft 365'],
    careerOpportunities: ['Office Administrator', 'Executive Assistant', 'Data Entry Specialist', 'Any professional role requiring computer literacy'],
    certification: 'GCI Completion Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /* 12. Diploma in Digital Media Marketing with Freelancing                 */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'diploma-digital-media-marketing-freelancing',
    name: 'Diploma in Digital Media Marketing with Freelancing',
    category: 'Marketing',
    tagline: 'Grow brands online and earn through freelancing on global platforms',
    description: 'A complete digital marketing diploma covering social media, SEO, e-commerce, and freelancing portfolio-building for platforms like Fiverr and Upwork.',
    fullDescription: 'Digital marketing is one of the fastest-growing career fields globally. This diploma takes you through every major channel — social media marketing, search engine optimisation (SEO), email marketing, e-commerce, and content strategy. Critically, the freelancing module teaches you to build a profitable profile on Fiverr and Upwork, price your services, and land real clients.',
    duration: '4 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Intermediate', seats: '20 seats per batch',
    badge: 'Earn Online', badgeColor: 'orange',
    iconName: 'TrendingUp', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80',
    instructorId: 2,
    features: ['Social Media Marketing', 'Freelancing', 'E-commerce', 'SEO', 'Portfolio Building', 'Career Support'],
    syllabus: [
      { week: 'Month 1', topic: 'Social Media Marketing', details: 'Facebook Ads, Instagram, LinkedIn marketing, content strategy, analytics' },
      { week: 'Month 2', topic: 'SEO & Content Marketing', details: 'On-page SEO, keyword research, blogging, Google Analytics, YouTube SEO' },
      { week: 'Month 3', topic: 'E-commerce & Email Marketing', details: 'Shopify basics, product listing, email campaigns, Mailchimp, funnels' },
      { week: 'Month 4', topic: 'Freelancing & Portfolio', details: 'Fiverr & Upwork profile setup, proposals, pricing, client communication, first order' },
    ],
    outcomes: [
      'Run effective Facebook and Instagram ad campaigns',
      'Optimise websites and content for Google ranking',
      'Manage e-commerce stores and email campaigns',
      'Build and launch a professional freelancing profile',
      'Earn independently from global clients',
    ],
    tools: ['Facebook Ads Manager', 'Google Analytics', 'Canva', 'Mailchimp', 'Shopify', 'Fiverr', 'Upwork'],
    careerOpportunities: ['Social Media Manager', 'SEO Specialist', 'Digital Marketer', 'Freelancer', 'E-commerce Manager'],
    certification: 'GCI Diploma Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /* 13. Diploma in Web Development — Back-end Developer                    */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'diploma-backend-developer',
    name: 'Diploma in Web Development (Back-end Developer)',
    category: 'Development',
    tagline: 'Build powerful server-side applications with PHP, MySQL, and AJAX',
    description: 'A focused backend development diploma covering PHP, MySQL, AJAX, XAMPP, and database management for building dynamic server-side web applications.',
    fullDescription: 'The Backend Developer Diploma focuses on the server side of web development. You will learn PHP programming from scratch, manage relational databases with MySQL, handle asynchronous requests with AJAX, and set up a full local development environment using XAMPP. By graduation, you will be able to build dynamic, database-driven web applications and REST APIs.',
    duration: '4 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Intermediate', seats: '20 seats per batch',
    badge: 'Backend Focus', badgeColor: 'red',
    iconName: 'Server', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    instructorId: 6,
    features: ['PHP', 'MySQL', 'AJAX', 'XAMPP', 'Database Management', 'Backend Development'],
    syllabus: [
      { week: 'Month 1', topic: 'PHP Programming Fundamentals', details: 'Syntax, variables, loops, functions, arrays, OOP basics, form handling' },
      { week: 'Month 2', topic: 'MySQL & Database Design', details: 'Tables, queries, joins, CRUD operations, stored procedures, indexing' },
      { week: 'Month 3', topic: 'PHP + MySQL Integration', details: 'PDO, user authentication, session management, file uploads, dynamic pages' },
      { week: 'Month 4', topic: 'AJAX & Project', details: 'AJAX requests, JSON, asynchronous updates, complete CRUD project deployment' },
    ],
    outcomes: [
      'Build dynamic websites with PHP and MySQL',
      'Design and query relational databases',
      'Implement user login and session management',
      'Create asynchronous features with AJAX',
      'Deploy backend applications to a live server',
    ],
    tools: ['PHP', 'MySQL', 'AJAX', 'XAMPP', 'HTML', 'CSS', 'JavaScript', 'phpMyAdmin'],
    careerOpportunities: ['Backend Developer', 'PHP Developer', 'Database Administrator', 'Web Application Developer'],
    certification: 'GCI Diploma Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /* 14. Diploma in Computerized Accounting                                  */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'diploma-computerized-accounting',
    name: 'Diploma in Computerized Accounting',
    category: 'Accounting',
    tagline: 'Master digital accounting, financial reporting, and Power BI for business',
    description: 'A professional accounting diploma covering Excel (basic to advanced), Power BI, inventory control, balance sheets, financial reports, and loan installment calculations.',
    fullDescription: 'The Diploma in Computerized Accounting prepares you for modern finance and accounting roles. Starting from Excel basics, you progress through advanced formulas, Power BI dashboards, inventory control systems, balance sheet preparation, and professional financial reporting. Real-world exercises ensure you can handle the complete accounting cycle digitally with confidence.',
    duration: '4 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Intermediate', seats: '20 seats per batch',
    badge: 'Finance Career', badgeColor: 'teal',
    iconName: 'Calculator', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    instructorId: 7,
    features: [
      'Excel Basic to Advance', 'Power BI',
      'Inventory Control', 'Balance Sheet',
      'Financial Reports', 'Loan Installments',
    ],
    syllabus: [
      { week: 'Month 1', topic: 'Excel for Accounting', details: 'Spreadsheet basics, VLOOKUP, formulas, formatting, and data validation' },
      { week: 'Month 2', topic: 'Advanced Excel & Power BI', details: 'Pivot Tables, Power Query, dashboards, financial KPIs, and charts' },
      { week: 'Month 3', topic: 'Accounting Principles & Inventory', details: 'Bookkeeping, accounts payable/receivable, inventory control systems' },
      { week: 'Month 4', topic: 'Financial Reports & Balance Sheet', details: 'Balance sheets, income statements, loan schedules, full accounting project' },
    ],
    outcomes: [
      'Manage complete accounting records digitally',
      'Prepare balance sheets and financial statements',
      'Build financial dashboards using Power BI',
      'Calculate loan installments and interest schedules',
      'Handle inventory control systems',
    ],
    tools: ['Microsoft Excel', 'Power BI', 'QuickBooks basics', 'Google Sheets'],
    careerOpportunities: ['Accounts Officer', 'Junior Accountant', 'Finance Assistant', 'Bookkeeper', 'Inventory Controller'],
    certification: 'GCI Diploma Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /* 15. DITm — Diploma Information Technology with Multimedia               */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'ditm-diploma-information-technology-multimedia',
    name: 'DITm (Diploma IT with Multimedia)',
    category: 'IT Fundamentals',
    tagline: 'Comprehensive IT diploma combining networking, multimedia, programming, and SBTE certification',
    description: 'GCI\'s flagship comprehensive IT diploma — combining networking, Windows Server, Advance Excel, multimedia video editing, PHP programming, and an SBTE diploma.',
    fullDescription: 'The DITm is GCI\'s most comprehensive IT diploma, registered with the Sindh Board of Technical Education (SBTE). It blends core networking, Windows Server administration, advanced data analytics with Excel and Power BI, professional multimedia video editing, and backend programming with PHP — all in one intensive program. Students who complete this course are job-ready for a wide range of IT careers.',
    duration: '12 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Advanced', seats: '25 seats per batch',
    badge: 'SBTE Diploma', badgeColor: 'gold',
    iconName: 'Network', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
    instructorId: 3,
    coInstructorId: 4,
    features: [
      'Networking', 'Windows Server', 'Advance Excel + BI',
      'Multimedia Video Editing', 'PHP Programming', 'SBTE Diploma',
    ],
    syllabus: [
      { week: 'Month 1–2', topic: 'Computer Fundamentals & Networking', details: 'Hardware, OS, TCP/IP, LAN/WAN, network configuration' },
      { week: 'Month 3–4', topic: 'Windows Server Administration', details: 'Server setup, Active Directory, user management, group policies' },
      { week: 'Month 5–6', topic: 'Advanced Excel & Power BI', details: '70+ functions, Pivot Tables, Power Query, dashboards, data analysis' },
      { week: 'Month 7–8', topic: 'Multimedia & Video Editing', details: 'Adobe Premiere Pro, After Effects, animation, colour grading, social content' },
      { week: 'Month 9–10', topic: 'PHP & Database Programming', details: 'PHP fundamentals, MySQL CRUD, dynamic web pages, AJAX integration' },
      { week: 'Month 11–12', topic: 'SBTE Exam Prep & Capstone', details: 'Past papers, mock exams, final project, professional portfolio' },
    ],
    outcomes: [
      'Configure and manage computer networks',
      'Administer Windows Server environments',
      'Perform advanced data analysis with Excel and Power BI',
      'Edit and produce professional multimedia content',
      'Build backend web applications with PHP',
      'Earn an SBTE-registered diploma',
    ],
    tools: ['Windows Server', 'MS Excel', 'Power BI', 'Adobe Premiere Pro', 'PHP', 'MySQL', 'Cisco Packet Tracer'],
    careerOpportunities: ['Network Administrator', 'IT Support Engineer', 'Data Analyst', 'Video Editor', 'Web Developer'],
    certification: 'Registered by Sindh Board of Technical Education (SBTE)',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /* 16. Diploma in Graphic Designing                                        */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'diploma-graphic-designing',
    name: 'Diploma in Graphic Designing',
    category: 'Creative Design',
    tagline: 'Complete graphic design training covering both print and digital media',
    description: 'A complete graphic design diploma covering print media, digital media, the full Adobe Creative Suite, portfolio development, and professional mentoring.',
    fullDescription: 'The Diploma in Graphic Designing is a complete creative program that covers both print and digital design disciplines. You will master Adobe Photoshop, Illustrator, InDesign, and After Effects, work on real branding and marketing projects, and build a polished professional portfolio. Expert mentors guide you through every project, and top students receive scholarship opportunities.',
    duration: '6 Months', schedule: 'Mon–Sat, Morning & Evening batches', level: 'Beginner to Professional', seats: '20 seats per batch',
    badge: 'Complete Design', badgeColor: 'purple',
    iconName: 'Palette', fee: 'PKR 4,000',
    heroImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80',
    instructorId: 1,
    features: [
      'Print Media Graphics', 'Digital Media Graphics',
      'Adobe Tools', 'Portfolio Development', 'Professional Mentoring',
    ],
    syllabus: [
      { week: 'Month 1', topic: 'Design Theory & Adobe Photoshop', details: 'Colour theory, typography, composition, photo editing, digital painting' },
      { week: 'Month 2', topic: 'Adobe Illustrator — Vector & Print', details: 'Logo design, branding, brochures, flyers, posters, packaging' },
      { week: 'Month 3', topic: 'Adobe InDesign & Print Production', details: 'Multi-page layouts, catalogues, magazines, print-ready file export' },
      { week: 'Month 4', topic: 'Digital & Social Media Design', details: 'Social media graphics, web banners, email templates, UI mockups' },
      { week: 'Month 5', topic: 'Motion & Video Basics', details: 'After Effects essentials, animated social posts, motion typography' },
      { week: 'Month 6', topic: 'Portfolio & Freelancing', details: 'Portfolio curation, Behance profile, client communication, final project' },
    ],
    outcomes: [
      'Design for both print and digital media professionally',
      'Master the complete Adobe Creative Suite',
      'Build a polished, client-ready design portfolio',
      'Work confidently on branding, marketing, and UI projects',
      'Launch a freelance career or join a design agency',
    ],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe After Effects', 'Figma', 'Canva'],
    careerOpportunities: ['Graphic Designer', 'UI/UX Designer', 'Illustrator', 'Branding Specialist', 'Motion Designer'],
    certification: 'GCI Diploma Certificate',
  },

  /* ─────────────────────────────────────────────────────────────────────── */
  /* 17. Kids Camp — Summer Camp                                             */
  /* ─────────────────────────────────────────────────────────────────────── */
  {
    slug: 'kids-summer-camp',
    name: 'Kids Camp (Summer Camp)',
    category: 'Kids Programs',
    tagline: 'Fun, interactive summer learning for Grade IV–VIII students',
    description: 'Summer Camp for Kids (Grade IV–VIII) — covering English language, AI tools, Scratch Jr coding, HTML for kids, and PowerPoint with practical labs.',
    fullDescription: 'GCI\'s Kids Summer Camp is an exciting and educational program designed for children in Grade IV through VIII. In a fun, interactive environment, kids learn English grammar and conversation, explore AI tools, discover coding through Scratch Jr and basic HTML, and create their own PowerPoint presentations. Practical labs make every session hands-on and engaging.',
    duration: '4 Weeks', schedule: 'Summer holidays, Mon–Sat, 9 AM–12 PM', level: 'Grade IV to Grade VIII', seats: '15 seats per batch',
    badge: 'Kids Special', badgeColor: 'green',
    iconName: 'Star', fee: 'PKR 1,500',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=85',
    cardImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    instructorId: 9,
    features: [
      'English Language', 'Grammar', 'Vocabulary',
      'Conversation Practice', 'AI Tools', 'Scratch Jr Coding',
      'HTML for Kids', 'PowerPoint', 'Practical Labs',
    ],
    syllabus: [
      { week: 'Week 1', topic: 'English Language & Communication', details: 'Grammar basics, vocabulary games, conversation practice, and storytelling' },
      { week: 'Week 2', topic: 'Technology & AI Tools', details: 'Introduction to AI, ChatGPT for kids, creative AI art, and internet safety' },
      { week: 'Week 3', topic: 'Coding for Kids', details: 'Scratch Jr block coding, basic HTML tags, creating a simple webpage' },
      { week: 'Week 4', topic: 'PowerPoint & Presentations', details: 'Building slides, adding images and animations, presenting to classmates, graduation ceremony' },
    ],
    outcomes: [
      'Improve English speaking and writing skills',
      'Understand basic AI concepts and tools',
      'Create simple programs with Scratch Jr and HTML',
      'Design and present a PowerPoint project confidently',
      'Build a foundation for future technology learning',
    ],
    tools: ['Scratch Jr', 'HTML Basics', 'PowerPoint', 'AI Tools', 'English Workbooks'],
    careerOpportunities: [],
    certification: 'GCI Summer Camp Certificate',
  },
];


export function getCourseBySlug(slug) {
  return COURSE_DETAILS.find(c => c.slug === slug);
}
