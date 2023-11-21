import React, { useState } from 'react';
import { ToastBar } from 'react-hot-toast';
import { api } from '../../api';
import ButtonM from '../ui/ButtonM';
import Input from '../ui/Input';

const EditComplaint = ({ issueId, issueTitle, issueDescription, closeModal }) => {
  const [title, setTitle] = useState(issueTitle);
  const [description, setDescription] = useState(issueDescription);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/api/issues/edit/${issueId}`, { title: title, description: description });
      if (response.data.success) {
        <ToastBar type="success" text="Issue updated successfully!" autoClose={3000} />;
      } else {
        console.error('Issue update failed:', response.data.message);
        <ToastBar type="error" text="update unsuccessful" autoClose={3000} />;
      }
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 bg-app-background-2 text-app-white p-5">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Issue #{issueId}</h3>
      <div>
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
          className={"inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-app-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"}
          onClick={handleSave}
        >
          Save
        </ButtonM>
      </div>
    </div>
  );
};

export default EditComplaint;
