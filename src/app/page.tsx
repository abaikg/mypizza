import Hero from "@/components/Home/Hero";
import Categories from "@/components/Home/Categories";
import Featured from "@/components/Home/Featured";

export default function HomePage() {
  return (
    <main className="mb-20">
      <Hero />
      <Categories />
      <Featured />
    </main>
  );
}
