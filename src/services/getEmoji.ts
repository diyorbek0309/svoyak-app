import { icons } from "../types/enums";

export const getEmoji = (rank: number) => {
  switch (rank) {
    case 1:
      return icons[0];
    case 2:
      return icons[1];
    case 3:
      return icons[2];
    case 4:
      return icons[3];
    case 5:
      return icons[4];
    case 6:
      return icons[5];
    case 7:
      return icons[6];
    case 8:
      return icons[7];
    case 9:
      return icons[8];
    case 10:
      return icons[9];
    default:
      return `${rank}.`;
  }
};
