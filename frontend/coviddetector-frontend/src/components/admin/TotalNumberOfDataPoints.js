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
  const TotalNumberOfDataPoints = (props) =>{
    
  


    const getTotalNumberOfTrainingData= () =>{
      send_request('admin/total_training_data','GET').then(
        res => {
          console.log("GETTING NUMBER OF TRAINING DATA")
          setTotalDataPoints(res['data']['size'])
        }
      )
    }
    const [totalDataPoints, setTotalDataPoints] = useState(0);
      useEffect(() => {
          getTotalNumberOfTrainingData()
      },[totalDataPoints])
    
    return(
      <Card {...props}>
        <CardContent>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                TOTAL NUMBER OF DATA POINTS
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {totalDataPoints}
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

        </CardContent>
      </Card>
    );
  } 
  
  export default TotalNumberOfDataPoints;
