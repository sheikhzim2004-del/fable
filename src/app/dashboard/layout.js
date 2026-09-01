import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { getUserSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import WriterVerifyPage from '../api/writer-fee/verify/page';

const dashboardLayout = async ({ children }) => {

    const currentUser = await getUserSession()

    console.log("currentUser", currentUser)

    //1. login na thakle redirect
    if (!currentUser) {
        redirect('/login')
    }


    if (!currentUser?.isWriterVerified) {
        return (
            <div className="min-h-[75vh] flex items-center justify-center p-4">
                <WriterVerifyPage currentUser={currentUser}></WriterVerifyPage>
            </div>
        );
    }


    return (
        <div className="flex min-h-screen w-full">
            <DashboardSidebar user={currentUser}></DashboardSidebar>
            <div className="flex-1 flex flex-col">
                <DashboardNavbar user={currentUser}></DashboardNavbar>
                <div className='flex-1 overflow-y-auto'>{children}</div>
            </div>
        </div>
    );
};

export default dashboardLayout;