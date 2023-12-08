import React from 'react'
import AppSideBar from '../../components/common/AppSideBar'
import { AppLayout } from '../../components/ui/AppLayout'

const AssignedIssues = () => {
  return (
    <div>
        <AppLayout 
            sidebar={<AppSideBar />}
            column={<h1>Assigned Issues</h1>}
        
        />

    </div>
  )
}

export default AssignedIssues