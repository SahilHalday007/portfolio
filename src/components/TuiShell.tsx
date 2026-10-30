import {
  ABOUT_PARAGRAPHS,
  CV_TODO,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_TODO,
  LOG_ENTRIES,
  PRINCIPLES,
  PROFILE_FACTS,
  PROJECTS,
  STACK_GROUPS,
} from '../content';
import type { WindowId } from '../types';
import Banner from './Banner';
import CommandLine from './CommandLine';
import Icon, { type IconName } from './Icon';
import Pane from './Pane';
import StatusLine from './StatusLine';
import TabBar from './TabBar';

const STACK_ICONS: Record<string, IconName> = {
  react: 'layers',
  server: 'chip',
  database: 'grid',
  cloud: 'site',
  spark: 'chart',
  chip: 'chip',
};

interface ShellProps {
  activeWindow: WindowId;
  onWindowChange: (window: WindowId) => void;
}

function ProfilePane() {
  return (
    <Pane title="neofetch" variant="rounded">
      <dl className="tui-facts">
        {PROFILE_FACTS.map((fact) => (
          <div key={fact.key} className="tui-facts__row">
            <dt>{fact.key}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Pane>
  );
}

function HomePanes({ onWindowChange }: { onWindowChange: (window: WindowId) => void }) {
  return (
    <div className="tui-home">
      <Pane title="whoami" variant="double">
        <Banner
          title="Sahil Halday007"
          subtitle="Software and AI/ML engineer building accessible learning and real-world interaction."
        />
        <p>Current focus: SensePlay accessible educational games.</p>
        <div className="tui-actions">
          <button type="button" className="tui-button" onClick={() => onWindowChange('projects')}>
            open projects
          </button>
          <button type="button" className="tui-button" onClick={() => onWindowChange('contact')}>
            open contact
          </button>
        </div>
      </Pane>
      <ProfilePane />
    </div>
  );
}

function AboutPane() {
  return (
    <Pane title="about" variant="rounded">
      {ABOUT_PARAGRAPHS.map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}
      <h3>principles</h3>
      <ul>
        {PRINCIPLES.map((principle) => (
          <li key={principle.slice(0, 24)}>{principle}</li>
        ))}
      </ul>
    </Pane>
  );
}

function ProjectsPane() {
  return (
    <Pane title="projects" variant="rounded">
      <ul className="tui-cards">
        {PROJECTS.map((project) => (
          <li key={project.id} className="tui-card">
            <h3>
              <Icon name={project.visual} /> {project.name} <span className="tui-muted">{project.file}</span>
            </h3>
            <p className="tui-muted">{project.category}</p>
            <p>
              <strong>problem:</strong> {project.problem}
            </p>
            <p>
              <strong>role:</strong> {project.role}
            </p>
            <ul className="tui-tags" aria-label={`${project.name} stack`}>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight.slice(0, 24)}>{highlight}</li>
              ))}
            </ul>
            {project.links.length > 0 ? (
              <ul className="tui-links">
                {project.links.map((link) => (
                  <li key={link.url}>
                    <a className="tui-link" href={link.url}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {project.linkTodos?.map((todo) => (
              <p key={todo} className="tui-muted">
                {todo}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </Pane>
  );
}

function StackPane() {
  return (
    <Pane title="stack" variant="rounded">
      <ul className="tui-cards">
        {STACK_GROUPS.map((group) => (
          <li key={group.title} className="tui-card">
            <h3>
              <Icon name={STACK_ICONS[group.icon] ?? 'layers'} /> {group.title}
            </h3>
            <ul className="tui-tags" aria-label={`${group.title} technologies`}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Pane>
  );
}

function LogPane() {
  return (
    <Pane title="log" variant="rounded">
      <ul className="tui-log">
        {LOG_ENTRIES.map((entry) => (
          <li key={entry.hash}>
            <p>
              <span className="tui-accent">{entry.hash}</span> {entry.role}
            </p>
            <p>{entry.detail}</p>
            <p className="tui-muted">{entry.date}</p>
          </li>
        ))}
      </ul>
    </Pane>
  );
}

function ContactPane() {
  return (
    <Pane title="contact" variant="rounded">
      <p>Verified contact routes:</p>
      <ul className="tui-links">
        <li>
          <a className="tui-link" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </li>
        <li>
          <a className="tui-link" href={GITHUB_URL}>
            github.com/SahilHalday007
          </a>
        </li>
      </ul>
      <p className="tui-muted">{LINKEDIN_TODO}</p>
      <p className="tui-muted">{CV_TODO}</p>
    </Pane>
  );
}

export default function TuiShell({ activeWindow, onWindowChange }: ShellProps) {
  return (
    <div className="tui-shell">
      <header className="tui-shell__top">
        <p className="tui-breadcrumb" aria-label="Current location">
          ~/sahil/portfolio/<strong>{activeWindow}</strong>
        </p>
        <TabBar activeWindow={activeWindow} onSelect={onWindowChange} label="Window tabs" />
      </header>
      <main id="workspace" className="tui-shell__main" tabIndex={-1}>
        {activeWindow === 'whoami' ? <HomePanes onWindowChange={onWindowChange} /> : null}
        {activeWindow === 'about' ? <AboutPane /> : null}
        {activeWindow === 'projects' ? <ProjectsPane /> : null}
        {activeWindow === 'stack' ? <StackPane /> : null}
        {activeWindow === 'log' ? <LogPane /> : null}
        {activeWindow === 'contact' ? <ContactPane /> : null}
      </main>
      <StatusLine activeWindow={activeWindow} />
      <CommandLine onNavigate={onWindowChange} />
    </div>
  );
}
