import admin from "firebase-admin";
import fs from "fs"; // File system module
import path from "path"; // Path module

// Read JSON file manually
const serviceAccount = JSON.parse(
    fs.readFileSync(path.resolve("./firebase-admin-key.json"), "utf8")
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };

