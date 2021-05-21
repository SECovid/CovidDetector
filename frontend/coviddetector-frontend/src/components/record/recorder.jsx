import React from "react";
import AudioReactRecorder, {RecordState} from 'audio-react-recorder'
import send_request from "../../API/APIcalls";
import IconButton from "@material-ui/core/IconButton";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Box from "@material-ui/core/Box"
import {Typography} from "@material-ui/core";
import '../styles.scss'
import isLoggedIn from "../../functions/isLoggedIn";
import Loading from "../../functions/loading";


export default class Recorder extends React.Component {
    counting;

    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1)  + '-' + today.getDate();

        this.state = {
            pending: false,
            recordState: null,
            counter: 0,
            seconds: 0,
            milliseconds: 0,
            test_completed: false,
            covid_positive: null,
            covid_negative: null,
            currentDate: date
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
        this.setState({counter: 0, test_completed: false})
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
            if (!isLoggedIn()) {
                this.setState({pending: true})
                send_request('prediction/fast_prediction', 'POST', {'data': base64data}).then(r => {
                    console.log(r);
                    results = r.data.results;
                    this.updateStates(results)
                    this.setState({pending: false})

                })
            } else {
                var survey = this.props.surveyResults;
                console.log(survey)
                this.setState({pending: true})
                send_request('prediction/fast_prediction', 'POST', {
                    'data': base64data,
                    'date': this.state.currentDate,
                    'travel_abroad_14days': survey.travel_abroad_14days,
                    'contact_with_infected_person_14days': survey.contact_with_infected_person_14days,
                    'visited_healthcare_facility_14days': survey.visited_healthcare_facility_14days,
                    'tested_positive_14days': survey.tested_positive_14days,
                    'fever': survey.fever,
                    'breathing_difficulty': survey.breathing_difficulty,
                    'sore_throat': survey.sore_throat,
                    'cough': survey.cough,
                    'no_taste': survey.no_taste,
                    'no_smell': survey.no_smell,
                    'headache': survey.headache

                }).then(r => {
                    console.log(r);
                    results = r.data.results;
                    this.updateStates(results);
                    this.setState({pending: false})

                })

            }
        }
    }

    round(num) {
        return (Math.round((num + Number.EPSILON) * 100))
    }


    render() {
        const {recordState} = this.state

        return (<div className="App">
            <Box marginTop={5}>
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
                <Typography>{this.state.pending?<Loading/>:''}</Typography>
                <Typography>{this.state.test_completed ? <>Chance of having COVID:
                {this.round(this.state.covid_positive)}% <br/><i>Remember that this is an initial screening and does<b> not </b>replace traditional tests</i></> : ''} < /Typography>
            </Box>
        </div>)

    }
}
