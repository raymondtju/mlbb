import { toast } from "sonner";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMatchPlayed from "@/lib/actions/getMatchPlayed";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import getOwnedHero from "@/lib/actions/getOwnedHero";
import getWinRate from "@/lib/actions/getWinRate";
import MainApp from "@/components/profile/MainApp";
import getTopPlayedHero from "@/lib/actions/getTopPlayedHero";

export default async function App() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  let mlbbBind = true;

  const mlbbAcc = await getMlbbAcc(currentUser.email);
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
          currentUser={currentUser}
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
