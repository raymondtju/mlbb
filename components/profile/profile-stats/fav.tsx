"use client";

import { GradiantCard } from "../../shared/gradiant-card";
import { Progress } from "../../shared/progress";

interface FavouritesProps {
  title: string;
  viewMatchPlayed: {
    total: number;
    data: {
      id: string;
      total: number;
      win: number;
      name: string;
      _id: string;
    }[];
  }[];
  matchType: number;
  isBound: boolean;
}

const Favourites: React.FC<FavouritesProps> = ({
  title,
  viewMatchPlayed,
  matchType,
}) => {
  const data = (viewMatchPlayed && viewMatchPlayed[matchType]?.data) || [];
  return (
    <GradiantCard title={title} className="md:h-[234px]">
      {data.map((item, i) => (
        <div key={i} className="mt-2">
          <div className="flex justify-between">
            <p className="text-[12px]">
              {item.name} - {item.total}
            </p>
            <p className="text-[12px]">
              {((item.win * 100) / item.total).toFixed(2)}%
            </p>
          </div>
          <Progress
            value={(item.win * 100) / item.total}
            max={100}
            className="mb-2"
          />
        </div>
      ))}
    </GradiantCard>
  );
};

export default Favourites;
