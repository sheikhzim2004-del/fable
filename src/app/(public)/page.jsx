import FeaturedEbooksSection from "@/components/home/FeaturedEbooksSection";
import HeroBanner from "@/components/home/HeroBanner";
import { getFeaturedEbooks } from "@/lib/api/books";

export default async function Home() {

  const featuredBooks =await getFeaturedEbooks()

  // Terminal e check korar jonno:
    console.log("Featured books fetched count:", featuredBooks?.length);


  return (
    <div>
      <HeroBanner></HeroBanner>


      <FeaturedEbooksSection books={featuredBooks}></FeaturedEbooksSection>

      <h2 className="flex text-4xl text-red-600 flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">Welcome to Next.js!</h2>
    </div>
  );
}
