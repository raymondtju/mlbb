"use client";

import { useState } from "react";
import { GradiantCard } from "../shared/gradiant-card";
import Image from "next/image";
import { Button } from "../shared/button";
import { MlbbAcc } from "@prisma/client";
import { SafeUser } from "@/types";
import LoadingDots from "../shared/icons/loading-dots";
import { toast } from "sonner";
import { User } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useParams } from "next/navigation";

interface ProfileBioProps {
  currentUser?: SafeUser | null;
  user: User | null;
  mlbbAcc?: MlbbAcc | null;
  isOwnProfile: boolean;
}

const ProfileBio: React.FC<ProfileBioProps> = ({
  currentUser,
  user,
  mlbbAcc,
  isOwnProfile,
}) => {
  const params = useParams();

  // let baseInfo = null
  const { data: baseInfo, mutate } = useSWR<{
    username: string;
    following: string[];
    followers: string[];
    name: string;
    desc: string;
  }>(`/api/user/basic-info?username=${params?.username}`, fetcher);
  // const baseInfo = useSWR("/api/user/basic-info", fetcher);
  // console.log(baseInfo.data);
  const username = user?.username;
  const isCurrUserFollowing = currentUser?.following.includes(
    user?.id as string
  );

  const [isFollowing, setIsFollowing] = useState(isCurrUserFollowing);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  return (
    <div className="flex-col">
      {/* Profile Head */}
      <GradiantCard className="mx-auto h-fit w-[15rem] max-w-full md:mx-0">
        <Image
          src={"/nana.jpg"}
          alt=""
          width={150}
          height={150}
          className="mx-auto rounded-full"
        />
        <h1 className="mt-3 text-center font-heading text-xl">
          {baseInfo?.username}
        </h1>
        {!isOwnProfile && !isFollowing && (
          <Button
            className="mx-auto mt-2 flex h-8 w-36 justify-center rounded-2xl px-10 py-1"
            disabled={buttonDisabled}
            variant="gradiantNavySec"
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              setButtonDisabled(true);
              const set = await fetch(`/profile/social/api/follow`, {
                method: "POST",
                body: JSON.stringify({ username }),
              });
              const msg = await set.json();
              if (!set.ok) {
                setLoading(false);
                setButtonDisabled(false);
                toast.error(msg.message);
              } else {
                mutate();
                setLoading(false);
                setIsFollowing(true);
                setButtonDisabled(false);
              }
            }}
          >
            {loading ? (
              <>
                <LoadingDots color="#FAFAFA" />
              </>
            ) : (
              "Follow"
            )}
          </Button>
        )}
        {!isOwnProfile && isFollowing && (
          <Button
            className="mx-auto mt-2 flex h-8 w-36 justify-center rounded-2xl px-10 py-1"
            disabled={buttonDisabled}
            onClick={async (e) => {
              e.preventDefault();
              setButtonDisabled(true);
              setLoading(true);
              const set = await fetch(`/profile/social/api/unfollow`, {
                method: "POST",
                body: JSON.stringify({ username }),
              });
              const msg = await set.json();
              if (!set.ok) {
                setLoading(false);
                setButtonDisabled(false);
                toast.error(msg.message);
              } else {
                mutate();
                setLoading(false);
                setIsFollowing(false);
                setButtonDisabled(false);
              }
            }}
          >
            {loading ? (
              <>
                <LoadingDots color="#FAFAFA" />
              </>
            ) : (
              "Unfollow"
            )}
          </Button>
        )}
        <div className="mt-4 flex flex-row justify-between px-3 font-heading">
          <div className="flex flex-col text-center">
            <p className="text-xl">
              {isOwnProfile
                ? currentUser?.following.length
                : baseInfo?.following.length}
            </p>
            <p className="text-[14px]">FOLLOWING</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="text-xl">
              {isOwnProfile
                ? currentUser?.followers.length
                : baseInfo?.followers.length}
            </p>
            <p className="text-[14px]">FOLLOWERS</p>
          </div>
        </div>
      </GradiantCard>

      <GradiantCard className="mx-auto mt-5 h-fit w-[15rem] max-w-full font-medium md:mx-0">
        <div className="flex flex-col">
          <p className={`${mlbbAcc ? "" : "hidden"}`}>
            IGN: {mlbbAcc ? mlbbAcc.nickname : "-"}
          </p>
          <p className={`${mlbbAcc ? "" : "hidden"}`}>
            ID: {mlbbAcc ? mlbbAcc.accId : "-"}
          </p>
          <p className="my-2 text-sm font-normal">{user?.desc}</p>
        </div>
      </GradiantCard>
    </div>
  );
};

export default ProfileBio;
