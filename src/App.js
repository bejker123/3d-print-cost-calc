import './App.css';
import { useState, useEffect } from 'react';

function App(){
  let [FilamentCost,setFilamentCost] = useState(0);
  let [ElectricityCost,setElectricityCost] = useState(0);
  let [TotalCost,setTotalCost] = useState(0);

  let [ActiveCalc,setActiveCalc] = useState("weigth");

  useEffect(() => {
      Update();
  })

  function isInvalid(x,min = 0){
    return isNaN(x) || x <= min;
  }

  function getValue(e){
    return document.getElementById(e).value;
  }

  function Update(){
    const _3DPrintWeight = parseFloat(getValue("_3DPrintWeight"));
    const CostPerFilament = parseFloat(getValue("CostPerFilament"));
    const FilamentWeight = parseFloat(getValue("FilamentWeight"));

    const _3DPrintLength = parseFloat(getValue("_3DPrintLength"));
    const CostPerFilamentLength = parseFloat(getValue("CostPerFilamentLength"));
    const FilamentLength = parseFloat(getValue("FilamentLength"));

    const Wattage = parseFloat(getValue("Wattage"));
    const costPerKWh = parseFloat(getValue("costPerKWh"));
  
    let RHours = parseInt(getValue("RuntimeHours"));
    let RMinutes = parseInt(getValue("RuntimeMinutes"));
    if(isNaN(RHours) || RHours <= 0)
      RHours = 0;
    if(isNaN(RMinutes) || RMinutes <= 0)
      RMinutes = 0;

    if(isInvalid(_3DPrintWeight)|| isInvalid(CostPerFilament) || isInvalid(FilamentWeight)
    || isInvalid(costPerKWh) || isInvalid(Wattage)){
      //Warning!
      return;
    }
    
    let FilamentCost = 0.0;

    if(ActiveCalc === "weight")
      FilamentCost = CostPerFilament / FilamentWeight * _3DPrintWeight;
    else //Calculate from length
      FilamentCost = CostPerFilamentLength / FilamentLength * _3DPrintLength;

    let ECost = (RHours + RMinutes / 60) * (Wattage / 1000) * costPerKWh; 
    if (isNaN(ECost))
      ElectricityCost = 0.0;
    let TotalCost = FilamentCost + ECost;
    setFilamentCost(FilamentCost.toFixed(2));
    setElectricityCost(ECost.toFixed(2));
    setTotalCost(TotalCost.toFixed(2));
  }
  
  function resizeInput(input) {
    input.style.width = (input.value.length + 0.6) + "ch";
    Update();
  }

  return (
    <div className='App'>
      <h1>Filament Cost: {FilamentCost} PLN</h1>
      <h1>Electricity Cost: {ElectricityCost} PLN</h1>
      <h1>Total Cost: {TotalCost} PLN</h1>
      <div className="inputs">
        <div><span>3D print weight: </span><input defaultValue="10" onChange={(e)=>{
            setActiveCalc("weight");
            resizeInput(e.target);
          }} type="text" id="_3DPrintWeight" /></div>
        <div><span>cost per filament pack: </span> <input defaultValue="80" size={6} onChange={(e)=>{resizeInput(e.target)}} type="text" id="CostPerFilament" /></div>
        <div><span>weight of filament pack: </span> <input defaultValue="1000" size={6} onChange={(e)=>{resizeInput(e.target)}} type="text" id="FilamentWeight" /></div>

        <div><span>3D print length: </span><input defaultValue="0" onChange={(e)=>{
            setActiveCalc("height");
            resizeInput(e.target);
          }} type="text" id="_3DPrintLength" /></div>
        <div><span>cost per filament pack: </span> <input defaultValue="80" size={6} onChange={(e)=>{resizeInput(e.target)}} type="text" id="CostPerFilamentLength" /></div>
        <div><span>length of filament pack: </span> <input defaultValue="333" size={6} onChange={(e)=>{resizeInput(e.target)}} type="text" id="FilamentLength" /></div>

        <div><span>Wattage: </span> <input defaultValue="360" size={10} onChange={(e)=>{resizeInput(e.target)}} type="text" id="Wattage" /></div>
        <div><span>Electricity Cost (per KWh): </span> <input defaultValue="0.8" size={1} onChange={(e)=>{resizeInput(e.target)}} type="text" id="costPerKWh" /></div>
        <div>
          <span>runtime: </span>
          <input placeholder="hours" size={2} onChange={(e)=>{resizeInput(e.target)}} type="text" id="RuntimeHours" />
          <input placeholder="minutes" size={4} onChange={(e)=>{resizeInput(e.target)}} type="text" id="RuntimeMinutes" />
        </div>
      </div>
    </div>
  );
}

export default App;
