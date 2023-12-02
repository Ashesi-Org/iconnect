import express from 'express';
import * as userController from '../controllers/userController';

export const appUserRouter = express.Router();


appUserRouter.get('/:userId', async (req, res) => {
  await userController.getUserById(req, res);
});


appUserRouter.post('/', async (req, res) => {
  await userController.createUser(req, res);
});


appUserRouter.post('/assign-issue-resolver', async (req, res) => {
  await userController.makeUserIssueResolverController(req, res);
});


