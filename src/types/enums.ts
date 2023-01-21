enum eScreens {
  HOME = "Svoyak Calculator",
  SVOYAK = "Shaxsiy oʻyin",
  EKVARTET = "Erudit-kvartet",
  RESULTS = "Natijalar",
}

enum eSvoyak {
  TITLE = "Oʻyin nomi",
  DEFAULT_NAME = "ishtirokchi",
}

const icons = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

const scores = [10, 20, 30, 40, 50];

const defaultData = [
  {
    id: 0,
    name: `1-${eSvoyak.DEFAULT_NAME}`,
    scores: "",
    numberOfLines: 2,
    isActive: false,
  },
  {
    id: 1,
    name: `2-${eSvoyak.DEFAULT_NAME}`,
    scores: "",
    numberOfLines: 2,
    isActive: false,
  },
  {
    id: 2,
    name: `3-${eSvoyak.DEFAULT_NAME}`,
    scores: "",
    numberOfLines: 2,
    isActive: false,
  },
  {
    id: 3,
    name: `4-${eSvoyak.DEFAULT_NAME}`,
    scores: "",
    numberOfLines: 2,
    isActive: false,
  },
  {
    id: 4,
    name: `5-${eSvoyak.DEFAULT_NAME}`,
    scores: "",
    numberOfLines: 2,
    isActive: false,
  },
];

export { eScreens, eSvoyak, icons, scores, defaultData };
