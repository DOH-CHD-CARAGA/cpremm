import React from 'react';
import { Label, Input} from 'reactstrap';

const LabelDisplay = (props) =>  {
    return (
      <div className="label-display" id={(props.hasOwnProperty("id")?props.id:"")}>
        <Label>{props.label}</Label>
        <span className="">{props.value}</span>
      </div>
    );
}

export default LabelDisplay;
