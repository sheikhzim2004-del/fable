import ManageUsersTable from '@/components/dashboard/admin/ManageUsersTable';
import { getAllUsers } from '@/lib/api/books';
import React from 'react';

const adminManageUsersPage = async() => {

    const users = await getAllUsers()
    console.log("initialUsers", users)

    return (
        <div>
            <ManageUsersTable initialUsers={users}></ManageUsersTable>
        </div>
    );
};

export default adminManageUsersPage;