const endpoints={
  list_coins:(currency,page,pageSize)=>`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&page=${page}&per_page=${pageSize}`,
  chart_data:(coinID,currency,days=7)=>`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency}&days=${days}`,
  trending_list:()=>`https://api.coingecko.com/api/v3/search/trending`,
  coin_news_data:(coin,pageNum)=>`https://newsapi.org/v2/everything?q=+${coin}&apiKey=94f253946fdd47ee86246fca2bf42e17&pageSize=10&page=${pageNum}`,
  coin_info:(coinID)=>`https://api.coingecko.com/api/v3/coins/${coinID}/`,
}

const api={
  async getCoinList(currency,page,pageSize=10){
    // console.log(endpoints.list_coins(currency,page,pageSize))
    const resp = await fetch(endpoints.list_coins(currency,page,pageSize))
    const data = await resp.json()
    return data
  },
  async getCoinChartData(coinID,currency,days){
    const resp = await fetch(endpoints.chart_data(coinID,currency,days))
    const data = await resp.json()
    return data.prices
  },
  async getTrending(){
    const resp = await fetch(endpoints.trending_list())
    const data = await resp.json()
    // console.log("@(@((@(@",data)
    return data.coins
  },
  async getCoinNews(coin,pageNum){
    const resp = await fetch(endpoints.coin_news_data(coin,pageNum))
    const data = await resp.json()
    return data.articles
  },
  async getCoinData(coinID){
    const resp = await fetch(endpoints.coin_info(coinID))
    const data = await resp.json()
    return data
  }
}

export default api;