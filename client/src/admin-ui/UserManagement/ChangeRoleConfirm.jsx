import React, { useState } from 'react'
import ButtonM from '../../components/ui/ButtonM';
import Loader from '../../components/ui/Loader';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger } from '../../components/ui/select';
import { categories } from '../../components/hotline-room/hotline-feed/Constants';

const ChangeRoleConfirm = ({ user, closeRoleConfirmation, handleChangeRole, changeRoleMutation }) => {
  console.log(user);
  const [selectedOption, setSelectedOption] = useState(0);

  const handleCategoryChange = (e) => {
    setSelectedOption(e);
  };

  return (
    <div className="flex flex-col space-y-4 bg-app-background-1 text-app-white p-5">
      <p>Are you sure you want to change user role?</p>
      <p>This action can be undone later.</p>
      <p className="font-bold">
        {user?.display_name} : {user?.role}
      </p>
      {
        user?.role === "resolver" && (
          <>
            <div className="flex items-center h-[80px]">
              <span className="text-[18px] font-medium text-app-white mr-2">Update Status:</span>
              <Select value={selectedOption} onValueChange={(val) => handleCategoryChange(val)}>

                <SelectTrigger>
                  {selectedOption || 'Select a Category'}
                </SelectTrigger>
                <SelectContent>
                   {categories.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index + 1} >
                        {item}
                      </SelectItem>
                    );
                  })}
                
                  <SelectSeparator />
                </SelectContent>
              </Select>

            </div>
          </>
        )
      }
      <div className="flex justify-end space-x-2">
        <ButtonM
          onClick={() => handleChangeRole(user.user_id, user?.role, selectedOption)}
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