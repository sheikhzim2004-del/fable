'use client'
import { useSession } from '@/lib/auth-client';
import React from 'react';

const WriterDashboardHomePage = () => {

    const {data: session, isPending} = useSession()
    console.log(session)

    return (
        <div>
            <h2 className='text-4xl'>Wellcome Back, {session?.user?.name}!</h2>
        </div>
    );
};

export default WriterDashboardHomePage;