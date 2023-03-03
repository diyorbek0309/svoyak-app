export interface ISvoyakData {
  id: number;
  name: string;
  scores: string;
  numberOfLines: number;
  isActive: boolean;
  isLife: boolean;
}

export interface ISingleGame {
  id: number;
  title: string;
  date: number;
  results: ISvoyakData[];
  isFinished: boolean;
}
