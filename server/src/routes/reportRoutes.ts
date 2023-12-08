// reportRoutes.ts
import express, { Router } from 'express';
import { generateReport } from '../controllers/reports';

export const router: Router = express.Router();

router.get('/generate-report', generateReport);

