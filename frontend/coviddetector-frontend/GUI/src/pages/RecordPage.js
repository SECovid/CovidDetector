import React from "react";
import Recorder from "../components/recorder"
import Grid from '@material-ui/core/Grid';
import {Typography, Box} from "@material-ui/core";
import isLoggedIn from "../functions/isLoggedIn";
import SymptomsSurvey from "../components/symptoms_survey";
import coughImg from "../images/cough.jpg"


class RecordPage extends React.Component {
    constructor(props) {
        super(props);
        this.survey = React.createRef()
        console.log(this.survey)
    }

    retrieveSurveyResults = (childData) => {
        this.setState(childData)
    }


    render() {
        return (<Box container spacing={2} justify="center">
                <Typography align='center' variant='h1' color='secondary' >COUGHVID test now!</Typography>
                <Recorder surveyResults={this.state} />
                {isLoggedIn() ? <SymptomsSurvey updateSurveyResults={this.retrieveSurveyResults}/> : ''}
            </Box>
        )
    }

}

export default RecordPage;
