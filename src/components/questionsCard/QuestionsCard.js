import { useState, useEffect } from "react";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import { isEqual } from "lodash";

import "./styles.css";
import Answers from "./Answers";
import AnswerStatus from "./AnswerStatus";
import Buttons from "./Buttons";
import { TEST_QUESTIONS_COUNT } from "../../constants";

const QuestionsCard = ({ originalData, status, setStatus, isTestEnv, data, setData }) => {
  const [currentQuestion, setCurrentQuestion] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [answersStatus, setAnswersStatus] = useState({ correct: 0, incorrect: 0 });
  const { t } = useTranslation();

  const hasAnsweredCorrectly = isEqual(selectedAnswer, currentQuestion?.correct[0]);

  useEffect(() => {
    setCurrentQuestion(data?.splice(Math.floor(Math.random() * data?.length), 1)?.[0]);
  }, []);

  return (
    <div className="questions-card-container">
      {isTestEnv && (
        <div className="answers-status">
          <span>
            <span className="label">{t("totalAnswered")}: </span>
            {TEST_QUESTIONS_COUNT - +data?.length}/{TEST_QUESTIONS_COUNT}
          </span>
          <span>
            <span className="correct-container">
              <span className="label">{t("correct")}: </span>
              <span className="correct-count">{answersStatus.correct}</span>
            </span>
            <span className="label">{t("incorrect")}: </span>
            <span className="incorrect-count">{answersStatus.incorrect}</span>
          </span>
        </div>
      )}
      <Card title={currentQuestion?.question}>
        <Answers {...{ currentQuestion, status, selectedAnswer, setSelectedAnswer }} />
        <AnswerStatus {...{ status, hasAnsweredCorrectly }} />
        <Buttons
          {...{
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
          }}
        />
      </Card>
    </div>
  );
};

export default QuestionsCard;
