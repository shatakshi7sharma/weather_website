import React from "react";

interface IProps {
    title:any;
    value:any;
}

const Weather =(props:IProps)=>{
    const {title, value} =props;
    return(
      <div className="row">
          <p className="light-text col">{title}</p>
          <p className="ml-auto col">{value}</p>
      </div>
    )
  }
export default Weather;  