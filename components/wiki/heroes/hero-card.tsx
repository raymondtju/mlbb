import { heros } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";

const HeroCard = ({ hero }: { hero: heros }) => {
  return (
    <GradiantCard className="w-fit p-2">
      <div
        className="h-32 w-24 overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://${hero.img})`,
        }}
      />
      <p className="mt-2 cursor-pointer rounded-md bg-navy-900/60 text-center text-[14px] font-medium shadow-inner shadow-navy-500/40 backdrop-blur-md">
        {hero.name}
      </p>
    </GradiantCard>
  );
};

export default HeroCard;
