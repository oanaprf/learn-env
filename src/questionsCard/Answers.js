import React from "react";
import cn from "classnames";
import { Radio, Space } from "antd";

import { STATUS } from "../constants";

const Answers = ({ currentQuestion, status, selectedAnswer, setSelectedAnswer }) => {
  const onSelectAnswer = ({ target: { value } }) => setSelectedAnswer(value);

  return (
    <Radio.Group onChange={onSelectAnswer} value={selectedAnswer}>
      <Space direction="vertical">
        {currentQuestion?.answers?.map((answer) => (
          <Radio
            key={answer}
            className={cn(
              status === STATUS.ANSWERED &&
                currentQuestion?.correct?.includes(answer) &&
                "correct-answer"
            )}
            value={answer}
            disabled={status === STATUS.ANSWERED}
          >
            {answer}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default Answers;
