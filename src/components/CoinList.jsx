import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination,Box,Link } from '@mui/material';
import { CurrencyContext } from '../context/currency';
import { useContext } from 'react';
import {useNavigate} from "react-router-dom"
import { formatCurrency,formatLargeCurrency } from '../utils';

export default function CoinList({coins}) {
  let {currency}=useContext(CurrencyContext)

  let navigate= useNavigate();

  return (
      <Table sx={{ minWidth: 650,maxWidth:1000,margin:"3em auto",overflowX:"scroll" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:700}}>Name</TableCell>
            <TableCell align="right" sx={{fontWeight:700}}>Current Price</TableCell>
            <TableCell align="right"  sx={{fontWeight:700}}>Market Capital</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row" sx={{display:"flex",gap:5}}>
                <Link   component="button" onClick={()=>navigate(`/${coin.id}`)} sx={{display:"flex",color:"black",textDecoration:"none",fontSize:"1.3em", gap:"10px",alignItems:"center"}}>
                  <img src={coin.image} style={{width:"15px",height:"15px"}}/>
                  <Box>{coin.name}</Box>
                </Link>
              </TableCell>
              {/* <TableCell align="right">{currency=="inr"?"₹":"$"}{new Intl.NumberFormat().format(coin.current_price)}</TableCell>
              <TableCell align="right">{currency=="inr"?"₹":"$"}{new Intl.NumberFormat('en-US').format(coin.market_cap)}</TableCell>
             */}
              <TableCell align="right">{formatCurrency(currency,coin.current_price)}</TableCell>
              <TableCell align="right">{formatLargeCurrency(currency,coin.market_cap)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}