import { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';

const useAzureBlobUploader = (connectionString,token, containerName) => {
  const [fileUrl, setFileUrl] = useState('');

  // Azure Storage Connection Config
    const blobServiceClient = new BlobServiceClient(connectionString );
    const containerClient = blobServiceClient.getContainerClient(containerName);
  

  const uploadFile = async (file) => {
    if (!file) return null;

    const blobName = `${new Date().getTime()}-${file.name}`;
    const blockBlobClient =  containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadBrowserData(file);
      const url = blockBlobClient.url;
      setFileUrl(url);
      console.log('File uploaded successfully. URL:', url);
      return url;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  return { uploadFile, fileUrl };
};

export default useAzureBlobUploader;
