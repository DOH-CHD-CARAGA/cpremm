import { Button, Row, Col } from 'antd'
import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.cssm'

class SignPad extends Component {
  sigPad = {}
  
  clear = () => {
    this.sigPad.clear()
    this.props.seteSign(null)
  }
  save = () => {
    if(!this.sigPad.isEmpty()) {
      this.props.seteSign(this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png'))
      this.props.setshowSignPad(false)
      this.sigPad.clear()
    } else {
      this.props.seteSign(null)
    }
  }

  render () {
    return <div className={styles.container}>
      <Row gutter={[24,0]}>
        <Col xs={12}>
          <Button
            type="link"
            onClick={this.clear}
            >
            <span className='text-danger'>CLEAR</span>
          </Button>
        </Col>
        <Col xs={12} className="d-flex justify-content-end">
          <Button
            type="link"
            onClick={this.save}
            >
            <span className='text-success'>SAVE</span>
          </Button>
        </Col>
      </Row>
      <center><small className="text-muted">Provide your signature to proceed</small></center>
      <Col xs={24} styles={{ width: window.innerWidth, height:  window.innerHeight }}>
        <SignaturePad canvasProps={{ width: window.innerWidth, height:  window.innerHeight }}
          ref={(ref) => { this.sigPad = ref }} />
      </Col>
      
    </div>
  }
}

export default SignPad