import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';
import { Category } from '../types';
import { logger } from '../config/logger';

const getIssueResolversForCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const issueResolvers = await categoryService.getIssueResolversForCategory(Number(categoryId));

    res.status(200).json(issueResolvers);
  } catch (error:any) {
    logger.error('Error in retrieving issue resolvers for category:', error.message);
    res.status(500).json({ error: 'Failed to retrieve issue resolvers for category' });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.getCategoryById(Number(categoryId));
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error: any) {
    logger.error('Error in category controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error: any) {
    logger.error('Error in category controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryData: Category = req.body;
    const newCategory = await categoryService.createCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error: any) {
    logger.error('Error in category controller:', error.message);
    if (error.message.includes('already in use')) {
      return res.status(400).json({ error: 'Category name is already in use' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getIssueResolversForCategory, getCategoryById, createCategory, getAllCategories };
