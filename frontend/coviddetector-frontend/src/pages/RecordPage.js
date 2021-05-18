import React from "react";
import Recorder from "../components/recorder"
import Grid from '@material-ui/core/Grid';


class RecordPage extends React.Component {

    constructor(props){
        super(props)
    }



    render(){
        return(<Grid container spacing={2} justify="center">
                <Grid item><Recorder/></Grid>
            </Grid>
        )
    }

}

export default RecordPage;
