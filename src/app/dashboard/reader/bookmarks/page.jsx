// src/app/dashboard/reader/bookmarks/page.jsx
import BookmarkGalleryView from "@/components/dashboard/BookmarkGalleryView";
import { getUserSession } from "@/lib/session";
// import { auth } from "@/lib/auth"; // Better-Auth বা আপনার সেশন মেথড
// import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function ReaderBookmarksPage() {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

  const currentUser =await getUserSession();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <BookmarkGalleryView currentUser={currentUser} />
    </div>
  );
}