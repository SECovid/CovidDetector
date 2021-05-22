import React from "react";
import Recorder from "../components/record/recorder"
import RecorderAccurate from "../components/record/recorder_accurate";
import {Typography, Box, Switch} from "@material-ui/core";
import isLoggedIn from "../functions/isLoggedIn";
import SymptomsSurvey from "../components/record/symptoms_survey";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";


class RecordPage extends React.Component {
    constructor(props) {
        super(props);
        this.survey = React.createRef()
        console.log(this.survey)
        this.state = {
            accurate_test: false,
        }
    }

    retrieveSurveyResults = (childData) => {
        this.setState(childData)
    }

    handleChange = (event) => {
        this.setState({accurate_test: (this.state.accurate_test ? false : true)})

    };


    render() {
        return (<Box container spacing={2} justify="center">
                <Typography align='center' variant='h1' color='secondary'>Corina, do I have COVID?</Typography>
                <div className="App">
                    <Box marginTop={5}
                         style={{
                             backgroundColor: "#2962ff",
                             padding: "50px",
                             borderRadius: "25px",
                             borderColor: "#ffffff",
                             borderWidth: "2px",
                             boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)",
                         }}>
                        <Grid component="label" container alignItems="center" spacing={1} justify='center'>
                            <Grid item><Typography color="primary">Fast Test</Typography></Grid>
                            <Grid item>
                                <FormControlLabel m
                                                  control={<Switch color='primary' checked={this.state.accurate_test}
                                                                   onChange={this.handleChange}
                                                                   name="accurate.test"/>}
                                />
                            </Grid>
                            <Grid item style={{marginLeft: "-20px"}}><Typography color="primary">Accurate Test</Typography></Grid>
                        </Grid>

                        {this.state.accurate_test ? <RecorderAccurate surveyResults={this.state} N={3}/> :
                            <Recorder surveyResults={this.state}/>}
                        {isLoggedIn() ? <SymptomsSurvey updateSurveyResults={this.retrieveSurveyResults}/> : ''}
                    </Box>
                </div>
            </Box>
        )
    }

}

export default RecordPage;
