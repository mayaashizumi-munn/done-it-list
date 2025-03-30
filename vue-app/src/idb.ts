import { openDB, type IDBPDatabase } from "idb"
import { DONE_IT_DB, TODO_DB } from "./constants"

const dbName = "doneitdb"
const dbVer = 6

const storeNames = [TODO_DB, DONE_IT_DB]

async function setupDB(): Promise<IDBPDatabase<unknown>> {
    // Create or open DB
    return await openDB(dbName, dbVer, {
        upgrade(db) {
            // Create a new object store if it doesn't already exist
            for (const store of storeNames) {
                if (!db.objectStoreNames.contains(store)) {
                    db.createObjectStore(store, {
                        keyPath: "id",
                        autoIncrement: true,
                    })
                }
            }
        },
    })
}

export async function addToDb(
    storeName: string,
    data: object,
): Promise<IDBValidKey> {
    const db = await setupDB()
    return db.add(storeName, data)
}

export async function editItemFromDb(
    storeName: string,
    data: object,
    id: number,
): Promise<IDBValidKey> {
    const db = await setupDB()

    return db.put(storeName, {
        ...data,
        id,
    })
}

export async function getAllFromDb(storeName: string): Promise<object[]> {
    const db = await setupDB()
    return db.getAll(storeName)
}

export async function deleteFromDb(
    storeName: string,
    id: number,
): Promise<void> {
    const db = await setupDB()
    return db.delete(storeName, id)
}
