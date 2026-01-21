import express from 'express';
import { registerNewUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

// router halaman register
router.post('/register', registerNewUser);

// router halaman login
router.post('/login', loginUser);

export default router;