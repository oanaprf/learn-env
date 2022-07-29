import { useState, useEffect } from "react";
import { isEqual } from "lodash";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { Button, Card } from "antd";

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
    // setSelectedAnswers((currentAnswers = []) =>
    //   currentAnswers?.includes(value)
    //     ? currentAnswers?.filter((answer) => answer !== value)
    //     : [...currentAnswers, value]
    // );
    setSelectedAnswers([value]);

  const onSaveAnswer = () => setStatus(STATUS.ANSWERED);

  const onNextQuestion = async () => {
    await setSelectedAnswers([]);
    setStatus(STATUS.IN_PROGRESS);
    setCurrentQuestion(data.splice(Math.floor(Math.random() * data?.length), 1)?.[0]);
  };

  return status === STATUS.NOT_STARTED ? (
    <Button type="primary" onClick={onStart}>
      {t("startTest")}
    </Button>
  ) : (
    <Card
      title={currentQuestion?.question}
      bodyStyle={{ display: "flex", flexDirection: "column" }}
    >
      {/* {t(`statuses.${status?.toLocaleLowerCase()}`)} */}
      {/* <div>{t("questionsLeftCount", { count: data?.length })}</div> */}
      {currentQuestion?.answers?.map((answer) => (
        <div
          key={answer}
          className={cn(
            "answer",
            status === STATUS.ANSWERED &&
              currentQuestion?.correct?.includes(answer) &&
              "correct-answer"
          )}
        >
          <input
            type="radio"
            id={answer}
            value={answer}
            onChange={onSelectAnswer}
            disabled={status === STATUS.ANSWERED}
            className="radio-input"
          />
          <label htmlFor={answer}>{answer}</label>
        </div>
      ))}
      {status === STATUS.ANSWERED && (
        <div className="your-answer-is">
          {t("yourAnswerIs")}
          {isEqual(selectedAnswers, currentQuestion?.correct) ? (
            <span className="correct">{t("correct")}</span>
          ) : (
            <span className="incorrect">{t("incorrect")}</span>
          )}
        </div>
      )}
      <div className="buttons">
        <Button
          type="primary"
          disabled={!selectedAnswers?.length || status === STATUS.ANSWERED}
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
    </Card>
  );
};

export default QuestionsCard;
