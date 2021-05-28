import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {Divider, Switch} from "@material-ui/core";
import send_request from "../../API/APIcalls";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: "center",
        alignContent: "center"
    },
    formControl: {
        margin: theme.spacing(3),

    },
}));

export default function SymptomsSurvey(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        travel_abroad_14days: false,
        contact_with_infected_person_14days: false,
        visited_healthcare_facility_14days: false,
        tested_positive_14days: false,
        fever: false,
        breathing_difficulty: false,
        sore_throat: false,
        cough: false,
        no_taste: false,
        no_smell: false,
        headache: false

    });

    React.useEffect(() => {
        props.updateSurveyResults(state)
    }, [])

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
        props.updateSurveyResults(state);
    };

    const {
        travel_abroad_14days,
        contact_with_infected_person_14days,
        visited_healthcare_facility_14days,
        tested_positive_14days,
        fever,
        breathing_difficulty,
        sore_throat,
        cough,
        no_taste,
        no_smell,
        headache
    } = state;

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel style={{color: "#ffffff"}}>Please fill out these short questions:</FormLabel>
                <Grid container>
                    <Grid item lg={5.9}>
                        <FormGroup style={{color: "#ffffff"}}>
                            <FormControlLabel
                                control={<Switch color='primary' checked={travel_abroad_14days}
                                                 onChange={handleChange}
                                                 name="travel_abroad_14days"/>}
                                label="I traveled abroad in the past 14 days "
                            />
                            <FormControlLabel
                                control={<Switch color='primary' checked={contact_with_infected_person_14days}
                                                 onChange={handleChange} name="contact_with_infected_person_14days"/>}
                                label="I had contact with a positive person "
                            />
                            <FormControlLabel
                                control={<Switch color='primary' checked={visited_healthcare_facility_14days}
                                                 onChange={handleChange} name="visited_healthcare_facility_14days"/>}
                                label="I Visited healthcare facility in the past 14 days "
                            />
                            <FormControlLabel
                                control={<Switch color='primary' checked={tested_positive_14days}
                                                 onChange={handleChange}
                                                 name="tested_positive_14days"/>}
                                label="I tested positive for COVID-19 in the past 14 days "
                            />
                            <FormControlLabel
                                control={<Switch color='primary' checked={fever} onChange={handleChange}
                                                 name="fever"/>}
                                label="I have a fever (above 38° C or 100° F)  "
                            />
                        </FormGroup></Grid>
                    <Divider orientation="vertical" style={{backgroundColor: "#ffffff"}}flexItem/>
                    <Grid item lg={5.9} style={{marginLeft: "15px"}}>
                        <FormGroup style={{color: "#ffffff"}}>
                            <FormControlLabel
                                control={<Switch color='primary' checked={breathing_difficulty}
                                                 onChange={handleChange}
                                                 name="breathing_difficulty"/>}
                                label="I am facing breathing difficulties "
                            />
                            <FormControlLabel
                                control={<Switch color='primary' checked={sore_throat} onChange={handleChange}
                                                 name="sore_throat"/>}
                                label="I have a sore throat "
                            />
                            <FormControlLabel
                                control={<Switch color='primary' checked={cough} onChange={handleChange}
                                                 name="cough"/>}
                                label="I am coughing  " color='primary'
                            />
                            <FormControlLabel
                                control={<Switch color='primary' checked={no_taste} onChange={handleChange}
                                                 name="no_taste"/>}
                                label="I cannot taste food "
                            />
                            <FormControlLabel
                                control={<Switch color='primary' checked={no_smell} onChange={handleChange}
                                                 name="no_smell"/>}
                                label="I cannot smell  "
                            />
                            <FormControlLabel
                                control={<Switch color='primary' checked={headache} onChange={handleChange}
                                                 name="headache"/>}
                                label="I have a headache "
                            />
                        </FormGroup> </Grid>
                </Grid>
            </FormControl>
        </div>
    );
}
