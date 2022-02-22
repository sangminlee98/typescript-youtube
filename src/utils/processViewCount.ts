const processViewCount = (count: number) => {
  if(count<1000) {
    return `조회수 ${count}회`;
  } else if(count< 10000) {
    return `조회수 ${(count/1000).toFixed(1)}천회`;
  } else if(count< 100000) {
    return `조회수 ${(count/10000).toFixed(1)}만회`;
  } else if(count< 100000000) {
    return `조회수 ${(count/10000).toFixed(0)}만회`;
  } else {
    return `조회수 ${(count/100000000).toFixed(0)}억회`;
  }
}

export default processViewCount