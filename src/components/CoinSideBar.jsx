import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CurrencyContext } from '../context/currency';
import { useContext } from 'react';
import api from '../api';
import { Paper, Typography, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { formatCurrency } from '../utils';


export const CoinSideBar = ({currency,sx,setLoaded}) => {
  const params = useParams();
  const [coinInfo, setCoinInfo] = useState({})
  const [sideBarLoaded, setSideBarLoaded] = useState(false)


  useEffect(() => {
    let fetches=[
      api.getCoinData(params.id).then((data) => setCoinInfo(data)),
    ]
    Promise.all(fetches).then(()=>{setSideBarLoaded(true)})
  }, [currency])
  if(sideBarLoaded){
    return (
      <Paper elevation={3} sx={{...sx, padding: "1em" }} >
      <img src={coinInfo.image.large} style={{ width: "170px" }} />
      <Typography variant="h4" sx={{ margin: ".5em" }}>{coinInfo.name}</Typography>
      <Paper elevation={3}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell variant="head">Price</TableCell>
              <TableCell>{formatCurrency(currency, coinInfo.market_data.current_price[currency])}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Market Capital</TableCell>
              <TableCell>{formatCurrency(currency, coinInfo.market_data.market_cap[currency])}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Mkt Rank</TableCell>
              <TableCell>{(currency, coinInfo.market_data.market_cap_rank)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    <div style={{margin:"1em",textAlign:"justify"}} dangerouslySetInnerHTML={{__html:coinInfo.description.en.split(".").slice(0,2)}}></div>
    </Paper>
    )
  }else{
    return <>loading</>
  }
}
