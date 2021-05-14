import React from 'react';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography
  } from '@material-ui/core';
  import { indigo } from '@material-ui/core/colors';
  import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
  
  const ModelHealth = (props) => (
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
              HEALTHY
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
  
  export default ModelHealth;