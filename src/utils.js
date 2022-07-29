import { shuffle, without, compact, remove } from "lodash";

export const extractData = (fileData) => {
  const rows = fileData?.split("\n");
  const rowData = rows?.map((row) => row?.replace("\r", "")?.split("\t"));
  const groupedData = rowData?.reduce((res, curr) => {
    const question = curr.shift();
    const delimiterIndex = curr?.lastIndexOf("");
    return [
      ...res,
      ...(curr?.length > 1
        ? [
            {
              question,
              answers: shuffle(without(curr, "")),
              correct: [...compact(remove(curr, (_, j) => j < delimiterIndex))],
              incorrect: compact(curr),
            },
          ]
        : []),
    ];
  }, []);
  return groupedData;
};
