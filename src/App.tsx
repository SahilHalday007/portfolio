import TuiShell from './components/TuiShell';
import { useHashWindow } from './hooks/useHashWindow';

export default function App() {
  const { activeWindow, onWindowChange } = useHashWindow();

  return <TuiShell activeWindow={activeWindow} onWindowChange={onWindowChange} />;
}
