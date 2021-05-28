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
    const [medicalTests, setMedicalTests] = useState([]);
    const getMedicalTests= () =>{
        send_request('medical/get_medical_tests','GET').then(
            res => {
                console.log("MEDICAL TESTS : ")
                var data = res['data']['data'].reverse()
                console.log(res['data']['data'][0])

                if(JSON.stringify(data)!=JSON.stringify(medicalTests)){
                    console.log("DIFFERENT")
                    setMedicalTests(data)
                }
            }
        )
    }
    useEffect(() => {
       getMedicalTests()
    },[medicalTests])


    return (
        <Card {...props}>
            <CardHeader  title="Latest medical reports"/>
            <Divider />
            <CardContent>
                <TableContainer component={Paper} style={{marginTop: '1em',maxHeight: 200}}>
                    <Table className={classes.table} aria-label="simple table" stickyHeader >
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell width={250} align="center">Date</StyledTableCell>
                                <StyledTableCell align="center">Covid Result</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {medicalTests.map((row) => (
                                <StyledTableRow key={row.report_id}>
                                    <StyledTableCell align="center">{row[0]}</StyledTableCell>
                                    <StyledTableCell align="center">{row[1]?"Covid":"No Covid"}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>

        </Card>
    );
}
