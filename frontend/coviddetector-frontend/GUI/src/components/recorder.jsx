import React from "react";
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import send_request from "../APIcalls";
import IconButton from "@material-ui/core/IconButton";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";


export default class Recorder extends React.Component {
    data;


    constructor(props) {
        super(props);
        this.state = {
            recordState: null
        };
    }

    start = () => {
        this.setState({
            recordState: RecordState.START
        })
    }

    stop = () => {
        this.setState({
            recordState: RecordState.STOP
        })
    }

    blobToBase64(blob) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    };

    onStop = (audioData) => {
        console.log('audioData', audioData)
        var reader = new FileReader();
        reader.readAsDataURL(audioData.blob);
        reader.onloadend = function () {
            var base64data = reader.result;
            base64data = base64data.substr(base64data.indexOf(',') + 1);
            send_request('prediction/fast_prediction','POST', {'data': base64data}).then(r => console.log(r))
        }
    }


    render() {
        const {recordState} = this.state

        return (<div className="App">
            <div>
                <AudioReactRecorder
                    state={recordState}
                    onStop={this.onStop}
                    backgroundColor="rgb(255,255,255)"
                    foregroundColor="rgb(0,0,0)"/>
                <div onClick={(recordState === RecordState.START) ? this.stop : this.start} style={{ textAlign: "center"}}>
                    <IconButton color="secondary"
                    >
                        <KeyboardVoiceIcon style={{ fontSize: 60 }}/>
                    </IconButton>
                </div>
            </div>
        </div>)

    }
}