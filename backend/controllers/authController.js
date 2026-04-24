
import jwt from 'jsonwebtoken';
 import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library'; // Isse install karein: npm install google-auth-library

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to create JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// --- REGISTER ---
export const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, phone, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// --- LOGIN (EMAIL/PASSWORD) ---
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// --- GOOGLE LOGIN ---


export const googleLogin = async (req, res) => {
  const { token } = req.body; // This is the access_token from React

  try {
    // 1. Fetch user info from Google's UserInfo API using the access_token
    const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    const payload = await googleRes.json();

    if (!payload.email) {
      return res.status(401).json({ message: "Invalid Google Token" });
    }

    const { email, name, picture } = payload;

    // 2. Find or Create User in MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        profilePicture: picture,
        isGoogleUser: true,
        // Create a random password since it's required in some schemas
        password: await bcrypt.hash(Math.random().toString(36), 10) 
      });
    }

    // 3. Generate YOUR AIFA JWT
    const appToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token: appToken,
      name: user.name,
      message: "Login Successful"
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// --- FORGOT PASSWORD ---
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Yahan aap reset link send karne ka logic likhenge (e.g., Nodemailer)
    // Filhal hum success message bhej rahe hain
    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
