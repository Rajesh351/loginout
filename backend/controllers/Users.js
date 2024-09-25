import { Users } from "../models/Usersmode.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    try {
        const {  username,password, } = req.body;
         
        if (! username || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
      
        const user = await Users.findOne({username});
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this  username',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await Users.create({
            username,
            password:hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}




export const login = async (req, res) => {
    try {
        const { username, password} = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await Users.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password.",
                success: false,
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            username: user.username,
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.username}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}