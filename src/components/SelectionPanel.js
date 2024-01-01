import '../styling/Selection.css';
import React, { useState, useContext} from 'react';
import SelectContext from './context.js';

function Selection(){
  const {selectionState, setSelectionState} = useContext(SelectContext);

  function select(state){
    console.log(selectionState);
    if(state === "s1"){
      setSelectionState("s1");
    }else if(state === "s2"){
      setSelectionState("s2");
    }else if(state === "s3"){
      setSelectionState("s3");
    }else{
      setSelectionState("init"); //set to default
    }
  }

  function find(){
    console.log("triggered");
  }

  return(
    <div className="panel">
      <div onClick = {() => select("s1")} className="options">Select Source</div>
      <div onClick = {() => select("s2")} className="options">Select Destination</div>
      <div onClick = {() => select("s3")} className="options">Add Road Block</div>
      <div onClick = {() => select("init")} className="options">Default</div>
      <div onClick = {() => find()} className="options">Explore</div>
      <div className="options"></div>
    </div>
  );
}

export default Selection;
