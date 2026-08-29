import BookmarkGalleryView from "@/components/dashboard/BookmarkGalleryView";
import { getUserSession } from "@/lib/session";
export const dynamic = "force-dynamic";



export default async function WriterBookmarksPage() {

  const currentUser = await getUserSession()
  console.log("current user", currentUser)

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <BookmarkGalleryView currentUser={currentUser} />
    </div>
  );
}