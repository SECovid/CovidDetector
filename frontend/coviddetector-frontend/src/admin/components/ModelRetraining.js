import React from "react";
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
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
}
