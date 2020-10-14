  
import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Content, Header, Page, pageTheme } from '@backstage/core';
import SaveIcon from '@material-ui/icons/Save'; // icon save
import Swal from 'sweetalert2'; // alert
import {
  Container,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core';

import { DefaultApi } from '../../api//apis'; // Api Gennerate From Command
import { EntEmployee } from '../../api/models/EntEmployee'; //import interface Employee 
import { EntStatus }  from '../../api/models/EntStatus'; //import interface Status  
import { EntNameTitle }  from '../../api/models/EntNameTitle'; //import interface NameTitle
import { EntBloodtype}  from '../../api/models/EntBloodtype'; //import interface Bloodtype
import { EntGender }  from '../../api/models/EntGender'; //import interface Gender  


const HeaderCustom = {
  minHeight: '50px',
};
// css style 
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    formControl: {
      width: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: 300,
    },
    center: {
      textAlign: 'center',
    }
  }));

  interface Patient {
    idcard: string;
    status: number;
    nametitle: number;
    name: string;
    bloodtype: number;
    gender: number;
    address: string;
    congenital: string;
    allergic: string;
    employee: number;
  }

  const paTient: FC<{}> = () => {
    const classes = useStyles();
    //const http = new DefaultApi();
    const api= new DefaultApi();
  
    const [patient, setPatient] = React.useState<Partial<Patient>>({});

    const [employees, setEmployees] = React.useState<EntEmployee[]>([]);
    const [statuss, setStatuss] = React.useState<EntStatus[]>([]);
    const [nametitles, setNametitles] = React.useState<EntNameTitle[]>([]);
    const [bloodtypes, setBloodtypes] = React.useState<EntBloodtype[]>([]);
    const [genders, setGenders] = React.useState<EntGender[]>([]);


    // alert setting
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
    

    const getEmployee = async () => {
      const res = await api.listEmployee({ limit: 10, offset: 0 });
      setEmployees(res);
    };

    const getStatus = async () => {
        const res = await api.listStatus({ limit: 10, offset: 0 });
        setStatuss(res);
     };

      const getNameTitle = async () => {
        const res = await api.listNametitle({ limit: 10, offset: 0 });
        setNametitles(res);
      };
      
      const getBloodtype = async () => {
        const res = await api.listBloodtype({ limit: 10, offset: 0 });
        setBloodtypes(res);
      };
      const getGender = async () => {
        const res = await api.listGender({ limit: 10, offset: 0 });
        setGenders(res);
      };
      
  

      // Lifecycle Hooks
  useEffect(() => {
    getEmployee();
    getStatus();
    getNameTitle();
    getBloodtype();
    getGender();
    
  }, []);


    // set data to object patient
    const handleChange = (
      event: React.ChangeEvent<{ name?: string; value: unknown }>,
    ) => {
      const name = event.target.name as keyof typeof paTient;
      const { value } = event.target;
      setPatient({ ...patient, [name]: value });
      console.log(patient);
    };
  

    
 // clear input form
 function clear() {
  setPatient({});
}

// function save data
function save() {
  const apiUrl = 'http://localhost:8080/api/v1/patient';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  };

  console.log(patient); // log ดูข้อมูล สามารถ Inspect ดูข้อมูลได้ F12 เลือก Tab Console

  fetch(apiUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status === true) {
        clear();
        Toast.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลสำเร็จ',
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: 'บันทึกข้อมูลไม่สำเร็จ',
        });
      }
    });
}



  return (
    <Page theme={pageTheme.home}>
        <Header style={HeaderCustom} title={`เพิ่มข้อมูลผู้ป่วย`}></Header>
        <Content>
          <Container maxWidth="sm">
            <Grid container spacing={3}>


            <Grid item xs={12}></Grid>
              <Grid item xs={3}>
              <div className={classes.paper}>เลขบัตรประจำตัวประชาชน</div>
            </Grid>
            <FormControl>
            <TextField
                style={{ marginTop: 20 }}
                id="idcard"
                label="กรอกเลขบัตรประจำตัวประชาชน"
                variant="outlined"
                type="intrger"
                size="medium"
                multiline
                value={patient.idcard}
                onChange={handleChange}
              /> 
              </FormControl>
            


                            
              <Grid item xs={12}></Grid>
              <Grid item xs={3}>
              <div className={classes.paper}>สถานะผู้ป่วย</div>
            </Grid>
            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>เลือกสถานะผู้ป่วย</InputLabel>
                <Select
                  style={{ marginTop: 20 }}
                  name="status"
                  value={patient.status || ''}
                  onChange={handleChange}
                >
                  {statuss.map(item => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}></Grid>
              <Grid item xs={3}>
              <div className={classes.paper}>คำนำหน้าชื่อ</div>
            </Grid>
            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>เลือกคำนำหน้าชื่อ</InputLabel>
                <Select
                  style={{ marginTop: 20 }}
                  name="nametitle"
                  value={patient.nametitle || ''}
                  onChange={handleChange}
                >
                  {nametitles.map(item => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={12}>
              <Grid item xs={3}>
              <div className={classes.paper}>ชื่อ-นามสกุล</div>
            </Grid>            
            <Grid item xs={9}></Grid>
            <FormControl>
            <TextField
                style={{ marginTop: 20 }}
                id="name"
                label="กรอกชื่อ-นามสกุล"
                variant="outlined"
                type="string"
                size="medium"
                multiline
                value={patient.name}
                onChange={handleChange}
              /> 
              </FormControl>
              </Grid>


              <Grid item xs={12}></Grid>
              <Grid item xs={3}>
              <div className={classes.paper}>เพศ</div>
            </Grid>
            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>เลือกเพศ</InputLabel>
                <Select
                  style={{ marginTop: 20 }}
                  name="gender"
                  value={patient.gender || ''}
                  onChange={handleChange}
                >
                  {genders.map(item => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={12}></Grid>
              <Grid item xs={3}>
              <div className={classes.paper}>กรุ๊ปเลือด</div>
            </Grid>
            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>เลือกกรุ๊ปเลือด</InputLabel>
                <Select
                  style={{ marginTop: 20 }}
                  name="bloodtype"
                  value={patient.bloodtype || ''}
                  onChange={handleChange}
                >
                  {bloodtypes.map(item => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Grid item xs={3}>
              <div className={classes.paper}>ที่อยู่</div>
            </Grid>           
            <Grid item xs={9}></Grid>
            <FormControl>
            <TextField
                style={{ marginTop: 20 }}
                id="address"
                label="กรอกที่อยู่"
                variant="outlined"
                type="string"
                size="medium"
                multiline
                value={patient.address}
                onChange={handleChange}
              /> 
              </FormControl>
              </Grid>

              <h2 className={classes.center}>ข้อมูลทางการแพทย์</h2>

              <Grid item xs={12}>
              <Grid item xs={3}>
              <div className={classes.paper}>โรคประจำตัว</div>
            </Grid>
            <Grid item xs={9}></Grid>
            <FormControl>
            <TextField
                style={{ marginTop: 20 }}
                id="congenital"
                label="โรคประจำตัว"
                variant="outlined"
                type="string"
                size="medium"
                multiline
                value={patient.congenital}
                onChange={handleChange}
              /> 
              </FormControl>
              </Grid>


              <Grid item xs={12}>
              <Grid item xs={3}>
              <div className={classes.paper}>ประวัติการแพ้ยา</div>
            </Grid>
            <Grid item xs={9}></Grid>
            <FormControl>
            <TextField
                style={{ marginTop: 20 }}
                id="congenital"
                label="ประวัติการแพ้ยา"
                variant="outlined"
                type="string"
                size="medium"
                multiline
                value={patient.allergic}
                onChange={handleChange}
              /> 
              </FormControl>
              </Grid>

              <Grid item xs={12}></Grid>
              <Grid item xs={3}>
              <div className={classes.paper}>ผู้บันทึก</div>
            </Grid>
            <Grid item xs={9}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>เลือกผู้บันทึก</InputLabel>
                <Select
                  style={{ marginTop: 20 }}
                  name="employee"
                  value={patient.employee || ''}
                  onChange={handleChange}
                >
                  {employees.map(item => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={save}
              >
                บันทึกการดู
              </Button>
              </Grid>

                </Grid>
              </Container>
        </Content>
    </Page>
  );
};




  export default Patient;