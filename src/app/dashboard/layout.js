'use client'

import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

const dashboardLayout = ({ children }) => {

    return (
        <div className="flex min-h-screen w-full">
                <DashboardSidebar></DashboardSidebar>
            <div className="flex-1 flex flex-col">
                <DashboardNavbar></DashboardNavbar>
                <div className='flex-1 overflow-y-auto'>{children}</div>
            </div>
        </div>
    );
};

export default dashboardLayout;