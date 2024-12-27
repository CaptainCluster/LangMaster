/// TODO : Fix the any-type
const filterBySearchParam = (searchParam: string, data: any) => {
  if (searchParam.length === 0) {
    return data;
  }
  
  const filteredDataArray = [];
  data.forEach(element => {
    if (element.name === searchParam) {
      filteredDataArray.push(element);
    }
  });
  return filteredDataArray;
}

export default filterBySearchParam;
