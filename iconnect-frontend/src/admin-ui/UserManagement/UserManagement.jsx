import React, { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../../api';
import AppDialog from '../../components/ui/AppDialog';
import ChangeRoleConfirm from './ChangeRoleConfirm';
import toast from 'react-hot-toast';
import TableLoader from './PeopleSkeleton';
import { capitalizeInitials } from '../../utils/functions';
import SearchBox from '../../components/ui/SearchBox';
import { ContentScrollable } from '../../components/ui/ContentScrollable';

const fetchUsers = async () => {
  const response = await  api.get('/api/user/admin/all');
  return response.data;
};

const updateUserRole = async ({ userId, newRole, category_id }) => {
  await api.patch(`/api/user/role/${userId}?categoryId=${category_id}`, { newRole: newRole });
};

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [changeRoleConfirmVisible, setChangeRoleConfirmVisible] = useState(false);

  const openRoleConfirmation = (user) => {
    setSelectedUser(user);
    setChangeRoleConfirmVisible(true);
  }

  const closeRoleConfirmation = () => {
    setChangeRoleConfirmVisible(false);
    setSelectedUser(null);
  };

  const queryClient = useQueryClient();
  const { isLoading, isError, data: userList = [] } = useQuery('allusers', fetchUsers);

    console.log(userList);
  const updateUserMutation = useMutation(updateUserRole, {
    onSuccess: () => {
      queryClient.invalidateQueries('allusers');
      queryClient.invalidateQueries('user');
      toast.success(`Role of user ${selectedUser?.display_name} updated successfully`);
      setChangeRoleConfirmVisible(false);
    },

      onError: (error) => {
      console.error('Error updating  role:', error);
      toast.error("Can't update role at the moment");
      
    },
  });

  const handleRoleChange = (userId, newRole,category_id) => {
    console.log(userId, newRole);
    updateUserMutation.mutate({ userId, newRole, category_id });
  };

  const filteredUsers = useMemo(() => {
  let filtered = userList.filter(user =>
    user.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOrder === 'asc') {
    filtered = filtered.sort((a, b) => (a.role || '').localeCompare(b.role || ''));
  } else {
    filtered = filtered.sort((a, b) => (b.role || '').localeCompare(a.role || ''));
  }

  return filtered;
}, [userList, searchTerm, sortOrder]);


  if (isLoading) {
     return (
      <div className="p-6 w-4/5 mx-auto">
        <h1 className="text-2xl font-semibold mb-4">User Management</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 w-full sm:w-64 focus:outline-none"
          />
        </div>
        <div className="overflow-x-auto">
          <TableLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="p-6 w-4/5 shadow-md">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <div className="mb-4">
        <SearchBox searchTerm={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

      </div>
      <div className="overflow-x-auto overflow-y-auto">
          <table className="min-w-full border border-gray-100 rounded-lg ">
      
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-gray-700">Profile</th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700">Name</th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700">Email</th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700">
                Role
                <button
                  className="ml-1 focus:outline-none"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </button>
              </th>
              <th className="text-left py-2 px-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>


             <tbody className='space-y-2 w-full overflow-y-auto scroll-hide scroll-smooth'>
               {filteredUsers.map((user, index) => (
                 <tr key={user.user_id} className={`bg-${index % 2 === 0 ? 'white' : 'app-background-2'} hover:bg-gray-200 cursor-pointer`}>
                   <td className="py-5 px-3 flex items-center">  <img
                                   src={user?.avatar_url}
                                   alt="User Avatar"
                                   className="w-8 h-8 rounded-full mr-3"
                               /></td>
                   <td className="py-2 px-3">{capitalizeInitials(user.display_name)}</td>
                   <td className="py-2 px-3">{user.email}</td>
                   <td className="py-2 px-3">{user.role}</td>
                   <td className="py-2 px-3">
                     <select
                       value={user.role}
                       // onChange={e => handleRoleChange(user.user_id, e.target.value)}
                       onChange={e => openRoleConfirmation({ user_id: user.user_id, display_name: user.display_name, role: e.target.value })}
   
                     className="border rounded px-2 py-1 w-full focus:outline-none"
                     >
                       <option value="student">User</option>
                       <option value="administrator">Admin</option>
                       <option value="developer">Developer</option>
                       <option value="resolver">Resolver</option>
                     </select>
                   </td>
                 </tr>
               ))}
             </tbody>

        </table>
      </div>
       {/* Change Role Confirmation Dialog */}
      <AppDialog
        defaultOpen={changeRoleConfirmVisible}
        open={changeRoleConfirmVisible}
        setOpenChange={closeRoleConfirmation}
        content={
          <>
          <ChangeRoleConfirm handleChangeRole={handleRoleChange} user={selectedUser} closeRoleConfirmation={closeRoleConfirmation} changeRoleMutation={updateUserMutation}/>
          </>
        }
      ></AppDialog>
    </div>
  );
};

export default UserManagement;
