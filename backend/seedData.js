const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const seedData = async () => {
  console.log("Seeding started...");

  // Seed Students
  const students = [
    { name: "Alex Student", grade: "10th Grade", status: "Active", ngoId: "ngo-123" },
    { name: "Maria Garcia", grade: "9th Grade", status: "Needs Review", ngoId: "ngo-123" }
  ];

  for (const student of students) {
    await db.collection("students").add(student);
  }
  console.log("Students seeded.");

  // Seed Volunteers
  const volunteers = [
    { name: "Sarah Volunteer", subjectFocus: "Mathematics", hoursLogged: 24, status: "Matched", ngoId: "ngo-123" }
  ];

  for (const volunteer of volunteers) {
    await db.collection("volunteers").add(volunteer);
  }
  console.log("Volunteers seeded.");

  // Seed Sessions
  const sessions = [
    { title: "Math Tutoring", startTime: new Date("2026-03-31T10:00:00Z"), status: "upcoming", student: "Alex S.", ngoId: "ngo-123" },
    { title: "Science Lab", startTime: new Date("2026-03-29T14:00:00Z"), status: "completed", student: "Alex S.", ngoId: "ngo-123" }
  ];

  for (const session of sessions) {
    await db.collection("sessions").add(session);
  }
  console.log("Sessions seeded.");

  console.log("Seeding complete!");
  process.exit();
};

seedData().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
