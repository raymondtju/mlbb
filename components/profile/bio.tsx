"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import useSWR from "swr";
import clsx from "clsx";

import { LinkIcon } from "lucide-react";
import { SafeUser } from "@/types";
import { MlbbAcc } from "@prisma/client";
import { User } from "@prisma/client";
import { fetcher } from "@/lib/utils";

import { GradiantCard } from "../shared/gradiant-card";
import { Button } from "../shared/button";
import LoadingDots from "../shared/icons/loading-dots";
import FolDialog from "../folDialog";

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
  const { data: baseInfo, mutate } = useSWR<{
    username: string;
    following: string[];
    followers: string[];
    name: string;
    desc: string;
  }>(`/api/user/basic-info?username=${params?.username}`, fetcher);

  const username = user?.username;
  const isCurrUserFollowing = currentUser?.following.includes(
    user?.id as string
  );

  const isLinksEmpty = () => {
    let isEmpty = true;
    if (user?.links) {
      isEmpty = user.links.every((link) => link === "");
    }
    return isEmpty;
  };

  const [isFollowing, setIsFollowing] = useState(isCurrUserFollowing);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [following, setFollowing] = useState<
    {
      name: string;
      username: string;
      image: string;
    }[]
  >();
  const [followers, setFollowers] = useState<
    {
      name: string;
      username: string;
      image: string;
    }[]
  >();

  return (
    <>
      <div className="flex-col">
        <GradiantCard className="mx-auto h-fit w-[15rem] max-w-full md:mx-0">
          <Image
            src={user?.image || "/nana.jpg"}
            alt=""
            width={150}
            height={150}
            className="mx-auto rounded-full"
          />
          <h1 className="mt-3 text-center font-heading text-xl">
            {baseInfo?.username}
          </h1>
          <p className="mb-4 px-2 text-center text-sm font-normal leading-4">
            {user?.desc}
          </p>

          {!isOwnProfile && !isFollowing && (
            <Button
              className="mx-auto mt-2 flex h-8 w-36 justify-center rounded-2xl px-10 py-1"
              disabled={buttonDisabled}
              variant="gradiantNavySec"
              onClick={async (e) => {
                e.preventDefault();
                setLoading(true);
                setButtonDisabled(true);
                const set = await fetch(
                  `/profile/${currentUser?.username}/api/follow`,
                  {
                    method: "POST",
                    body: JSON.stringify({ username }),
                  }
                );
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
                const set = await fetch(
                  `/profile/${currentUser?.username}/api/unfollow`,
                  {
                    method: "POST",
                    body: JSON.stringify({ username }),
                  }
                );
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
          <div className="mt-6 flex flex-row justify-between px-3 font-heading">
            <div
              onClick={async () => {
                const get = await fetch(
                  `/api/user/fol-info?type=following&username=${baseInfo?.username}`
                );
                const data = await get.json();
                setFollowing(data);
              }}
            >
              <FolDialog
                title="Following"
                triggerChild={
                  <div className="flex cursor-pointer flex-col rounded-lg px-3 text-center duration-500 hover:bg-zinc-50/0">
                    <p className="text-xl">{baseInfo?.following.length}</p>
                    <p className="text-[12px]">FOLLOWING</p>
                  </div>
                }
              >
                <ul className="flex flex-col items-start">
                  {following?.map((fol, i) => (
                    <Link
                      key={i}
                      href={`/profile/${fol.username}`}
                      className="w-full rounded-lg hover:bg-zinc-100/5"
                    >
                      <li className="flex items-center gap-4 p-2">
                        <Image
                          src={fol.image || "/nana.jpg"}
                          alt="pic"
                          width={44}
                          height={44}
                          className="rounded-full"
                          priority
                        />
                        <div>
                          <p>{fol.username}</p>

                          <p className="text-sm font-medium text-zinc-500">
                            {fol.name}
                          </p>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </FolDialog>
            </div>
            <div>
              <FolDialog
                title="Followers"
                triggerChild={
                  <div
                    className="flex cursor-pointer flex-col rounded-lg px-3 text-center duration-500 hover:bg-zinc-50/0"
                    onClick={async () => {
                      const get = await fetch(
                        `/api/user/fol-info?type=followers&username=${baseInfo?.username}`
                      );
                      const data = await get.json();
                      setFollowers(data);
                    }}
                  >
                    <p className="text-xl">{baseInfo?.followers.length}</p>
                    <p className="text-[12px]">FOLLOWERS</p>
                  </div>
                }
              >
                <ul className="flex flex-col items-start">
                  {followers?.map((fol, i) => (
                    <Link
                      key={i}
                      href={`/profile/${fol.username}`}
                      className="w-full rounded-lg hover:bg-zinc-100/5"
                    >
                      <li className="flex items-center gap-4 p-2">
                        <Image
                          src={fol.image || "/nana.jpg"}
                          alt="pic"
                          width={44}
                          height={44}
                          className="rounded-full"
                          priority
                        />
                        <div>
                          <p>{fol.username}</p>
                          <p className="text-sm font-medium text-zinc-500">
                            {fol.name}
                          </p>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </FolDialog>
            </div>
          </div>
        </GradiantCard>

        <GradiantCard
          className={clsx(
            mlbbAcc || !isLinksEmpty()
              ? "mx-auto mt-5 h-fit w-[15rem] max-w-full font-normal md:mx-0"
              : "hidden"
          )}
        >
          <div className="flex flex-col">
            <p
              className={clsx(
                mlbbAcc ? "mb-2 flex items-center gap-2" : "hidden"
              )}
            >
              <Image src="/official.svg" alt="mlbb" width={20} height={20} />
              {mlbbAcc ? (
                <>
                  {mlbbAcc.nickname}
                  <span className="rounded-full bg-navy-600 px-2 text-sm font-semibold shadow-inner ">
                    {mlbbAcc.accId}
                  </span>
                </>
              ) : (
                ""
              )}
            </p>
            {user?.links &&
              user.links.map((link, index) => {
                if (link !== "") {
                  return (
                    <div
                      key={index}
                      className="flex items-center text-sm font-light"
                    >
                      <LinkIcon
                        width={10}
                        height={10}
                        className="mr-2 shrink-0"
                      />
                      <a
                        href={user?.links[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate"
                      >
                        {user?.links[index]}
                      </a>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </GradiantCard>
        {!mlbbAcc && isOwnProfile && (
          <Button
            className="mt-4 h-8 w-full rounded-lg px-[10px] py-2"
            variant="gradiantNavySec"
          >
            <Link href="/profile/stg/bind" className="text-[12px]">
              Bind account
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default ProfileBio;
