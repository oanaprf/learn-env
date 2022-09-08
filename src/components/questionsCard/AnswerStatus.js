import React from "react";
import { useTranslation } from "react-i18next";

import { STATUS } from "../../constants";

const AnswerStatus = ({ status, hasAnsweredCorrectly }) => {
  const { t } = useTranslation();

  return status === STATUS.ANSWERED ? (
    <div className="your-answer-is">
      {t("yourAnswerIs")}
      {hasAnsweredCorrectly ? (
        <span className="correct">{t("correct")}</span>
      ) : (
        <span className="incorrect">{t("incorrect")}</span>
      )}
    </div>
  ) : null;
};

export default AnswerStatus;
