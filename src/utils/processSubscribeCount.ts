const processSubscribeCount = (count: number) => {
  if(count<1000) {
    return `구독자 ${count}명`;
  } else if(count< 10000) {
    return `구독자 ${(count/1000).toFixed(1)}천명`;
  } else if(count< 100000) {
    return `구독자 ${(count/10000).toFixed(1)}만명`;
  } else if(count< 100000000) {
    return `구독자 ${(count/10000).toFixed(0)}만명`;
  } else {
    return `구독자 ${(count/100000000).toFixed(0)}억명`;
  }
}

export default processSubscribeCount