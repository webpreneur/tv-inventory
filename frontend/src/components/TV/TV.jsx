import React from 'react';
import './TV.css';

const TV = ({
  _id,
  name,
  itemNo,
  displaySizeInInches,
  displayType,
  resolutionK,
  outputs
}) => {

  const outputsList = outputs.map(
    (output, i) => (
      <span key={ `${_id}-output_${i}` } >{ output }</span>
    )
  );

  return(

    <div className="TV">
      <span>{ name }</span>
      <span>{ itemNo }</span>
      <span>{ displaySizeInInches }</span>
      <span>{ displayType }</span>
      <span>{ resolutionK }</span>
      <span>{ outputsList }</span>
    </div>

  )

}

export default TV;
