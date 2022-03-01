import { Table, Row, Col, Input, Card, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
const { Search } = Input;


const JobOrderList = ()=>{

  const columns = [
    { title: 'Date',
    render: val => (
      moment(val.date).format("MMMM DD, YYYY")
     )
    },
    { 
      title: 'REQUESTING PERSONNEL',
      render: val => (
        <Row gutter={[24,0]}>
          <Col xs={24}>
            Name: {val.name}
          </Col>
          <Col xs={24}>
            Designation: <span className='text-muted'>{val.designation}</span>
          </Col>
          <Col xs={24}>
            Division/Section: <span className='text-muted'>{val.division}</span>
          </Col>
        </Row>
      )
     },
    { title: 'DEVICE INFO',
    render: val => (
      <Card>
        <Row gutter={[24,0]} className="text-center">
        <Col xs={24}>
         <small>IT Equipement: {val.ITEquipement}</small>
        </Col>
        <Col xs={24}>
         <small>Brand/Model: {val.brandModel}</small>
        </Col>
        <Col xs={24}>
          <small>Serial No.: {val.serialNo}</small>
        </Col>
        <Col xs={24}>
          <small>Property No.: {val.propertyNo}</small>
        </Col>
      </Row>
      </Card>
    ),
     },
    { title: 'Nature of Complaint',
     render: val => (
      <TextArea 
      rows={val.natureOfComplaint.split('\n').length<3? 4 : val.natureOfComplaint.split('\n').length}
      value={val.natureOfComplaint}
      />
     )
    },
    { title: 'Action',
    render: val => (
      <Row gutter={[24,0]}>
        <Col xs={12}>
          <Button
            >
            PRINT
          </Button>
          </Col>
          <Col xs={12}>
          <Button

          >
            PROCEED
          </Button>
        </Col>
      </Row>
     ) }
  ];

  const data =[
    {
      date: Date.now(),
      name: "Name Testing",
      designation: "Designation",
      division: "Section",
      serialNo: "1",
      propertyNo: "2",
      ITEquipement: "Test",
      brandModel: "test",
      natureOfComplaint: "Daot ang testing"
    }
  ]
  return (
    <Row gutter={[24,0]}>
      <Col span={12} offset={6} className="mb-24">

        <Search 
        enterButton="Search" 
        size="large" 
        loading={false}
        placeholderr={"Search device/requestor's name/devices etc..."}
        onSearch={()=>{
          alert("test")
        }}/>
      </Col>

      <Col className="ml-5 mr-5">
        <Table
          align={"center"}
          filterDropdown
          sortOrder={"ascend"}
          responsive
          sorter
          columns={columns}
          dataSource={data}
        />
      </Col>
    </Row>
  );
}

export default JobOrderList;