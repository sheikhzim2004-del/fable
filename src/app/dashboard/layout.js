import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { getUserSession } from '@/lib/session';

const dashboardLayout = async({ children }) => {

    const user =await getUserSession()

    return (
        <div className="flex min-h-screen w-full">
                <DashboardSidebar user={user}></DashboardSidebar>
            <div className="flex-1 flex flex-col">
                <DashboardNavbar user={user}></DashboardNavbar>
                <div className='flex-1 overflow-y-auto'>{children}</div>
            </div>
        </div>
    );
};

export default dashboardLayout;