import '../styling/Selection.css';
import React, { useState, useContext} from 'react';
import SelectContext from './context.js';

function Selection(){
  const {selectionState, setSelectionState} = useContext(SelectContext);

  function select(state){
    const active = document.querySelectorAll(".active");
    if(active.length > 0){
      active[0].classList.remove('active');
    }

    try {
      const element = document.querySelector(`.${state}`);

      if (element) {
        element.classList.add('active');
      } else {
        console.error(`Element with selector "${state}" not found.`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

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

  function execute(){
    console.log("execute triggered");
  }

  function save(){
    console.log("save triggered")
  }

  return(
    <div className="panel">
      <div onClick = {() => select("s1")} className="options s1">Select Source</div>
      <div onClick = {() => select("s2")} className="options s2">Select Destination</div>
      <div onClick = {() => select("s3")} className="options s3">Add Road Block</div>
      <div onClick = {() => select("init")} className="options">Default</div>
      <div onClick = {() => save()} className="options">Save Configuration</div>
      <div onClick = {() => execute()} className="options">Execute</div>
      <div className="options"></div>
    </div>
  );
}

export default Selection;
