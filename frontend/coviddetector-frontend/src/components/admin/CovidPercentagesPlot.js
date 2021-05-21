import React, { useState,   useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    colors
  } from '@material-ui/core';
  import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
  import ArrowRightIcon from '@material-ui/icons/ArrowRight';
  import send_request from '../../API/APIcalls';


const CovidPercentagesPlot = (props) => {

  const [data, setData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Covid Percentage',
        fill: false,
        lineTension: 0.1,
        backgroundColor: colors.indigo[600],
        borderColor: colors.indigo[500],
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: colors.indigo[500],
        pointBackgroundColor: colors.indigo[500],
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colors.indigo[500],
        pointHoverBorderColor: colors.indigo[600],
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  });



  const getData= () =>{
    send_request('admin/statistics/time','GET').then(
      res => {
        const values = res['data']['covidTime']
        const allDates = []
        var dict = {}
        var dictCount = {}
        for (const value of values){
          
          var date = new Date(value[0])
  
          var month = date.getUTCMonth() + 1; //months from 1-12
          var day = date.getUTCDate();
          var year = date.getUTCFullYear();

          date = year + "/" + month + "/" + day;
       
          if(dict[date]){
            dict[date]+=value[1]
            dictCount[date]+=1
          }else{
            dict[date] = value[1]
            dictCount[date]=1
          }

   
        }



        const labels = []
        const dataValues = []
        for(var key in dict) {
          var value = dict[key];
          var count = dictCount[key]
          labels.push(key)
          dataValues.push(value/count)

          
        }
        console.log(labels)
        console.log(dataValues)

        
        const newData = {
          labels: labels,
          datasets: [
            {
              label: 'Covid Percentage',
              fill: false,
              lineTension: 0.1,
              backgroundColor: colors.indigo[600],
              borderColor: colors.indigo[500],
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: colors.indigo[500],
              pointBackgroundColor: colors.indigo[500],
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: colors.indigo[500],
              pointHoverBorderColor: colors.indigo[600],
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: dataValues
            }
          ]
        };
        if(JSON.stringify(newData)!=JSON.stringify(data)){
          console.log("DIFFERENT")
          setData(newData)
        }
        


  
      }

        )
      
    
  }

  function dateConverter(date) {
    var dateParts = date.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    return dateObject
  }

  useEffect(() => {
    getData()
    },[data])

    return (
        <Card {...props}>
      <CardHeader
       
        title="Covid percentages"
      />
      <Divider />
      <CardContent>
      <div > 
      <Line  data={data} />
      </div>
      </CardContent>

      
    </Card>
      );

}

export default CovidPercentagesPlot;