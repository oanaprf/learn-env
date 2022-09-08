import { useState } from "react";
import { Switch, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { read, utils } from "xlsx";
import { isEmpty } from "lodash";

import "./App.css";
import LearningOptions from "./components/learningOptions/LearningOptions";
import { LANGUAGES } from "./constants";
import { mapData } from "./utils";

function App() {
  const { t, i18n } = useTranslation();
  const [originalData, setOriginalData] = useState();
  const [language, setLanguage] = useState(LANGUAGES.RO);

  const onLanguageChange = () => {
    const newLanguage = language === LANGUAGES.RO ? LANGUAGES.EN : LANGUAGES.RO;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage?.toLocaleLowerCase());
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = utils.sheet_to_json(worksheet);
          setOriginalData(mapData(json));
        };
        reader.readAsArrayBuffer(file);
      }
      return false;
    },
    onRemove: () => setOriginalData(null),
  };

  return (
    <div className="app">
      <Switch
        defaultChecked
        checkedChildren={LANGUAGES.RO}
        unCheckedChildren={LANGUAGES.EN}
        onChange={onLanguageChange}
        className="language-switch"
      />
      <div className="body">
        {!isEmpty(originalData) ? (
          <LearningOptions originalData={originalData} />
        ) : (
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>{t("uploadFileAndStart")}</Button>
          </Upload>
        )}
      </div>
    </div>
  );
}

export default App;
