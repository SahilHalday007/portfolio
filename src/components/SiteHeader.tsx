const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function SiteHeader() {
  return (
    <header className="cli-header">
      <a className="cli-prompt" href="#top" aria-label="Back to top">
        <span aria-hidden="true">&gt;.&nbsp;</span>
        <span>sahil@portfolio:~$</span>
      </a>
      <nav className="cli-nav" aria-label="Primary">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="cli-available">
        <span className="cli-dot" aria-hidden="true" />
        Available
      </p>
    </header>
  );
}
