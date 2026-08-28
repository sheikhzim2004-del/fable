export const dynamic = "force-dynamic";


import EbookGenresSection from "@/components/home/EbookGenresSection";
import FeaturedEbooksSection from "@/components/home/FeaturedEbooksSection";
import HeroBanner from "@/components/home/HeroBanner";
import TopWritersSection from "@/components/home/TopWritersSection";
import { getFeaturedEbooks, getTopWriters } from "@/lib/api/books";

export default async function Home() {

  const featuredBooks =await getFeaturedEbooks()
  const topWriters = await getTopWriters()
  console.log("top writers", topWriters)


  

  return (
    <div>
      <HeroBanner></HeroBanner>


      <FeaturedEbooksSection books={featuredBooks}></FeaturedEbooksSection>
      <EbookGenresSection></EbookGenresSection>
      <TopWritersSection writers={topWriters}></TopWritersSection>

    </div>
  );
}
