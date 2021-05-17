import React,  { useState } from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Typography
  } from '@material-ui/core';
  import { orange } from '@material-ui/core/colors';
  import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
  import send_request from '../../API/APIcalls';
  const AverageCovidPercentage = (props) =>{
    const getAverageCovid= () =>{
      send_request('admin/average_covid_percentage','GET').then(
        res => {
          setPercentages((res['data']['average']*100).toFixed(2))
        }
      )
    }
    const [percentages, setPercentages] = useState(0);
    getAverageCovid()
    return(
      <Card
        sx={{ height: '100%' }}
        {...props}
      >
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                AVERAGE COVID PERCENTAGE
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {percentages}% 
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: orange[600],
                  height: 56,
                  width: 56
                }}
              >
                <InsertChartIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box sx={{ pt: 3 }}>
            <LinearProgress
              value={percentages}
              variant="determinate"
            />
          </Box>
        </CardContent>
      </Card>
    );
  } 
  
  export default AverageCovidPercentage;