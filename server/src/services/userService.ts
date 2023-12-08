import { query } from '../utils/db';
import { User } from '../types';
import { UserDTO } from '../types/User';
import { logger } from '../config/logger';

const getUserById = async (userId: number): Promise<User | null> => {
  try {
    const result = await query('SELECT * FROM user_data WHERE user_id = $1', [userId]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw new Error('Failed to retrieve user');
  }
};


const getAllUsers = async (): Promise<User[]> => {
  try {
    const result = await query('SELECT * FROM user_data');
    return result.rows;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw new Error('Failed to retrieve users');
  }
};


const changeUserRole = async (userId: number, newRole: string, categoryId: number): Promise<User | null> => {
  try {
    // Check if the user exists
    logger.info(`Changing role of user ${userId} to ${newRole}`); 
    const user = await getUserById(userId);
    if (!user) {
      return null; 
    }
    // Update the user's role
    const updateResult = await query('UPDATE user_data SET role = $1 WHERE user_id = $2 RETURNING *', [
      newRole,
      userId,
    ]);
    categoryId !== 0 && await makeUserIssueResolver(userId, categoryId);
    return updateResult.rows[0];
  } catch (error) {
    console.error('Error changing user role:', error);
    throw new Error('Failed to change user role');
  }
};


const createUser = async (userData: User): Promise<User> => {
  try {
    const { role, email, password, name, unique_id, language } = userData;
    const result = await query(
      'INSERT INTO users (role, email, password, name, unique_id, language) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [role, email, password, name, unique_id, language]
    );
    return result.rows[0];
  } catch (error:any) {
    console.error('Error creating user:', error);
    if (error.code === '23505') {
      // Unique violation (duplicate key)
      throw new Error('Email or unique_id is already in use');
    }
    throw new Error('Failed to create user');
  }
};

const makeUserIssueResolver = async (userId: number, categoryId: number) => {

  const insertQuery = `
    INSERT INTO issue_resolvers (user_id, category_id)
    VALUES ($1, $2)
  `;

  const queryParams = [userId, categoryId];

  try {
   const issueResolver =  await query(insertQuery, queryParams);
   return issueResolver.rows[0];
  } catch (error) {
    console.error('Error creating issue resolver:', error);
    throw new Error('Failed to create issue resolver');

  }
};



export { getAllUsers, getUserById, changeUserRole, createUser, makeUserIssueResolver };