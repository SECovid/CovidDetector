import React from "react";
import {Typography, Box} from "@material-ui/core";
import Helpout from "../components/helpOut/helpout";
import send_request from "../API/APIcalls";
import AnimatedNumber from "animated-number-react";


class HelpOutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCount: 0
        }
    }

    componentDidMount() {
        send_request('admin/total_training_data', 'GET').then(
            res => {
                console.log(res)
                this.setState({dataCount: res['data']['size']})
            })
    }

    updateData = () => {
        send_request('admin/total_training_data', 'GET').then(
            res => {
                console.log(this)
                this.setState({dataCount: res['data']['size']})
            }
        )
    }
    formatValue = (value) => value.toFixed(0);

    render() {
        return (<Box container spacing={2} justify="center">
                <Typography align='center' variant='h3' color='secondary'>Join the <AnimatedNumber duration={500}
                                                                                                   value={this.state.dataCount}
                                                                                                   formatValue={this.formatValue}
                /> people that have helped us out already </Typography>
                <Typography align='center' variant='h1' color='secondary'>Record now!</Typography>
                <Helpout updateData={this.updateData}/>
            </Box>
        )
    }

}

export default HelpOutPage;
