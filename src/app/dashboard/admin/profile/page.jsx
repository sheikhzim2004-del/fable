import ProfileClient from '@/components/dashboard/ProfileClient';
import { getUserSession } from '@/lib/session';
import React from 'react';

const adminProfilePage = async() => {

    const user = await getUserSession()

    return (
        <div>
            <ProfileClient user={user}></ProfileClient>
        </div>
    );
};

export default adminProfilePage;