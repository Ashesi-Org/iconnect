import React, { useState } from 'react';
import { api } from '../../api';
import ButtonM from '../ui/ButtonM';
import Loader from '../ui/Loader';
import {Select, SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,} from '../ui/select';

  import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from '../ui/toast';
const UpdateComplaintStatus = ({ issueId, issueStatus, possibleStatuses, closeModal }) => {


  const [isSaving, setIsSaving] = useState(false);
  const [selectedOption, setSelectedOption] = useState(issueStatus);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleStatusChange = (e) => {
    setSelectedOption(e);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await api.put(`/api/issues/edit/status/${issueId}`, {
        status: selectedOption,
      });
      if (response.data.success) {
        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
          window.location.reload();
        }, 3000);
          
       
      } else {
        setShowErrorToast(true);
        setTimeout(() => {
          setShowErrorToast(false);
        }, 3000);
      
        // closeModal();
      }
    } catch (error) {
      console.error('Error updating issue:', error);
  setShowErrorToast(true);
        setTimeout(() => {
          setShowErrorToast(false);
        }, 3000);
      

    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="flex flex-col space-y-4 bg-app-background-2 text-app-white p-5">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Issue #{issueId}</h3>
      
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-700 mr-2">Current Status:</span>
        <span className="px-2 py-1 text-xs font-semibold rounded-md bg-gray-500 text-white">{issueStatus}</span>
      </div>
      
      <div className="flex items-center h-[80px]">
        <span className="text-[18px] font-medium text-app-white mr-2">Update Status:</span>
         <Select value={selectedOption} onValueChange={(val) => handleStatusChange(val)}>
           
            <SelectTrigger>
            {selectedOption || 'Select an Option'}
            </SelectTrigger>
            <SelectContent>
            {possibleStatuses.map((option) => (
                <SelectItem key={option} value={option}>
                {option}
                </SelectItem>
            ))}
            <SelectSeparator />
            </SelectContent>
        </Select>
       
      </div>
      
      <div>
        <ButtonM
          type="primary"
          className="flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white  hover:bg-app-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
          onClick={handleSave}
        //   disabled={isSaving}
        >
          {isSaving ? <Loader width={20} height={20}/>: 'update status'}
        </ButtonM>
      </div>
            {/* Toast components */}
      {showSuccessToast && (
        <ToastProvider>
          <ToastViewport>
            <Toast>
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>The issue status has been updated.</ToastDescription>
              <ToastClose onClick={() => setShowSuccessToast(false)} />
            </Toast>
          </ToastViewport>
        </ToastProvider>
      )}
      {showErrorToast && (
        <ToastProvider>
          <ToastViewport>
            <Toast>
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>Failed to update issue status.</ToastDescription>
              <ToastClose onClick={() => setShowErrorToast(false)} />
            </Toast>
          </ToastViewport>
        </ToastProvider>
      )}

    </div>
  );
};

export default UpdateComplaintStatus;
