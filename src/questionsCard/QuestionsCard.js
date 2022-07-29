import { useState, useEffect } from "react";
import { isEqual } from "lodash";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import "./styles.css";
import { STATUS } from "../constants";

const QuestionsCard = ({ originalData }) => {
  const [data, setData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [status, setStatus] = useState(STATUS.NOT_STARTED); //not_started, in_progress, answered
  const [selectedAnswers, setSelectedAnswers] = useState();
  const { t } = useTranslation();

  useEffect(() => setData(originalData), [originalData]);

  const onStart = () => {
    setCurrentQuestion(data.splice(Math.floor(Math.random() * data?.length), 1)?.[0]);
    setStatus(STATUS.IN_PROGRESS);
  };

  const onRestart = async () => {
    await setData(originalData);
    setCurrentQuestion(data.splice(Math.floor(Math.random() * data?.length), 1));
    setStatus(STATUS.IN_PROGRESS);
  };

  const onSelectAnswer = ({ target: { value } }) =>
    setSelectedAnswers((currentAnswers = []) =>
      currentAnswers?.includes(value)
        ? currentAnswers?.filter((answer) => answer !== value)
        : [...currentAnswers, value]
    );

  const onSaveAnswer = () => setStatus(STATUS.ANSWERED);

  const onNextQuestion = async () => {
    await setSelectedAnswers([]);
    setStatus(STATUS.IN_PROGRESS);
    setCurrentQuestion(data.splice(Math.floor(Math.random() * data?.length), 1)?.[0]);
  };

  return (
    <div className="container">
      {t(`statuses.${status?.toLocaleLowerCase()}`)}
      {status === STATUS.NOT_STARTED && (
        <button onClick={onStart}>{t("startTest")}</button>
      )}
      {[STATUS.IN_PROGRESS, STATUS.ANSWERED].includes(status) && (
        <div className="question">
          <div>{t("questionsLeftCount", { count: data?.length })}</div>
          <b>{currentQuestion?.question}</b>
          {currentQuestion?.answers?.map((answer) => (
            <div
              className={cn(
                status === STATUS.ANSWERED &&
                  currentQuestion?.selectedAnswers?.includes(answer) &&
                  "selected-answer"
              )}
              key={answer}
            >
              <input
                type="checkbox"
                id={answer}
                value={answer}
                onChange={onSelectAnswer}
                disabled={status === STATUS.ANSWERED}
              />
              <label htmlFor={answer}>{answer}</label>
              {status === STATUS.ANSWERED &&
                (currentQuestion?.correct?.includes(answer) ? (
                  <span className="correct">{t("correct")}</span>
                ) : (
                  <span className="incorrect">{t("incorrect")}</span>
                ))}
            </div>
          ))}
          {status === STATUS.ANSWERED && (
            <div>
              {t("yourAnswerIs")}
              {isEqual(selectedAnswers, currentQuestion?.correct) ? (
                <span className="correct">{t("correct")}</span>
              ) : (
                <span className="incorrect">{t("incorrect")}</span>
              )}
            </div>
          )}
          <button
            disabled={!selectedAnswers?.length || status === STATUS.ANSWERED}
            onClick={onSaveAnswer}
          >
            {t("sendYourAnswer")}
          </button>
          {status === STATUS.ANSWERED ? (
            data?.length ? (
              <button onClick={onNextQuestion}>{t("nextQuestion")}</button>
            ) : (
              <button onClick={onRestart}>{t("restartTest")}</button>
            )
          ) : null}
        </div>
      )}
    </div>
  );
};

export default QuestionsCard;
