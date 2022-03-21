import { Steps } from 'antd';

const { Step } = Steps;

const JobOrderSteps = (props) => {
    const current = props.current
    return (
      <>
        <Steps
          type="navigation"
          size="small"
          current={current}
        >
          <Step disabled={current!==0} status={current===0? "process" : "finish"} title="Requesting Personnel"/>
          <Step disabled={current!==1} status={current===1? "process" : current>1? "finish" : "wait"} title="Select/Enter Device to Repair" />
          <Step disabled={current!==2} status={current===2? "process" : current>2? "finish" : "wait"} title="Nature of Complaint" />
          <Step disabled={current!==3} status={current===3? "process" : current>3? "finish" : "wait"} title="Sign Request Form" />
        </Steps>
      </>
    );
  }

export default JobOrderSteps