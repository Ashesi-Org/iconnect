import { query } from '../utils/db';
import { User } from '../types';

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
export { getUserById, createUser, makeUserIssueResolver };
