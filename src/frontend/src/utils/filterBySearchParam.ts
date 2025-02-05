/// TODO : Fix the any-type
const filterBySearchParam = (searchParam: string, data: any) => {
  if (searchParam.length === 0) {
    return data;
  }
  return data.filter(entry => entry.name.includes(searchParam));  
}

export default filterBySearchParam;
