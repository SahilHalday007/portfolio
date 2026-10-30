import { useId } from 'react';
import type { ReactNode } from 'react';

interface PaneProps {
  title: string;
  variant?: 'square' | 'rounded' | 'double';
  actions?: ReactNode;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<NonNullable<PaneProps['variant']>, string> = {
  square: 'tui-pane--square',
  rounded: 'tui-pane--rounded',
  double: 'tui-pane--double',
};

export default function Pane({ title, variant = 'square', actions, children }: PaneProps) {
  const titleId = useId();

  return (
    <section className={`tui-pane ${VARIANT_CLASSES[variant]}`} aria-labelledby={titleId}>
      <header className="tui-pane__header">
        <h2 id={titleId} className="tui-pane__title">
          {title}
        </h2>
        {actions ? <div className="tui-pane__actions">{actions}</div> : null}
      </header>
      <div className="tui-pane__body">{children}</div>
    </section>
  );
}
