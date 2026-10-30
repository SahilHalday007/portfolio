import { ABOUT_PARAGRAPHS, PRINCIPLES, STACK_GROUPS } from '../content';

export default function AboutSection() {
  return (
    <section className="cli-section" id="about" aria-labelledby="about-title">
      <p className="cli-kicker">About</p>
      <h2 id="about-title" className="cli-heading">
        Software and AI systems for accessible learning
      </h2>
      {ABOUT_PARAGRAPHS.slice(1).map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="cli-prose">
          {paragraph}
        </p>
      ))}
      <h3 className="cli-subheading">Principles</h3>
      <ul className="cli-list">
        {PRINCIPLES.map((principle) => (
          <li key={principle.slice(0, 24)}>{principle}</li>
        ))}
      </ul>
      <h3 className="cli-subheading">Stack</h3>
      <ul className="cli-stack">
        {STACK_GROUPS.map((group) => (
          <li key={group.title} className="cli-stack__group">
            <h4 className="cli-stack__title">{group.title}</h4>
            <ul className="cli-tags" aria-label={`${group.title} technologies`}>
              {group.items.map((item) => (
                <li key={item} className="tag-dim">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
