export interface Project {
  title: string
  slug: string
  summary: string
  image: string
  tag: string[]
  body?: {
    raw?: string
    code?: string
  }
}

export const projects: Project[] = [
  {
    title: 'Verdict AI',
    slug: 'verdict',
    summary:
      "Verdict.com is an AI-Enhanced Web Search Platform I developed, which revolutionizes the user experience with intuitive interfaces and advanced AI integration. Utilizing multiple search engines' APIs, the platform delivers enriched search capabilities. Along with the Developers Den team, I contributed as a Fullstack developer to successfully build this project.",
    image: '/projects/verdict-com.png',
    tag: ['React', 'Next', 'ExpressJS', 'MongoDB'],
    body: {
      raw: 'Explore Verdict.com, a cutting-edge search platform that incorporates AI to enhance search results, providing a more intuitive and efficient online search experience. Built using a full-stack approach with technologies like ReactJS and NodeJS. Check out the code at github.com/username/verdict-ai'
    }
  },
  {
    title: 'Resume Builder',
    slug: 'resume',
    summary:
      'A powerful resume builder application that helps users create professional resumes with ease. Features include customizable templates, real-time preview, and export options. Built with React and Firebase for authentication and storage.',
    image: '/projects/resume.png',
    tag: ['React', 'Firebase', 'CSS'],
    body: {
      raw: 'A powerful resume builder application that helps users create professional resumes with ease. Features include customizable templates, real-time preview, and export options. Built with React and Firebase for authentication and storage. Live demo at https://resume-builder.example.com'
    }
  },
  {
    title: 'Cornucopia',
    slug: 'cornucopia',
    summary:
      'Cornucopia is a recipe sharing platform that connects food enthusiasts. Users can discover, share, and save recipes, as well as follow their favorite chefs. The application includes features like ingredient search, dietary filters, and meal planning.',
    image: '/projects/cornucopia.png',
    tag: ['React', 'Node', 'MongoDB', 'Express'],
    body: {
      raw: 'Cornucopia is a recipe sharing platform that connects food enthusiasts. Users can discover, share, and save recipes, as well as follow their favorite chefs. The application includes features like ingredient search, dietary filters, and meal planning. Check out the code at github.com/username/cornucopia'
    }
  },
  {
    title: 'Erio',
    slug: 'erio',
    summary:
      'Erio is a minimalist task management application designed for productivity. It features a clean interface, drag-and-drop task organization, priority levels, and deadline reminders. Built with React and TypeScript for a robust user experience.',
    image: '/projects/erio.png',
    tag: ['React', 'TypeScript', 'CSS'],
    body: {
      raw: 'Erio is a minimalist task management application designed for productivity. It features a clean interface, drag-and-drop task organization, priority levels, and deadline reminders. Built with React and TypeScript for a robust user experience. Live demo at https://erio-tasks.example.com'
    }
  },
  {
    title: 'Will Always Love',
    slug: 'willalwayslove',
    summary:
      'Will Always Love is a digital memory journal that helps users preserve and share their most precious memories. The platform includes photo albums, journal entries, and timeline views. Built with Next.js and MongoDB for a seamless experience.',
    image: '/projects/willalwayslove.png',
    tag: ['Next', 'MongoDB', 'CSS'],
    body: {
      raw: 'Will Always Love is a digital memory journal that helps users preserve and share their most precious memories. The platform includes photo albums, journal entries, and timeline views. Built with Next.js and MongoDB for a seamless experience. Check out the code at github.com/username/will-always-love'
    }
  }
]
