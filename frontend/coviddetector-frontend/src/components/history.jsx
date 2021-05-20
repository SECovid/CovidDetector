import React, {useEffect} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import send_request from "../APIcalls";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.secondary.light,
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


export default function HistoryTable() {
    const classes = useStyles();

    const removeTime = (dateString) => {
        var myDate = new Date(dateString);
        var timePortion = myDate.getTime() % (3600 * 1000 * 24);
        var dateOnly = new Date(myDate - timePortion);
        return dateOnly.toDateString();
    }

    const round = (num) => {
        return (Math.round((num + Number.EPSILON) * 100))
    }

    function createData(report_id, covid_percentage, date, travel_abroad_14days,
                        contact_with_infected_person_14days,
                        visited_healthcare_facility_14days,
                        tested_positive_14days,
                        fever,
                        breathing_difficulty,
                        sore_throat,
                        cough,
                        no_taste,
                        no_smell,
                        headache) {
        return {
            'report_id': report_id,
            'covid_percentage': covid_percentage,
            'date': date,
            'travel_abroad_14days': travel_abroad_14days,
            'contact_with_infected_person_14days': contact_with_infected_person_14days,
            'visited_healthcare_facility_14days': visited_healthcare_facility_14days,
            'tested_positive_14days': tested_positive_14days,
            'fever': fever,
            'breathing_difficulty': breathing_difficulty,
            'sore_throat': sore_throat,
            'cough': cough,
            'no_taste': no_taste,
            'no_smell': no_smell,
            'headache': headache
        };
    }


    const [reports, updateReports] = React.useState([])
    const [rows, updateRows] = React.useState([])

    React.useEffect(() => {
        send_request("reports/table", 'GET').then(r => {

            updateReports([...r.data.covid_reports]);
        })
    }, [])

    React.useEffect(() => {
        console.log("reports after", reports)
        var i;
        var j;
        var tempRows = [];
        console.log("length", reports.length);
        for (i = 0; i < reports.length; i++) {
            tempRows.push(createData(reports[i][0], reports[i][3], reports[i][2], reports[i][4], reports[i][5], reports[i][6], reports[i][7], reports[i][8], reports[i][9], reports[i][10], reports[i][11], reports[i][12], reports[i][13], reports[i][14]));
        }
        updateRows(tempRows)
        console.log("Final rows:", rows)
    }, [reports]);


    return (
        <TableContainer component={Paper} style={{marginTop: '1em'}}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell width={250} align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">COVID Percentage</StyledTableCell>
                        <StyledTableCell align="center">Traveled in past 14 days</StyledTableCell>
                        <StyledTableCell align="center">Contact in past 14 days</StyledTableCell>
                        <StyledTableCell align="center">Healthcare in past 14 days</StyledTableCell>
                        <StyledTableCell align="center">Tested positive in past 14 days</StyledTableCell>
                        <StyledTableCell align="center">Fever > 38°C</StyledTableCell>
                        <StyledTableCell align="center">Breathing difficulties</StyledTableCell>
                        <StyledTableCell align="center">Sore throat</StyledTableCell>
                        <StyledTableCell align="center">Cough</StyledTableCell>
                        <StyledTableCell align="center">No taste</StyledTableCell>
                        <StyledTableCell align="center">No smell</StyledTableCell>
                        <StyledTableCell align="center">Headache</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.report_id}>
                            <StyledTableCell align="center">{removeTime(row.date)}</StyledTableCell>
                            <StyledTableCell align="center">{round(row.covid_percentage)}</StyledTableCell>
                            <StyledTableCell align="center">{row.travel_abroad_14days ?
                                <ClearIcon color="secondary"/> : ''}</StyledTableCell>
                            <StyledTableCell align="center">{row.contact_with_infected_person_14days ?
                                <ClearIcon color="secondary"/> : ''}</StyledTableCell>
                            <StyledTableCell align="center">{row.visited_healthcare_facility_14days ?
                                <ClearIcon color="secondary"/> : ''}</StyledTableCell>
                            <StyledTableCell align="center">{row.tested_positive_14days ?
                                <ClearIcon color="secondary"/> : ''}</StyledTableCell>
                            <StyledTableCell align="center">{row.fever ?
                                <ClearIcon color="secondary"/> : ''}</StyledTableCell>
                            <StyledTableCell align="center">{row.breathing_difficulty ?
                                <ClearIcon color="secondary"/> : ''}</StyledTableCell>
                            <StyledTableCell align="center">{row.sore_throat ?
                                <ClearIcon color="secondary"/> : ''}</StyledTableCell>
                            <StyledTableCell align="center">{row.cough ?
                                <ClearIcon color="secondary"/> : ''}</StyledTableCell>
                            <StyledTableCell align="center">{row.no_taste ?
                                <ClearIcon color="secondary"/> : ''}</StyledTableCell>
                            <StyledTableCell align="center">{row.no_smell ?
                                <ClearIcon color="secondary"/> : ''}</StyledTableCell>
                            <StyledTableCell align="center">{row.headache ?
                                <ClearIcon color="secondary"/> : ''}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
