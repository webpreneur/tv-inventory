import React from 'react';
import { Link } from 'react-router-dom';
import './TV.css';

const TV = ({
  _id,
  name,
  itemNo,
  displaySizeInInches,
  displayType,
  resolutionK,
  outputs,
  onDelete,
}) => {

  const outputsList = outputs.map(
    (output, i) => (
      <span key={ `${_id}-output_${i}` } >{ output }</span>
    )
  );

  return(

    <div className="TV">
      <Link to={`/televisions/${_id}`} key={_id}>
        <span>{ name }</span>
      </Link>
      <span>{ itemNo }</span>
      <span>{ displaySizeInInches }</span>
      <span>{ displayType }</span>
      <span>{ resolutionK }</span>
      <span>{ outputsList }</span>
      <span onClick={onDelete}> X </span>
    </div>

  )

}

export default TV;
