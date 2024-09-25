// import { User } from "../models/empolye.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

// export const register = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, password, } = req.body;
         
//         if (!fullname || !email || !phoneNumber || !password) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         };
//         const file = req.file;
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({
//                 message: 'User already exist with this email.',
//                 success: false,
//             })
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         await User.create({
//             fullname,
//             email,
//             phoneNumber,
//             password: hashedPassword,
//             profile:{
//                 profilePhoto:cloudResponse.secure_url,
//             }
//         });

//         return res.status(201).json({
//             message: "Account created successfully.",
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const login = async (req, res) => {
//     try {
//         const { email, password} = req.body;
        
//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         };
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         };

//         const tokenData = {
//             userId: user._id
//         }
//         const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             profile: user.profile
//         }

//         return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
//             message: `Welcome back ${user.fullname}`,
//             user,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const logout = async (req, res) => {
//     try {
//         return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//             message: "Logged out successfully.",
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
        
//         const file = req.file;
//         // cloudinary ayega idhar
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



//         let skillsArray;
//         if(skills){
//             skillsArray = skills.split(",");
//         }
//         const userId = req.id; // middleware authentication
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             })
//         }
//         // updating data
//         if(fullname) user.fullname = fullname
//         if(email) user.email = email
//         if(phoneNumber)  user.phoneNumber = phoneNumber
//         if(bio) user.profile.bio = bio
//         if(skills) user.profile.skills = skillsArray
      
//         // resume comes later here...
//         if(cloudResponse){
//             user.profile.resume = cloudResponse.secure_url // save the cloudinary url
//             user.profile.resumeOriginalName = file.originalname // Save the original file name
//         }


//         await user.save();

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             profile: user.profile
//         }

//         return res.status(200).json({
//             message:"Profile updated successfully.",
//             user,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }






import { Empolye } from "../models/empolye.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Users } from "../models/Usersmode.js";

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
        const { name, email, phoneNumber, designation, gender,course} = req.body;
        //console.log(name, email, phoneNumber, designation, gender,course)
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const userId = req.params.id;;
        let user = await Empolye.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(name) user.name = name
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(designation) user.designation = designation
        if(course) user.course = course
        if(gender) user.gender = gender
      
        if(cloudResponse){
            user.profile.profilePhoto = cloudResponse.secure_url // save the cloudinary url
            //user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

        // user = {
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     phoneNumber: user.phoneNumber,
        //     designation:user.designation,
        //     gender:user.gender,
        //     course:user.course
        // }

        return res.status(200).json({
            message:"Profile updated successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}




export const getall = async (req, res) => {
    try {
        const userId=req.id
        const users = await Empolye.find({created_by : userId });

         return res.status(200).json({
            message:"get all users successfully.",
            users,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}



export const deleteUserAndReturnOthers = async (req, res) => {
    try {
        const { id } = req.params;  // Extracting the ID from req.params, not req.body

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
            remainingUsers,  // Returning all remaining users
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
