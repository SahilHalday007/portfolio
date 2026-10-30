import { EMAIL, GITHUB_URL } from '../content';
import Icon from './Icon';

export default function SiteFooter() {
  return (
    <footer className="cli-footer">
      <p className="cli-footer__copy">© Sahil Halday007 | 2026</p>
      <p className="cli-version">v1.0</p>
      <ul className="cli-footer__social" aria-label="Social links">
        <li>
          <a href={GITHUB_URL} aria-label="GitHub profile">
            GitHub
          </a>
        </li>
        <li>
          <a href={`mailto:${EMAIL}`} aria-label="Email Sahil">
            <Icon name="mail" />
          </a>
        </li>
      </ul>
    </footer>
  );
}
