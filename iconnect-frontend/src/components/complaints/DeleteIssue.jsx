import React, { useState } from 'react';
import { api } from '../../api';
import toast from 'react-hot-toast';
import ButtonM from '../ui/ButtonM';
import Loader from '../ui/Loader';
import { useMutation, useQueryClient } from 'react-query';

const DeleteIssue = ({ issueToDelete, closeDeleteConfirmation }) => {
  const queryClient = useQueryClient();

  const deleteIssueMutation = useMutation(
    async (issueId) => {
      const response = await api.delete(`/api/issues/${issueId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userIssues');
        toast.success(`Issue with ID ${issueToDelete?.issue_id} deleted successfully`);
        closeDeleteConfirmation();
      },
      onError: (error) => {
        console.error('Error deleting issue:', error);
        toast.error("Can't delete issue at the moment");
      },
    }
  );

  const handleDelete = () => {
    deleteIssueMutation.mutate(issueToDelete?.issue_id);
  };

  return (
    <div className="flex flex-col space-y-4 bg-app-background-1 text-app-white p-5">
      <p>Are you sure you want to delete this issue?</p>
      <p>This action cannot be undone.</p>
      <p className="font-bold">
        AIS {issueToDelete?.issue_id} : {issueToDelete?.title}
      </p>
      <div className="flex justify-end space-x-2">
        <ButtonM
          onClick={handleDelete}
          className="bg-red-500 px-4 py-2 rounded-md"
          disabled={deleteIssueMutation.isLoading}
        >
          {deleteIssueMutation.isLoading ? (
            <Loader message={'deleting..'} color="white" width={20} height={20} />
          ) : (
            'Confirm'
          )}
        </ButtonM>
        <ButtonM
          onClick={closeDeleteConfirmation}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          disabled={deleteIssueMutation.isLoading}
        >
          Cancel
        </ButtonM>
      </div>
    </div>
  );
};

export default DeleteIssue;
