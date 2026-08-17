import TotalEbooks from "@/components/dashboard/writer/TotalEbooks";
import PublishedEbooks from "@/components/dashboard/writer/PublishedEbooks";
import UnpublishedEbooks from "@/components/dashboard/writer/UnpublishedEbooks";
import TotalSales from "@/components/dashboard/writer/TotalSales";
import RecentEbooks from "@/components/dashboard/writer/RecentEbooks";
import RecentSales from "@/components/dashboard/writer/RecentSales";

export default function WriterDashboard() {
  return (
    <div className="space-y-6 mx-4">
      <h1 className="text-3xl font-bold text-text-primary text-center mt-4">
        Writer Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <TotalEbooks />
        <PublishedEbooks />
        <UnpublishedEbooks />
        <TotalSales />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <RecentEbooks />
        <RecentSales />
      </div>
    </div>
  );
}