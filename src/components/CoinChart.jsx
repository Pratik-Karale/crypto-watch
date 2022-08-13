import React, { useState, useEffect } from 'react'
import { VictoryAxis, VictoryTooltip, VictoryVoronoiContainer, VictoryLabel, VictoryChart, VictoryTheme, VictoryLine } from 'victory';
import api from '../api';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../utils';
import { Button,ButtonGroup } from '@mui/material';

export default function ({ currency }) {
  const coinID = useParams().id
  const [chartData, setChartData] = useState({})
  const [chartLoaded, setChartLoaded] = useState(false)
  const [days,setDays]=useState(7)

  useEffect(() => {
    let fetches = [
      api.getCoinChartData(coinID, currency,days).then(data => { setChartData(data) }),
    ]
    Promise.all(fetches).then(() => setChartLoaded(true))
  }, [currency,days])

  if (chartLoaded) {
    return (
      <div style={{position:"relative"}}>
        <VictoryChart
          scale={{ x: 'time' }}
          height={170}
          // width="90%"
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}

          containerComponent={
            <VictoryVoronoiContainer
              labelComponent={<VictoryTooltip style={{ fontSize: 6 }} />}
              // title={`${coinID} Coin Chart`}
              labels={({ datum }) => {
                let formattedDate = new Date(datum.x)
                formattedDate = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`
                return (`${formatCurrency(currency, datum.y)}\n ${formattedDate}`)
              }}
            />
          }
          theme={VictoryTheme.material}
        >
          {/* <VictoryLabel text={`${coinID} Coin Chart`} /> */}
          <VictoryAxis style={{ tickLabels: { angle: -60, fontSize: 6 } }} type="time" />
          <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 5 } }} />
          <VictoryLine
            width={4}
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
            }}
            data={chartData.map((pointCoords) => {
              let formattedDate = new Date(pointCoords[0])
              // formattedDate=`${formattedDate.getDate}/${formattedDate.getMonth()}`
              return {
                x: formattedDate, y: pointCoords[1]
              }
            })}
          />
        </VictoryChart>
        <ButtonGroup sx={{position:"absolute",right:0,bottom:0}} variant="contained" aria-label="outlined primary button group">
          <Button sx={{backgroundColor:(days==7)?"primary.dark":"primary"}} onClick={()=>setDays(7)}>7 Days</Button>
          <Button sx={{backgroundColor:(days==30)?"primary.dark":"primary"}} onClick={()=>setDays(30)}>1 Month</Button>
          <Button sx={{backgroundColor:(days==90)?"primary.dark":"primary"}} onClick={()=>setDays(90)}>3 Month</Button>
        </ButtonGroup>
      </div>
    )
  } else {
    <>loading</>
  }
}