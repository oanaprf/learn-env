import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Popconfirm } from "antd";

import "./styles.css";
import {
  STATUS,
  REMAINING_QUESTIONS,
  TEST_ENV_REMAINING_QUESTIONS,
  TEST_QUESTIONS_COUNT,
} from "../../constants";
import QuestionsCard from "../questionsCard/QuestionsCard";

const LearningOptions = ({ originalData }) => {
  const [status, setStatus] = useState(STATUS.NOT_STARTED); //not_started, in_progress, answered
  const [isTestEnv, setIsTestEnv] = useState();
  const [data, setData] = useState();
  const { t } = useTranslation();

  const onLearnEnvStart = () => {
    setData(originalData);
    localStorage.setItem(REMAINING_QUESTIONS, null);
    setStatus(STATUS.IN_PROGRESS);
  };

  const onLearnEnvContinue = () => {
    setData(JSON.parse(localStorage.getItem(REMAINING_QUESTIONS)) ?? originalData);
    setStatus(STATUS.IN_PROGRESS);
  };

  const onTestStart = () => {
    setIsTestEnv(true);
    localStorage.setItem(TEST_ENV_REMAINING_QUESTIONS, null);
    console.log(originalData, originalData.slice(0, 90));
    setData(originalData.slice(0, TEST_QUESTIONS_COUNT));
    setStatus(STATUS.IN_PROGRESS);
  };

  const onTestContinue = () => {
    setIsTestEnv(true);
    setData(
      JSON.parse(localStorage.getItem(TEST_ENV_REMAINING_QUESTIONS)) ??
        originalData.slice(0, TEST_QUESTIONS_COUNT)
    );
    setStatus(STATUS.IN_PROGRESS);
  };

  const PopconfirmSavedData = ({ children, onConfirm, onCancel }) => (
    <Popconfirm
      title={t("savedData")}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText={t("yes")}
      cancelText={t("no")}
    >
      {children}
    </Popconfirm>
  );

  return status === STATUS.NOT_STARTED ? (
    <div>
      <PopconfirmSavedData onConfirm={onLearnEnvContinue} onCancel={onLearnEnvStart}>
        <Button type="primary" className="learn-env-button">
          {t("learningEnvironment")}
        </Button>
      </PopconfirmSavedData>
      <PopconfirmSavedData onConfirm={onTestContinue} onCancel={onTestStart}>
        <Button type="primary">
          {t("miniTest", { questionsCount: TEST_QUESTIONS_COUNT })}
        </Button>
      </PopconfirmSavedData>
    </div>
  ) : (
    <QuestionsCard
      {...{
        originalData,
        status,
        setStatus,
        isTestEnv,
        data,
        setData,
      }}
    />
  );
};

export default LearningOptions;
