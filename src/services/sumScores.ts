export const sumScoresFN = (scores: string) => {
  scores += "0";

  return eval(scores);
};
