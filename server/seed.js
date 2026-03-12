import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Skill from "./models/Skill.js";

dotenv.config();

const users = [
  { name: "Alice Johnson", email: "alice@example.com", bio: "UI/UX Designer with 3 years experience", location: "Mumbai" },
  { name: "Bob Sharma", email: "bob@example.com", bio: "Python developer and ML enthusiast", location: "Bangalore" },
  { name: "Priya Nair", email: "priya@example.com", bio: "Digital marketer and content creator", location: "Chennai" },
  { name: "Raj Patel", email: "raj@example.com", bio: "Java backend developer", location: "Hyderabad" },
  { name: "Sara Khan", email: "sara@example.com", bio: "Graphic designer and illustrator", location: "Delhi" },
  { name: "Arjun Mehta", email: "arjun@example.com", bio: "DevOps engineer and cloud enthusiast", location: "Pune" },
  { name: "Neha Gupta", email: "neha@example.com", bio: "Data scientist and analytics expert", location: "Bangalore" },
  { name: "Vikram Das", email: "vikram@example.com", bio: "Mobile app developer", location: "Kolkata" },
  { name: "Ananya Roy", email: "ananya@example.com", bio: "Content writer and SEO specialist", location: "Mumbai" },
  { name: "Karan Singh", email: "karan@example.com", bio: "Cybersecurity analyst", location: "Delhi" },
];

const skillsData = [
  { title: "Node.js Development", category: "Technology", level: "Intermediate", type: "offer", tags: ["nodejs", "backend", "express"], description: "I can teach Node.js backend development including REST APIs, Express.js, and server-side JavaScript." },
  { title: "Python & Django", category: "Technology", level: "Advanced", type: "offer", tags: ["python", "django", "backend"], description: "Full-stack Python development with Django framework, including ORM, views, and REST APIs." },
  { title: "Machine Learning Basics", category: "Technology", level: "Beginner", type: "offer", tags: ["ml", "python", "ai"], description: "Introduction to machine learning concepts, sklearn, and building basic prediction models." },
  { title: "UI/UX Design", category: "Design", level: "Intermediate", type: "offer", tags: ["figma", "design", "ux"], description: "User interface and experience design using Figma, including wireframing, prototyping, and design systems." },
  { title: "Figma Advanced", category: "Design", level: "Advanced", type: "offer", tags: ["figma", "prototyping", "components"], description: "Advanced Figma skills including auto layout, components, variants, and design system creation." },
  { title: "Java Spring Boot", category: "Technology", level: "Advanced", type: "offer", tags: ["java", "spring", "backend"], description: "Enterprise Java development with Spring Boot, including REST APIs, JPA, and microservices." },
  { title: "AWS Cloud Services", category: "Technology", level: "Intermediate", type: "offer", tags: ["aws", "cloud", "devops"], description: "Amazon Web Services including EC2, S3, Lambda, and deploying applications to the cloud." },
  { title: "Docker & Kubernetes", category: "Technology", level: "Advanced", type: "offer", tags: ["docker", "kubernetes", "devops"], description: "Containerization with Docker and orchestration with Kubernetes for scalable deployments." },
  { title: "Data Analysis", category: "Technology", level: "Intermediate", type: "offer", tags: ["python", "pandas", "data"], description: "Data analysis and visualization using Python Pandas, NumPy, and Matplotlib." },
  { title: "Flutter Mobile Dev", category: "Technology", level: "Intermediate", type: "offer", tags: ["flutter", "dart", "mobile"], description: "Cross-platform mobile app development using Flutter and Dart for iOS and Android." },
  { title: "Graphic Design", category: "Design", level: "Intermediate", type: "offer", tags: ["photoshop", "illustrator", "design"], description: "Graphic design using Adobe Photoshop and Illustrator for logos, banners, and marketing materials." },
  { title: "Cybersecurity Fundamentals", category: "Technology", level: "Beginner", type: "offer", tags: ["security", "networking", "hacking"], description: "Introduction to cybersecurity including network security, ethical hacking basics, and security best practices." },
  { title: "TypeScript Advanced", category: "Technology", level: "Advanced", type: "offer", tags: ["typescript", "javascript", "frontend"], description: "Advanced TypeScript including generics, decorators, utility types, and best practices for large applications." },
  { title: "Vue.js Development", category: "Technology", level: "Intermediate", type: "offer", tags: ["vue", "javascript", "frontend"], description: "Frontend development with Vue.js 3, Composition API, Pinia state management, and Vue Router." },
  { title: "MySQL & PostgreSQL", category: "Technology", level: "Intermediate", type: "offer", tags: ["sql", "database", "mysql"], description: "Relational database management including complex queries, joins, indexing, and database design." },
  { title: "Redux & State Management", category: "Technology", level: "Intermediate", type: "offer", tags: ["redux", "react", "state"], description: "Advanced state management in React using Redux Toolkit, middleware, and async thunks." },
  { title: "Guitar Lessons", category: "Music", level: "Beginner", type: "offer", tags: ["guitar", "music", "acoustic"], description: "Learn acoustic guitar from basics including chords, strumming patterns, and popular songs." },
  { title: "Business Strategy", category: "Business", level: "Intermediate", type: "offer", tags: ["business", "strategy", "startups"], description: "Business strategy and planning including market analysis, product positioning, and growth strategies." },
  { title: "Fitness Training", category: "Fitness", level: "Intermediate", type: "offer", tags: ["fitness", "workout", "health"], description: "Personal fitness training including workout planning, nutrition basics, and achieving fitness goals." },
  { title: "Oil Painting", category: "Art", level: "Beginner", type: "offer", tags: ["painting", "art", "canvas"], description: "Learn oil painting techniques from scratch including color mixing, brush techniques, and composition." },
  { title: "React.js", category: "Technology", level: "Beginner", type: "request", tags: ["react", "javascript", "frontend"], description: "Looking to learn React.js fundamentals, hooks, and building modern web applications." },
  { title: "MongoDB", category: "Technology", level: "Beginner", type: "request", tags: ["mongodb", "nosql", "database"], description: "Want to learn MongoDB database design, queries, and Mongoose ORM for Node.js." },
  { title: "Photoshop Basics", category: "Design", level: "Beginner", type: "request", tags: ["photoshop", "design", "editing"], description: "Looking to learn Adobe Photoshop basics for photo editing and graphic design." },
  { title: "Spanish Language", category: "Language", level: "Beginner", type: "request", tags: ["spanish", "language", "communication"], description: "Want to learn conversational Spanish for travel and professional communication." },
  { title: "Cooking Italian", category: "Cooking", level: "Beginner", type: "request", tags: ["cooking", "italian", "food"], description: "Interested in learning authentic Italian cooking including pasta, sauces, and traditional recipes." },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await User.deleteMany({ email: { $in: users.map(u => u.email) } });
    console.log("🗑️  Cleared old seed users");

    const password = await bcrypt.hash("seed123456", 10);
    const createdUsers = [];

    for (let i = 0; i < users.length; i++) {
      const user = await User.create({
        name: users[i].name,
        email: users[i].email,
        passwordHash: password,
        bio: users[i].bio,
        location: users[i].location,
      });
      createdUsers.push(user);
      console.log("👤 Created user: " + user.name);
    }

    await Skill.deleteMany({ user: { $in: createdUsers.map(u => u._id) } });

    for (let i = 0; i < skillsData.length; i++) {
      const userIndex = i % createdUsers.length;
      await Skill.create({
        title: skillsData[i].title,
        description: skillsData[i].description,
        category: skillsData[i].category,
        level: skillsData[i].level,
        type: skillsData[i].type,
        tags: skillsData[i].tags,
        user: createdUsers[userIndex]._id,
        isActive: true,
      });
      console.log("🎯 Created skill: " + skillsData[i].title);
    }

    console.log("\n✅ Seed completed successfully!");
    console.log("👥 " + createdUsers.length + " users created");
    console.log("🎯 " + skillsData.length + " skills created");
    console.log("\n📧 All seed users password: seed123456");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seedDatabase();