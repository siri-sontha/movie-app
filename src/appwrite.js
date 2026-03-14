import { Client } from 'appwrite'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    

export const updateSearchCount = async (searchTerm, movie) => {
    console.log(DATABASE_ID, PROJECT_ID, TABLE_ID)
}