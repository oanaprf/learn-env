import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

import {
  STATUS,
  REMAINING_QUESTIONS,
  TEST_ENV_REMAINING_QUESTIONS,
} from "../../constants";

const Buttons = ({
  status,
  setStatus,
  data,
  setData,
  originalData,
  selectedAnswer,
  setSelectedAnswer,
  setCurrentQuestion,
  isTestEnv,
  setAnswersStatus,
  hasAnsweredCorrectly,
}) => {
  const { t } = useTranslation();

  const onRestart = async () => {
    await setData(originalData);
    setCurrentQuestion(data.splice(Math.floor(Math.random() * data?.length), 1));
    setStatus(STATUS.IN_PROGRESS);
  };

  const onSaveAnswer = () => {
    setAnswersStatus(({ correct, incorrect }) => ({
      correct: hasAnsweredCorrectly ? correct + 1 : correct,
      incorrect: hasAnsweredCorrectly ? incorrect : incorrect + 1,
    }));
    localStorage.setItem(
      isTestEnv ? TEST_ENV_REMAINING_QUESTIONS : REMAINING_QUESTIONS,
      JSON.stringify(data)
    );
    setStatus(STATUS.ANSWERED);
  };

  const onNextQuestion = async () => {
    await setSelectedAnswer(null);
    setStatus(STATUS.IN_PROGRESS);
    setCurrentQuestion(data.splice(Math.floor(Math.random() * data?.length), 1)?.[0]);
  };

  return (
    <div className="buttons">
      <Button
        type="primary"
        disabled={!selectedAnswer || status === STATUS.ANSWERED}
        onClick={onSaveAnswer}
      >
        {t("sendYourAnswer")}
      </Button>
      {status === STATUS.ANSWERED ? (
        data?.length ? (
          <Button type="primary" className="button" onClick={onNextQuestion}>
            {t("nextQuestion")}
          </Button>
        ) : (
          <Button type="primary" className="button" onClick={onRestart}>
            {t("restartTest")}
          </Button>
        )
      ) : null}
    </div>
  );
};

export default Buttons;
