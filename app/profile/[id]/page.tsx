import { toast } from "sonner";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMatchPlayed from "@/lib/actions/getMatchPlayed";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import getOwnedHero from "@/lib/actions/getOwnedHero";
import getWinRate from "@/lib/actions/getWinRate";
import MainApp from "@/components/profile/MainApp";
import getTopPlayedHero from "@/lib/actions/getTopPlayedHero";

export async function getMLBBID(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${id}/api`, {
      method: "GET",
    });
    if (res.status !== 200) return null;

    const data = await res.json();
    return data.email;
  } catch (error) {
    return null;
  }
}

const ProfilePage = async ({params}: { params: { id: string } }) => {
  console.log(params);

  const mlid = await getMLBBID(params.id)
  if (!mlid) return null;
  console.log(mlid);

  let mlbbBind = true;

  const mlbbAcc = await getMlbbAcc(mlid);
  if (!mlbbAcc) {
    mlbbBind = false;
  }

  const matchPlayed = await getMatchPlayed(parseInt(mlbbAcc?.accId as string));
  const winRate = await getWinRate(parseInt(mlbbAcc?.accId as string));
  const ownedHero = await getOwnedHero(parseInt(mlbbAcc?.accId as string));
  const topPlayedHero = await getTopPlayedHero(
    parseInt(mlbbAcc?.accId as string)
  );

  let err = false;
  if (!matchPlayed || !winRate || !ownedHero || !topPlayedHero) {
    err = true;
    return null;
  }

  return (
    <main>
      <div className="mt-24 overflow-hidden">
        <MainApp
          mlbbAcc={mlbbAcc}
          matchPlayed={matchPlayed}
          winRate={winRate}
          ownedHero={ownedHero}
          err={err}
          mlbbBind={mlbbBind}
          topPlayedHero={topPlayedHero}
        />
      </div>
    </main>
  );
}
 
export default ProfilePage;