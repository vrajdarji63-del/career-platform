import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, User, Sparkles, RotateCcw, ChevronRight, Zap, Target, Map, BarChart2, BookOpen, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

// ─── AI Engine — 30+ intent handlers ─────────────────────────────────────────
function generateResponse(msg, user) {
  const text  = msg.toLowerCase().trim();
  const name  = user?.firstName || user?.name?.split(' ')[0] || 'there';
  const career = user?.careerGoal || user?.recommendedCareer?.title || user?.recommendedCareer || 'your target career';
  const ready  = user?.careerReadiness ?? 0;
  const match  = user?.recommendedCareer?.match;
  const rawSkills = user?.skills || [];
  const interests = user?.interests || [];
  const careerMatches = user?.careerMatches || [];

  const skills = rawSkills.map((s) => typeof s === 'string' ? { name: s, proficiency: 50 } : s);
  const top    = [...skills].sort((a, b) => b.proficiency - a.proficiency).slice(0, 4);
  const weak   = [...skills].sort((a, b) => a.proficiency - b.proficiency).slice(0, 4);
  const topList  = top.map((s) => `**${s.name}** (${s.proficiency}%)`).join(', ');
  const weakList = weak.map((s) => `**${s.name}** (${s.proficiency}%)`).join(', ');

  const has = (...words) => words.some((w) => text.includes(w));

  // Greeting
  if (/^(hi|hello|hey|yo|howdy|sup|hii|helo|namaste|hola)\b/.test(text)) {
    return `Hey ${name}! I have loaded your full profile:\n\n- Career Goal: **${career}**\n- Readiness: **${ready}%**${match ? `\n- AI Match: **${match}%**` : ''}\n- Skills tracked: **${skills.length}**\n\nAsk me anything about your career path!`;
  }

  // What can you do
  if (has('what can you', 'what do you', 'help me with', 'capabilities', 'how do you work', 'what topics')) {
    return `I am your personal AI Career Advisor, ${name}! I can help with:\n\n**Learning**\n- Which skill to learn next\n- Best free and paid resources\n- Study plans and learning paths\n\n**Building**\n- Project ideas tailored to ${career}\n- Portfolio tips and GitHub advice\n\n**Job Search**\n- Resume and cover letter tips\n- LinkedIn profile optimisation\n- Interview preparation for ${career}\n\n**Career Intel**\n- Salary ranges in India and globally\n- Best tools and tech stacks\n- Freelancing vs full-time advice\n\n**Mindset**\n- Staying motivated and consistent\n- Handling imposter syndrome\n- Overcoming burnout\n\nJust ask in plain language!`;
  }

  // Career readiness
  if (has('ready', 'readiness', 'am i ready', 'job ready', 'apply', 'applying')) {
    const tip = ready >= 70 ? 'You are very close — keep pushing!' : 'Consistent daily practice will get you there in 4-8 weeks.';
    if (ready >= 80) {
      return `You are at **${ready}% career readiness** — excellent! You are ready to apply for ${career} positions.\n\n**Action plan:**\n1. Polish your portfolio with 2-3 strong projects\n2. Start applying to junior positions this week\n3. Prepare for technical and behavioral interviews\n\n**Your strong skills:** ${topList || 'Add skills to your profile'}\n\nTip: Apply even if you meet only 70% of requirements — that is the industry norm!`;
    }
    if (ready >= 60) {
      return `You are at **${ready}% career readiness** — good progress! A bit more work before actively applying.\n\n**Focus areas:**\n- Weakest skills: ${weakList || 'Add skills to see your gaps'}\n- Target: reach 80%+ before sending resumes\n\n${tip}\n\n**This week:** Spend 1-2 hours daily on ${weak[0]?.name || 'your weakest skill'} and start one small project.`;
    }
    return `You are at **${ready}% career readiness** — building phase for ${career}.\n\n**Priority skills to focus on:**\n${weak.slice(0, 3).map((s, i) => `${i + 1}. **${s.name}** — currently ${s.proficiency}%`).join('\n')}\n\nWith 2 hours of daily practice, you can add ~5% readiness per week. You will get there!`;
  }

  // Next skill
  if (has('next skill', 'learn next', 'what to learn', 'which skill', 'should i learn', 'what skill', 'skill to focus')) {
    if (skills.length === 0) {
      return `You have not added any skills yet, ${name}. Visit your **Profile** page to add skills with proficiency levels — then I can give you a precise learning plan for ${career}!`;
    }
    const next = weak[0];
    const second = weak[1];
    const res = {
      React: 'react.dev (official docs) and Scrimba React course',
      JavaScript: 'javascript.info — the best free JS resource online',
      Python: 'Python.org tutorial and Automate the Boring Stuff (free)',
      SQL: 'SQLZoo.net — free and interactive',
      'Node.js': 'The Odin Project Node.js path (free)',
      CSS: 'CSS-Tricks.com and Kevin Powell on YouTube',
      TypeScript: 'Official TypeScript handbook — well written and free',
      Docker: 'Docker official get-started guide and TechWorld with Nana on YouTube',
    };
    const resource = res[next.name] || 'the official documentation and freeCodeCamp';
    return `Your top priority skill for **${career}**:\n\n**${next.name}** — currently at ${next.proficiency}%, need to reach 75%+\n\n**Best resource:** ${resource}\n\n**3-week plan:**\n- Week 1: Core concepts and follow a structured tutorial\n- Week 2: Build one small project using only ${next.name}\n- Week 3: Add it to a portfolio project\n\n${second ? `**After that:** ${second.name} (${second.proficiency}%) is your next gap.` : ''}`;
  }

  // Skill gap
  if (has('skill gap', 'gaps', 'missing skill', 'weak skill', 'gap analysis', 'lacking', 'deficit')) {
    if (skills.length === 0) {
      return `You have not added skills yet. Head to **Profile** and add your skills with proficiency levels — I will give you a full personalised gap analysis for ${career}!`;
    }
    return `**Skill gap analysis for ${career}:**\n\n**Critical to improve:**\n${weak.slice(0, 3).map((s, i) => `${i + 1}. **${s.name}** — ${s.proficiency}%`).join('\n')}\n\n**Already strong:**\n${top.slice(0, 3).map((s) => `- ${s.name} — ${s.proficiency}%`).join('\n')}\n\n**Strategy:** Focus on one critical skill at a time. Start with **${weak[0]?.name || 'your weakest skill'}** for 2-3 weeks before moving to the next.`;
  }

  // Projects
  if (has('project', 'build', 'portfolio', 'create', 'make', 'what to build', 'project idea')) {
    const projectMap = {
      'Frontend Developer':   ['Personal Portfolio (React)', 'Weather Dashboard (API + UI)', 'E-commerce product page', 'Real-time search filter'],
      'Backend Developer':    ['REST API with Node.js and MongoDB', 'JWT auth system', 'Blog API with Express', 'File upload service'],
      'Full Stack Developer': ['Full-stack blog (React + Node + PostgreSQL)', 'Real-time chat app', 'Task manager with auth', 'E-commerce with checkout'],
      'Data Analyst':         ['Sales dashboard in Python + Matplotlib', 'SQL exploration on Kaggle', 'Customer churn analysis', 'COVID-19 visualisation'],
      'UI/UX Designer':       ['Figma design system', 'Mobile app redesign case study', 'Landing page redesign', 'Usability test report'],
      'DevOps Engineer':      ['Docker + Compose multi-service app', 'CI/CD with GitHub Actions', 'Kubernetes local demo', 'IaC with Terraform'],
      'Data Scientist':       ['House price ML model', 'NLP sentiment classifier', 'Image classification CNN', 'Recommender system'],
      'AI/ML Engineer':       ['Fine-tuned LLM with HuggingFace', 'Computer vision classifier', 'RAG chatbot', 'FastAPI ML model server'],
    };
    const projects = projectMap[career] || ['Personal portfolio website', 'CRUD app with auth', 'API integration project'];
    return `**Best projects for ${career}:**\n\n${projects.map((p, i) => `${i + 1}. **${p}**`).join('\n')}\n\n**Start with #1** — it exercises your weakest skill (${weak[0]?.name || 'core skills'}) and looks great in interviews.\n\n**Deployment:** Vercel or Netlify for frontend, Railway or Render for backend — all free tiers available. Recruiters want live demos, not just code!`;
  }

  // Roadmap / timeline
  if (has('roadmap', 'timeline', 'how long', 'when will', 'plan', 'schedule', 'study plan', 'learning path', 'weeks', 'months')) {
    const gap    = Math.max(0, 85 - ready);
    const weeks  = Math.max(4, Math.ceil(gap / 5));
    const months = Math.ceil(weeks / 4);
    return `**Your personalised timeline to ${career}:**\n\nCurrent: ${ready}% | Target: 85%\nEstimate: ~${weeks} weeks (~${months} month${months > 1 ? 's' : ''}) at 2-3 hrs/day\n\n**Phases:**\n1. **Weeks 1-${Math.ceil(weeks * 0.4)}:** Fix skill gaps — focus on ${weak[0]?.name || 'core skills'}\n2. **Weeks ${Math.ceil(weeks * 0.4) + 1}-${Math.ceil(weeks * 0.75)}:** Build 2-3 portfolio projects\n3. **Weeks ${Math.ceil(weeks * 0.75) + 1}-${weeks}:** Job applications and interview prep\n\n**Daily:** 1 hr learning + 1 hr building. Consistency beats intensity!`;
  }

  // Salary
  if (has('salary', 'pay', 'earn', 'money', 'ctc', 'lpa', 'package', 'compensation', 'stipend', 'income')) {
    const salMap = {
      'Frontend Developer':    { india: '4-15 LPA', us: '$70k-$130k' },
      'Backend Developer':     { india: '5-18 LPA', us: '$80k-$150k' },
      'Full Stack Developer':  { india: '6-20 LPA', us: '$90k-$160k' },
      'Data Analyst':          { india: '4-12 LPA', us: '$60k-$110k' },
      'Data Scientist':        { india: '8-25 LPA', us: '$100k-$180k' },
      'AI/ML Engineer':        { india: '10-30 LPA', us: '$120k-$200k' },
      'UI/UX Designer':        { india: '4-14 LPA', us: '$65k-$120k' },
      'DevOps Engineer':       { india: '7-22 LPA', us: '$90k-$160k' },
      'Cybersecurity Analyst': { india: '6-20 LPA', us: '$80k-$150k' },
    };
    const sal = salMap[career] || { india: '4-20 LPA', us: '$60k-$150k' };
    return `**Salary for ${career}:**\n\nIndia: ${sal.india} (junior to senior)\nUS / Remote: ${sal.us}\n\n**What increases your salary:**\n- Deployed portfolio projects (shows real skill)\n- ${top[0]?.name || 'In-demand skills'} proficiency\n- Open source contributions\n- Strong negotiation during offers\n\nAt ${ready}% readiness you are positioned for ${ready >= 70 ? 'the higher' : 'entry-level'} junior ranges. Always negotiate!`;
  }

  // Resume
  if (has('resume', 'cv', 'curriculum vitae', 'resume tip')) {
    return `**Resume tips for ${career}:**\n\n**Sections (in order):**\n1. Name + contact + GitHub link + portfolio URL\n2. Skills: ${top.map((s) => s.name).join(', ')}\n3. Projects with live demo links (most important!)\n4. Education\n5. Experience (freelance counts)\n\n**Writing tips:**\n- Action verbs: Built, Designed, Deployed, Reduced\n- Quantify: "Reduced load time by 40%"\n- Keep to 1 page for junior roles\n- Tailor for each job description using their keywords\n\nLead with your best project — recruiters decide in 6 seconds!`;
  }

  // Cover letter
  if (has('cover letter', 'covering letter', 'application letter')) {
    return `**Cover letter formula for ${career}:**\n\n**Paragraph 1 - Hook:** State your role, enthusiasm, and one specific thing about the company.\n\n**Paragraph 2 - Proof:** Describe your best 1-2 projects. Show what problem you solved using ${top.slice(0, 2).map((s) => s.name).join(' and ')}.\n\n**Paragraph 3 - Fit:** Why THIS company? Research them and mention something specific and real.\n\n**Paragraph 4 - CTA:** "Available for interview at your convenience."\n\n**Key rule:** Tailor every cover letter. A generic letter gets ignored. A specific one gets noticed.`;
  }

  // LinkedIn / networking
  if (has('linkedin', 'linked in', 'online presence', 'personal brand', 'networking', 'connect with')) {
    return `**LinkedIn tips for ${career}:**\n\n**Profile essentials:**\n- Professional photo (clean background)\n- Headline: "${career} | ${top.slice(0, 2).map((s) => s.name).join(' + ')} | Open to Work"\n- About: Your story, what you build, and what value you bring\n- Skills section with endorsements\n\n**Activity that gets noticed:**\n- Post about projects you build (even small ones)\n- Share what you learned each week\n- Comment meaningfully on industry posts\n- Connect with recruiters and hiring managers\n\nRecruiters search for "${career} + ${top[0]?.name || 'skills'}" — make sure those keywords are in your profile!`;
  }

  // GitHub
  if (has('github', 'git', 'open source', 'repository', 'repo', 'contribution', 'commit')) {
    return `**GitHub tips for ${career}:**\n\n**Profile essentials:**\n- Profile README.md (stand out!)\n- 4-6 pinned repos with live demo links\n- Green contribution graph (consistency signals effort)\n- Each repo needs: clear README, screenshots, setup instructions\n\n**Best practices:**\n- Commit code daily, even small improvements\n- Write meaningful commit messages (not just "fix")\n- Use branches and pull requests (shows team workflow)\n- Star and contribute to repos that use ${top[0]?.name || 'your top skill'}\n\n**Open source starter:** Look for issues labelled "good first issue" in repos using your skills. Even doc fixes count!\n\nRecruiters do look at GitHub. Make it represent you well!`;
  }

  // Certification / courses
  if (has('cert', 'certification', 'certificate', 'course', 'udemy', 'coursera', 'freecodecamp', 'online course')) {
    const certMap = {
      'Frontend Developer':   'Meta Front-End Developer Certificate (Coursera) or The Odin Project (free)',
      'Backend Developer':    'The Odin Project Node.js path or IBM Full Stack (Coursera)',
      'Full Stack Developer': 'Full Stack Open by University of Helsinki (free, excellent)',
      'Data Analyst':         'Google Data Analytics Certificate (Coursera)',
      'Data Scientist':       'IBM Data Science Certificate or fast.ai (free)',
      'AI/ML Engineer':       'DeepLearning.ai specialisations (Andrew Ng)',
      'DevOps Engineer':      'AWS Cloud Practitioner + Docker Mastery on Udemy',
      'UI/UX Designer':       'Google UX Design Certificate (Coursera)',
    };
    const rec = certMap[career] || 'freeCodeCamp certifications and Coursera specialisations';
    return `**Certifications for ${career}:**\n\n**Recommended:** ${rec}\n\n**Honest truth about certs:**\n- They help pass ATS (applicant tracking system) filters\n- They are NOT a substitute for portfolio projects\n- Employers care about what you can BUILD, not just certificates\n\n**Priority order:**\n1. Build real deployed projects (most important)\n2. Get 1-2 relevant certifications\n3. Start applying early (even before you feel ready)\n\nYou are at ${ready}% readiness — focus on projects first!`;
  }

  // Bootcamp vs degree
  if (has('bootcamp', 'degree', 'college', 'university', 'self taught', 'without degree', 'no degree')) {
    return `**Bootcamp vs Degree vs Self-taught for ${career}:**\n\n**Reality in ${new Date().getFullYear()}:** Most ${career} roles do NOT require a degree. Companies like Google, Apple, and IBM have dropped degree requirements.\n\n**What actually matters:**\n1. Portfolio of real deployed projects\n2. Ability to problem-solve in interviews\n3. Relevant skills (${top.slice(0, 2).map((s) => s.name).join(', ')})\n4. Communication and teamwork\n\n**Paths compared:**\n- **Degree:** Best for research/large corporations. 3-4 years, expensive.\n- **Bootcamp:** Fast (3-6 months), structured, outcome-focused but costly.\n- **Self-taught:** Cheapest, hardest to stay consistent.\n\nYou are at ${ready}% readiness on this platform — that counts!`;
  }

  // Interview prep
  if (has('interview', 'prepare', 'prep', 'technical round', 'coding round', 'mock interview', 'interview question', 'hr round')) {
    const tipsMap = {
      'Frontend Developer':   'JS fundamentals (closures, promises, event loop), React hooks, CSS layout (flex/grid), algorithm basics',
      'Backend Developer':    'System design basics, SQL joins and indexing, REST design, async patterns',
      'Full Stack Developer': 'Full-stack architecture, state management, schema design, deployment and auth flow',
      'Data Analyst':         'SQL (GROUP BY, window functions, CTEs), Python/Pandas, explaining insights clearly',
      'Data Scientist':       'ML algorithms, bias-variance tradeoff, model evaluation metrics, Python + sklearn',
      'UI/UX Designer':       'Design process, user research methods, accessibility, Figma, presenting decisions',
    };
    const tips = tipsMap[career] || 'core technical concepts and system design basics';
    return `**Interview prep for ${career}:**\n\n**Technical topics to master:**\n${tips}\n\n**Behavioral questions to prepare:**\n- "Tell me about a project you are proud of"\n- "How do you debug a problem?"\n- "Describe learning something new quickly"\n- "How do you handle feedback?"\n\n**Practice resources:**\n1. LeetCode Easy/Medium (start with arrays and strings)\n2. Mock interviews on Pramp.com (free)\n3. Re-read your own projects — explain every decision\n4. Record yourself answering — uncomfortable but effective\n\nYour ${top[0]?.name || 'strongest skills'} knowledge will be a strong talking point!`;
  }

  // Job search
  if (has('job search', 'find job', 'find a job', 'where to apply', 'job board', 'get hired', 'land a job', 'job hunt', 'internship', 'entry level', 'junior role')) {
    return `**Job search strategy for ${career}:**\n\n**Best platforms:**\n- LinkedIn Jobs (recruiters are here)\n- Naukri.com (India)\n- AngelList or Wellfound (startups)\n- Indeed and Internshala (internships)\n- Company career pages directly\n\n**Search keywords:**\n"Junior ${career}", "${top[0]?.name || 'your skill'} developer", "entry level ${career}"\n\n**Application strategy:**\n1. Tailor your resume for each job description\n2. Apply to 5-10 jobs per day (volume matters early)\n3. Connect with the hiring manager on LinkedIn after applying\n4. Follow up after 1 week with a brief message\n\n${ready >= 70 ? 'At ' + ready + '% readiness — start applying now! Companies expect to train juniors.' : 'Start with internships while building your skills. The experience is invaluable.'}`;
  }

  // Freelancing
  if (has('freelance', 'freelancing', 'fiverr', 'upwork', 'client work', 'side income', 'side hustle', 'contract work')) {
    return `**Freelancing as a ${career}:**\n\n${ready >= 60 ? 'At ' + ready + '% readiness, you are ready to take small projects!' : 'Build your skills a bit more first, then dive into freelancing.'}\n\n**How to start:**\n1. Create profiles on Upwork and Fiverr\n2. Start with small, fixed-price projects to build reviews\n3. Niche down — "${career} landing pages" beats "I do web development"\n4. Use your portfolio to win first clients\n\n**Rates (India):**\n- Beginner: Rs 500-1500 per hour\n- 1-2 years experience: Rs 1500-4000 per hour\n\nGreat as a side income, but a full-time job first gives stability and mentorship.`;
  }

  // Remote work
  if (has('remote', 'work from home', 'wfh', 'remote job', 'global job', 'international job', 'remote work')) {
    return `**Remote ${career} jobs:**\n\n${career}s are among the most remote-friendly roles in tech!\n\n**Best platforms:**\n- Remote.co\n- We Work Remotely (weworkremotely.com)\n- Remote OK (remoteok.com)\n- LinkedIn with "Remote" filter\n- Toptal (senior and vetted roles)\n\n**What remote employers require:**\n- Strong async communication (clear, precise writing)\n- Self-discipline and time management\n- Deployed portfolio projects\n- Good English communication skills\n\n**Salary boost:** Remote global roles often pay $40k-$80k+ even for juniors — much higher than typical local salaries.\n\nFocus on your portfolio and English communication — both are critical for landing remote roles!`;
  }

  // Tools and tech stack
  if (has('tool', 'framework', 'technology', 'tech stack', 'what framework', 'library', 'which language', 'language to learn')) {
    const stackMap = {
      'Frontend Developer':   'React + TypeScript + Tailwind CSS + Vite + Git',
      'Backend Developer':    'Node.js + Express or Python + FastAPI + PostgreSQL + Docker',
      'Full Stack Developer': 'React + Node.js + PostgreSQL + Docker + Git',
      'Data Analyst':         'Python + Pandas + SQL + Tableau or Power BI',
      'Data Scientist':       'Python + scikit-learn + TensorFlow + Pandas + Jupyter',
      'UI/UX Designer':       'Figma (primary) + Adobe XD + Notion + Maze',
      'DevOps Engineer':      'Docker + Kubernetes + GitHub Actions + AWS or GCP',
      'AI/ML Engineer':       'Python + PyTorch + HuggingFace + FastAPI + Docker',
    };
    const stack = stackMap[career] || 'industry-standard tools for your career path';
    return `**Recommended tech stack for ${career}:**\n\n${stack}\n\n**Your current strongest tools:**\n${top.slice(0, 3).map((s) => `- ${s.name}: ${s.proficiency}%`).join('\n')}\n\n**Next to add:** ${weak[0] ? `**${weak[0].name}** — your biggest gap at ${weak[0].proficiency}%` : 'Keep practising your current stack'}\n\n**Tip:** Master 1-2 tools deeply rather than learning 10 tools superficially. Depth beats breadth for junior roles.`;
  }

  // Daily routine
  if (has('daily', 'routine', 'habit', 'schedule', 'consistent', 'every day', 'how many hours', 'how much time')) {
    return `**Daily routine for a ${career} in training:**\n\n**Minimum (1-2 hours per day):**\n- 30-45 min: Structured learning (course, docs, tutorial)\n- 30-45 min: Building or coding practice\n\n**Optimal (3-4 hours per day):**\n- 1 hour: Deep learning of new concept\n- 1.5 hours: Project work\n- 30 min: Review and revision\n\n**Weekly rhythm:**\n- Mon-Fri: Core learning and building\n- Saturday: Full project feature end-to-end\n- Sunday: Review the week, plan next week, rest\n\nAt ${ready}% readiness with consistent effort, you can reach 85% in approximately ${Math.max(4, Math.ceil((85 - ready) / 5))} weeks!\n\nConsistency beats intensity — 1 hour daily beats 7 hours on Sunday.`;
  }

  // Imposter syndrome
  if (has('imposter', 'not good enough', 'not smart', 'comparison', 'others are better', 'behind', 'fake developer')) {
    return `This is real, ${name}, and almost every developer feels it — even senior ones.\n\n**The truth:**\n- It means you care about doing good work\n- Even senior engineers Google basic things daily\n- The field is vast — no one knows everything\n\n**Reframe it:**\n- You are at ${ready}% readiness — that is real, measurable progress\n- You know ${top[0]?.name || 'real skills'} — that took actual work to learn\n- Every ${career} you admire was once a complete beginner\n\n**What helps:**\n1. Look back at what you could not do 1 month ago\n2. Help someone more junior — you know more than you think\n3. Build in public — sharing beats comparing in private\n\nYou belong here. Keep going.`;
  }

  // Burnout
  if (has('burnout', 'burned out', 'exhausted', 'tired', 'overwhelm', 'too much', 'stressed', 'anxious')) {
    return `Take a breath, ${name}. Burnout is real and important to address.\n\n**Right now:**\n1. Take 1-2 days completely off — no coding\n2. Sleep, move your body, talk to someone you trust\n3. You are not behind. This is a marathon.\n\n**When you return:**\n- Cut daily goals in half temporarily\n- Focus on ONE small thing per day\n- Celebrate tiny wins — every commit counts\n\n**Likely causes:** Too many things at once, comparing yourself to others, unclear daily goals.\n\nYou are at ${ready}% — real progress. Protect it. Rest is part of learning, not a break from it.`;
  }

  // Motivation / stuck
  if (has('stuck', 'struggling', 'give up', 'hard', 'difficult', 'motivat', 'discourag', 'slow', 'no progress', 'lost', 'can not', 'cant', 'cannot')) {
    return `I hear you, ${name}. Learning tech is genuinely hard — you are not imagining it.\n\n**You are at ${ready}% readiness** — real, measurable progress. Most people quit at 0%.\n\n**When stuck, try:**\n1. Break the task into the smallest possible step\n2. Take a 20-min walk — this actually helps neurologically\n3. Google the exact error message (every dev does this, always)\n4. Ask on Stack Overflow or Reddit r/learnprogramming\n5. Watch someone build something similar on YouTube\n\n**Remember:** Every ${career} you admire was once exactly where you are right now.\n\nWhat specifically is blocking you? Tell me and we will solve it together.`;
  }

  // Career alternatives
  if (has('alternative', 'other career', 'switch', 'change career', 'different career', 'career match', 'other option', 'different path')) {
    if (careerMatches.length > 0) {
      const list = careerMatches.slice(0, 5).map((c, i) => `${i + 1}. **${c.title || c}** — ${c.match || '?'}% match`).join('\n');
      return `Your career match results:\n\n${list}\n\n**My recommendation:** ${career} is your top match — stay focused on it. Many skills transfer between paths so you are not locked in.\n\nWant me to analyse a specific alternative in depth?`;
    }
    return `You have not completed the career assessment yet. Take it on the **Assessment** page — it takes a few minutes and gives you a personalised list of career matches with scores so we can compare options!`;
  }

  // Interests
  if (has('interest', 'hobby', 'passion', 'enjoy', 'excited about', 'love to')) {
    if (interests.length > 0) {
      return `Your interests from your profile: **${interests.join(', ')}**\n\nHow they connect to ${career}:\n${interests.slice(0, 3).map((i) => `- **${i}:** Great material for portfolio projects`).join('\n')}\n\nProjects built around genuine interests are more polished and impressive. Recruiters can tell when you care about what you built!`;
    }
    return `You have not added interests yet. Head to **Profile** or **Settings** to add them — your interests help me suggest projects that you will genuinely be excited to build!`;
  }

  // Comparison
  if (has('compare', 'vs', 'difference between', 'better', 'which is better', 'should i use', 'react vs', 'python vs', 'sql vs')) {
    return `Great comparison question! Here is my take for **${career}**:\n\n**General rule:** The best tool is the one most used in ${career} job postings. Look up "${career} jobs" on LinkedIn and note which technologies appear most.\n\n**For ${career} specifically:**\n${top.slice(0, 2).map((s) => `- **${s.name}** (${s.proficiency}%) is already in your stack`).join('\n')}\n\nIf you give me the specific technologies you are comparing (like "React vs Vue"), I can give you a more precise answer with industry data!`;
  }

  // Explain something
  if (has('explain', 'what is', 'define', 'meaning of', 'how does', 'why is', 'tell me about', 'describe')) {
    const topic = text.replace(/explain|what is|define|meaning of|how does|why is|tell me about|describe/g, '').trim();
    return `Good question about **"${topic}"**!\n\nHere is how it relates to your ${career} path:\n\n**Why it matters for ${career}:** This is ${['essential', 'important', 'useful', 'relevant'][Math.floor(Math.random() * 4)]} for your career goal.\n\n**Quick definition:** ${topic} is a concept or tool that ${career}s use regularly. Understanding it will strengthen your readiness score.\n\n**To learn more about ${topic} specifically:** Check the official documentation or search "${topic} tutorial for beginners" on YouTube.\n\nIs there a specific aspect of "${topic}" you are trying to understand?`;
  }

  // Thanks
  if (has('thank', 'thanks', 'helpful', 'awesome', 'perfect', 'great answer', 'appreciate', 'love it', 'nice')) {
    return `Happy to help, ${name}! You are at **${ready}% career readiness** — every question you ask and skill you practice is moving that number forward.\n\nWhat else can I help you with on your **${career}** journey?`;
  }

  // Goodbye
  if (/^(bye|goodbye|see you|cya|take care|ttyl|later|good night|goodnight)\b/.test(text)) {
    return `See you soon, ${name}! Remember — consistency beats intensity. Even 30 minutes today keeps momentum going.\n\nCurrent status: **${ready}% career readiness** — keep climbing!`;
  }

  // Keyword-based smart fallback
  const kwMap = [
    { re: /react|vue|angular|frontend|component|hook/, r: `For ${career}, your strongest frontend skill is ${top.find((s) => /react|html|css|js/i.test(s.name))?.name || top[0]?.name || 'to be added'}. Focus on React component patterns, hooks, and state management — then consume REST APIs in your projects. Build and deploy something today!` },
    { re: /node|express|django|fastapi|backend|api|server/, r: `Backend is ${career === 'Backend Developer' || career === 'Full Stack Developer' ? 'your core' : 'a great complement'} for ${career}. Key areas: REST API design, JWT authentication, database connection, and error handling. Your weakest backend skill: ${weak.find((s) => /node|python/i.test(s.name))?.name || 'to be identified — add your skills to your profile'}.` },
    { re: /sql|database|postgres|mongo|mysql|query|db/, r: `Database skills are increasingly expected for ${career}. SQL is the most in-demand. Your current SQL proficiency: ${skills.find((s) => /sql/i.test(s.name))?.proficiency ?? 'not tracked yet'}%. Start with SQLZoo.net — free and interactive. Master SELECT, JOIN, GROUP BY, and basic schema design first.` },
    { re: /docker|kubernetes|devops|ci.cd|deploy|aws|cloud|hosting/, r: `DevOps knowledge is a big bonus for ${career} — it makes you much more hireable! Start with: proper Git flow (branches and PRs), then Docker basics, then GitHub Actions for CI/CD. Even 40% DevOps knowledge sets you apart from most junior candidates.` },
    { re: /python|pandas|numpy|data|analysis|dataset/, r: `Data skills are ${career.includes('Data') ? 'your core focus' : 'a powerful add-on'} for ${career}. Foundation: Python + Pandas for data wrangling, SQL for querying, Matplotlib for visualisation. Kaggle.com has great free datasets and competitions that look great on a resume.` },
    { re: /design|figma|ux|ui|wireframe|prototype/, r: `UI/UX awareness elevates ${career} work! Even basic design skills make your projects look professional. Learn: visual hierarchy, colour theory, and Figma basics. Resource: Refactoring UI (book) — practical design for developers. Your projects will immediately look more polished.` },
    { re: /machine learning|ml|ai|deep learning|neural|model/, r: `AI and ML are exciting areas right now. For ${career}, understanding AI fundamentals gives you a real edge. Start with: Python + scikit-learn for ML basics, then explore HuggingFace and OpenAI APIs to integrate AI into your projects. You can build impressive AI-powered apps today!` },
    { re: /css|style|layout|flex|grid|responsive|animation/, r: `CSS mastery is underrated and highly valuable for ${career}. Employers love developers who make things look great. Focus on: Flexbox, CSS Grid, custom properties, and transitions. Kevin Powell on YouTube is the best free CSS teacher. Your CSS proficiency: ${skills.find((s) => /css/i.test(s.name))?.proficiency ?? 'not tracked'}%.` },
    { re: /javascript|js|typescript|ts|async|promise|closure/, r: `JavaScript is the backbone of web development and critical for ${career}. Must-know: closures, promises and async/await, the event loop, array methods (map/filter/reduce). javascript.info is the definitive free resource. Your JS proficiency: ${skills.find((s) => /javascript|js/i.test(s.name))?.proficiency ?? 'not tracked'}%.` },
    { re: /test|testing|jest|cypress|unit test|qa/, r: `Testing is a major differentiator for ${career} candidates! Most juniors skip this — knowing it makes you stand out. Start with Jest for unit tests, React Testing Library for components, Cypress for E2E. Adding tests to your portfolio shows professional engineering habits. Recruiters notice!` },
  ];
  for (const kw of kwMap) {
    if (kw.re.test(text)) return kw.r;
  }

  // Final catch-all — always career-relevant
  return `Good question, ${name}! Here is my ${career}-focused take:\n\n**Your current status:**\n- Readiness: **${ready}%**\n- Strongest skill: ${top[0]?.name || 'Add skills to your profile'}\n- Next to focus on: **${weak[0]?.name || 'complete onboarding to see recommendations'}**\n\nI may not have a perfect answer for that specific question, but I can give you detailed guidance on:\n\n- **"What should I learn next?"** — specific skill plan\n- **"What projects should I build?"** — tailored to ${career}\n- **"How do I prepare for interviews?"** — ${career}-specific prep\n- **"How long until I am job-ready?"** — your personalised timeline\n- **"What salary can I expect?"** — India and global ranges\n\nOr tell me more about what you are working on and I will help!`;
}

// ─── Markdown renderer ────────────────────────────────────────────────────────
function renderContent(content) {
  return content.split('\n').map((line, i) => {
    if (line === '') return <div key={i} style={{ height: 5 }} />;
    const html = line
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code style="background:rgba(99,102,241,0.08);padding:2px 6px;borderRadius:4px;fontSize:0.85em;fontFamily:monospace">$1</code>');
    const isList = /^\d+\./.test(line) || /^[-]/.test(line);
    return (
      <p key={i} style={{ fontSize: '0.88rem', lineHeight: 1.75, margin: 0, marginLeft: isList ? 10 : 0 }}
        dangerouslySetInnerHTML={{ __html: html }} />
    );
  });
}

// ─── Quick chips ──────────────────────────────────────────────────────────────
const CHIPS = [
  { label: 'Am I job ready?',              icon: Target },
  { label: 'What skill to learn next?',    icon: BookOpen },
  { label: 'Show my skill gaps',           icon: BarChart2 },
  { label: 'What projects should I build?',icon: Briefcase },
  { label: 'Give me a roadmap',            icon: Map },
  { label: 'Salary expectations',          icon: Zap },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AIAdvisorPage() {
  const { currentUser } = useAuth();
  const firstName = currentUser?.firstName || currentUser?.name?.split(' ')[0] || 'there';
  const career    = currentUser?.careerGoal || currentUser?.recommendedCareer?.title || currentUser?.recommendedCareer || 'your target career';
  const ready     = currentUser?.careerReadiness ?? 0;

  const [messages, setMessages] = useState([{
    id: 1,
    role: 'assistant',
    content: `Hey ${firstName}! I am your **AI Career Advisor**.\n\nI have loaded your profile:\n- Career Goal: **${career}**\n- Readiness: **${ready}%**\n\nAsk me anything — skills, projects, salary, interviews, timeline, or just how to stay motivated. I understand context and give personalised answers!`,
  }]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef   = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', content: msg }]);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 700));
    const response = generateResponse(msg, currentUser);
    setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', content: response }]);
    setLoading(false);
  }, [input, loading, currentUser]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleInput = (e) => {
    const ta = e.target;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    setInput(ta.value);
  };

  const handleReset = () => {
    setMessages([{ id: Date.now(), role: 'assistant', content: `Chat cleared! Ready when you are, ${firstName}. What would you like to know about your **${career}** journey?` }]);
  };

  return (
    <div style={{ maxWidth: '52rem', margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 6rem)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', background: 'linear-gradient(135deg,rgba(99,102,241,0.07),rgba(139,92,246,0.07))', borderRadius: '20px 20px 0 0', border: '1px solid rgba(99,102,241,0.12)', borderBottom: 'none', flexShrink: 0 }}>
        <div style={{ width: 46, height: 46, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(99,102,241,0.45)', flexShrink: 0 }}>
          <Bot size={22} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h1 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e1b4b', fontFamily: 'Syne, sans-serif', margin: 0 }}>AI Career Advisor</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(16,185,129,0.08)', padding: '3px 9px', borderRadius: 99, border: '1px solid rgba(16,185,129,0.15)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse-dot 1.8s ease infinite' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669' }}>Online</span>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', margin: 0 }}>
            Personalised guidance for <strong style={{ color: '#6366f1' }}>{career}</strong> &middot; Readiness: <strong style={{ color: '#6366f1' }}>{ready}%</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6366f1', background: 'rgba(99,102,241,0.08)', padding: '4px 10px', borderRadius: 99, border: '1px solid rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Sparkles size={11} /> AI Powered
          </div>
          <button onClick={handleReset} style={{ padding: '6px 10px', borderRadius: 99, background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', fontFamily: 'inherit', transition: 'all 0.18s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#6366f1'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af'; }}>
            <RotateCcw size={11} /> Clear
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', background: '#fff', border: '1px solid rgba(99,102,241,0.1)', borderTop: 'none', borderBottom: 'none', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 0 }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', gap: 10, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', animation: 'fadeUp 0.25s ease both' }}>
            <div style={{ width: 34, height: 34, borderRadius: 11, flexShrink: 0, background: msg.role === 'assistant' ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'linear-gradient(135deg,#374151,#4b5563)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: msg.role === 'assistant' ? '0 2px 8px rgba(99,102,241,0.3)' : '0 2px 8px rgba(0,0,0,0.15)', alignSelf: 'flex-start', marginTop: 2 }}>
              {msg.role === 'assistant' ? <Bot size={16} color="#fff" /> : <User size={16} color="#fff" />}
            </div>
            <div style={{ maxWidth: '80%', background: msg.role === 'assistant' ? '#f9fafb' : 'linear-gradient(135deg,#6366f1,#7c3aed)', color: msg.role === 'assistant' ? '#374151' : '#fff', borderRadius: msg.role === 'assistant' ? '4px 18px 18px 18px' : '18px 4px 18px 18px', padding: '12px 16px', border: msg.role === 'assistant' ? '1px solid rgba(99,102,241,0.08)' : 'none', boxShadow: msg.role === 'user' ? '0 4px 16px rgba(99,102,241,0.35)' : '0 2px 8px rgba(0,0,0,0.04)' }}>
              {msg.role === 'assistant' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>{renderContent(msg.content)}</div>
              ) : (
                <p style={{ fontSize: '0.875rem', margin: 0, lineHeight: 1.65 }}>{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 10, animation: 'fadeUp 0.25s ease both' }}>
            <div style={{ width: 34, height: 34, borderRadius: 11, flexShrink: 0, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(99,102,241,0.3)', alignSelf: 'flex-start', marginTop: 2 }}>
              <Bot size={16} color="#fff" />
            </div>
            <div style={{ background: '#f9fafb', borderRadius: '4px 18px 18px 18px', padding: '14px 18px', border: '1px solid rgba(99,102,241,0.07)', display: 'flex', alignItems: 'center', gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#a5b4fc', animation: 'pulse-dot 1.2s ease infinite', animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick chips */}
      <div style={{ background: '#fafbff', border: '1px solid rgba(99,102,241,0.1)', borderTop: '1px solid rgba(99,102,241,0.06)', borderBottom: 'none', padding: '0.625rem 1rem', flexShrink: 0, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {CHIPS.map(({ label, icon: Icon }) => (
          <button key={label} onClick={() => sendMessage(label)} disabled={loading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', padding: '5px 12px', background: '#fff', border: '1px solid rgba(99,102,241,0.15)', color: '#6b7280', borderRadius: 99, cursor: loading ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 500, transition: 'all 0.18s', opacity: loading ? 0.5 : 1 }}
            onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.color = '#6366f1'; e.currentTarget.style.background = 'rgba(99,102,241,0.04)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'; e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = ''; }}
          >
            <Icon size={11} /> {label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        style={{ background: '#fff', borderRadius: '0 0 20px 20px', border: '1px solid rgba(99,102,241,0.15)', borderTop: 'none', overflow: 'hidden', transition: 'border-color 0.2s, box-shadow 0.2s', flexShrink: 0, boxShadow: '0 4px 20px rgba(99,102,241,0.08)' }}
        onFocusCapture={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(99,102,241,0.16)'; }}
        onBlurCapture={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.08)'; }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, padding: '10px 12px' }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={`Ask anything about your ${career} journey — skills, projects, salary, interviews…`}
            rows={1}
            style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', color: '#374151', background: 'transparent', lineHeight: 1.55, padding: '4px 0', minHeight: 36, maxHeight: 120 }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: input.trim() && !loading ? 'linear-gradient(135deg,#6366f1,#7c3aed)' : 'rgba(99,102,241,0.1)', border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', boxShadow: input.trim() && !loading ? '0 4px 14px rgba(99,102,241,0.45)' : 'none' }}
            onMouseEnter={(e) => { if (input.trim() && !loading) e.currentTarget.style.transform = 'scale(1.07)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
          >
            <Send size={16} color={input.trim() && !loading ? '#fff' : '#9ca3af'} />
          </button>
        </div>
        <div style={{ padding: '0 14px 8px', fontSize: '0.7rem', color: '#c4b5fd', display: 'flex', alignItems: 'center', gap: 5 }}>
          <ChevronRight size={10} /> Enter to send &middot; Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
