const express = require('express');
const cors = require('cors');
const app = express();
const multer = require("multer");
const path = require("path");
const port = 3000;

app.use(express.json());
app.use(cors());

const signup = [];
const admin = [];
let read = {}; // Stores the latest signed-in or signed-up user


app.use("/uploads", express.static("uploads"));

const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // where to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  }
});

const upload = multer({ storage });





const adminJobs = [
  {
    id: 1,
    title: 'Junior MERN Stack Developer',
    company: 'Northstar',
    rating: 3.3,
    location: 'Lahore',
    salary: 'Rs 70,000 - Rs 100,000 a month',
    easilyApply: true,
    description: `
      <p>Northstar is seeking a passionate Junior MERN Stack Developer to join our growing team in Lahore. You will be responsible for developing and maintaining web applications using MongoDB, Express.js, React, and Node.js.</p>
      <h4 class="font-semibold mt-4 mb-2">Responsibilities:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Develop and maintain robust web applications using the MERN stack.</li>
        <li>Write clean, well-documented, and efficient code.</li>
        <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
        <li>Participate in code reviews to ensure code quality and share knowledge.</li>
        <li>Troubleshoot and debug applications.</li>
        <li>Stay up-to-date with emerging technologies.</li>
      </ul>
      <h4 class="font-semibold mt-4 mb-2">Requirements:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Bachelor's degree in Computer Science or a related field.</li>
        <li>Basic understanding of MongoDB, Express.js, React, and Node.js.</li>
        <li>Familiarity with front-end technologies such as HTML, CSS, and JavaScript.</li>
        <li>Knowledge of version control tools (e.g., Git).</li>
        <li>Strong problem-solving skills and attention to detail.</li>
        <li>Excellent communication and teamwork abilities.</li>
      </ul>
      <h4 class="font-semibold mt-4 mb-2">Benefits:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Competitive salary.</li>
        <li>Health insurance.</li>
        <li>Professional development opportunities.</li>
        <li>Friendly and collaborative work environment.</li>
      </ul>
    `,
  },
  {
    id: 2,
    title: 'MERN Stack Intern',
    company: 'Mergestack',
    rating: null,
    location: 'Lahore',
    salary: 'Unpaid',
    easilyApply: true,
    description: `
      <p>Mergestack is offering an exciting internship opportunity for aspiring MERN Stack Developers. This is a great chance to gain hands-on experience and work on real-world projects.</p>
      <h4 class="font-semibold mt-4 mb-2">Responsibilities:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Assist in the development of web applications using MERN stack.</li>
        <li>Learn and apply best practices in software development.</li>
        <li>Collaborate with senior developers.</li>
        <li>Contribute to various stages of the development lifecycle.</li>
      </ul>
      <h4 class="font-semibold mt-4 mb-2">Requirements:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Currently enrolled in a Bachelor's degree in Computer Science or related field.</li>
        <li>Basic knowledge of JavaScript, React, Node.js, and MongoDB.</li>
        <li>Eagerness to learn and a proactive attitude.</li>
        <li>Good communication skills.</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: 'Senior Full Stack Engineer',
    company: 'Tech Solutions Inc.',
    rating: 4.5,
    location: 'Remote',
    salary: 'Rs 200,000 - Rs 300,000 a month',
    easilyApply: false,
    description: `
      <p>Tech Solutions Inc. is looking for a highly experienced Senior Full Stack Engineer. You will be instrumental in designing, developing, and deploying scalable web applications.</p>
      <h4 class="font-semibold mt-4 mb-2">Responsibilities:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Lead the design and development of complex web applications.</li>
        <li>Mentor junior engineers and promote best coding practices.</li>
        <li>Collaborate with product managers and stakeholders to define requirements.</li>
        <li>Ensure high performance, scalability, and responsiveness of applications.</li>
        <li>Implement and maintain robust testing strategies.</li>
      </ul>
      <h4 class="font-semibold mt-4 mb-2">Requirements:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>8+ years of experience in full-stack web development.</li>
        <li>Proficiency in multiple programming languages and frameworks (e.g., React, Node.js, Python/Django, Ruby on Rails).</li>
        <li>Extensive experience with database design and optimization (SQL/NoSQL).</li>
        <li>Strong understanding of cloud platforms (AWS, Azure, GCP).</li>
        <li>Excellent leadership and communication skills.</li>
      </ul>
    `,
  },
  {
    id: 4,
    title: 'Frontend Developer (React)',
    company: 'Creative Minds Studio',
    rating: 4.0,
    location: 'Karachi',
    salary: 'Rs 120,000 - Rs 180,000 a month',
    easilyApply: true,
    description: `
      <p>Creative Minds Studio is hiring a talented Frontend Developer with expertise in React. Join our team to build engaging and user-friendly interfaces for our diverse client base.</p>
      <h4 class="font-semibold mt-4 mb-2">Responsibilities:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>Develop responsive and interactive user interfaces using React.js.</li>
        <li>Collaborate with UI/UX designers to translate designs into high-quality code.</li>
        <li>Optimize applications for maximum speed and scalability.</li>
        <li>Implement and maintain front-end testing.</li>
        <li>Stay updated with the latest front-end technologies and trends.</li>
      </ul>
      <h4 class="font-semibold mt-4 mb-2">Requirements:</h4>
      <ul class="list-disc list-inside space-y-1">
        <li>3+ years of experience in frontend development with React.js.</li>
        <li>Strong proficiency in HTML5, CSS3, and JavaScript (ES6+).</li>
        <li>Experience with state management libraries (e.g., Redux, Context API).</li>
        <li>Familiarity with modern build pipelines and tools (e.g., Webpack, Babel).</li>
        <li>Knowledge of responsive design principles.</li>
        <li>Portfolio of previous work is a plus.</li>
      </ul>
    `,
  },
];

const jobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Innovators Inc.',
    location: 'San Francisco, CA',
    description: 'Developing scalable software solutions and leading a team of engineers.',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    posted: '2 days ago',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Global Solutions Ltd.',
    location: 'New York, NY',
    description: 'Defining product strategy, roadmap, and features for cutting-edge products.',
    salary: '$100,000 - $130,000',
    type: 'Full-time',
    posted: '5 days ago',
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    company: 'Creative Minds Studio',
    location: 'Remote',
    description: 'Designing intuitive and aesthetically pleasing user interfaces and experiences.',
    salary: '$80,000 - $110,000',
    type: 'Contract',
    posted: '1 week ago',
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'Analytics Driven Co.',
    location: 'Boston, MA',
    description: 'Analyzing large datasets, building predictive models, and deriving actionable insights.',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    posted: '3 days ago',
  },
  {
    id: 5,
    title: 'Marketing Specialist',
    company: 'Brand Growth Agency',
    location: 'Chicago, IL',
    description: 'Developing and executing marketing campaigns across various digital channels.',
    salary: '$60,000 - $85,000',
    type: 'Full-time',
    posted: '4 days ago',
  },
  {
    id: 6,
    title: 'Financial Analyst',
    company: 'Wealth Management Group',
    location: 'Houston, TX',
    description: 'Performing financial modeling, forecasting, and investment analysis.',
    salary: '$70,000 - $95,000',
    type: 'Full-time',
    posted: '6 days ago',
  },
  {
    id: 7,
    title: 'Human Resources Manager',
    company: 'People First Corp.',
    location: 'Atlanta, GA',
    description: 'Managing HR operations, talent acquisition, and employee relations.',
    salary: '$75,000 - $100,000',
    type: 'Full-time',
    posted: '2 weeks ago',
  },
  {
    id: 8,
    title: 'Operations Coordinator',
    company: 'Logistics Solutions Inc.',
    location: 'Dallas, TX',
    description: 'Streamlining operational processes and ensuring efficient service delivery.',
    salary: '$50,000 - $70,000',
    type: 'Full-time',
    posted: '1 day ago',
  },
  {
    id: 9,
    title: 'Research Scientist',
    company: 'BioTech Innovations',
    location: 'San Diego, CA',
    description: 'Conducting advanced research and experiments in biotechnology.',
    salary: '$90,000 - $120,000',
    type: 'Full-time',
    posted: '3 days ago',
  },
  {
    id: 10,
    title: 'Customer Success Manager',
    company: 'Client Relations Hub',
    location: 'Denver, CO',
    description: 'Building strong client relationships and ensuring customer satisfaction.',
    salary: '$65,000 - $90,000',
    type: 'Full-time',
    posted: '5 days ago',
  }
];

const companies = [
  { name: 'Google', icon: "FaGoogle" },
  { name: 'Microsoft', icon: "FaMicrosoft" },
  { name: 'Apple', icon: "FaApple" },
  { name: 'Amazon', icon: "FaAmazon" },
  { name: 'Meta', icon: "FaFacebook" }, // FIX: FaMeta does not exist
  { name: 'Netflix', icon: "RiNetflixFill" },
  { name: 'Tesla', icon: "GiTesla" },
  { name: 'NVIDIA', icon: "FaMicrochip" },
  { name: 'Salesforce', icon: "FaSalesforce" },
  { name: 'Adobe', icon: "SiAdobe" },
  { name: 'Oracle', icon: "SiOracle" },
  { name: "WhatsApp", icon: "SiWhatsapp" }
];


// ================= SIGNUP API =================
app.post('/user/signUp', (req, res) => {
  const { Name, Email, Password, Role } = req.body;
  const appId = signup.length + 1;
  const adminID = admin.length+1;

  if (!Email || Email.length <= 13) {
    return res.json({ Error: "Please enter a valid Email" });
  }
  if (!Name || Name.length <= 2) {
    return res.json({ Error: "Name is required" });
  }
  if (!Password || Password.length < 8) {
    return res.json({ Error: "Password must be at least 8 characters long" });
  }
  if (Role !== "admin" && Role !== "applicant") {
    return res.json({ Error: "Please select a valid role" });
  }

  const applicantExists = signup.some((user) => user.Email === Email);
  const adminExist = admin.some((user) => user.Email === Email);

  if (applicantExists || adminExist) {
    return res.json({ Error: "User already exists, please sign in." });
  }

  const appUser = {
    id: appId,
    Name,
    Email,
    Password,
    Role,
    savedJobs: [],
    viewedJobs: 0,
    appliedJobs: []
  };
  const adminUser = {
    id: adminID,
    Name,
    Email,
    Password,
    Role,
    postedJobs: [],
    pendingapplication: [],
  };

  if (Role === "admin") {
    admin.push(adminUser);
    read = { ...adminUser };
    console.log(admin);
    return res.json({ Message: "SignUp Succesfull" });
  } else {
    signup.push(appUser);
    read = { ...appUser };
    console.log(signup);
    return res.json({ Message: "Signup successful!" });
  }
});


// ================= SIGNIN API =================
app.post("/user/signin", (req, res) => {
  const { Email, Password, Role } = req.body;

  let user;
  if (Role.toLowerCase() === "applicant") {
    user = signup.find((x) => x.Email === Email);
  } else if (Role.toLowerCase() === "admin") {
    user = admin.find((x) => x.Email === Email);
  }

  if (!user) {
    return res.json({ Error: "User didn't exist please SignUp first" });
  }
  if (user.Password !== Password) {
    return res.json({ Error: "Incorrect UserName or password" });
  }
  if (user.Role !== Role) {
    return res.json({ Error: "Please select correct role" });
  }

  read = { ...user };
  console.log(read);
  res.status(200).json({
    success: true,
    message: `Welcome back ${user.Name}`
  });
});


// ================= JOB LIST API =================
app.get("/user/jobs", (req, res) => {
  res.json(jobs);
});


// ================= COMPANIES LIST API =================
app.get("/home/user", (req, res) => {
  res.json(companies);
});


// ================= APPLICANT PROFILE =================
app.get("/applicant/profile", (req, res) => {
  res.json(read);
});


// ================= UPDATE USER ACTIVITY =================
app.patch('/user/activity/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { savedJobs, viewedJobs, appliedJobs } = req.body;

  const user = signup.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // FIX: Check for undefined, not falsy
  if (savedJobs !== undefined) user.savedJobs = savedJobs;
  if (viewedJobs !== undefined) user.viewedJobs = viewedJobs;
  if (appliedJobs !== undefined) user.appliedJobs = appliedJobs;

  res.json({ success: true, message: 'User activity updated', user });
});


// ================= ADMIN JOBS LIST =================
app.get("/applicantjobs", (req, res) => {
  if (adminJobs.length > 0) { // FIX: length >= 0 always true
    res.status(200).json(adminJobs);
  } else {
    res.status(400).json({ message: "No jobs found" });
  }
});


// ================= SAVED JOBS API =================
app.get("/applicant/savedJobs/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = signup.find((x) => x.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const savedJobsId = Array.isArray(user.savedJobs) ? user.savedJobs : [];
  const savedJobs = adminJobs.filter((job) =>
    savedJobsId.includes(job.id)
  );

  res.json(savedJobs);
});


// ================= ADMIN DASHBOARD =================
app.get("/admin/dashboard/:id", (req, res) => {
  const userID = parseInt(req.params.id);
  const jobStore = admin.find((x) => x.id === userID);
  console.log("Running");
  if (!jobStore) {
    return res.status(404).json({ error: "Admin not found" });
  }

  const totalUsers = signup.length + admin.length;
  const totalJobs = adminJobs.length;
  const postedJobLength = jobStore.postedJobs.length;
  const pendingApprovals = jobStore.pendingapplication.length;

  res.json({
    totalUsers,
    totalJobs,
    postedJobLength,
    pendingApprovals,
    adminJobs
  });
});

app.post("/admin/:id", (req, res) => {
  const userID = parseInt(req.params.id);
  const {
    title,
    company,
    rating="4.0",
    location,
    easilyApply=true,
    salary,
    responsibility, // Already HTML string from frontend
    Qalification    // Already HTML string from frontend
  } = req.body;

  // Find admin user
  const adminUser = admin.find((x) => x.id === userID);
  if (!adminUser) {
    return res.status(404).json({ error: "Admin not found" });
  }

  // Create JobId
  const JobId = adminJobs.length + 1;

  // Create description using variables directly
  const description = `
    <p>${company} is hiring a talented ${title}. Join our team to make an impact.</p>
    <h4 class="font-semibold mt-4 mb-2">Responsibilities:</h4>
    <ul class="list-disc list-inside space-y-1">
      ${responsibility}
    </ul>
    <h4 class="font-semibold mt-4 mb-2">Requirements:</h4>
    <ul class="list-disc list-inside space-y-1">
      ${Qalification}
    </ul>
  `;

  // Create job object
  const newJob = {
    id: JobId,
    title,
    company,
    rating,
    location,
    salary,
    easilyApply,
    description
  };

  // Push to jobs array
  adminJobs.push(newJob);

  // Ensure admin has postedJobs
  if (!Array.isArray(adminUser.postedJobs)) {
    adminUser.postedJobs = [];
  }

  // Track posted job
  adminUser.postedJobs.push({ userID, JobId });

  return res.status(201).json({
    message: "Job posted successfully",
    job: newJob
  });
});


app.post("/apply-job/:Jobid/:userid", upload.single("resume"), (req, res) => {
  const userId = parseInt(req.params.userid);
  const JobId = parseInt(req.params.Jobid);
  
  // 1. Find the applicant
  const user = signup.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // 2. Validate resume file FIRST
  if (!req.file) {
    return res.status(400).json({ error: "Resume file is required" });
  }

  // 3. Find which admin posted this job
  const adminUser = admin.find(admin => {
    return admin.postedJobs.some(job => 
      // FIX: Check the actual job ID structure
      job.JobId === JobId
    );
  });

  // 4. CRITICAL: Check if adminUser exists
  if (!adminUser) {
    return res.status(404).json({ 
      error: "Job not found or no admin associated with this job" 
    });
  }

  // 5. Create application with CORRECT spelling
  const jobApplication = {
    Name: req.body.fullname,
    Email: req.body.email,
    Phone: req.body.phoneNumber,
    status:"Applied",
    CoverLetter: req.body.coverLetter,
    resumeFilePath: `/uploads/${req.file.filename}`,
    appliedAt: new Date(),
    jobId: JobId, // Track which job this is for
    userId: userId
  };

  // 6. FIX: Use CORRECT property name (pendingapplication)
  if (!Array.isArray(adminUser.pendingapplication)) {
    adminUser.pendingapplication = [];
  }
  adminUser.pendingapplication.push(jobApplication);

  // 7. Add to user's applied jobs
  if (!Array.isArray(user.appliedJobs)) {
    user.appliedJobs = [];
  }
  user.appliedJobs.push(jobApplication);

  res.json({
    message: "Job applied successfully",
    application: jobApplication
  });
});

app.get("/admin/pendingJobs/:id",(req,res)=>{
  const adminId = parseInt(req.params.id);
  const user = admin.find((x) => x.id === adminId);
  if(!user)
  {
    res.status(401).json({message:"No user found"});
  }

  res.status(200).json(user.pendingapplication);
})

app.get("/applicant/appliedjob/:id",(req,res) =>{
  const appId = parseInt(req.params.id);
  const user = signup.find((x) =>  x.id === appId);
  if(!user)
  {
   return res.status(401).json({message:"user Not found"});
  }
  res.status(200).json(user.appliedJobs);

})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
