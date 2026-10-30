import { LOG_ENTRIES } from '../content';

export default function ExperienceSection() {
  return (
    <section className="cli-section" id="experience" aria-labelledby="experience-title">
      <p className="cli-kicker">Experience</p>
      <h2 id="experience-title" className="cli-heading">
        Log
      </h2>
      <ul className="cli-log">
        {LOG_ENTRIES.map((entry) => (
          <li key={entry.hash} className="cli-log__entry">
            <p className="cli-log__head">
              <span className="cli-hash">{entry.hash}</span> {entry.role}
            </p>
            <p className="cli-log__detail">{entry.detail}</p>
            <p className="cli-log__date">{entry.date}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
