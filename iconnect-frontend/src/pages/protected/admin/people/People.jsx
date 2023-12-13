import React from 'react'
import { AppLayout } from '../../../../components/ui/AppLayout'
import UserManagement from '../../../../admin-ui/UserManagement/UserManagement'
import AppSideBar from '../../../../components/common/AppSideBar'

const People = () => {
  return (
    <AppLayout   
      sidebar={<AppSideBar/>}
      column={
          <UserManagement />
      }


    />
  )
}

export default People