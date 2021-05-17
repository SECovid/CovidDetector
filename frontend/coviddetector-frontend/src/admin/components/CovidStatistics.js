

import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors ,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const CovidStatistics = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: [93, 7],
        label: 'Covid'
      },
      {
        backgroundColor: colors.grey[200],
        data: [31,69],
        label: 'No Covid'
      }
    ],
    labels: ['Cough', 'No Cough']
  };

  const handleChange = (e) => {
    console.log("IN HANDLE CHANGE")
  
  };
  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
            <CardHeader
        action={
          <FormControl>
            <InputLabel>Factor</InputLabel>
            <Select onChange={handleChange} style={{ width: 100 }}>
              <MenuItem value="Hi">Hi</MenuItem>
              <MenuItem value="Bye">Bye</MenuItem>
            </Select>
          </FormControl>
        }
        title="Covid statistics"
      ></CardHeader>
      <Divider />
      <CardContent>
      <div style={{'height':350}}> 
          <Bar
            data={data}
            options={options}
          />
      </div>
      </CardContent>

    </Card>
  );
};

export default CovidStatistics;