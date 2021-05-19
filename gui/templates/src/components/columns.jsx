//Define the columns that are displayed in the table


//COLUMNS is an array of objects
//Declaring 4 columns and each column is represented by an object in this array
export const COLUMNS = [
    {
        Header: 'Id', //first column would be the Id col
        accessor: 'history_id'//Now we need to associate each col with the rows of data using the accessor property
    },
    {
        Header: 'Recording',//second column would be the cough recording col
        accessor: 'prev_recording'//Now we need to associate each col with the rows of data using the accessor property
    },
    {
        Header: 'Date',//third column would be the date of the recording col
        accessor: 'date'//Now we need to associate each col with the rows of data using the accessor property
    },
    {
        Header: 'Result',//fourth column would be the result of the recorded cough col
        accessor: 'result'//Now we need to associate each col with the rows of data using the accessor property
    }
]

