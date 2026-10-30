import { CV_TODO, EMAIL, GITHUB_URL, LINKEDIN_TODO } from '../content';

export default function ContactSection() {
  return (
    <section className="cli-section" id="contact" aria-labelledby="contact-title">
      <p className="cli-kicker">Contact</p>
      <h2 id="contact-title" className="cli-heading">
        Say hello
      </h2>
      <p className="cli-prose">
        Open to collaboration on accessible edtech, AI systems, and hardware-connected experiences.
      </p>
      <div className="cli-actions">
        <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <a className="btn btn-ghost" href={GITHUB_URL}>
          GitHub
        </a>
      </div>
      <p className="cli-todo">{LINKEDIN_TODO}</p>
      <p className="cli-todo">{CV_TODO}</p>
    </section>
  );
}
