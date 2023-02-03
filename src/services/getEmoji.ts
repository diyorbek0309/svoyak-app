import { icons } from "../types/enums";

export const getEmoji = (rank: number) => {
  switch (rank) {
    case 1:
      return icons[0];
    case 2:
      return icons[1];
    case 3:
      return icons[2];
    default:
      return `${rank}.`;
  }
};
