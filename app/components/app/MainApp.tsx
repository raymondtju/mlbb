"use client";

import { SafeUser } from "@/app/types";
import { mlbbaccs } from "@prisma/client";
import { Progress } from "../ui/Progress";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ITopPlayed } from "@/app/actions/getTopPlayedHero";

export type MatchPLayedProps = {
  totalClassic: number | 0;
  totalRanked: number | 0;
};

interface MainAppProps {
  currentUser: SafeUser | null;
  mlbbAcc: mlbbaccs | null | undefined;
  matchPlayed: MatchPLayedProps;
  winRate: {
    totalClassic: number | 0;
    totalRanked: number | 0;
  };
  ownedHero: any;
  err: boolean;
  mlbbBind: boolean;
  topPlayedHero: {
    topPlayedClassic: ITopPlayed[];
    topPlayedRanked: ITopPlayed[];
  };
}

const MainApp: React.FC<MainAppProps> = ({
  currentUser,
  mlbbAcc,
  matchPlayed,
  winRate,
  ownedHero,
  err,
  mlbbBind,
  topPlayedHero,
}) => {
  useEffect(() => {
    if (err) {
      toast.error("Failed to fetch data");
      return () => {
        toast.error("Failed to fetch data");
      };
    }
  }, [err]);

  if (!mlbbBind) {
    return (
      <div className="max-w-[100px]">
        <p className="text-2xl font-semibold leading-6">Welcome</p>
        <Link href="/app/bind">
          <Button>MLBB Bind</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="max-w-[100px]">
          <p className="text-2xl font-semibold leading-6">
            Welcome, <span className="font-bold">{mlbbAcc?.nickname}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-sm">
          Match Played: {matchPlayed?.totalRanked + matchPlayed?.totalClassic}
        </p>
        <p className="text-sm">Hero Owned: {ownedHero?.length || 0}</p>
      </div>

      <div className="mt-12">
        <h3 className="mb-2 text-lg font-bold">Match Insight</h3>
        <div className="max-w-lg p-4 rounded-md shadow-md border-slate-900 bg-gray-50/50 backdrop-blur-3xl">
          <p className="text-sm">Ranked - {matchPlayed?.totalRanked}</p>
          <Progress
            value={matchPlayed?.totalRanked}
            max={matchPlayed?.totalRanked + matchPlayed?.totalClassic}
          />

          <p className="mt-2 text-sm text-right">
            Classic - {matchPlayed?.totalClassic}{" "}
          </p>
          <Progress
            value={matchPlayed?.totalClassic}
            max={matchPlayed?.totalRanked + matchPlayed?.totalClassic}
            pos="right"
            className="mb-1"
          />
        </div>
      </div>

      <div className="mt-12">
        <h3 className="mb-2 text-lg font-bold">Match Winrate</h3>
        <div className="max-w-lg p-4 rounded-md shadow-md border-slate-900 bg-gray-50/50 backdrop-blur-3xl">
          <p className="text-sm">
            Ranked -{" "}
            {((winRate?.totalRanked * 100) / matchPlayed?.totalRanked).toFixed(
              2
            )}
            %
          </p>
          <Progress
            value={(winRate?.totalRanked * 100) / matchPlayed?.totalRanked}
            max={100}
          />

          <p className="mt-3 text-sm">
            Classic -{" "}
            {(
              (winRate?.totalClassic * 100) /
              matchPlayed?.totalClassic
            ).toFixed(2)}
            %
          </p>
          <Progress
            value={(winRate?.totalClassic * 100) / matchPlayed?.totalClassic}
            max={100}
            className="mb-1"
          />
        </div>
      </div>

      <div className="mt-12">
        <h3 className="mb-2 text-lg font-bold">Classic Top 5 Played</h3>
        <div className="max-w-lg p-4 rounded-md shadow-md border-slate-900 bg-gray-50/50 backdrop-blur-3xl">
          {topPlayedHero?.topPlayedClassic.map((data, i) => {
            return (
              <div key={i}>
                <div className="flex justify-between">
                  <p className="text-sm">
                    {data.name} - {data.total}x
                  </p>
                  <p className="text-sm">
                    {((data.win * 100) / data.total).toFixed(2)}%
                  </p>
                </div>
                <Progress
                  value={(data.win * 100) / data.total}
                  max={100}
                  className="mb-2"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="mb-2 text-lg font-bold">Ranked Top 5 Played</h3>
        <div className="max-w-lg p-4 rounded-md shadow-md border-slate-900 bg-gray-50/50 backdrop-blur-3xl">
          {topPlayedHero?.topPlayedRanked.map((data, i) => {
            return (
              <div key={i}>
                <div className="flex justify-between">
                  <p className="text-sm">
                    {data.name} - {data.total}x
                  </p>
                  <p className="text-sm">
                    {((data.win * 100) / data.total).toFixed(2)}%
                  </p>
                </div>
                <Progress
                  value={(data.win * 100) / data.total}
                  max={100}
                  className="mb-2"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
