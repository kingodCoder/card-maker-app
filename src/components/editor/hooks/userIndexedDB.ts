
import { useState, useEffect } from 'react';
import { Settings } from '../../../models/EditorSettings';
import { getSettings, updateSettings } from './db'; // Assuming db.ts will handle IndexedDB operations

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await getSettings();
      if (savedSettings) {
        setSettings(savedSettings);
      } else {
        // Default settings
        const defaultSettings: Settings = {
          maxCards: 100,
          trashRetentionDays: 30,
          permanentDeleteDays: 90,
          autoCleanEnabled: true,
        };
        await updateSettings(defaultSettings);
        setSettings(defaultSettings);
      }
    };
    loadSettings();
  }, []);

  const saveSettings = async (newSettings: Settings) => {
    await updateSettings(newSettings);
    setSettings(newSettings);
  };

  return { settings, saveSettings };
};
