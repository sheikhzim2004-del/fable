import HeroBanner from "@/components/shared/HeroBanner";

export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <h2 className="flex text-4xl text-red-600 flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">Welcome to Next.js!</h2>
    </div>
  );
}
