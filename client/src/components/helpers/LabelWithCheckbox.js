import React from 'react';
import { connect } from 'react-redux';
import { Label, Input} from 'reactstrap';
import { SetValue, } from './../../actions/Helpers/displayAction.js';
import { SET_REG_VALUE } from './../../actions/types.js';

const LabelWithCheckbox = (props) =>  {

  return (
    <div>
      <div id="withNA">
        {props.inptLabel}
        <span id="checkbox">
          <Label>
            <input type="checkbox" checked={(props.value==="N/A")?true:false} onClick={(e) => {
              props.SetValue(props.prop, (e.target.checked)?"N/A":"", SET_REG_VALUE);
            }}/>
            N/A
          </Label>
        </span>
      </div>
      <Input placeholder={props.placeholder} disabled={(props.value==="N/A")?true:false} onChange={props.onChange} value={props.value} data-case={props.case} data-type={props.dtype} data-prop={props.prop} type={(props.type)?"text":props.type} />
    </div>
  );
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  SetValue
})(LabelWithCheckbox);
