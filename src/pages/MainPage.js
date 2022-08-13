import Navbar from "../components/Navbar";
import CoinList from "../components/CoinList";
import TrendingCarousel from "../components/TrendingCarousel.jsx" 
import Paginator from "../components/Paginator" 
import api from "../api"
import {useEffect,useState,useRef, useContext} from "react"
import {CurrencyContext} from "../context/currency"

function MainPage() {
  const [coinList, setCoinList] = useState([])
  const [trendingCoins, setTrendingCoins] = useState([])
  // const [currency, setCurrency] = useState("usd")
  const {currency}=useContext(CurrencyContext)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    api.getTrending().then((trendCoins)=>setTrendingCoins(trendCoins))
  }, [])
  useEffect(() => {
    api.getCoinList(currency,currentPage).then((coinList)=>setCoinList(coinList)).then(()=>{
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // for smoothly scrolling
      });
    })
    
  }, [currency,currentPage])

  return (

      <div className="App">
        <TrendingCarousel coins={trendingCoins}/>
        <CoinList coins={coinList}/>
        <Paginator count={300} pageChangeHandler={(_,p)=>{
            setCurrentPage(p)}
          }/>
      </div>
  );
} 

export default MainPage;
