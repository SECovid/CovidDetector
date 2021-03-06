import React from "react";
import AudioReactRecorder, {RecordState} from 'audio-react-recorder'
import send_request from "../../API/APIcalls";
import IconButton from "@material-ui/core/IconButton";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Box from "@material-ui/core/Box"
import {Switch, Typography} from "@material-ui/core";
import '../styles.scss'
import isLoggedIn from "../../functions/isLoggedIn";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Loading from "../../functions/loading";


export default class Helpout extends React.Component {
    counting;

    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            pending: false,
            recordState: null,
            counter: 0,
            started: false,
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
    }

    start = () => {
        this.setState({counter: 0, started: true})
        this.counting = setInterval(this.countUp, 1000);
        this.setState({
            recordState: RecordState.START
        })
    }

    stop = () => {
        clearInterval(this.counting)
        this.setState({
            recordState: RecordState.STOP,
            started: false
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.counter > 2 && this.state.started) {
            this.stop()
        }
    }


    updateStates = (results) => {
        if (results=="failed") {
            this.setState({
                test_completed: true,
                cough_found: false,
            })

        } else {
            this.setState({
                test_completed: true,
                cough_found: true
            });
        }


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
                this.setState({pending: true})
                send_request('medical/upload_medical_test', 'POST', {
                    'data': base64data,
                    'test_result': (this.state.test_result ? 1 : 0)
                }).then(r => {
                    results = r.data.results
                    this.updateStates(results)
                    this.setState({pending: false});
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

            <Box marginTop={5}
                 style={{
                     backgroundColor: "#2962ff",
                     padding: "50px",
                     borderRadius: "25px",
                     borderColor: "#ffffff",
                     borderWidth: "2px",
                     boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)",
                 }}>

                <Typography color="primary">Did you test positive or negative for COVID on your medical
                    test?</Typography>
                <Grid component="label" container alignItems="center" spacing={1} justify='center'>
                    <Grid item><Typography color="primary">Negative</Typography></Grid>
                    <Grid item>
                        <FormControlLabel m
                                          control={<Switch color='primary' checked={(this.state.test_result == 1)}
                                                           onChange={this.handleChange}
                                                           name="test_result"/>}
                        />
                    </Grid>
                    <Grid item style={{marginLeft: '-20px'}}><Typography color="primary">Positive</Typography></Grid>
                </Grid>
                <AudioReactRecorder
                    state={recordState}
                    onStop={this.onStop}
                    updateStates={this.updateStates}
                    backgroundColor="rgb(255,255,255)"
                    foregroundColor="rgb(0,0,0)"
                />
                {this.state.started ?
                    <Typography color="primary" variant="h4" className="blink_me">Cough now</Typography> : ''}
                <div onClick={(recordState === RecordState.START) ? this.stop : this.start}
                     style={{textAlign: "center"}}>
                    <IconButton color="primary" disabled={(this.state.counter < 2) & (this.state.started)}
                    >
                        <KeyboardVoiceIcon style={{fontSize: 60}}/>
                    </IconButton>
                </div>
                <Typography
                    color="primary">{this.state.counter}</Typography>
                <Typography color="primary">{this.state.seconds}</Typography>
                <Typography color="primary">{this.state.pending ? <Loading/> : ''}</Typography>
                <Typography color="primary">{this.state.cough_found ? <>Thank you for your
                    help!</> : this.state.test_completed? <> Cough not found! Please try again </>:''} < /Typography>
            </Box>
        </div>)

    }
}
