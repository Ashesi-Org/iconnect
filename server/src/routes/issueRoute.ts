import express, { Request, Response, NextFunction } from 'express';
import * as issuesController from '../controllers/issueController';
import { errorHandler } from '../middleware/errorHandler';
// import handleServiceErrorMiddleware from '../middleware/handleErrorMiddleware';

const issueRouter = express.Router();


// Middleware for parsing attachment data in the request body
const parseAttachmentMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const attachmentData = req.body.attachment;
  req.body.attachmentData = attachmentData;
  next();
};


// Routes
issueRouter.get('/', issuesController.getAssignedOrNotAssignedIssues);
issueRouter.get('/:issueId', issuesController.getIssueById);
issueRouter.get('/user/:userId', issuesController.getIssuesByUser);
issueRouter.get('/department/:userId', issuesController.getIssuesByDepartment);
issueRouter.get('/events/:resolverId', issuesController.getRessolverAssignments);

issueRouter.delete('/:issueId', issuesController.deleteIssue);
issueRouter.post('/create', parseAttachmentMiddleware, issuesController.createIssue);
issueRouter.post('/assign', issuesController.assignIssueToResolver);
issueRouter.put('/edit/:issue_id', issuesController.updateIssueController);
issueRouter.put('/edit/status/:issue_id', issuesController.updateIssueStatus);


//handling middleware
issueRouter.use(errorHandler);

export default issueRouter;
