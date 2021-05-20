import React from "react";
import AudioReactRecorder, {RecordState} from 'audio-react-recorder'
import send_request from "../APIcalls";
import IconButton from "@material-ui/core/IconButton";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Box from "@material-ui/core/Box"
import {Switch, Typography} from "@material-ui/core";
import './styles.scss'
import isLoggedIn from "../functions/isLoggedIn";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";


export default class Helpout extends React.Component {
    counting;

    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            recordState: null,
            counter: 0,
            seconds: 0,
            milliseconds: 0,
            test_completed: false,
            currentDate: date,
            test_result: 0
        };
        this.countUp = this.countUp.bind(this);
        this.start = this.start.bind(this);
        this.onStop = this.onStop.bind(this);
        this.updateStates = this.updateStates.bind(this);
    }

    countUp() {
        this.setState({counter: this.state.counter + 1});
        this.counterToTime(this.state.counter);
    }

    counterToTime = (time) => {
        this.setState({seconds: Math.floor(time / 100)});
        this.setState({milliseconds: time - this.state.seconds * 100});

    }

    start = () => {
        this.setState({counter: 0})
        this.counting = setInterval(this.countUp, 10);
        this.setState({
            recordState: RecordState.START
        })
    }

    stop = () => {
        clearInterval(this.counting)
        this.setState({
            recordState: RecordState.STOP
        })
    }

    updateStates = (results) => {
        this.setState({
            test_completed: true,
            covid_negative: results[0][0],
            covid_positive: results[0][1]
        });


    }

    onStop = (audioData) => {
        console.log('audioData', audioData)
        var reader = new FileReader();
        reader.readAsDataURL(audioData.blob);
        var results;
        reader.onloadend = () => {
            var base64data = reader.result;
            base64data = base64data.substr(base64data.indexOf(',') + 1);
            if (isLoggedIn()) {
                send_request('medical/upload_medical_test', 'POST', {
                    'data': base64data,
                    'test_result': (this.state.test_result ? 1 : 0)
                }).then(r => {
                    console.log(r);

                })
            }
        }
    }

    round(num) {
        return (Math.round((num + Number.EPSILON) * 100))
    }

    handleChange = (event) => {
        this.setState({test_result: (this.state.test_result ? 0 : 1)})

    };


    render() {
        const {recordState} = this.state

        return (<div className="App">
            <Box marginTop={5} alignItems='center' justifyContent='center' display='flex' flexDirection='column'>
                <Typography>Did you test positive or negative for COVID on your medical test?</Typography>
                <Grid component="label" container alignItems="center" spacing={1} justify='center'>
                    <Grid item>Negative</Grid>
                    <Grid item>
                        <FormControlLabel m
                                          control={<Switch color='secondary' checked={(this.state.test_result==1)}
                                                           onChange={this.handleChange}
                                                           name="test_result"/>}
                        />
                    </Grid>
                    <Grid item>Positive</Grid>
                </Grid>
                <AudioReactRecorder
                    state={recordState}
                    onStop={this.onStop}
                    updateStates={this.updateStates}
                    backgroundColor="rgb(255,255,255)"
                    foregroundColor="rgb(0,0,0)"
                />
                <div onClick={(recordState === RecordState.START) ? this.stop : this.start}
                     style={{textAlign: "center"}}>
                    <IconButton color="secondary"
                    >
                        <KeyboardVoiceIcon style={{fontSize: 60}}/>
                    </IconButton>
                </div>
                <Typography>{(this.state.seconds < 10) ? '0' + this.state.seconds : this.state.milliseconds} : {(this.state.milliseconds < 10) ? '0' + this.state.milliseconds : this.state.milliseconds}</Typography>
                <Typography>{this.state.test_completed ? <>Thank you for your help!</> : ''} < /Typography>
            </Box>
        </div>)

    }
}