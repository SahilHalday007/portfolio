import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import { THEMES, isThemeId } from '../themes/palettes';
import { WINDOW_IDS } from '../content';
import { useTheme } from '../hooks/useTheme';
import type { ThemeId, WindowId } from '../types';

interface CommandLineProps {
  onNavigate: (window: WindowId) => void;
}

const HELP_LINES = [
  'help                  list these commands',
  'whoami                go to the home window',
  'ls                    list available windows',
  'cd <section>          open whoami, about, projects, stack, log, or contact',
  'projects              open the project explorer',
  'stack                 show the technology manifest',
  'log                   show the experience log',
  'contact               show verified contact options',
  'theme <name>          set one of seven terminal themes',
  'clear                 clear command output',
  'exit                  return home',
];

const QUICK_COMMANDS = ['help', 'whoami', 'projects', 'stack', 'log', 'contact', 'clear'];

function isWindowId(value: string): value is WindowId {
  return (WINDOW_IDS as readonly string[]).includes(value);
}

export default function CommandLine({ onNavigate }: CommandLineProps) {
  const inputId = useId();
  const outputId = useId();
  const { setTheme } = useTheme();
  const [value, setValue] = useState('');
  const [lines, setLines] = useState<string[]>(["Type 'help' to list commands. Tabs also work."]);

  const runCommand = (rawInput: string) => {
    const input = rawInput.trim();
    if (input === '') {
      return;
    }
    const [verb = '', argument = ''] = input.split(/\s+/);
    const echoed = [`$ ${input}`];
    let next: string[] = echoed;

    if (verb === 'help') {
      next = [...echoed, ...HELP_LINES];
    } else if (verb === 'whoami' || verb === 'exit') {
      onNavigate('whoami');
      next = [...echoed, 'opened whoami'];
    } else if (verb === 'ls') {
      next = [...echoed, WINDOW_IDS.join('  ')];
    } else if (verb === 'cd') {
      if (isWindowId(argument)) {
        onNavigate(argument);
        next = [...echoed, `opened ${argument}`];
      } else if (argument === '') {
        next = [...echoed, 'usage: cd <whoami|about|projects|stack|log|contact>'];
      } else {
        next = [...echoed, `unknown window: ${argument}. Try 'ls'.`];
      }
    } else if (verb === 'projects' || verb === 'stack' || verb === 'log' || verb === 'contact') {
      onNavigate(verb);
      next = [...echoed, `opened ${verb}`];
    } else if (verb === 'theme') {
      if (argument === '') {
        next = [...echoed, Object.keys(THEMES).filter(isThemeId).join('  ')];
      } else if (isThemeId(argument)) {
        setTheme(argument as ThemeId);
        next = [...echoed, `theme set to ${argument}`];
      } else {
        next = [...echoed, `unknown theme: ${argument}. Type 'theme' to list names.`];
      }
    } else if (verb === 'clear') {
      setLines([]);
      setValue('');
      return;
    } else {
      next = [...echoed, `command not found: ${verb}. Try 'help'.`];
    }

    setLines((previous) => [...previous, ...next]);
    setValue('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(value);
  };

  return (
    <section className="tui-command" aria-label="Command line">
      <div className="tui-command__chips" aria-label="Quick commands">
        {QUICK_COMMANDS.map((command) => (
          <button key={command} type="button" className="tui-chip" onClick={() => runCommand(command)}>
            {command}
          </button>
        ))}
      </div>
      <div id={outputId} className="tui-command__output" role="log" aria-live="polite" aria-label="Command output">
        {lines.map((line, index) => (
          <p key={`${index}-${line}`}>{line === '' ? ' ' : line}</p>
        ))}
      </div>
      <form className="tui-command__form" onSubmit={onSubmit}>
        <label htmlFor={inputId} className="tui-command__prompt">
          sahil@tui:~$
        </label>
        <input
          id={inputId}
          className="tui-command__input"
          name="command"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
    </section>
  );
}
