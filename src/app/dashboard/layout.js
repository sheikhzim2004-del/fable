import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const layout = ({ children }) => {
    return (
        <div className="flex min-h-screen w-full">
            <DashboardSidebar></DashboardSidebar>
            <div className='flex-1'>{children}</div>
        </div>
    );
};

export default layout;