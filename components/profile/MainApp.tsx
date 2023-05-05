"use client";

import { SafeUser } from "@/types";
import { mlbbaccs } from "@prisma/client";
import { Progress } from "../ui/Progress";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ITopPlayed } from "@/lib/actions/getTopPlayedHero";

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
        <Link href="/profile/bind">
          <Button>MLBB Bind</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className="max-w-[100px]">
        <p className="text-2xl font-semibold leading-6">
          Welcome, <span className="font-bold">{mlbbAcc?.nickname}</span>
        </p>
      </header>

      <div className="flex flex-col">
        <p className="text-sm">
          Match Played: {matchPlayed?.totalRanked + matchPlayed?.totalClassic}
        </p>
        <p className="text-sm">Hero Owned: {ownedHero?.length || 0}</p>
      </div>

      <div className="bottom-2 right-[max(8px,calc(50%-40rem))] top-24 hidden w-[24rem] overflow-hidden rounded-2xl bg-pblack md:fixed md:block">
        <h3 className="sticky top-0 z-10 block bg-pblack/70 px-4 py-2 text-xl font-bold tracking-tighter backdrop-blur-sm">
          Analytics
        </h3>
        <div className="absolute inset-y-0 mt-12 flex w-full flex-col gap-y-5 overflow-y-auto px-3 py-2">
          <div className="w-full max-w-sm">
            <div className="max-w-lg rounded-2xl bg-sblack p-4">
              <h3 className="text-lg mb-2 font-semibold">Match Insight</h3>
              <p className="text-sm">Ranked - {matchPlayed?.totalRanked}</p>
              <Progress
                value={matchPlayed?.totalRanked}
                max={matchPlayed?.totalRanked + matchPlayed?.totalClassic}
              />

              <p className="mt-2 text-right text-sm">
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

          <div className="w-full max-w-sm">
            <div className="max-w-lg rounded-2xl bg-sblack p-4">
              <h3 className="text-lg mb-2 font-semibold">Match Winrate</h3>
              <p className="text-sm">
                Ranked -{" "}
                {(
                  (winRate?.totalRanked * 100) /
                  matchPlayed?.totalRanked
                ).toFixed(2)}
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
                value={
                  (winRate?.totalClassic * 100) / matchPlayed?.totalClassic
                }
                max={100}
                className="mb-1"
              />
            </div>
          </div>

          <div className="w-full max-w-sm">
            <div className="max-w-lg rounded-2xl bg-sblack p-4">
              <h3 className="text-lg mb-2 font-semibold">
                Classic Top 5 Played
              </h3>
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

          <div className="w-full max-w-sm">
            <div className="max-w-lg rounded-2xl bg-sblack p-4">
              <h3 className="text-lg mb-2 font-semibold">
                Ranked Top 5 Played
              </h3>
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
      </div>
    </>
  );
};

export default MainApp;
