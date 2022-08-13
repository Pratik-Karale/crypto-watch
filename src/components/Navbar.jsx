import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {FormControl,Select,MenuItem} from '@mui/material';

function Navbar({currencyChangeHandler,sx}) {

  return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Crypto-Watch
          </Typography>
          <FormControl>
          <Select onChange={currencyChangeHandler} defaultValue="usd">
            <MenuItem value={"usd"}>USD</MenuItem>
            <MenuItem value={"inr"}>INR</MenuItem>
          </Select>
        </FormControl>
        </Toolbar>
      </AppBar>
  );
}

export default Navbar