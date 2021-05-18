import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  useTheme,
  colors,
} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import send_request from "../../API/APIcalls";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function ModelRetraining(props) {
  const classes = useStyles();
    const [date, setDate] = useState(0);
    const [status, setStatus] = useState('Waiting');
    const retrainModel= () =>{
        //let utcDate = new Date(Date.UTC(2018, 11, 1, 0, 0, 0));
        var jsDate = new Date(date)
        var utcDate = jsDate.toUTCString()
        var body = {'date':utcDate}
        console.log(utcDate)

        send_request('admin/retrain','POST',body).then(
            res => {
                console.log(res)
                setStatus(res["data"]["message"])
            }
        )
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setDate(event.target.value);  }
  return (
    <Card {...props}>
      <CardHeader title="Model Actions" />
      <Divider />
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Rollback previous model version
            </Typography>
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <form className={classes.container} noValidate>
              <TextField
                id="date"
                label="Rollback Date"
                type="date"
                defaultValue="2021-05-22"
                onChange={handleChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Button
              variant="contained"
              color={colors.indigo[500]}
              className={classes.button}
              endIcon={<CloudUploadIcon />}
              onClick={retrainModel}
            >
              Retrain
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          
          size="small"
          variant="text"
        >
            {status}
        </Button>
      </Box>
    </Card>
  );
}
