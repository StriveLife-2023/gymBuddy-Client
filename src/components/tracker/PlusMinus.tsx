import React, {Dispatch, SetStateAction, useEffect, useState} from "react";


const PlusMinus = ({setter, mainValue}) => {
  const minus = (e) => {
    e.preventDefault()
    if (mainValue > 0) {
      setter(mainValue - 1)
    }
  }

  const plus = (e) => {
    e.preventDefault()
    setter(mainValue + 1)
  }

  return (
    <>
    <button className = "btn btn-sm m-2" onClick = {minus}>-</button>
    {mainValue}
    <button className = "btn btn-sm m-2" onClick = {plus}>+</button>
    </>
  )
}
export default PlusMinus;