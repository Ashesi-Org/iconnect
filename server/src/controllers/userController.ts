import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { User } from '../types';
import { UserDTO } from '../types/User';
import { notifyUser } from '../services/notificationService';
import { logger } from '../config/logger';


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


const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error:any) {
    console.error('Error in getting all users:', error.message);
    res.status(500).json({ error: 'Failed to retrieve all users' });
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


const changeUserRoleController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  const categoryId = parseInt(req.query.categoryId as string, 10);

  const { newRole } = req.body; 
  try {
    const updatedUser = await userService.changeUserRole(userId, newRole, categoryId);
    // Send a notification to the user
    logger.info(`User ${userId} changed their role to ${newRole}`);
    notifyUser(
      userId, "status", `Your role has been changed to ${newRole}` 
    )
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ status: 'success', message: 'User role updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error changing user role:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to change user role' });
  }
};


const makeUserIssueResolverController = async (req: Request, res: Response) => {
  try {
    const { userId, categoryId } = req.body; 

    //if the user exists
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

export { getAllUsers, getUserById, createUser,changeUserRoleController, makeUserIssueResolverController };