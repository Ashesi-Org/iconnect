// reportController.ts
import { Request, Response, NextFunction } from 'express';
import { generateReportData } from '../services/report';

const generateReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reportData: any = await generateReportData();
    res.json({ success: true, data: reportData });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

export { generateReport };
