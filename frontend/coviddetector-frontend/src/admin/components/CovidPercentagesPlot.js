import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    colors
  } from '@material-ui/core';
  import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
  import ArrowRightIcon from '@material-ui/icons/ArrowRight';
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Covid Percentage',
      fill: false,
      lineTension: 0.1,
      backgroundColor: colors.indigo[600],
      borderColor: colors.indigo[500],
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: colors.indigo[500],
      pointBackgroundColor: colors.indigo[500],
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: colors.indigo[500],
      pointHoverBorderColor: colors.indigo[600],
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const CovidPercentagesPlot = (props) => {
    return (
        <Card {...props}>
      <CardHeader
       
        title="Covid percentages"
      />
      <Divider />
      <CardContent>
      <div style={{'height':350}}> 
      <Line  data={data} />
      </div>
      </CardContent>

      
    </Card>
      );

}

export default CovidPercentagesPlot;