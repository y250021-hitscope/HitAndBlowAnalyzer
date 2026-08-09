export const championKnowledge = [
  {
    id: "CK-001",
    title: "High/Lowは初手で使う",
    category: "highLow",
    type: "mathematical",
    confidence: "very-high",

    condition: (state) => {
      return (
        state.turn === 1 &&
        state.myItems?.includes("highLow") &&
        !state.myUsedItems?.includes("highLow")
      );
    },

    evaluate: () => {
      return {
        action: "useHighLow",
        score: 100,
        reason:
          "High/Lowは初手で使うことで候補数を大幅に減らせ、使用を遅らせるデメリットが大きいため。",
      };
    },
  },
];