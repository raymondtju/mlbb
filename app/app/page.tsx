import { toast } from "sonner";
import getCurrentUser from "../actions/getCurrentUser";
import getMatchPlayed from "../actions/getMatchPlayed";
import getMlbbAcc from "../actions/getMlbbAcc";
import getOwnedHero from "../actions/getOwnedHero";
import getWinRate from "../actions/getWinRate";
import MainApp from "../components/app/MainApp";
import getTopPlayedHero from "../actions/getTopPlayedHero";

export default async function App() {
  const currentUser = await getCurrentUser();

  let mlbbAcc, matchPlayed, winRate, ownedHero, topPlayedHero;
  let mlbbBind = true;
  if (currentUser) {
    mlbbAcc = await getMlbbAcc(currentUser.email);
    if (!mlbbAcc) {
      mlbbBind = false;
    }

    matchPlayed = await getMatchPlayed(parseInt(mlbbAcc?.accId as string));
    winRate = await getWinRate(parseInt(mlbbAcc?.accId as string));
    ownedHero = await getOwnedHero(parseInt(mlbbAcc?.accId as string));
    topPlayedHero = await getTopPlayedHero(parseInt(mlbbAcc?.accId as string));
  }

  let err = false;
  if (!matchPlayed || !winRate || !ownedHero) {
    console.log(111);
    err = true;
  }

  return (
    <main>
      <div className="mt-24">
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
