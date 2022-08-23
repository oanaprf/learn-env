import React from "react";
import { isEqual } from "lodash";
import { useTranslation } from "react-i18next";

import { STATUS } from "../constants";

const AnswerStatus = ({ status, selectedAnswer, currentQuestion }) => {
  const { t } = useTranslation();

  return status === STATUS.ANSWERED ? (
    <div className="your-answer-is">
      {t("yourAnswerIs")}
      {isEqual(selectedAnswer, currentQuestion?.correct[0]) ? (
        <span className="correct">{t("correct")}</span>
      ) : (
        <span className="incorrect">{t("incorrect")}</span>
      )}
    </div>
  ) : null;
};

export default AnswerStatus;
