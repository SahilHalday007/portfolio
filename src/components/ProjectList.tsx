import { PROJECTS } from '../content';

const TAG_TONES: Record<string, string> = {
  grid: 'tag-green',
  chip: 'tag-cyan',
  chart: 'tag-blue',
  site: 'tag-purple',
  inventory: 'tag-yellow',
  vision: 'tag-red',
  portal: 'tag-cyan',
};

export default function ProjectList() {
  return (
    <section className="cli-section" id="projects" aria-labelledby="projects-title">
      <p className="cli-kicker">Projects</p>
      <h2 id="projects-title" className="cli-heading">
        Selected work
      </h2>
      <ul className="cli-grid">
        {PROJECTS.map((project) => (
          <li key={project.id} className="cli-card">
            <ul className="cli-tags" aria-label={`${project.name} categories`}>
              <li className={TAG_TONES[project.visual] ?? 'tag-green'}>{project.category}</li>
              <li className="tag-dim">{project.file}</li>
            </ul>
            <h3 className="cli-card__title">{project.name}</h3>
            <p className="cli-card__excerpt">{project.problem}</p>
            <ul className="cli-tags" aria-label={`${project.name} stack`}>
              {project.stack.map((item) => (
                <li key={item} className="tag-dim">
                  {item}
                </li>
              ))}
            </ul>
            <div className="cli-card__links">
              {project.links.map((link) => (
                <a key={link.url} className="cli-link" href={link.url}>
                  {link.label}
                </a>
              ))}
              {project.linkTodos?.map((todo) => (
                <span key={todo} className="cli-todo">
                  {todo}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
