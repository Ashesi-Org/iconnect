import React from "react";
import { AppLayout } from "../../components/ui/AppLayout";
import AppSideBar from "../../components/common/AppSideBar";
import MarkdownEditor from "../../admin-ui/report/MarkDownEditor";
import { ContentScrollable } from "../../components/ui/ContentScrollable";
import ReportComponent from "../../admin-ui/report/reportComponent";
import { useQuery } from "react-query";
import { api } from "../../api";


const Reports = () => {
  const {data:reportData} = useQuery('reportsData', 
   async () => {
    const res = await api.get('/api/reports/generate-report');
    return res.data.data;
  },

  
  );
  
console.log(reportData);
  return (
    <AppLayout column={
      <ContentScrollable content={
    <><div className="flex flex-col">
          
          <div>
            {/* <h1 className="text-3xl font-bold mb-8">General Reports</h1> */}
            {reportData && <ReportComponent data={reportData} />}
          </div>
        </div>
        <h2 className="text-slate-500 pl-4">Add a customized and formatted additional insights to the report</h2>
        <MarkdownEditor />
        </>}
  
    />}
    sidebar={<><AppSideBar /></>}
    />
  );
};

export default Reports;
