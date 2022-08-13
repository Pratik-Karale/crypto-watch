function groupBy(list,count){
  let newList=[]
  for(const [i,item] of Object.entries(list)){
    if(i%count==0){
      newList.push([])
    }
    newList[newList.length-1].push(item)
  }
  return newList
}


function formatNumber(country,value){
  let formatted;
  if(country=="usa"){
    formatted=new Intl.NumberFormat('en-US').format(value)
  }else if(country=="india"){
    formatted=new Intl.NumberFormat('en-IN').format(value)
  }
  return formatted
}


function formatCurrency(currency,value){
  let formatted;
  if(currency=="usd"){
    formatted="$"+formatNumber("usa",value)
  }else if(currency=="inr"){
    formatted="₹"+formatNumber("india",value)
  }
  return formatted
}


function formatLargeCurrency(currency,value){
  let formatted;
  const usdLookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const inrLookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e5, symbol: "L" },
    { value: 1e7, symbol: "Cr." },
    { value: 1e9, symbol: "Arab" }
  ];
  function nFormatter(num, digits,lookup) {
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

  if(currency=="usd"){
    formatted="$"+nFormatter(value,0,usdLookup)
  }else if(currency=="inr"){
    formatted="₹"+nFormatter(value,0,inrLookup)
  }else{
    formatted=value
  }
  return formatted
}

export{groupBy,formatCurrency,formatLargeCurrency}