import { useState } from "react";
import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { read, utils } from "xlsx";

import "./App.css";
import QuestionsCard from "./questionsCard/QuestionsCard";
import { LANGUAGES } from "./constants";
import { mapData } from "./utils";

function App() {
  const [originalData, setOriginalData] = useState();
  const [language, setLanguage] = useState(LANGUAGES.RO);
  const { i18n } = useTranslation();

  const onLanguageChange = () => {
    const newLanguage = language === LANGUAGES.RO ? LANGUAGES.EN : LANGUAGES.RO;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage?.toLocaleLowerCase());
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet);
        setOriginalData(mapData(json));
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div className="app">
      <Switch
        defaultChecked
        checkedChildren={LANGUAGES.RO}
        unCheckedChildren={LANGUAGES.EN}
        onChange={onLanguageChange}
      />
      <form>
        <label htmlFor="upload">Upload File</label>
        <input type="file" name="upload" id="upload" onChange={readUploadFile} />
      </form>
      <QuestionsCard originalData={originalData} />
    </div>
  );
}

export default App;
