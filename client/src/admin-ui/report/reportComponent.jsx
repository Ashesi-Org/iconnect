import { Bot, Download, ToggleLeftIcon } from 'lucide-react';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import AiReport from './AiReport';
import AppDialog from '../../components/ui/AppDialog';

const ReportComponent = ({ data }) => {

  console.log(data);
 const [showCharts, setShowCharts] = useState(false);
  const toggleView = () => {
    setShowCharts(!showCharts);
  };

  const [generateConfirmationVisible, setGenerateConfirmationVisible] = useState(false);


  const openGenerateConfirmation = () => {
    setGenerateConfirmationVisible(true);

  };

  const closeGenerateConfirmation = () => {
    setGenerateConfirmationVisible(false);
    onIssueDeleted();
  };


    const renderTotalIssuesChart = () => {
    // Prepare data for the Total Issues by Status chart
    const chartData = data?.totalIssuesByStatus?.map((issue) => ({
      name: issue.status,
      value: parseInt(issue.total_count), // Convert to number for chart
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Define colors for pie segments

    return (
      <div className="container shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Total Issues by Status</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    );
  };



const renderTotalIssuesByStatus = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Total Issues by Status</h2>
      <div className="grid grid-cols-2 gap-4">
        {data?.totalIssuesByStatus?.map((issue, index) => {
          const { status, total_count } = issue;
          let statusMessage = '';

          if (status === 'open') {
            statusMessage = 'Open issues need immediate attention.';
          } else if (status === 'closed') {
            statusMessage = 'Closed issues signify closed resolved problems.';
          }

          return (
            <div key={index} className="border rounded p-4">
              <p className="text-lg font-semibold">{status}</p>
              <p className="text-gray-600">Total Count: {total_count}</p>
              {statusMessage && <p className="mt-2">{statusMessage}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

  const renderPriorityDistribution = () => {
    // Display priority distribution
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Priority Distribution</h2>
        <div className="grid grid-cols-2 gap-4">
          {data?.priorityDistribution?.map((priority, index) => (
            <div key={index} className="border rounded p-4">
              <p className="text-lg font-semibold">{priority.priority}</p>
              <p className="text-gray-600">Priority Count: {priority.priority_count}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };



  const renderPriorityDistributionChart = () => {
    // Prepare data for Priority Distribution chart
    const chartData = data?.priorityDistribution?.map((priority) => ({
      name: priority.priority,
      value: parseInt(priority.priority_count), // Convert to number for chart
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28']; // Define colors for bars

    return (
      <div className='container shadow-md p-4'>
        <h2 className="text-xl font-semibold mb-4">Priority Distribution (Stacked Bar Chart)</h2>
        <BarChart width={400} height={300} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(chartData[0]).map((key, index) => {
            if (key !== 'name') {
              return (
                <Bar
                  key={index}
                  dataKey={key}
                  stackId="a"
                  fill={COLORS[index % COLORS.length]}
                />
              );
            }
            return null;
          })}
        </BarChart>
      </div>
    );
  };


  const renderIssuesByCategory = () => {
    // Display issues by category
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Issues by Category</h2>
        <div className="grid grid-cols-2 gap-4">
          {data?.issuesByCategory?.map((category, index) => (
            <div key={index} className="border rounded p-4">
              <p className="text-lg font-semibold">{category.category_name}</p>
              <p className="text-gray-600">Issue Count: {category.issue_count}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

const renderRecentIssueActivity = () => {
  // Display recent issue activity
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Recent Issue Activity
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {data?.recentIssueActivity?.map((issue, index) => (
          <div key={index} className="border rounded p-4">
            <p className="text-lg font-semibold">
              Issue ID: {issue.issue_id}
            </p>
            <p className="text-slate-500">
              Description: {issue.description}
            </p>
            <p className="text-slate-500">
              Status: {issue.status}
            </p>
            <p className="text-slate-500">
              Created At: {new Date(issue.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-3">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl text-slate-400 font-semibold">Weekly Reports</h2>
        <div className="flex gap-2 items-center">
         {/* <button onClick={handlePrint}>Download as PDF</button>
          */}
          <Download className='cursor-pointer hover:text-app-brown ' size={30} />
          <Bot className='cursor-pointer hover:text-app-brown'  width={30} height={30} onClick={()=>openGenerateConfirmation()}/>
          
        <button
          className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-app-brown"
          onClick={toggleView}
        >
          {showCharts ? 'Show General Reports' : 'Show Chart Reports'}
        </button>
        </div>
      </div>
        {showCharts ?
        <div className="grid grid-cols-3 gap-6">
          {renderTotalIssuesChart()}
          {renderPriorityDistributionChart()}
                    {renderPriorityDistributionChart()}

          
        </div>:<>
        
        {renderTotalIssuesByStatus()}
        {renderPriorityDistribution()}
        {renderIssuesByCategory()}
        {/* {renderRecentIssueActivity()} */}
        </>}

         {/* Delete Confirmation Dialog */}
        <AppDialog
          defaultOpen={generateConfirmationVisible}
          open={generateConfirmationVisible}
          setOpenChange={closeGenerateConfirmation}
          content={
            <>
            <AiReport  stat={data} closeGenerateConfirmation={closeGenerateConfirmation}/>
            </>
          }
        ></AppDialog>
    </div>
  );
};

export default ReportComponent;
