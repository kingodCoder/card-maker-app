// src/lib/db.ts
import { openDB, DBSchema, IDBPDatabase } from 'idb';

const DB_NAME = 'CardMakerDB';
const DB_VERSION = 1;
const STORE_NAME = 'cardTemplates';

// Définir le schéma de la base de données
interface CardMakerDB extends DBSchema {
  [STORE_NAME]: {
    key: string; // L'ID du template (ex: "standard", "premium")
    value: any;  // Le template au format JSON de Fabric.js
  };
}

let dbPromise: Promise<IDBPDatabase<CardMakerDB>> | null = null;

/**
 * Ouvre et initialise la base de données IndexedDB.
 */
const getDb = (): Promise<IDBPDatabase<CardMakerDB>> => {
  if (!dbPromise) {
    dbPromise = openDB<CardMakerDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Créer le "magasin" (équivalent d'une table) pour les templates
        // si ce n'est pas déjà fait.
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }
  return dbPromise;
};

/**
 * Récupère tous les templates de la base de données.
 * @returns Un tableau de tous les templates.
 */
export const getAllTemplates = async () => {
  const db = await getDb();
  return db.getAll(STORE_NAME);
};

/**
 * Récupère un template spécifique par son ID.
 * @param id - L'ID du template à récupérer.
 * @returns Le template ou undefined s'il n'est pas trouvé.
 */
export const getTemplate = async (id: string) => {
  const db = await getDb();
  return db.get(STORE_NAME, id);
};

/**
 * Ajoute ou met à jour un template dans la base de données.
 * @param id - L'ID du template.
 * @param templateData - Les données du template au format JSON.
 */
export const saveTemplate = async (id: string, templateData: any) => {
  const db = await getDb();
  return db.put(STORE_NAME, templateData, id);
};

/**
 * Supprime un template de la base de données.
 * @param id - L'ID du template à supprimer.
 */
export const deleteTemplate = async (id: string) => {
  const db = await getDb();
  return db.delete(STORE_NAME, id);
};

/**
 * Compte le nombre de templates dans la base de données.
 * @returns Le nombre total de templates.
 */
export const countTemplates = async () => {
    const db = await getDb();
    return db.count(STORE_NAME);
}
