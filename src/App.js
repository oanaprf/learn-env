import { useState, useEffect } from "react";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";

import "./App.css";
import file_data from "./data.txt";
import { extractData } from "./utils";
import QuestionsCard from "./questionsCard/QuestionsCard";
import { LANGUAGES } from "./constants";

function App() {
  const [fileData, setFileData] = useState();
  const [originalData, setOriginalData] = useState();
  const [language, setLanguage] = useState(LANGUAGES.RO);
  const { i18n } = useTranslation();

  fetch(file_data)
    .then((response) => response.text())
    .then((text) => setFileData(text));

  useEffect(() => {
    setOriginalData(extractData(fileData));
  }, [fileData]);

  const onLanguageChange = () => {
    const newLanguage = language === LANGUAGES.RO ? LANGUAGES.EN : LANGUAGES.RO;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage?.toLocaleLowerCase());
  };

  return (
    <div className="app">
      <Switch
        defaultChecked
        checkedChildren={LANGUAGES.RO}
        unCheckedChildren={LANGUAGES.EN}
        onChange={onLanguageChange}
      />
      <QuestionsCard originalData={originalData} />
    </div>
  );
}

export default App;
