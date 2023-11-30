import React, { useState } from 'react';
import { api } from '../../api';
import toast from 'react-hot-toast';
import ButtonM from '../ui/ButtonM';
import Loader from '../ui/Loader';
import { useMutation, useQueryClient } from 'react-query';

const CloseIssue = ({ issueToClose, closeIssueConfirmation }) => {
  const queryClient = useQueryClient();

  const closeIssueMutation = useMutation(
    async (issueId) => {
    //   const response = await api.delete(`/api/issues/${issueId}`);
      const response = await api.put(`/api/issues/edit/status/${issueId}`, {status: 'closed'})
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userIssues');
        toast.success(`Issue with ID ${issueToClose?.issueid} deleted successfully`);
        closeIssueConfirmation();
      },
      onError: (error) => {
        console.error('Error deleting issue:', error);
        toast.error("Can't delete issue at the moment");
      },
    }
  );

  const handleClose = () => {
    closeIssueMutation.mutate(issueToClose?.issueid);
  };

  return (
    <div className="flex flex-col space-y-4 bg-app-background-1 text-app-white p-5">
      <p>Are you sure you want to close this issue?</p>
      {/* <p>This action cannot be undone.</p> */}
      <p className="font-bold">
        AIS {issueToClose?.issueid} : {issueToClose?.title}
      </p>
      <div className="flex justify-end space-x-2">
        <ButtonM
          onClick={handleClose}
          className="bg-red-500 px-4 py-2 rounded-md"
          disabled={closeIssueMutation.isLoading}
        >
          {closeIssueMutation.isLoading ? (
            <Loader message={'closing ...'} color="white" width={20} height={20} />
          ) : (
            'Confirm'
          )}
        </ButtonM>
        <ButtonM
          onClick={closeIssueConfirmation}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          disabled={closeIssueMutation.isLoading}
        >
          Cancel
        </ButtonM>
      </div>
    </div>
  );
};

export default CloseIssue;
