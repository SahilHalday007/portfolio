import { LOG_ENTRIES, PROJECTS, STACK_GROUPS } from '../content';

const TAG_TONES: Record<string, string> = {
  grid: 'tag-green',
  chip: 'tag-cyan',
  chart: 'tag-blue',
  site: 'tag-purple',
  inventory: 'tag-yellow',
  vision: 'tag-red',
  portal: 'tag-cyan',
};

export default function FeaturedProject() {
  const featured = PROJECTS.find((project) => project.id === 'fablab') ?? PROJECTS[0];
  if (!featured) return null;
  const stats = [
    { value: String(PROJECTS.length), label: 'Project stories' },
    { value: String(STACK_GROUPS.length), label: 'Stack groups' },
    { value: String(LOG_ENTRIES.length), label: 'Log entries' },
  ];
  return (
    <section className="cli-section" aria-labelledby="featured-title">
      <p className="cli-kicker">Featured Project</p>
      <article className="cli-featured">
        <h2 id="featured-title" className="cli-featured__title">
          {featured.name}
        </h2>
        <ul className="cli-tags" aria-label={`${featured.name} categories`}>
          <li className={TAG_TONES[featured.visual] ?? 'tag-green'}>{featured.category}</li>
          <li className="tag-dim">{featured.file}</li>
        </ul>
        <p>{featured.problem}</p>
        <p>
          <strong>My role:</strong> {featured.role}
        </p>
        <ul className="cli-tags" aria-label={`${featured.name} stack`}>
          {featured.stack.map((item) => (
            <li key={item} className="tag-dim">
              {item}
            </li>
          ))}
        </ul>
        <div className="cli-actions">
          {featured.links.map((link) => (
            <a key={link.url} className="btn btn-primary" href={link.url}>
              {link.label}
            </a>
          ))}
          <a className="btn btn-ghost" href="#projects">
            All projects
          </a>
        </div>
        <dl className="cli-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="cli-stat">
              <dt className="cli-stat__num">{stat.value}</dt>
              <dd className="cli-stat__label">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </article>
    </section>
  );
}
