import { BANNER_COMPACT, BANNER_WIDE } from '../content';

interface BannerProps {
  title: string;
  subtitle: string;
}

export default function Banner({ title, subtitle }: BannerProps) {
  return (
    <div className="tui-banner">
      <pre className="tui-banner__wide" aria-hidden="true">
        {BANNER_WIDE}
      </pre>
      <pre className="tui-banner__compact" aria-hidden="true">
        {BANNER_COMPACT}
      </pre>
      <h1 className="tui-banner__title">{title}</h1>
      <p className="tui-banner__subtitle">{subtitle}</p>
    </div>
  );
}
