import ProfileClient from '@/components/dashboard/ProfileClient';
import { getUserSession } from '@/lib/session';
import React from 'react';

const ReaderProfilePage = async () => {

    const user = await getUserSession()

    return (
        <div>
            <ProfileClient user={user}></ProfileClient>
        </div>
    );
};

export default ReaderProfilePage;