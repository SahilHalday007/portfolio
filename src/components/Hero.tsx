import { useEffect, useState } from 'react';
import { ABOUT_PARAGRAPHS, BANNER_WIDE, PROFILE_FACTS } from '../content';

const PROMPT_LINE = '$ whoami';

function useTypedLine(line: string): string {
  const [animate] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [text, setText] = useState(() => (animate ? '' : line));
  useEffect(() => {
    if (!animate) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setText(line.slice(0, index));
      if (index >= line.length) window.clearInterval(timer);
    }, 45);
    return () => window.clearInterval(timer);
  }, [animate, line]);
  return text;
}

export default function Hero() {
  const typed = useTypedLine(PROMPT_LINE);
  return (
    <section className="cli-hero" aria-labelledby="hero-title">
      <pre className="cli-art" aria-hidden="true">
        {BANNER_WIDE}
      </pre>
      <p className="cli-typed" aria-label="Terminal prompt: whoami">
        <span aria-hidden="true">{typed}</span>
        <span className="cli-cursor" aria-hidden="true" />
      </p>
      <h1 id="hero-title" className="cli-title">
        Welcome to Sahil&apos;s Developer Portfolio!
      </h1>
      <dl className="cli-rows">
        {PROFILE_FACTS.map((fact) => (
          <div key={fact.key} className="cli-rows__row">
            <dt>{fact.key}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <p className="cli-lede">{ABOUT_PARAGRAPHS[0]}</p>
      <div className="cli-actions">
        <a className="btn btn-primary" href="#projects">
          View projects
        </a>
        <a className="btn btn-ghost" href="#contact">
          Contact
        </a>
      </div>
    </section>
  );
}
