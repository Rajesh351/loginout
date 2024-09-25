import { Empolye } from "../models/empolye.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Users } from "../models/Usersmode.js";
import validator from 'validator';

export const register1 = async (req, res) => {
    try {
        const userId = req.id;
        const file = req.file;
        const { name, email, phoneNumber, designation, gender, course } = req.body;

        // Check if any required field is missing
        if (!name || !email || !phoneNumber || !designation || !gender || !course) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Validate name (must be a string and not a number)
        if (typeof name !== 'string' || !isNaN(name)) {
            return res.status(400).json({
                message: "Name must be a valid string and cannot be a number",
                success: false
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            });
        }

        // Validate phone number (must be a number and not a string)
        if (!/^\d+$/.test(phoneNumber)) {
            return res.status(400).json({
                message: "Phone number must be a valid number and contain only digits",
                success: false
            });
        }

        // Check if the file is uploaded
        if (!file) {
            return res.status(400).json({
                message: "Profile picture is missing",
                success: false
            });
        }

        // Check for allowed file types (jpg and png)
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return res.status(400).json({
                message: "Only JPG and PNG formats are allowed.",
                success: false
            });
        }

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Check if the user already exists with the provided email
        const user = await Empolye.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        // Create the new employee
        await Empolye.create({
            name,
            email,
            phoneNumber,
            designation,
            gender,
            course,
            profile: {
                profilePhoto: cloudResponse.secure_url
            },
            created_by: userId
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, email, phoneNumber, designation, gender, course } = req.body;
        const file = req.file;

        const userId = req.params.id;
        let user = await Empolye.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Validate name (must be a string and not a number)
        if (name && (typeof name !== 'string' || !isNaN(name))) {
            return res.status(400).json({
                message: "Name must be a valid string and cannot be a number",
                success: false
            });
        }

        // Validate email if provided
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            });
        }

        // Validate phone number (must be a number and not a string)
        if (phoneNumber && !/^\d+$/.test(phoneNumber)) {
            return res.status(400).json({
                message: "Phone number must be a valid number and contain only digits",
                success: false
            });
        }

        // Updating data
        if (name) user.name = name;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (designation) user.designation = designation;
        if (course) user.course = course;
        if (gender) user.gender = gender;

        // Upload new profile picture if provided
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.profilePhoto = cloudResponse.secure_url; // save the cloudinary url
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getall = async (req, res) => {
    try {
        const userId = req.id;
        const users = await Empolye.find({ created_by: userId });

        return res.status(200).json({
            message: "Get all users successfully.",
            users,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const deleteUserAndReturnOthers = async (req, res) => {
    try {
        const { id } = req.params; // Extracting the ID from req.params, not req.body

        if (!id) {
            return res.status(400).json({
                message: "User ID is required",
                success: false
            });
        }

        // Find and delete the user by ID
        const user = await Empolye.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Retrieve all remaining users
        const remainingUsers = await Empolye.find({});

        return res.status(200).json({
            message: "User deleted successfully",
            remainingUsers, // Returning all remaining users
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred",
            success: false,
            error: error.message
        });
    }
};
