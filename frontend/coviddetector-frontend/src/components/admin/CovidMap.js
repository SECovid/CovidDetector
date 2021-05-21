import React, { useState,   useEffect } from 'react';
import { WorldMap } from "react-svg-worldmap"
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
export default function CovidMap(props){
  const [data, setData] = useState(
    [
      { country: "cn", value: 1389618778 }, // china
      { country: "in", value: 1311559204 }, // india
      { country: "us", value: 331883986 },  // united states
      { country: "id", value: 264935824 },  // indonesia
      { country: "pk", value: 210797836 },  // pakistan
      { country: "br", value: 210301591 },  // brazil
      { country: "ng", value: 208679114 },  // nigeria
      { country: "bd", value: 161062905 },  // bangladesh
      { country: "ru", value: 141944641 },  // russia
      { country: "mx", value: 127318112 }   // mexico
    ]
  );

  const getData= () =>{
    send_request('admin/statistics/country','GET').then(
      res => {
        const values = res['data']['covid']
        const allDates = []
        var dict = {}
        var dictCount = {}
        for (const value of values){
          
          var country = value[1]


       
          if(dict[country]){
            dict[country]+=value[0]
            dictCount[country]+=1
          }else{
            dict[country] = value[0]
            dictCount[country]=1
          }

   
        }


        console.log(dict)
        const newData = []
        for(var key in dict) {
          var value = dict[key];
          var count = dictCount[key]

          newData.push(
            { country: key, value: (value/count) }
          )
       

          
        }
   
        if(JSON.stringify(newData)!=JSON.stringify(data)){
          console.log("DIFFERENT")
          setData(newData)
        }


        
      }
    )
  }
  useEffect(() => {
    getData()
    },[data])

  return (
    <Card {...props}>
    <CardHeader

      title="Covid Map"
    />
    <Divider />
    <CardContent>
    <div>
       <WorldMap color="blue" value-suffix="tests" size="xxl" data={data} />
    </div>
    </CardContent>
    
  </Card>

  )
}