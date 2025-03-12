import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, FadeInStagger } from '@/components/atoms/fade-in'
import { GridPattern } from '@/components/atoms/grid-pattern'
import { User, Briefcase, Code, GraduationCap, Award, Globe, Heart, Mail, Github, Linkedin, MapPin, Phone, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Me | Tanveer Hussain',
  description:
    "I'm Tanveer Hussain, a dedicated Software Engineer based in Islamabad, Pakistan. Specializing in both front and backend technologies, I bring a blend of programming expertise and an eye for design to develop high-quality software solutions."
}

export default function AboutPage() {
  // Personal Information
  const personalInfo = {
    name: 'Tanveer Hussain',
    location: 'Islamabad, Pakistan',
    contact: '+923085135289',
    email: 'tanveerhussain465@gmail.com',
    github: 'github.com/tanveerhusyn',
    linkedin: 'linkedin.com/in/tanveerhusyn',
    portfolio: 'portfolio-tanveer.netlify.app',
    summary: `Passionate and detail-oriented Software Engineer with expertise in full-stack development.
      Committed to creating efficient, scalable, and user-friendly applications.
      Constantly learning and adapting to new technologies and methodologies.`,
    hobbies: ['Coding', 'Exploring New Technologies', 'Contributing to Exciting Projects'],
    interests: ['Open Source Contribution', 'AI and Machine Learning', 'Web Development', 'Mobile App Development', 'Reading Tech Blogs', 'Problem Solving'],
    languages: [
      { name: 'English', proficiency: 'Professional' },
      { name: 'Urdu', proficiency: 'Native' }
    ]
  }

  // Education
  const education = [
    {
      degree: 'Bachelors in Software Engineering',
      institution: 'COMSATS University Islamabad',
      location: 'Islamabad, PK',
      period: 'Sep. 2019 – June 2023'
    },
    {
      degree: 'Intermediate-ICS',
      institution: 'Punjab Group of Colleges',
      location: 'Rawalpindi, PK',
      period: 'Aug. 2016 – May 2018'
    }
  ]

  // Skills
  const skills = {
    languages: ['JavaScript', 'TypeScript', 'Java', 'Python', 'C/C++'],
    frontend: ['ReactJS', 'NextJS', 'HTML', 'CSS', 'TailwindCSS', 'MUI', 'Bootstrap'],
    backend: ['NodeJS', 'ExpressJS', 'MongoDB', 'REST API', 'Azure', 'AWS'],
    tools: ['Git', 'Docker', 'Jenkins', 'Jira', 'Figma'],
    softSkills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Time Management']
  }

  // Work Experience
  const experience = [
    {
      role: 'Associate Software Engineer',
      company: 'Developers Den LLC',
      period: 'Aug 2023 – Present',
      responsibilities: [
        'Developed and maintained web applications with a focus on robust functionality and user-friendly interfaces.',
        'Integrated advanced encryption techniques to ensure data security and user privacy.',
        'Collaborated in a team to design and deploy scalable software solutions.',
        'Implemented CI/CD pipelines to streamline development workflows.',
        'Conducted code reviews and mentored junior developers.'
      ]
    },
    {
      role: 'MERN Stack Developer',
      company: 'Freelance (Upwork)',
      period: 'Feb 2021 – Present',
      responsibilities: [
        'Developed web applications using a range of technologies and frameworks.',
        'Worked closely with clients to understand requirements and deliver tailored solutions.',
        'Utilized web design skills to enhance user experience and accessibility.',
        'Managed multiple projects simultaneously while meeting deadlines.',
        'Maintained long-term client relationships through quality work and communication.'
      ]
    }
  ]

  // Certifications
  const certifications = [
    {
      name: 'Building Generative AI-Powered Applications with Python',
      issuer: 'IBM',
      date: 'Aug 2024',
      credentialId: 'XURDSSCFV3AZ',
      skills: ['Flask', 'LangChain', '+3 skills'],
      link: '#'
    },
    {
      name: 'The Full Stack',
      issuer: 'Meta',
      date: 'May 2024',
      credentialId: 'BCRNUFAPVUYC',
      link: '#'
    }
  ]

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-950'>
      <GridPattern
        className='absolute inset-x-0 -top-14 -z-10 h-full w-full dark:fill-gray-800/10 fill-gray-800/5 dark:stroke-gray-600/10 stroke-gray-600/5 [mask-image:linear-gradient(to_bottom_left,white_30%,transparent_50%)]'
        yOffset={-96}
        interactive
      />

      {/* Hero Section */}
      <section className='pt-16 pb-12 px-4 md:px-8 max-w-6xl mx-auto'>
        <FadeIn>
          <div className='flex flex-col md:flex-row items-center md:items-start gap-8 bg-gray-900/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700/30 shadow-lg'>
            <div className='w-40 h-40 md:w-48 md:h-48 relative overflow-hidden rounded-full border-4 border-blue-500/30 shadow-lg'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse'></div>
              {/* Replace with your actual profile image */}
              <div className='absolute inset-0 flex items-center justify-center text-5xl font-bold text-blue-400'>TH</div>
            </div>

            <div className='flex-1 text-center md:text-left'>
              <h1 className='text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>{personalInfo.name}</h1>

              <div className='flex flex-wrap justify-center md:justify-start gap-3 mb-4'>
                <div className='flex items-center gap-1 text-gray-300'>
                  <MapPin className='w-4 h-4 text-blue-400' />
                  <span>{personalInfo.location}</span>
                </div>
                <div className='flex items-center gap-1 text-gray-300'>
                  <Phone className='w-4 h-4 text-blue-400' />
                  <span>{personalInfo.contact}</span>
                </div>
                <div className='flex items-center gap-1 text-gray-300'>
                  <Mail className='w-4 h-4 text-blue-400' />
                  <span>{personalInfo.email}</span>
                </div>
              </div>

              <div className='flex flex-wrap justify-center md:justify-start gap-4 mb-6'>
                <Link
                  href={`https://${personalInfo.github}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors'
                >
                  <Github className='w-4 h-4 text-blue-400' />
                  <span>GitHub</span>
                </Link>
                <Link
                  href={`https://${personalInfo.linkedin}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors'
                >
                  <Linkedin className='w-4 h-4 text-blue-400' />
                  <span>LinkedIn</span>
                </Link>
                <Link
                  href={`https://${personalInfo.portfolio}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors'
                >
                  <ExternalLink className='w-4 h-4 text-blue-400' />
                  <span>Portfolio</span>
                </Link>
              </div>

              <p className='text-gray-300 leading-relaxed'>{personalInfo.summary}</p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Skills Section */}
      <section className='py-12 px-4 md:px-8 max-w-6xl mx-auto'>
        <FadeIn>
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-4'>
              <Code className='w-6 h-6 text-blue-400' />
              <h2 className='text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>Technical Skills</h2>
            </div>
            <div className='h-0.5 w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <FadeInStagger className='grid grid-cols-1 gap-6' faster>
              <FadeIn>
                <div className='bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30 shadow-lg h-full'>
                  <h3 className='text-xl font-semibold mb-4 text-blue-400'>Languages</h3>
                  <div className='flex flex-wrap gap-2'>
                    {skills.languages.map((skill, index) => (
                      <span key={index} className='px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm'>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn>
                <div className='bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30 shadow-lg h-full'>
                  <h3 className='text-xl font-semibold mb-4 text-purple-400'>Frontend</h3>
                  <div className='flex flex-wrap gap-2'>
                    {skills.frontend.map((skill, index) => (
                      <span key={index} className='px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm'>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </FadeInStagger>

            <FadeInStagger className='grid grid-cols-1 gap-6' faster>
              <FadeIn>
                <div className='bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30 shadow-lg h-full'>
                  <h3 className='text-xl font-semibold mb-4 text-green-400'>Backend</h3>
                  <div className='flex flex-wrap gap-2'>
                    {skills.backend.map((skill, index) => (
                      <span key={index} className='px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-sm'>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn>
                <div className='bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30 shadow-lg h-full'>
                  <h3 className='text-xl font-semibold mb-4 text-yellow-400'>Tools</h3>
                  <div className='flex flex-wrap gap-2'>
                    {skills.tools.map((skill, index) => (
                      <span key={index} className='px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 text-sm'>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </FadeInStagger>

            <FadeIn>
              <div className='bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30 shadow-lg h-full md:col-span-2 lg:col-span-1'>
                <h3 className='text-xl font-semibold mb-4 text-pink-400'>Soft Skills</h3>
                <div className='flex flex-wrap gap-2'>
                  {skills.softSkills.map((skill, index) => (
                    <span key={index} className='px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-sm'>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </section>

      {/* Experience Section */}
      <section className='py-12 px-4 md:px-8 max-w-6xl mx-auto'>
        <FadeIn>
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-4'>
              <Briefcase className='w-6 h-6 text-purple-400' />
              <h2 className='text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>Work Experience</h2>
            </div>
            <div className='h-0.5 w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full'></div>
          </div>

          <div className='space-y-8'>
            <FadeInStagger faster>
              {experience.map((job, index) => (
                <FadeIn key={index}>
                  <div className='bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30 shadow-lg relative overflow-hidden'>
                    <div className='absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500'></div>
                    <div className='ml-2'>
                      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                        <div>
                          <h3 className='text-xl font-bold text-blue-400'>{job.role}</h3>
                          <p className='text-lg text-gray-300'>{job.company}</p>
                        </div>
                        <span className='mt-2 md:mt-0 px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm inline-block'>{job.period}</span>
                      </div>
                      <ul className='space-y-2 text-gray-300'>
                        {job.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className='flex items-start gap-2'>
                            <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0'></span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </FadeInStagger>
          </div>
        </FadeIn>
      </section>

      {/* Education Section */}
      <section className='py-12 px-4 md:px-8 max-w-6xl mx-auto'>
        <FadeIn>
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-4'>
              <GraduationCap className='w-6 h-6 text-green-400' />
              <h2 className='text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>Education</h2>
            </div>
            <div className='h-0.5 w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full'></div>
          </div>

          <div className='space-y-8'>
            <FadeInStagger faster>
              {education.map((edu, index) => (
                <FadeIn key={index}>
                  <div className='bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30 shadow-lg relative overflow-hidden'>
                    <div className='absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500'></div>
                    <div className='ml-2'>
                      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                        <div>
                          <h3 className='text-xl font-bold text-green-400'>{edu.degree}</h3>
                          <p className='text-lg text-gray-300'>{edu.institution}</p>
                          <p className='text-gray-400'>{edu.location}</p>
                        </div>
                        <span className='mt-2 md:mt-0 px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm inline-block'>{edu.period}</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </FadeInStagger>
          </div>
        </FadeIn>
      </section>

      {/* Certifications & Languages Section */}
      <section className='py-12 px-4 md:px-8 max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <FadeIn>
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <Award className='w-6 h-6 text-pink-400' />
                <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>Certifications</h2>
              </div>
              <div className='h-0.5 w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6'></div>

              <div className='bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30 shadow-lg'>
                <FadeInStagger faster>
                  {certifications.map((cert, index) => (
                    <FadeIn key={index}>
                      <div className='mb-6 last:mb-0 p-4 bg-gray-800/30 rounded-lg'>
                        <div className='flex justify-between items-start mb-1'>
                          <h3 className='text-lg font-semibold text-pink-400'>{cert.name}</h3>
                          <span className='text-sm text-gray-400'>{cert.date}</span>
                        </div>
                        <div className='flex items-center gap-2 mb-2'>
                          <span className='text-gray-300'>{cert.issuer}</span>
                          {cert.issuer === 'IBM' && (
                            <div className='text-blue-400 text-xs'>
                              <span className='inline-block w-10 h-4'>IBM</span>
                            </div>
                          )}
                          {cert.issuer === 'Meta' && (
                            <div className='text-blue-400 text-xs'>
                              <span className='inline-block w-10 h-4'>Meta</span>
                            </div>
                          )}
                        </div>
                        {cert.credentialId && <p className='text-sm text-gray-400 mb-2'>Credential ID: {cert.credentialId}</p>}
                        {cert.skills && (
                          <div className='flex flex-wrap gap-2 mb-2'>
                            {cert.skills.map((skill, idx) => (
                              <span key={idx} className='px-2 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs'>
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                        <Link
                          href={cert.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm'
                        >
                          <ExternalLink className='w-3 h-3' />
                          <span>View Certificate</span>
                        </Link>
                      </div>
                    </FadeIn>
                  ))}
                </FadeInStagger>
              </div>
            </div>
          </FadeIn>

          <div className='grid grid-cols-1 gap-8'>
            <FadeIn>
              <div>
                <div className='flex items-center gap-3 mb-4'>
                  <Globe className='w-6 h-6 text-blue-400' />
                  <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>Languages</h2>
                </div>
                <div className='h-0.5 w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6'></div>

                <div className='bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30 shadow-lg'>
                  <div className='grid grid-cols-2 gap-4'>
                    {personalInfo.languages.map((lang, index) => (
                      <div key={index} className='flex flex-col items-center p-4 rounded-lg bg-gray-800/50'>
                        <span className='text-lg font-semibold text-blue-400 mb-1'>{lang.name}</span>
                        <span className='text-sm text-gray-300'>{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div>
                <div className='flex items-center gap-3 mb-4'>
                  <Heart className='w-6 h-6 text-red-400' />
                  <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>Interests</h2>
                </div>
                <div className='h-0.5 w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6'></div>

                <div className='bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30 shadow-lg'>
                  <div className='flex flex-wrap gap-2'>
                    {personalInfo.interests.map((interest, index) => (
                      <span key={index} className='px-3 py-1.5 rounded-full bg-red-500/10 text-red-300 text-sm'>
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
