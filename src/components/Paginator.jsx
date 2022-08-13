import { Pagination,Box } from '@mui/material';

export default function Paginator({count,pageChangeHandler}){
  return(
    <Box display="flex" justifyContent="center" alignItems="center" marginBottom="2em">

      <Pagination onChange={pageChangeHandler}  showLastButton count={count} color="primary"/>

    </Box>
    )

}