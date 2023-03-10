import { ISvoyakData } from "../types/Props.interface";
import { sumScoresFN } from "./sumScores";
import { getEmoji } from "./getEmoji";

export const sortResults = (results) => {
  let newResults: { name: string; score: number; isLife: boolean }[] = [];
  let gamers = [];

  results.forEach((result: ISvoyakData) => {
    if (result.name.length) {
      newResults.push({
        name: result.name,
        score: sumScoresFN(result.scores),
        isLife: result.isLife,
      });
    }
  });

  newResults.sort((a, b) => {
    if (a.score === 0 && b.score === 0) {
      if (a.isLife && !b.isLife) return -1;
      if (b.isLife && !a.isLife) return 1;
    } else {
      return b.score - a.score;
    }
    return 0;
  });

  let currentRank = 1;
  let currentScore = newResults && newResults.length ? newResults[0].score : 0;
  for (let i = 0; i < newResults.length; i++) {
    let gamer = newResults[i];
    if (gamer.score != currentScore) {
      currentRank = i + 1;
      currentScore = gamer.score;
    }
    gamers.push({
      icon: getEmoji(currentRank),
      name: gamer.name,
      score: gamer.score,
      isLife: gamer.isLife,
    });
  }

  return gamers;
};
