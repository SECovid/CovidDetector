import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import { green } from '@material-ui/core/colors';
  import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
  import PeopleIcon from '@material-ui/icons/PeopleOutlined';
  import send_request from '../../API/APIcalls';




 

  const NumberOfTrainingDataUsed = (props) =>{
    const getNumberOfTrainingData= () =>{
      send_request('admin/training_data','GET').then(
        res => {
          setDataPoints(res['data']['size'])
        }
      )
    }
    const [dataPoints, setDataPoints] = useState(0);
      useEffect(() => {
          getNumberOfTrainingData()
      },[dataPoints])
    return(
      <Card {...props}>
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
                NUMBER OF DATA POINTS USED
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {dataPoints}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: green[600],
                  height: 56,
                  width: 56
                }}
              >
                <PeopleIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              pt: 2
            }}
          >
            <ArrowUpwardIcon sx={{ color: green[900] }} />
            <Typography
              variant="body2"
              sx={{
                color: green[900],
                mr: 1
              }}
            >
              16%
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >
              Since last model
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  } 
  
  export default NumberOfTrainingDataUsed;
