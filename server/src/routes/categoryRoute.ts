import express, { Request, Response, NextFunction } from 'express';
import { getCategoryById, createCategory, getAllCategories, getIssueResolversForCategory } from '../controllers/categoryController';
import { Category } from '../types';
import { errorHandler } from '../middleware/errorHandler';

const categoryRouter = express.Router();


// Middleware for parsing category data in the request body
const parseCategoryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const categoryData = req.body as Category;
  req.body.categoryData = categoryData;
  next();
};

// Routes

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:categoryId', getCategoryById);
categoryRouter.get('/issue_resolvers/:categoryId', getIssueResolversForCategory);
categoryRouter.post('/', parseCategoryMiddleware, createCategory);

// Handling middleware
categoryRouter.use(errorHandler);

export default categoryRouter;
