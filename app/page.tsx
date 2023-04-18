import getHeroes from "./actions/getHeroes";
import HeroList from "./components/HeroList";
import { Button } from "./components/ui/Button";

export default async function Home() {
  const heroes = await getHeroes();
  return (
    <>
      <main className="mt-36">
        <div className="text-center">
          <h1 className="text-[44px] font-bold leading-10 tracking-tight md:text-[64px] md:leading-[60px]">
            Elevate Your Mobile <br className="hidden md:block" /> Legends Game
          </h1>
          <p className="pt-3 text-[16px] leading-tight md:text-[20px]">
            Access hero stats, optimal builds, and connect{" "}
            <br className="hidden md:block" /> with a community of expert
            players.
          </p>
          <Button className="mt-8">Get Started</Button>
        </div>
        {/* <div className="mt-[100px] text-start">
          <h1 className="text-[28px] font-bold leading-10 tracking-tight md:text-[36px] md:leading-[60px]">
            Explore Heroes
          </h1>

          <HeroList heroes={heroes} /> 
        </div> */}
      </main>
    </>
  );
}
