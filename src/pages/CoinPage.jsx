import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CurrencyContext } from '../context/currency';
import { useContext } from 'react';
import api from '../api';
import { Box } from '@mui/material';
import { CoinSideBar } from '../components/CoinSideBar';
import CoinChart from '../components/CoinChart';
import { Paper, Typography, Link } from '@mui/material';
import InfiniteScroll from "react-infinite-scroll-component"


export default () => {
  const { currency } = useContext(CurrencyContext)
  const coinID = useParams().id
  let [pageNumber, setPageNumber] = useState(0)
  const [items, setItems] = useState([])

  useEffect(() => console.log(items), [items])

  function addNewsComponents() {
    pageNumber += 1
    api.getCoinNews(coinID, pageNumber).then((newsArticles) => {
      console.log(newsArticles)
      newsArticles.forEach((article) => {
        items.push(
          <Link href={article.url} sx={{ display: "flex", gap: "10px", padding: "15px" }}>
            <img src={article.urlToImage} style={{ width: "100px", height: "100px" }} />
            <Typography variant="h5">{article.description}</Typography>
          </Link>
        )
      })
      setItems([...items])
      setPageNumber(pageNumber)
    })
  }
  return (
    <Box sx={{ display: "flex", width: "100ww", height: "100vh" }}>
      <Box sx={{ width: "105vw" }}>{" "}</Box>
      <CoinSideBar currency={currency} sx={{ position: "fixed", overflowY: "hidden", width: "25%", display: "flex", flexDirection: "column", alignItems: "center" }} />
      <InfiniteScroll
        style={{ width:"70vw" }}
        dataLength={items.length} //This is important field to render the next data
        next={addNewsComponents}
        hasMore={true}
        sx={{ paddingTop: "300rem", backgroundColor: "red", width: "100%" }}
      >
        <Box sx={{ flexGrow: 1, padding: "1em", fontSize: "0.5rem", height: "100vh", overflowY: "scroll" }}>
          <Box>
            <Typography variant="h4">Charts</Typography>
          <CoinChart currency={currency} />
          </Box>
          <Box>
            <Typography variant="h4">News</Typography>
            {items}
          </Box>
        </Box>
      </InfiniteScroll>
    </Box>
  )
}


// export default () => {
//   const { currency } = useContext(CurrencyContext)
//   const params = useParams();
//   return (
//     <Box sx={{ display: "flex", width: "100ww", height: "100vh" }}>
//       <CoinSideBar currency={currency} sx={{ width: "25%", display: "flex", flexDirection: "column", alignItems: "center" }} />
//       <Box sx={{ flexGrow: 1, padding: "1em", fontSize: "0.5rem", height: "100vh", overflowY: "scroll" }}>
//         <CoinChart currency={currency} />
//       </Box>
//     </Box>
//   )
// }
// `
// <NewsContainer style={{paddingTop:"3rem",width:"75%"}}>
//           <CoinChart currency={currency} />
//         </NewsContainer>
// `
