import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { uploadImage } from "../utils/fileUpload.utils.js";
import generateToken from "../utils/jwt.utils.js";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const file = req.files?.profileImage;

    if (!name || !email || !phone || !password) {
      return res.status(404).json({ message: "All fields are required!" });
    }

    const userExists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (userExists) {
      const conflictField =
        userExists.email === email ? "Email Id" : "Phone no";
      return res
        .status(409)
        .json({ message: `${conflictField} Already Exists!` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImage = {};

    if (!file) {
      return res
        .status(404)
        .json({ message: "No file received, Please Upload Profile Image!" });
    }

    const { public_id, secure_url } = await uploadImage(file);
    profileImage = { public_id, secure_url };

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      profileImage,
    });

    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid credentials!" });
    }
    const token = generateToken(user._id);

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "Lax", maxAge: 7 * 24 * 60 * 60 * 1000, }).json({
      success: true,
      message: "User Sign In Successfully!",
      user
    });
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token").json({ success: true, message: "User Logout!" });
  } catch (err) {
    next(err); // Pass error to error handler
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const file = req.files?.profileImage;

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User Not Found!" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (file) user.profileImage = await uploadImage(file);

    await user.save();

    res.status(200).json({ user, message: "Profile updated" });
  }catch (err) {
    next(err); // Pass error to error handler
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Old password is incorrect!" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New password and confirm password do not match!",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    next(err); // Pass error to error handler
  }
};
