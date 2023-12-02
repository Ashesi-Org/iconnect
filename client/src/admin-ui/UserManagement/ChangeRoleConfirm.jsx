import React from 'react'
import ButtonM from '../../components/ui/ButtonM';
import Loader from '../../components/ui/Loader';

const ChangeRoleConfirm = ({user, closeRoleConfirmation, handleChangeRole, changeRoleMutation}) => {
    console.log(user);
   
return (
    <div className="flex flex-col space-y-4 bg-app-background-1 text-app-white p-5">
      <p>Are you sure you want to change user role?</p>
      <p>This action can be undone later.</p>
      <p className="font-bold">
        {user?.display_name} : {user?.role}
      </p>
      <div className="flex justify-end space-x-2">
        <ButtonM
           onClick={() => handleChangeRole(user.user_id, user.role)}
          className="bg-red-500 px-4 py-2 rounded-md"
          disabled={changeRoleMutation.isLoading}
        >
          {changeRoleMutation.isLoading ? (
            <Loader message={'updating..'} color="white" width={20} height={20} />
          ) : (
            'Confirm'
          )}
        </ButtonM>
        <ButtonM
          onClick={closeRoleConfirmation}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          disabled={changeRoleMutation.isLoading}
        >
          Cancel
        </ButtonM>
      </div>
    </div>
  );
}

export default ChangeRoleConfirm