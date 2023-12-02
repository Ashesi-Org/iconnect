import { Category } from "../types";
import { query } from "../utils/db";


const getIssueResolversForCategory = async (categoryId: number) => {
  const queryText = `
    SELECT ir.resolver_id, u.email,u.avatar_url, u.display_name, u.role
    FROM user_data u
    JOIN issue_resolvers ir ON u.user_id = ir.user_id
    WHERE ir.category_id = $1;
  `;

  try {
    const result = await query(queryText, [categoryId]);
    return result.rows;
  } catch (error) {
    console.error('Error retrieving issue resolvers for category:', error);
    throw new Error('Failed to retrieve issue resolvers for category');
  }
};


const getCategoryById = async (categoryId: number): Promise<Category | null> => {
  try {
    const result = await query('SELECT * FROM categories WHERE category_id = $1', [categoryId]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error retrieving category:', error);
    throw new Error('Failed to retrieve category');
  }
};


const getAllCategories = async (): Promise<Category[]> => {
  try {
    const result = await query('SELECT * FROM categories');
    return result.rows;
  } catch (error) {
    console.error('Error retrieving categories:', error);
    throw new Error('Failed to retrieve categories');
  }
};


const createCategory = async (categoryData: Category): Promise<Category> => {
  try {
    const { name } = categoryData;
    const result = await query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [name]
    );
    return result.rows[0];
  } catch (error: any) {
    console.error('Error creating category:', error);
    if (error.code === '23505') {
      // Unique violation (duplicate key)
      throw new Error('Category name is already in use');
    }
    throw new Error('Failed to create category');
  }
};

export { getCategoryById, createCategory, getAllCategories, getIssueResolversForCategory };
