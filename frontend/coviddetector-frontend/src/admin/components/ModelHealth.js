import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import { indigo } from '@material-ui/core/colors';
  import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import send_request from "../../API/APIcalls";
  
  const ModelHealth = (props) => {

      const getHealth= () =>{
          send_request('admin/tests','GET').then(
              res => {
                  if(res['data']['result']){
                      setHealth('HEALTHY')
                  }else{
                      setHealth('NOT HEALTHY')}



              }
          )
      }
      const [health, setHealth] = useState('HEALTHY');
      useEffect(() => {
          getHealth()
      },[health])


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
                            MODEL HEALTH
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                        >
                            {health}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: indigo[600],
                                height: 56,
                                width: 56
                            }}
                        >
                            <FavoriteBorder />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
  }


  
  export default ModelHealth;
