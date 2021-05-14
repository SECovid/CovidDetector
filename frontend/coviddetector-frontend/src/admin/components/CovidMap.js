import React from 'react';
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
export default function CovidMap(props){
    const data =
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