import { openDB, type IDBPDatabase } from 'idb'

const dbName = 'doneitdb'
const dbVer = 1

async function setupDB(storeName: string): Promise<IDBPDatabase<unknown>> {
    // Create or open DB
    return await openDB(dbName, dbVer, {
        upgrade(db) {
            // Create a new object store if it doesn't already exist
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            }
            console.log(db.objectStoreNames)
        }
    })
}

export async function addToDb(storeName: string, data: any) {
    const db = await setupDB(storeName)

    const id = await db.add(storeName, data).catch((err) => {
        console.log('Error', err)
    })
    return id
}