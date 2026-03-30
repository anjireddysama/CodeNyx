import admin from "firebase-admin";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readFile } from "fs/promises";

dotenv.config();

// Initialize Firebase Admin
let isFirebaseInitialized = false;
try {
  // Check if serviceAccountKey.json exists before initializing
  const serviceAccount = JSON.parse(
    await readFile(new URL("./serviceAccountKey.json", import.meta.url))
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
  isFirebaseInitialized = true;
  console.log("Firebase Admin initialized successfully.");
} catch (error) {
  console.warn("Firebase Admin failed to initialize. Make sure 'serviceAccountKey.json' exists in the backend folder.");
  console.error(error.message);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main entry point
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "TraceEd API is online.",
    firebase: isFirebaseInitialized ? "connected" : "disconnected (service account key missing)"
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
