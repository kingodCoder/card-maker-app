// src/components/editor/hooks/db.ts
import { openDB, IDBPDatabase } from "idb";
import { Card, Template, Settings } from "../../../models/" // Adjust path as necessary

const DB_NAME = "card_editor_db_v2"; // Increment version for schema changes
const STORE_TEMPLATES = "templates";
const STORE_CARDS = "cards";
const STORE_SETTINGS = "settings";
const STORE_TRASH = "trash";

interface DBSchema {
  [STORE_TEMPLATES]: { key: string; value: Template };
  [STORE_CARDS]: { key: string; value: Card };
  [STORE_TRASH]: { key: string; value: Card | Template };
  [STORE_SETTINGS]: { key: string; value: Settings }; // Only one settings object with key 'app_settings'
}

let dbInstance: IDBPDatabase<DBSchema> | null = null;

export async function getDb(): Promise<IDBPDatabase<DBSchema>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<DBSchema>(DB_NAME, 2, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (oldVersion < 1) {
        // Initial setup for version 1
        db.createObjectStore(STORE_TEMPLATES, { keyPath: "id" });
        db.createObjectStore(STORE_CARDS, { keyPath: "id" });
        db.createObjectStore(STORE_TRASH, { keyPath: "id" });
        db.createObjectStore(STORE_SETTINGS, { keyPath: "id" }); // Changed keyPath to 'id' for a single settings object
      }
      if (oldVersion < 2) {
        // Migrations for version 2, if any specific changes needed from v1
        // Example: ensuring settings store has 'id' as keyPath and a default entry
        const settingsStore = transaction.objectStore(STORE_SETTINGS);
        // If you had a different keyPath before and now want 'id', you might need to recreate and migrate.
        // For simplicity here, assuming 'id' was already the intent or a fresh start for settings.
      }
    },
  });

  // Ensure a default settings object exists
  const tx = dbInstance.transaction(STORE_SETTINGS, 'readwrite');
  const store = tx.objectStore(STORE_SETTINGS);
  const existingSettings = await store.get('app_settings');
  if (!existingSettings) {
    const defaultSettings: Settings = {
      id: 'app_settings',
      maxCards: 100,
      trashRetentionDays: 30,
      permanentDeleteDays: 90,
      autoCleanEnabled: true,
    };
    await store.put(defaultSettings);
  }
  await tx.done;

  return dbInstance;
}

/** Templates (modeles de carte) */
export async function saveTemplate(template: Template) {
  const db = await getDb();
  await db.put(STORE_TEMPLATES, template);
}
export async function getTemplates(): Promise<Template[]> {
  const db = await getDb();
  return db.getAll(STORE_TEMPLATES);
}
export async function getTemplateById(id: string): Promise<Template | undefined> {
  const db = await getDb();
  return db.get(STORE_TEMPLATES, id);
}
export async function deleteTemplate(id: string) {
  const db = await getDb();
  await db.delete(STORE_TEMPLATES, id);
}

/** Cards (cartes generées) */
export async function saveCard(card: Card) {
  const db = await getDb();
  await db.put(STORE_CARDS, card);
}
export async function getCards(): Promise<Card[]> {
  const db = await getDb();
  return db.getAll(STORE_CARDS);
}
export async function getCard(id: string): Promise<Card | undefined> {
  const db = await getDb();
  return db.get(STORE_CARDS, id);
}
export async function getCardsPaginated(
  page: number,
  limit: number
): Promise<{ cards: Card[]; total: number }> {
  const db = await getDb();
  const tx = db.transaction(STORE_CARDS, 'readonly');
  const store = tx.objectStore(STORE_CARDS);

  const total = await store.count();
  const skip = (page - 1) * limit;

  const cards: Card[] = [];
  let cursor = await store.openCursor();
  let i = 0;
  while (cursor && i < skip + limit) {
    if (i >= skip) {
      cards.push(cursor.value);
    }
    cursor = await cursor.continue();
    i++;
  }

  await tx.done;
  return { cards, total };
}
export async function deleteCard(id: string) {
  const db = await getDb();
  await db.delete(STORE_CARDS, id);
}

/** Trash logic */
export async function moveToTrash(item: Card | Template) {
  const db = await getDb();
  const trashItem = { ...item, deletedAt: Date.now() }; // Use deletedAt for trash timestamp
  await db.put(STORE_TRASH, trashItem);
  // also remove from cards/templates if exists
  if ('templateId' in item) {
    await deleteCard(item.id);
  } else {
    await deleteTemplate(item.id);
  }
}
export async function getTrash(): Promise<(Card | Template)[]> {
  const db = await getDb();
  return db.getAll(STORE_TRASH);
}
export async function emptyTrashOlderThan(permanentDeleteDays: number) {
  const db = await getDb();
  const allTrash = await db.getAll(STORE_TRASH);
  const limit = Date.now() - permanentDeleteDays * 24 * 3600 * 1000;

  for (const item of allTrash) {
    if (item.deletedAt && item.deletedAt < limit) {
      await db.delete(STORE_TRASH, item.id);
    }
  }
}

/** Settings */
const SETTINGS_KEY = 'app_settings';

export async function getSettings(): Promise<Settings | undefined> {
  const db = await getDb();
  return db.get(STORE_SETTINGS, SETTINGS_KEY);
}

export async function updateSettings(settings: Settings) {
  const db = await getDb();
  // Ensure the settings object has the correct id for the keyPath
  const settingsToSave = { ...settings, id: SETTINGS_KEY };
  await db.put(STORE_SETTINGS, settingsToSave);
}
