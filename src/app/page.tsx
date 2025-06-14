import Hero from "@/components/Home/Hero";
import Categories from "@/components/Home/Categories";
import Featured from "@/components/Home/Featured";
import DeliveryInfo from "@/components/Home/DeliveryInfo";
import Advantages from "@/components/Home/Advantages";

export default function HomePage() {
  return (
    <main className="mb-20">
      <Hero />
      <Categories />
      <Featured />
      <DeliveryInfo />
      <Advantages />
    </main>
  );
}
