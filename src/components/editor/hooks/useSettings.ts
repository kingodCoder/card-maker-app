import {useState, useEffect} from 'react';
import type {Settings} from '../../models/Settings';

export function useEditorSettings() {
  const [settings, setSettings] = useState<Partial<Settings>>({});

  useEffect(() => {
    // load from IndexedDB in full implementation
  }, []);

  return {settings, setSettings};
}
