export interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: 'hackathon' | 'competition' | 'internship' | 'job' | 'scholarship' | 'course';
  type: 'online' | 'offline' | 'hybrid';
  company: string;
  companyLogo?: string;
  location?: string;
  startDate: string;
  endDate: string;
  prize?: string;
  registrationDeadline: string;
  imageUrl: string;
  participants?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  skills?: string[];
  link?: string;
  isFeatured?: boolean;
  postedBy?: string;
  postedDate: string;
  eligibility?: string;
  certificateProvided?: boolean;
}

export const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Web Development Hackathon 2026',
    description: 'Build innovative web applications and compete for prizes. This 24-hour hackathon welcomes developers of all levels to showcase their skills and create something amazing.',
    category: 'hackathon',
    type: 'online',
    company: 'TechCorp',
    location: 'Virtual',
    startDate: '2026-03-15',
    endDate: '2026-03-16',
    registrationDeadline: '2026-03-10',
    prize: '₹2,00,000',
    imageUrl: 'https://picsum.photos/500/300?random=1',
    participants: 1250,
    difficulty: 'intermediate',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    isFeatured: true,
    postedBy: 'TechCorp',
    postedDate: '2026-02-01',
    eligibility: 'Open to all, Age 18+',
    certificateProvided: true,
  },
  {
    id: '2',
    title: 'AI & Machine Learning Challenge',
    description: 'Compete in solving real-world AI problems. This challenge focuses on machine learning model development and deployment.',
    category: 'competition',
    type: 'online',
    company: 'DataMinds',
    location: 'Virtual',
    startDate: '2026-03-20',
    endDate: '2026-04-20',
    registrationDeadline: '2026-03-18',
    prize: '₹5,00,000',
    imageUrl: 'https://picsum.photos/500/300?random=2',
    participants: 450,
    difficulty: 'advanced',
    skills: ['Python', 'TensorFlow', 'scikit-learn', 'Data Analysis'],
    isFeatured: true,
    postedBy: 'DataMinds',
    postedDate: '2026-02-05',
    eligibility: 'Students and professionals',
    certificateProvided: true,
  },
  {
    id: '3',
    title: 'Summer Internship - Software Development',
    description: 'Join our team for a 3-month summer internship program. Work on real projects with experienced mentors and grow your skills.',
    category: 'internship',
    type: 'hybrid',
    company: 'InnovateTech',
    location: 'Bangalore',
    startDate: '2026-05-01',
    endDate: '2026-07-31',
    registrationDeadline: '2026-03-31',
    imageUrl: 'https://picsum.photos/500/300?random=3',
    participants: 320,
    difficulty: 'intermediate',
    skills: ['Java', 'Spring Boot', 'SQL', 'REST APIs'],
    postedBy: 'InnovateTech',
    postedDate: '2026-02-10',
    eligibility: 'Engineering students, Year 2-4',
    certificateProvided: true,
  },
  {
    id: '4',
    title: 'UI/UX Design Competition',
    description: 'Design innovative user interfaces for a fictional e-commerce platform. Showcase your creativity and design thinking.',
    category: 'competition',
    type: 'online',
    company: 'Design Hub',
    location: 'Virtual',
    startDate: '2026-03-25',
    endDate: '2026-04-25',
    registrationDeadline: '2026-03-22',
    prize: '₹1,50,000',
    imageUrl: 'https://picsum.photos/500/300?random=4',
    participants: 180,
    difficulty: 'beginner',
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
    isFeatured: false,
    postedBy: 'Design Hub',
    postedDate: '2026-02-08',
    eligibility: 'Students and designers',
    certificateProvided: true,
  },
  {
    id: '5',
    title: 'Junior Software Engineer (Full-Time)',
    description: 'We are hiring talented junior software engineers to join our growing team. Competitive salary and great benefits.',
    category: 'job',
    type: 'hybrid',
    company: 'CloudXYZ',
    location: 'Hyderabad',
    startDate: '2026-04-01',
    endDate: '2026-12-31',
    registrationDeadline: '2026-04-30',
    imageUrl: 'https://picsum.photos/500/300?random=5',
    participants: 890,
    difficulty: 'intermediate',
    skills: ['Python', 'JavaScript', 'AWS', 'Docker'],
    postedBy: 'CloudXYZ',
    postedDate: '2026-02-12',
    eligibility: '0-2 years experience',
    certificateProvided: false,
  },
  {
    id: '6',
    title: 'Mobile App Development Bootcamp',
    description: 'Learn mobile app development from industry experts. 6-week intensive bootcamp covering iOS and Android.',
    category: 'course',
    type: 'hybrid',
    company: 'CodeAcademy',
    location: 'Mumbai',
    startDate: '2026-04-15',
    endDate: '2026-05-31',
    registrationDeadline: '2026-04-01',
    prize: 'Certification',
    imageUrl: 'https://picsum.photos/500/300?random=6',
    participants: 75,
    difficulty: 'intermediate',
    skills: ['Swift', 'Kotlin', 'React Native', 'Firebase'],
    postedBy: 'CodeAcademy',
    postedDate: '2026-02-06',
    eligibility: 'Basic programming knowledge required',
    certificateProvided: true,
  },
];

export const categories = [
  { id: 'all', label: 'All Opportunities' },
  { id: 'hackathon', label: 'Hackathons' },
  { id: 'competition', label: 'Competitions' },
  { id: 'internship', label: 'Internships' },
  { id: 'job', label: 'Jobs' },
  { id: 'scholarship', label: 'Scholarships' },
  { id: 'course', label: 'Courses' },
];

export const types = [
  { id: 'all', label: 'All Types' },
  { id: 'online', label: 'Online' },
  { id: 'offline', label: 'Offline' },
  { id: 'hybrid', label: 'Hybrid' },
];
