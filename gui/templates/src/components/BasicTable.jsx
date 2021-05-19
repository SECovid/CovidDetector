import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS} from './columns'
import './table.css'

//creating an instance of a table to make use of the library react-table

export const BasicTable = () => {
    
    const columns = useMemo(() => COLUMNS,[])//Ensures that each data is repeated on each render to save on logic
    const data = useMemo(() => MOCK_DATA,[])//Ensures that each data is repeated on each render to save on logic
    
    //call function useTable directly since it is a hook
    //Then store it in a constant since it will return a table instance
   const tableInstance =  useTable({ 
        columns,
        data
    })

    const {//fcts and arrays that the useTable hook from react table package has given to us to enable the ease creation of a table
        getTableprops, 
        getTableBodyprops, 
        headerGroups, 
        rows, 
        prepareRow,
        } = tableInstance

        
    return (
        //Here define a basic table structure to store the data
        <table {...getTableprops()}>
           <thead>
               {
                   headerGroups.map(headerGroup =>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                       {
                           headerGroup.headers.map(column =>(
                            <th {...column.getHeaderProps()}>
                                {
                                    column.render('Header')
                                }
                            </th>
                           ))
                       } 
                        
                    </tr>
                   ))
               }
           </thead>
           <tbody {...getTableBodyprops()}>

            {
                rows.map(row =>{
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                           {
                               row.cells.map(cell =>{
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                               })  //gives us access to individual row cells
                           } 
                        </tr>
                    ) 
                })
            }
               
               
               
              </tbody> 
        </table>
    )
}
