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
 

 const deletePatients = async (id: number) => {
   const res = await api.deletePatient({ id: id });
   setLoading(true);
 };
 
 return (
   <TableContainer component={Paper}>
     <Table className={classes.table} aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell align="center">Idcard</TableCell>
           <TableCell align="center">Status</TableCell>
           <TableCell align="center">Nametitle</TableCell>
           <TableCell align="center">Name</TableCell>
           <TableCell align="center">Gender</TableCell>
           <TableCell align="center">Bloodtype</TableCell>
           <TableCell align="center">Address</TableCell>
           <TableCell align="center">Congenital</TableCell>
           <TableCell align="center">Allergic</TableCell>
           <TableCell align="center">Employee</TableCell>
           
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
             <TableCell align="center">{item.edges?.employee?.name}</TableCell>
             <TableCell align="center">
               <Button
                 onClick={() => {
                   deletePatients(item.id);
                 }}
                 style={{ marginLeft: 10 }}
                 variant="contained"
                 color="secondary"
               >
                 Delete
               </Button>
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
 );
}