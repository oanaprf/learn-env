export const mapData = (data) =>
  data.map(
    ({ question, correct, incorrect_1, incorrect_2, incorrect_3, incorrect_4 } = {}) => ({
      question,
      correct: [correct],
      incorrect: [incorrect_1, incorrect_2, incorrect_3, incorrect_4],
      answers: [correct, incorrect_1, incorrect_2, incorrect_3, incorrect_4],
    })
  );
