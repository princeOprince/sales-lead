import express from 'express';
import { index } from '../controllers/index.mjs';
export const router = express.Router();

/* GET home page. */
router.get('/', index);
