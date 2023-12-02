import { queries } from "./reportqueries";
import { query } from "../utils/db";
import { logger } from "../config/logger";

export const generateReportData = async (): Promise<any> => {
  try {
    const reportData: any = {};

    for (const queryName in queries) {
      const newQuery: string = queries[queryName];
      const result = await query(newQuery);
      reportData[queryName] = result.rows;
    }

    return reportData;
  } catch (error) {
    logger.error(`Error generating report data: ${error}`);
    throw new Error(`Error generating report data: ${error}`);
  }
};
