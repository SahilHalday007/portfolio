import { useState } from 'react';
import TuiShell from './components/TuiShell';
import type { WindowId } from './types';

export default function App() {
  const [activeWindow, setActiveWindow] = useState<WindowId>('whoami');

  return <TuiShell activeWindow={activeWindow} onWindowChange={setActiveWindow} />;
}
