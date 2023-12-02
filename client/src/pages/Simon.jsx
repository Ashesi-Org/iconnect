import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import React , {useState}from "react";
import MapContainer from "../components/complaints/MapContainer";
import { AppLayout } from "../components/ui/AppLayout";
import AppSideBar from "../components/common/AppSideBar";
import MarkdownEditor from "../components/report/MarkDownEditor";
import { ContentScrollable } from "../components/ui/ContentScrollable";
import ReportComponent from "../components/report/reportComponent";
import { useQuery } from "react-query";
import { api } from "../api";


const Simon = () => {

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
          <AzureBlobUploader />
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

export default Simon;





const AzureBlobUploader = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  // Azure Storage Connection Config
  const connectionString = 'qQAgVY/t+RziVUjEDZXxjXCqfGXzjMVhtulssEP/GtTuHQi+8DSSgHSePZNXA7nRnHxOB3cPSvs5+AStN3nzsA==';
  const containerName = 'iconnect';

  const blobServiceClient = new BlobServiceClient(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;

    const blobName = `${new Date().getTime()}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadBrowserData(file);
      const url = blockBlobClient.url;
      setFileUrl(url);
      console.log('File uploaded successfully. URL:', url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
      {fileUrl && (
        <div>
          <p>File URL: <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a></p>
          {/* You can use this URL to download or display the uploaded file */}
        </div>
      )}
    </div>
  );
};

// export default AzureBlobUploader;
