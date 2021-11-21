const filterLogOutput = (data: string) => {
  const firstIndex = data.indexOf("[");
  const lastIndex = data.indexOf("]");
  const formattedStr = data.slice(firstIndex, lastIndex + 1);
  return formattedStr;
};

export const getDownloadProgress = (data: string) => {
  const filteredLog = filterLogOutput(data);
  const firstIndex = filteredLog.indexOf(" ");
  const lastIndex = filteredLog.indexOf(" ", firstIndex + 1);
  const progress = filteredLog.slice(firstIndex, lastIndex);
  return progress;
};
