import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../api';
import ButtonM from '../ui/ButtonM';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger } from '../ui/select';
import Loader from '../ui/Loader';
import Input from '../ui/Input';

const EditComplaint = ({onIssueUpdated, priority, issueId, issueTitle, issueDescription, possiblePriorities, closeModal }) => {
  const [title, setTitle] = useState(issueTitle);
  const [description, setDescription] = useState(issueDescription);
  const [selectedPriority, setSelectedPriority] = useState(priority);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const editIssueMutation = useMutation(
    async ({ issueId, title, description, priority }) => {
      const response = await api.put(`/api/issues/edit/${issueId}`, { title, description, priority });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userIssues');
        toast.success('Issue updated successfully');
        closeModal();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Can\'t update issue at the moment');
        console.error('Error updating issue:', error);
      },
    }
  );

  const handlePriorityChange = (e) => {
    setSelectedPriority(e);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    setIsSaving(true);
    editIssueMutation.mutate({
      issueId,
      title,
      description,
      priority: selectedPriority,
    });
    onIssueUpdated();
  };



  return (
    <div className="flex flex-col space-y-4 bg-app-background-2 text-app-white p-5">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Issue #{issueId}</h3>
      <div>
        <div className="flex items-center h-[80px]">
        <span className="text-[18px] font-medium text-app-white mr-2">Priority</span>
         <Select value={selectedPriority} onValueChange={(val) => handlePriorityChange(val)}>
           
            <SelectTrigger>
            {selectedPriority || 'Select an Option'}
            </SelectTrigger>
            <SelectContent>
            {possiblePriorities.map((option) => (
                <SelectItem key={option} value={option}>
                {option}
                </SelectItem>
            ))}
            <SelectSeparator />
            </SelectContent>
        </Select>
       
      </div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <Input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitleChange}
          classNames={"mt-1 focus:ring-indigo-500  block w-full"}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={description}
          onChange={handleDescriptionChange}
          className="mt-1  block w-full shadow-lg sm:text-sm bg-app-background-2 border-gray-300 rounded-md"
        ></textarea>
      </div>
      <div>

         <ButtonM
          type="primary"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-app-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          onClick={handleSave}
          disabled={isSaving || editIssueMutation.isLoading}
        >
          {editIssueMutation.isLoading ? <Loader width={20} height={20} message={'  checking...'}/> : 'Apply Changes'}
        </ButtonM>
        
      </div>
    </div>
  );
};

export default EditComplaint;
