import React, {useEffect, useState} from 'react';
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import send_request from "../../API/APIcalls";
import Paper from "@material-ui/core/Paper";

import ClearIcon from "@material-ui/icons/Clear";


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
    table: {
        minWidth: 650,
    }
}));


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
export default function CovidLastReports(props) {
    const classes = useStyles();
    const [date, setDate] = useState(0);
    const [status, setStatus] = useState('Waiting');
    const retrainModel= () =>{
        //let utcDate = new Date(Date.UTC(2018, 11, 1, 0, 0, 0));
        var jsDate = new Date(date)
        var utcDate = jsDate.toUTCString()
        var body = {'date':utcDate}
        console.log(utcDate)

        send_request('admin/retrain','POST',body).then(
            res => {
                console.log(res)
                setStatus(res["data"]["message"])
            }
        )
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setDate(event.target.value);  }
    return (
        <Card {...props}>
            <CardHeader  title="Latest medical reports"/>
            <Divider />
            <CardContent>
                <TableContainer component={Paper} style={{marginTop: '1em'}}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell width={250} align="center">Date</StyledTableCell>
                                <StyledTableCell align="center">Covid Result</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>

        </Card>
    );
}
