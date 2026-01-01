import {handleManageSigningup, handleManageSigningin} from '../controllers/control_auth.js';
import express from 'express';
import { validateSigningin, validateSigningup } from '../middlewares/middle_validate_auth.js';
const route = express.Router();

route.post("/login", validateSigningin, handleManageSigningin);
route.post("/register", validateSigningup, handleManageSigningup);

export default route;