import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import {groupBy} from "../utils.js"
import { useNavigate } from 'react-router-dom';
export default function TrendingCarousel({coins})
{
    coins=!coins?[
        {name:"eth",small:"https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg"},
        {name:"eth",small:"https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg"},
        {name:"eth",small:"https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg"},
    ]:coins
    coins=groupBy(coins,3)
    // console.log(coins)
    return (
        <Carousel interval={1500} sx={{height:"250px"}}>
            {
                coins.map( (coin, i) => <CoinCollection key={i} threeCoins={coin} /> )
            }
        </Carousel>
    )
}

function CoinCollection({threeCoins})
{
    let navigate= useNavigate();
    return (
        <Paper  elevation={0} sx={{display:"flex",alignItems:"center",justifyContent:"space-around",padding:"1em"}}>
            {threeCoins.map((coin,i)=>{
                return (
                    <Paper onClick={()=>navigate(`/${coin.item.id}`)} elevation={0} sx={{width:"15%",maxWidth:"110px",display:"flex",alignItems:"center",flexDirection:"column"}} key={i}>
                        <h2 style={{textAlign:"center"}}>{coin.item.name}</h2>
                        <img src={coin.item.large} style={{width:"95%"}}/>
                    </Paper>
                )
            })}
        </Paper>
    )
}