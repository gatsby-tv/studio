import { useState, useEffect, useMemo, DependencyList } from 'react';
import { useComponentDidMount, useRepaint } from '@gatsby-tv/utilities';

export function useFlicker<T>(state: T, deps: DependencyList): T {
  const initial = useMemo(() => state, []);
  const repaint = useRepaint();
  const mounted = useComponentDidMount();
  const [flick, setFlick] = useState(false);

  useEffect(() => setFlick(false), [flick]);
  useEffect(() => setFlick(Boolean(mounted.current)), deps);
  useEffect(repaint, deps);

  return flick ? initial : state;
}
