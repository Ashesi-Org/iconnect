import React, { useContext } from 'react';
import { api } from '../../api';
import toast from 'react-hot-toast';
import { userContext } from '../../contexts/UserContext';

const IssueAssignee = ({privacy, category_name, issueId, assignees, availableResolvers }) => {

  const {user}=useContext(userContext)
   
  const assign = async ({resolverId}) =>{
    try {
      
      const response = await api.post("/api/issues/assign", {issueId, resolverId});
  
      if(response.data.success){
        toast.success(response.data.message)
      }
  
      else if(response.data.error){
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Cant assigne resolver at the moment") 
    }

  }

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-4">Assignees</h2>
      {assignees?.length > 0 ? 
      <ul >
        {assignees.map((assignee) => (
          <div key={assignee.resolver_id} className='flex items-center border-b border-slate-100'><img
            src={assignee?.resolver_avatar_url}
            alt="User Avatar"
            className="w-4 h-4 rounded-full mr-3" /><li key={assignee.resolver_id}>
              {assignee.resolver_name}
            </li></div>
        ))}
      </ul> : <p>No assignees found</p>

        }

      {/* Option to assign */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Available Issue Resolvers</h2>
        {availableResolvers?.length === 0 && <p>No resolvers found</p>} 
        <ul>
          {availableResolvers?.map((resolver) => (
            <li key={resolver.resolver_id} className="mb-2">
              {resolver.display_name}
              { user.role !== "student" &&
                <button className="ml-2 px-3 py-1 bg-slate-500 text-white rounded-md" onClick={() => assign({resolverId: resolver.resolver_id})}> 
                  Assign
                </button>
              }
            </li>
          ))}
        </ul>
      </div>


       <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Issue Details</h2>
        <ul>
          
            <li  className="mb-2">
              Category -- {category_name}
            </li>
            <li  className="mb-2">
              Privacy -- {privacy}
            </li>
      
        </ul>
      </div>
     
    </div>
  );
};

export default IssueAssignee;
