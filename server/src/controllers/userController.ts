import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { User } from '../types';


const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(Number(userId));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error:any) {
    console.error('Error in user controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const userData: User = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error:any) {
    console.error('Error in user controller:', error.message);
    if (error.message.includes('already in use')) {
      return res.status(400).json({ error: 'Email or unique_id is already in use' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const makeUserIssueResolverController = async (req: Request, res: Response) => {
  try {
    const { userId, categoryId } = req.body; 

    // First, check if the user exists
    const user = await userService.getUserById(Number(userId));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await userService.makeUserIssueResolver(Number(userId), Number(categoryId));

    res.status(200).json({ message: 'User assigned as an issue resolver successfully' });
  } catch (error:any) {
    console.error('Error in assigning user as an issue resolver:', error.message);
    res.status(500).json({ error: 'Failed to assign user as an issue resolver' });
  }
};

export { getUserById, createUser, makeUserIssueResolverController };