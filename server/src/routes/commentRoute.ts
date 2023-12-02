import express, { Router } from 'express';
import { createCommentController, getCommentsByIssueIdController } from '../controllers/commentController';

export const router: Router = Router();

router.post('/', createCommentController);
router.get('/:issueId/comments', getCommentsByIssueIdController);

