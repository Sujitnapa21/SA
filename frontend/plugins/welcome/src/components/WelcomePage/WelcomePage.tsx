import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Content,
  Header,
  Page,
  pageTheme,
  ContentHeader,
} from '@backstage/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Alert } from '@material-ui/lab';

import { DefaultApi } from '../../api/apis'; //importAPI

import { TextField, InputAdornment } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
//import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    margin: {
      margin: theme.spacing(3),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '50ch',
    },
    button: {
      marginLeft:'40px',
    },
    center: {
      textAlign: 'center',
    }
  }),
);

const patientState = {
  pati_id: 1,
  name: '',
  nametitle_id: 1,
  idcard: '',
  gender_id: 1,
  address: '',
  congenital: '',
  blood_id:'',
  allergic: '',
  user_id : ''
};


const patientidState = [
  {
    pati_id:'นักเรียน'
  },
  {
    pati_id: 'นักศึกษา'
  },
  {
    pati_id:'บุคลากร'
  },
  {
    pati_id:'บุคคลทั่วไป'
  }
];


const nametitleState = [
  {
    nametitle_id: 'เด็กหญิง'
  },
  {
    nametitle_id: 'เด็กชาย'
  },
  {
    nametitle_id: 'นาย'
  },
  {
    nametitle_id: 'นาง'
  },
  {
    nametitle_id: 'นางสาว'
  },
  {
    nametitle_id: 'อื่น ๆ'
  }
];

const genderState = [
  {
    gender_id: 'ชาย'
  },
  {
    gender_id: 'หญิง'
  },
  {
    gender_id: 'อื่น ๆ'
  },
  
];

const bloodtypeState = [
  {
    blood_id: 'A'
  },
  {
    blood_id: 'B'
  },
  {
    blood_id: 'O'
  },
  {
    blood_id: 'AB'
  }
  
];

const employeeidState = [
  {
    user_id: 'D1234567'
  },
  
  
];


export default function Create() {
  const classes = useStyles();
  //const profile = { givenName: 'to Software Analysis 63' };
  //const api = new DefaultApi();

  const [status, setStatus] = useState(false);
  const [alert, setAlert] = useState(true);
  const [patient, setPatient] = useState(patientState);
  const [patientid, setPatientID] = useState(patientidState);
  const [nametitle, setNameTitle] = useState(nametitleState);
  const [gender, setGender] = useState(genderState);
  const [bloodtype, setBloodType] = useState(bloodtypeState);
  const [employeeid, setEmployeeid] = useState(employeeidState)

  const handleInputPatientChange = (event: any) => {
    const { id, value } = event.target;
    setPatient({ ...patient, [id]: value });
  };

  const CreateUser = async () => {
    //  const res:any = await api.createUser({ user });
    //  setStatus(true);
    //  if (res.id != ''){
    //    setAlert(true);
    //  } else {
    //    setAlert(false);
    //  }
    // const timer = setTimeout(() => {
    //   setStatus(false);
    // }, 1000);
    setStatus(true);
    setAlert(false);
    const timer = setTimeout(() => {
      setStatus(false);
    }, 1000);
  };

  return (
    <Page theme={pageTheme.home}>
      <Header 
        title={`ระบบข้อมูลผู้ป่วย`} 
      ></Header>
      <Content>
        <ContentHeader title=''> 
          {status ? (
            <div>
              {alert ? (
                <Alert severity="success">
                  This is a success alert — check it out!
                </Alert>
              ) : (
                  <Alert severity="warning" style={{ marginTop: 20 }}>
                    This is a warning alert — check it out!
                  </Alert>
                )}
            </div>
          ) : null}
        </ContentHeader>
        <h2 className={classes.center}>เพิ่มข้อมูลผู้ป่วย</h2>
        <div className={classes.root}>
          <form noValidate autoComplete="off">
            <FormControl
              fullWidth
              className={classes.margin}
              variant="outlined"
            >

              <TextField
                style={{ marginTop: 20 }}
                id="idcard"
                label="เลขบัตรประจำตัวประชาชน"
                variant="outlined"
                type="intrger"
                size="medium"
                multiline
                value={patient.idcard}
                onChange={handleInputPatientChange}
              />
              <br></br>


              <Autocomplete
                id="combo-box-demo"
                options={patientid}
                getOptionLabel={(option) => option.pati_id }
                renderInput={(params) => <TextField {...params} label="สถานะผู้ป่วย" variant="outlined" />}
              />

              <Autocomplete
                style={{ marginTop: 20 }}
                id="combo-box-demo"
                options={nametitle}
                getOptionLabel={(option) => option.nametitle_id }
                renderInput={(params) => <TextField {...params} label="คำนำหน้าชื่อ" variant="outlined" />}
              />

              <TextField
                style={{ marginTop: 20 }}
                id="name"
                label="ชื่อ-นามสกุล"
                variant="outlined"
                type="string"
                size="medium"
                multiline
                value={patient.name}
                onChange={handleInputPatientChange}
              />


                <Autocomplete
                style={{ marginTop: 20 }}
                id="combo-box-demo"
                options={gender}
                getOptionLabel={(option) => option. gender_id }
                renderInput={(params) => <TextField {...params} label="เพศ" variant="outlined" />}
              />

              <Autocomplete
                style={{ marginTop: 20 }}
                id="combo-box-demo"
                options={bloodtype}
                getOptionLabel={(option) => option. blood_id }
                renderInput={(params) => <TextField {...params} label="กรุ๊ปเลือด" variant="outlined" />}
              />

              <TextField
                style={{ marginTop: 20 }}
                id="address"
                label="ที่อยู่"
                variant="outlined"
                type="string"
                size="medium"
                multiline
                rows={4}
                value={patient.address}
                onChange={handleInputPatientChange}
              />

            

                <h2 className={classes.center}>ข้อมูลทางการแพทย์</h2>
        



              <TextField
                style={{ marginTop: 20 }}
                id="congenital"
                label="โรคประจำตัว"
                variant="outlined"
                multiline
                rows={4}
                type="string"
                size="medium"
                value={patient.congenital}
                onChange={handleInputPatientChange}
              />

              <TextField
                style={{ marginTop: 20 }}
                id="allergic"
                label="ประวัติการแพ้ยา"
                variant="outlined"
                multiline
                rows={4}
                type="string"
                size="medium"
                value={patient.allergic}
                onChange={handleInputPatientChange}
              />

              <Autocomplete
                style={{ marginTop: 20 }}
                id="combo-box-demo"
                options={employeeid}
                getOptionLabel={(option) => option. user_id }
                renderInput={(params) => <TextField {...params} label="ผู้บันทึกข้อมูล" variant="outlined" />}
              />

            </FormControl>
            <div className={classes.margin}>
              <Button
                onClick={() => {
                  CreateUser();
                }}
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              
              <Button
                variant="contained"
                color="primary"
                size="small"
                component={RouterLink}
                to="/"
                className={classes.button}
                startIcon={<ArrowBackIosIcon />}
              >
                BACK
              </Button>
            </div>
          </form>
        </div>
      </Content>
    </Page>
  );
}
