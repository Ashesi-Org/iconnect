
import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const swearRouter = express.Router();
swearRouter.get('/check', async (req:Request, res:Response) => {
  const { text } = req.query;
  const API_KEY ='cf49873a30f57f4881fc7f9f102582d4';
  const endpoint = `http://api1.webpurify.com/services/rest/?method=webpurify.live.check&api_key=${API_KEY}&text=${encodeURIComponent(text as string)}&format=json`;
  try {
    const response = await axios.get(endpoint);
    const data = await response.data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error checking for swear words' });
  }
});


export default swearRouter;
