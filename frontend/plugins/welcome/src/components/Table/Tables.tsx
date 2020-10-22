import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { DefaultApi } from '../../api/apis';
const useStyles = makeStyles({
 table: {
   minWidth: 650,
 },
});
 
export default function ComponentsTable() {
 const classes = useStyles();
 const api = new DefaultApi();
 const [patients, setPatients] = useState(Array);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   const getPatients = async () => {
     const res = await api.listPatient({ limit: 10, offset: 0 });
     setLoading(false);
     setPatients(res);
   };

   getPatients();
 }, [loading]);
 

 
 return (
   <TableContainer component={Paper}>
     <Table className={classes.table} aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell align="center">เลขบัตรประจำตัวประชาชน</TableCell>
           <TableCell align="center">สถานะ</TableCell>
           <TableCell align="center">คำนำหน้าชื่อ</TableCell>
           <TableCell align="center">ชื่อ-นามสกุล</TableCell>
           <TableCell align="center">เพศ</TableCell>
           <TableCell align="center">หมู่เลือด</TableCell>
           <TableCell align="center">ที่อยู่</TableCell>
           <TableCell align="center">โรคประจำตัว</TableCell>
           <TableCell align="center">ประวัติแพ้ยา</TableCell>
           <TableCell align="center">ผู้บันทึก</TableCell>
           
         </TableRow>
       </TableHead>
       <TableBody>
         {patients.map((item:any) => (
           <TableRow key={item.id}>

             <TableCell align="center">{item.idcard}</TableCell>
             <TableCell align="center">{item.edges?.status?.name}</TableCell>
             <TableCell align="center">{item.edges?.nametitle?.name}</TableCell>
             <TableCell align="center">{item.name}</TableCell>
             <TableCell align="center">{item.edges?.gender?.name}</TableCell>
             <TableCell align="center">{item.edges?.bloodtype?.name}</TableCell>
             <TableCell align="center">{item.address}</TableCell>
             <TableCell align="center">{item.congenital}</TableCell>
             <TableCell align="center">{item.allergic}</TableCell>
             <TableCell align="center">{item.edges?.employee?.userId}</TableCell>
             <TableCell align="center">
              
                            </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
 );
}