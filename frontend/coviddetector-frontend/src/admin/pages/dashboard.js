import React from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';

import AverageCovidPercentage from '../components/AverageCovidPercentage';
import ModelHealth from '../components/ModelHealth';
import NumberOfTrainingDataUsed from '../components/NumberOfTrainingDataUsed';
import TotalNumberOfDataPoints from '../components/TotalNumberOfDataPoints';
import CovidMap from '../components/CovidMap';
import CovidStatistics from '../components/CovidStatistics'
import CovidPercentagesPlot from '../components/CovidPercentagesPlot';
import ModelRetraining from '../components/ModelRetraining';
const Dashboard = () => (
  <>

    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalNumberOfDataPoints />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <NumberOfTrainingDataUsed />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AverageCovidPercentage />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <ModelHealth />
          </Grid>
         
         
          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <CovidStatistics/>
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <CovidStatistics/>
          </Grid>


          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
           <CovidPercentagesPlot/>
          
          </Grid>

          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
           <ModelRetraining/>
          
          </Grid>


         <Grid 
          container
          align = "center" justify = "center" alignItems = "center" 
          >
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
           <CovidMap/>
          
          </Grid>
          </Grid>
       
       
        </Grid>

        
      </Container>
    

   

    </Box>
  </>
);

export default Dashboard;