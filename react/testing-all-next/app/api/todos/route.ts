import { NextRequest } from "next/server";

//To-Do: connect to DB
//To-Do: add total count based on DB

// Import the functions you need from the SDKs you need
import admin from "firebase-admin";
import serviceAccount from "../../../service-account-key-firestore.json";
// import { getFirestore } from "firebase-admin/firestore";
import { collection, addDoc, getFirestore } from "firebase/firestore";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testing-firestore-4aca5.eur3.firebasedatabase.app",
});

const todosRef = admin.firestore().collection("todos");

export async function GET(request: NextRequest) {
  // For example, fetch data from your DB here
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const maxCount = searchParams.get("maxCount");

  const count = await todosRef.count().get();
  if (!!maxCount) {
    return new Response(JSON.stringify({ maxCount: count.data().count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!page || !limit) {
    return new Response(null, {
      status: 404,
    });
  }

  const pageInt = parseInt(searchParams.get("page")) - 1;
  const limitInt = parseInt(searchParams.get("limit"));

  if (parseInt(page) * parseInt(limit) > count.data().count) {
    return new Response(null, {
      status: 404,
    });
  }

  const todos = await todosRef
    .where("id", ">", pageInt * limitInt)
    .orderBy("id")
    .limit(limitInt)
    .get()
    .then((value) => {
      const data = value.docs.map((doc) => doc.data());
      console.log("DATA?", data);
      return data;
    });

  return new Response(JSON.stringify(todos), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// const todos = [
//   {
//     id: 1,
//     title: "Do your laundry",
//     description: "Put clothes into washing machine. Then hang them",
//     done: false,
//   },
//   {
//     id: 2,
//     title: "Buy groceries",
//     description: "Milk, eggs, bread, and orange juice",
//     done: true,
//   },
//   {
//     id: 3,
//     title: "Walk the dog",
//     description: "Take Bruno for a 30-minute walk in the park",
//     done: false,
//   },
//   {
//     id: 4,
//     title: "Call mom",
//     description: "Ask how she’s doing and talk about the weekend plans",
//     done: false,
//   },
//   {
//     id: 5,
//     title: "Finish project report",
//     description: "Complete the final draft and send it to the team",
//     done: true,
//   },
//   {
//     id: 6,
//     title: "Clean kitchen",
//     description: "Wipe counters, mop floor, clean sink",
//     done: false,
//   },
//   {
//     id: 7,
//     title: "Read a book",
//     description: "Read at least 20 pages of your current book",
//     done: true,
//   },
//   {
//     id: 8,
//     title: "Workout",
//     description: "Do 30 minutes of cardio and stretching",
//     done: false,
//   },
//   {
//     id: 9,
//     title: "Reply to emails",
//     description: "Check inbox and reply to important emails",
//     done: true,
//   },
//   {
//     id: 10,
//     title: "Prepare dinner",
//     description: "Cook pasta and make salad",
//     done: false,
//   },
//   {
//     id: 11,
//     title: "Update resume",
//     description: "Add latest job experience and skills",
//     done: false,
//   },
//   {
//     id: 12,
//     title: "Pay electricity bill",
//     description: "Log in to utility website and pay the bill",
//     done: true,
//   },
//   {
//     id: 13,
//     title: "Organize closet",
//     description: "Sort clothes by season and color",
//     done: false,
//   },
//   {
//     id: 14,
//     title: "Research vacation spots",
//     description: "Look into beach destinations for summer",
//     done: false,
//   },
//   {
//     id: 15,
//     title: "Water plants",
//     description: "Water all indoor and outdoor plants",
//     done: true,
//   },
//   {
//     id: 16,
//     title: "Book dentist appointment",
//     description: "Call the clinic and book a slot",
//     done: false,
//   },
//   {
//     id: 17,
//     title: "Renew car insurance",
//     description: "Check options and renew online",
//     done: true,
//   },
//   {
//     id: 18,
//     title: "Fix leaking tap",
//     description: "Use wrench to tighten or call plumber",
//     done: false,
//   },
//   {
//     id: 19,
//     title: "Learn a new recipe",
//     description: "Try making Thai green curry",
//     done: false,
//   },
//   {
//     id: 20,
//     title: "Write blog post",
//     description: "Share your thoughts on productivity hacks",
//     done: true,
//   },
//   {
//     id: 21,
//     title: "Call insurance",
//     description: "Verify policy details with representative",
//     done: false,
//   },
//   {
//     id: 22,
//     title: "Do yoga",
//     description: "30-minute flow for relaxation",
//     done: true,
//   },
//   {
//     id: 23,
//     title: "Declutter desk",
//     description: "Remove unnecessary items and organize supplies",
//     done: false,
//   },
//   {
//     id: 24,
//     title: "Schedule team meeting",
//     description: "Find common time and send calendar invite",
//     done: false,
//   },
//   {
//     id: 25,
//     title: "Fix bike tire",
//     description: "Patch or replace inner tube",
//     done: true,
//   },
//   {
//     id: 26,
//     title: "Submit tax forms",
//     description: "Use tax software to complete filing",
//     done: false,
//   },
//   {
//     id: 27,
//     title: "Watch documentary",
//     description: "Choose from nature or tech topics",
//     done: true,
//   },
//   {
//     id: 28,
//     title: "Print travel documents",
//     description: "Boarding pass and hotel confirmation",
//     done: false,
//   },
//   {
//     id: 29,
//     title: "Attend webinar",
//     description: "Log in at 5PM to join live session",
//     done: false,
//   },
//   {
//     id: 30,
//     title: "Change bed sheets",
//     description: "Replace with clean linen",
//     done: true,
//   },
//   {
//     id: 31,
//     title: "Sort mail",
//     description: "Check inbox and recycle junk",
//     done: false,
//   },
//   {
//     id: 32,
//     title: "Plan birthday gift",
//     description: "Find something thoughtful and order online",
//     done: false,
//   },
//   {
//     id: 33,
//     title: "Stretch",
//     description: "Do quick full-body stretch after work",
//     done: true,
//   },
//   {
//     id: 34,
//     title: "Backup phone",
//     description: "Sync to cloud or external drive",
//     done: true,
//   },
//   {
//     id: 35,
//     title: "Update LinkedIn",
//     description: "Add skills and achievements",
//     done: false,
//   },
//   {
//     id: 36,
//     title: "Buy coffee beans",
//     description: "Look for your favorite roast",
//     done: true,
//   },
//   {
//     id: 37,
//     title: "Take vitamins",
//     description: "Don’t forget morning supplements",
//     done: true,
//   },
//   {
//     id: 38,
//     title: "Organize bookshelf",
//     description: "Sort by genre and author",
//     done: false,
//   },
//   {
//     id: 39,
//     title: "Set goals",
//     description: "Write down weekly goals",
//     done: true,
//   },
//   {
//     id: 40,
//     title: "Edit photos",
//     description: "Pick best vacation pics and apply filters",
//     done: false,
//   },
//   {
//     id: 41,
//     title: "Review finances",
//     description: "Check budget and savings progress",
//     done: true,
//   },
//   {
//     id: 42,
//     title: "Write journal",
//     description: "Reflect on your day for 10 minutes",
//     done: false,
//   },
//   {
//     id: 43,
//     title: "Clean bathroom",
//     description: "Scrub tiles and clean toilet",
//     done: false,
//   },
//   {
//     id: 44,
//     title: "Meal prep",
//     description: "Cook for the next 3 days",
//     done: true,
//   },
//   {
//     id: 45,
//     title: "Meditate",
//     description: "10-minute breathing session",
//     done: true,
//   },
//   {
//     id: 46,
//     title: "Visit grandma",
//     description: "Bring cookies and catch up",
//     done: false,
//   },
//   {
//     id: 47,
//     title: "Take car to service",
//     description: "Check brakes and oil",
//     done: false,
//   },
//   {
//     id: 48,
//     title: "Learn guitar chords",
//     description: "Practice basic open chords",
//     done: false,
//   },
//   {
//     id: 49,
//     title: "Create portfolio",
//     description: "Add projects and testimonials",
//     done: true,
//   },
//   {
//     id: 50,
//     title: "Apply for job",
//     description: "Send CV to 3 new companies",
//     done: false,
//   },
//   {
//     id: 51,
//     title: "Vacuum living room",
//     description: "Get under the sofa and rugs",
//     done: true,
//   },
//   {
//     id: 52,
//     title: "Clean fridge",
//     description: "Throw expired stuff and wipe shelves",
//     done: false,
//   },
//   {
//     id: 53,
//     title: "Record podcast",
//     description: "Episode 12 on creativity",
//     done: true,
//   },
//   {
//     id: 54,
//     title: "Fix website bug",
//     description: "Debug broken layout on mobile",
//     done: false,
//   },
//   {
//     id: 55,
//     title: "Water garden",
//     description: "Don’t forget the tomatoes!",
//     done: true,
//   },
//   {
//     id: 56,
//     title: "Call best friend",
//     description: "Plan the next hangout",
//     done: true,
//   },
//   {
//     id: 57,
//     title: "Learn Spanish",
//     description: "Do a Duolingo lesson",
//     done: false,
//   },
//   {
//     id: 58,
//     title: "Organize receipts",
//     description: "File tax-related ones",
//     done: false,
//   },
//   {
//     id: 59,
//     title: "Design logo",
//     description: "Mockups for client feedback",
//     done: false,
//   },
//   {
//     id: 60,
//     title: "Check tire pressure",
//     description: "Inflate if needed",
//     done: true,
//   },
//   {
//     id: 61,
//     title: "Research new phone",
//     description: "Compare models and deals",
//     done: false,
//   },
//   {
//     id: 62,
//     title: "Clean laptop screen",
//     description: "Use microfiber cloth",
//     done: true,
//   },
//   {
//     id: 63,
//     title: "Donate old clothes",
//     description: "Pack and drop off at center",
//     done: false,
//   },
//   {
//     id: 64,
//     title: "Fix lightbulb",
//     description: "Replace hallway one",
//     done: true,
//   },
//   {
//     id: 65,
//     title: "Install updates",
//     description: "System and software updates",
//     done: true,
//   },
//   {
//     id: 66,
//     title: "Setup calendar",
//     description: "Plan for next week",
//     done: false,
//   },
//   {
//     id: 67,
//     title: "Go for a hike",
//     description: "Morning nature walk",
//     done: true,
//   },
//   {
//     id: 68,
//     title: "Start new book",
//     description: "Pick from your reading list",
//     done: false,
//   },
//   {
//     id: 69,
//     title: "Clean windows",
//     description: "Inside and outside",
//     done: false,
//   },
//   {
//     id: 70,
//     title: "Buy cat food",
//     description: "Get the salmon flavor",
//     done: true,
//   },
//   {
//     id: 71,
//     title: "Organize downloads folder",
//     description: "Delete duplicates and sort",
//     done: true,
//   },
//   {
//     id: 72,
//     title: "Practice coding",
//     description: "1 hour of algorithms",
//     done: false,
//   },
//   {
//     id: 73,
//     title: "Send invoice",
//     description: "To freelance client",
//     done: true,
//   },
//   {
//     id: 74,
//     title: "Update app",
//     description: "Push latest features to repo",
//     done: false,
//   },
//   {
//     id: 75,
//     title: "Check analytics",
//     description: "Look at weekly traffic",
//     done: false,
//   },
//   {
//     id: 76,
//     title: "Test new feature",
//     description: "Try search bar redesign",
//     done: true,
//   },
//   {
//     id: 77,
//     title: "Organize toolbox",
//     description: "Arrange by tool type",
//     done: false,
//   },
//   {
//     id: 78,
//     title: "Replace air filter",
//     description: "In the living room AC",
//     done: true,
//   },
//   {
//     id: 79,
//     title: "Setup new printer",
//     description: "Connect to Wi-Fi and install drivers",
//     done: false,
//   },
//   {
//     id: 80,
//     title: "Research investment",
//     description: "Look into index funds",
//     done: false,
//   },
//   {
//     id: 81,
//     title: "Send thank you email",
//     description: "To the mentor from last week",
//     done: true,
//   },
//   {
//     id: 82,
//     title: "Organize files",
//     description: "Group by category",
//     done: false,
//   },
//   {
//     id: 83,
//     title: "Buy new charger",
//     description: "Fast-charging USB-C",
//     done: false,
//   },
//   {
//     id: 84,
//     title: "Practice meditation",
//     description: "Guided session before bed",
//     done: true,
//   },
//   {
//     id: 85,
//     title: "Repaint wall",
//     description: "Choose new color for office",
//     done: false,
//   },
//   {
//     id: 86,
//     title: "Create playlist",
//     description: "Songs for focus and productivity",
//     done: true,
//   },
//   {
//     id: 87,
//     title: "Register for course",
//     description: "UI/UX Design Fundamentals",
//     done: false,
//   },
//   {
//     id: 88,
//     title: "Sharpen knives",
//     description: "Use sharpening stone",
//     done: true,
//   },
//   {
//     id: 89,
//     title: "Take out trash",
//     description: "Before collection day",
//     done: false,
//   },
//   {
//     id: 90,
//     title: "Buy birthday card",
//     description: "Funny one for Sarah",
//     done: true,
//   },
//   {
//     id: 91,
//     title: "Host video call",
//     description: "Weekly sync with remote team",
//     done: false,
//   },
//   {
//     id: 92,
//     title: "Write thank you note",
//     description: "Handwritten for boss",
//     done: true,
//   },
//   {
//     id: 93,
//     title: "Fix door handle",
//     description: "Tighten screws",
//     done: false,
//   },
//   {
//     id: 94,
//     title: "Scan documents",
//     description: "Use phone app",
//     done: false,
//   },
//   {
//     id: 95,
//     title: "Learn new shortcut",
//     description: "Time-saving productivity tip",
//     done: true,
//   },
//   {
//     id: 96,
//     title: "Plan weekend trip",
//     description: "Short getaway idea",
//     done: false,
//   },
//   {
//     id: 97,
//     title: "Prepare presentation",
//     description: "For Monday client meeting",
//     done: false,
//   },
//   {
//     id: 98,
//     title: "Review pull requests",
//     description: "Look over code before merging",
//     done: true,
//   },
//   {
//     id: 99,
//     title: "Setup WiFi extender",
//     description: "Improve bedroom signal",
//     done: false,
//   },
//   {
//     id: 100,
//     title: "Buy hiking boots",
//     description: "Look for waterproof ones",
//     done: true,
//   },
// ];

// try {
//   todos.map(async (todo) => {
//     //set data with admin
//     await todosRef.doc(todo.id.toString()).set({
//       id: todo.id,
//       title: todo.title,
//       description: todo.description,
//       done: todo.done,
//     });
//   });

//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
