import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../../api';
import ButtonM from '../../../components/ui/ButtonM';
import Loader from '../../../components/ui/Loader';
import useFirebaseStorage from '../../../hooks/useStoragebucket';
import Input from '../../../components/ui/Input';

const UpdateAvatar = ({userId, closeUpdateConfirmation }) => {
  const queryClient = useQueryClient();
  const {imageUrl, imageUrlLoading, uploadImage} = useFirebaseStorage();


  const updateAvatarMutation = useMutation(
    async (userId) => {
      const response = await api.patch(`/api/user/${userId}/avatar`,{ avatarUrl: imageUrl });
      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
        toast.success('Avatar updated successfully');
        closeUpdateConfirmation();
      },
      onError: (error) => {
        console.error('Error updating avatar:', error);
        toast.error(response.data.message);
      },
    }
  );

  const handleAvatarChange = async (e) => {
    try{
     await uploadImage(e.target.files[0]);
    }
    catch{
        console.error("Error uploading image")
    }
  }

  const handleUpdate = async () => {
    updateAvatarMutation.mutate(userId);
    await closeUpdateConfirmation();
  };

  return (
    <div className="flex flex-col space-y-4 bg-app-background-1 text-app-white p-5">
        <div className='flex justify-center p-5'>

            {imageUrl && (
                <img
                src={imageUrl}
                alt="profile"
                width={100}
                height={100}
                className="rounded-full border-solid border-2 border-blue-300"
                />
            )}
        </div>
     <Input type="file" onChange={handleAvatarChange} className='' />
      <div className="flex justify-end space-x-2">
        <ButtonM
          onClick={handleUpdate}
          className="bg-red-500 px-4 py-2 rounded-md"
          disabled={updateAvatarMutation.isLoading}
        >
          {updateAvatarMutation.isLoading ? (
            <Loader message={'updating..'} color="white" width={20} height={20} />
          ) : (
            'Confirm'
          )}
        </ButtonM>
        <ButtonM
          onClick={closeUpdateConfirmation}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          disabled={updateAvatarMutation.isLoading}
        >
          Cancel
        </ButtonM>
      </div>
    </div>
  );
};

export default UpdateAvatar;
