const processCount = (count: number) => {
  if(count<1000) {
    return count;
  } else if(count< 10000) {
    return (count/1000).toFixed(1)
  } else if(count< 100000) {
    return (count/10000).toFixed(1)
  } else if(count< 100000000) {
    return (count/10000).toFixed(0)
  } else {
    return (count/100000000).toFixed(0)
  }
}

export default processCount