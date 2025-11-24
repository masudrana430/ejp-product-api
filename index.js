// index.js
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000" || "https://ejp-next-js-project.netlify.app" ;

app.use(
  cors({
    origin: [FRONTEND_URL, 'https://ejp-next-js-project.netlify.app']
  })
);
app.use(express.json());

let products = [
  {
    id: "1",
    title: "Wireless Noise-Cancelling Headphones",
    shortDescription: "Immersive sound with 30h battery life.",
    description:
      "Experience studio-quality audio with adaptive noise cancellation, soft ear cushions, and all-day battery life.",
    price: 199,
    category: "Audio",
    priority: "Featured",
    date: "2025-01-01",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0D9NsUy3dEgbqLNGTm7WCwVKlbGZNt71og&s",
  },
  {
    id: "2",
    title: "Minimalist Smartwatch",
    shortDescription: "Track health, sleep, and notifications.",
    description:
      "A clean, distraction-free smartwatch for tracking your day-to-day health without overwhelming you.",
    price: 149,
    category: "Wearables",
    priority: "Standard",
    date: "2025-01-05",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0D9NsUy3dEgbqLNGTm7WCwVKlbGZNt71og&s",
  },
  {
    id: "3",
    title: "Ergonomic Office Chair",
    shortDescription: "All-day comfort with lumbar support.",
    description:
      "Designed for long focus sessions, with adjustable height, tilt, and lumbar support.",
    price: 329,
    category: "Office",
    priority: "Featured",
    date: "2025-01-10",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0D9NsUy3dEgbqLNGTm7WCwVKlbGZNt71og&s",
  },
  {
    id: "4",
    title: "USB-C Docking Station",
    shortDescription: "Single cable to power your whole desk.",
    description:
      "Connect multiple displays, peripherals and power with one USB-C cable.",
    price: 89,
    category: "Accessories",
    priority: "Standard",
    date: "2025-01-12",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0D9NsUy3dEgbqLNGTm7WCwVKlbGZNt71og&s",
  },
  {
    id: "5",
    title: "Portable Bluetooth Speaker",
    shortDescription: "Water-resistant speaker for everyday use.",
    description:
      "Compact, durable and loud enough for indoor and outdoor small gatherings.",
    price: 59,
    category: "Audio",
    priority: "Low",
    date: "2025-01-15",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0D9NsUy3dEgbqLNGTm7WCwVKlbGZNt71og&s",
  },
  {
    id: "6",
    title: "LED Desk Lamp",
    shortDescription: "Adjustable brightness and color temperature.",
    description:
      "Minimalist lamp with touch controls and memory function for your preferred settings.",
    price: 39,
    category: "Office",
    priority: "Standard",
    date: "2025-01-18",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0D9NsUy3dEgbqLNGTm7WCwVKlbGZNt71og&s",
  },
];

// GET all
app.get("/products", (req, res) => {
  res.json(products);
});

// GET by ID
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

// POST new
app.post("/products", (req, res) => {
  const {
    title,
    shortDescription,
    description,
    price,
    category,
    priority,
    date,
    imageUrl,
  } = req.body;

  if (!title || !shortDescription || !description || typeof price !== "number") {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const id = (products.length + 1).toString();

  const newProduct = {
    id,
    title,
    shortDescription,
    description,
    price,
    category: category || "General",
    priority: priority || "Standard",
    date: date || new Date().toISOString().slice(0, 10),
    imageUrl,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// DELETE
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const existing = products.find((p) => p.id === id);
  if (!existing) return res.status(404).json({ message: "Not found" });

  products = products.filter((p) => p.id !== id);
  res.status(204).send();
});

// At the very end of index.js
module.exports = (req, res) => {
  app(req, res);
};
