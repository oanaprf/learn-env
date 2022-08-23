import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card } from "antd";

import "./styles.css";
import { STATUS } from "../constants";
import Answers from "./Answers";
import AnswerStatus from "./AnswerStatus";
import Buttons from "./Buttons";

const QuestionsCard = ({ originalData }) => {
  const [data, setData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [status, setStatus] = useState(STATUS.NOT_STARTED); //not_started, in_progress, answered
  const [selectedAnswer, setSelectedAnswer] = useState();
  const { t } = useTranslation();

  useEffect(() => setData(originalData), [originalData]);

  const onStart = () => {
    setCurrentQuestion(data.splice(Math.floor(Math.random() * data?.length), 1)?.[0]);
    setStatus(STATUS.IN_PROGRESS);
  };

  return status === STATUS.NOT_STARTED ? (
    <Button type="primary" onClick={onStart}>
      {t("startTest")}
    </Button>
  ) : (
    <Card title={currentQuestion?.question}>
      {/* {t(`statuses.${status?.toLocaleLowerCase()}`)} */}
      {/* <div>{t("questionsLeftCount", { count: data?.length })}</div> */}
      <Answers {...{ currentQuestion, status, selectedAnswer, setSelectedAnswer }} />
      <AnswerStatus {...{ selectedAnswer, status, currentQuestion }} />
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
        }}
      />
    </Card>
  );
};

export default QuestionsCard;
