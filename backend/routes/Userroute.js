import express from "express";
import {login,register,logout} from "../controllers/Users.js"
import { getall, register1,updateProfile,deleteUserAndReturnOthers  } from "../controllers/Createempolye.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
const router = express.Router();



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/create/empolye").post(isAuthenticated,singleUpload,register1);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateProfile)
router.route("/getall").get(isAuthenticated,getall)
router.route("/delete/:id").delete(isAuthenticated,deleteUserAndReturnOthers)

//http://localhost:8000/api/v1/users/login
export default router;

