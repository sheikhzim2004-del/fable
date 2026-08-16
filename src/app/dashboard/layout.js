import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const dashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen w-full">
            <DashboardSidebar></DashboardSidebar>
            <div className="flex-1 flex flex-col">
                <DashboardNavbar></DashboardNavbar>
                {/* <div className=" h-14 border w-full shadow-md p-4">Navbar</div> */}
                <div className='flex-1 h-screen'>{children}</div>
            </div>
        </div>
    );
};

export default dashboardLayout;