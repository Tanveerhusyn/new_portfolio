import { allProjects } from 'contentlayer/generated'
import { Project } from '@/data/projects'
import { ProjectShowcase } from '@/components/molecules/project-showcase'

type SearchParamsProps = {
  searchParams: {
    tag: string
  }
}

export default function ProjectPage({ searchParams }: SearchParamsProps) {
  const { tag } = searchParams

  // Convert contentlayer projects to the Project type expected by ProjectCard
  const projects: Project[] = allProjects.map(project => ({
    title: project.title,
    slug: project.slug,
    summary: project.summary,
    image: project.image,
    tag: project.tag,
    body: {
      raw: project.body.raw,
      code: project.body.code
    }
  }))

  let filteredProjects = tag ? projects.filter(project => project.tag.includes(tag)) : projects

  return (
    <div className='min-h-screen h-full bg-gradient-to-b from-gray-900 to-gray-950 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col'>
        <ProjectShowcase projects={filteredProjects} selectedTag={tag} />
      </div>
    </div>
  )
}
