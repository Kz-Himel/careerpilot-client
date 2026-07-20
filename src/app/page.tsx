import Banner from "@/components/home/Banner";
import PopularRoadmaps from "@/components/home/PopularRoadmaps";
import PopularCategories from "@/components/home/PopularCategories";
import Image from "next/image";
import WhereToStart from "@/components/home/WhereToStart";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Banner />
      <PopularRoadmaps />
      <PopularCategories />
      <WhereToStart />
      <FAQ />
    </div>
  );
}
