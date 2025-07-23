import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express';
import userRouter from './Routes/user.js';
import contactRouter from './Routes/contact.js';
import frontendRoutes from './Routes/frontend.js'; // 👈 add this
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static("public")); // for /style.css



app.use(session({
  secret: 'my-secret-key', // 🔒 secret used to sign the session ID cookie
  resave: false,            // 🚫 don’t save session if nothing changed
  saveUninitialized: false  // 🚫 don’t create empty sessions
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// EJS + Static setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ENV
config({ path: '.env' });

// Routes
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);
app.use("/", frontendRoutes); // 👈 Easy view routes

// DB
mongoose.connect(process.env.MONGO_URI, { dbName: 'Node_js_Mastery_Course' })
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB error ❌", err));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
