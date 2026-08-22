import EbookGenresSection from "@/components/home/EbookGenresSection";
import FeaturedEbooksSection from "@/components/home/FeaturedEbooksSection";
import HeroBanner from "@/components/home/HeroBanner";
import TopWritersSection from "@/components/home/TopWritersSection";
import { getFeaturedEbooks, getTopWriters } from "@/lib/api/books";

export default async function Home() {

  const featuredBooks =await getFeaturedEbooks()
  const topWriters = await getTopWriters()
  console.log("top writers", topWriters)

  // Terminal e check korar jonno:
    // console.log("Featured books fetched count:", featuredBooks?.length);


  return (
    <div>
      <HeroBanner></HeroBanner>


      <FeaturedEbooksSection books={featuredBooks}></FeaturedEbooksSection>
      <EbookGenresSection></EbookGenresSection>
      <TopWritersSection writers={topWriters}></TopWritersSection>

      <h2 className="flex text-4xl text-red-600 flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">Welcome to Next.js!</h2>
    </div>
  );
}
