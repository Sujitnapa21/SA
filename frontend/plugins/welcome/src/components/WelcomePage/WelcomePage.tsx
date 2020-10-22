import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ComponanceTable from '../Table';
import Button from '@material-ui/core/Button';
 
import {
 Content,
 Header,
 Page,
 pageTheme,
 ContentHeader,
 Link,
} from '@backstage/core';
 
const WelcomePage: FC<{}> = () => {
 return (
   <Page theme={pageTheme.home}>
     <Header
       title={`ระบบจัดการโรคติดต่อ`}
     ></Header>
     <Content>
       <ContentHeader title="ระบบข้อมูลผู้ป่วย">
         <Link component={RouterLink} to="/patient">
           <Button variant="contained" color="primary">
             เพิ่มข้อมูล
           </Button>
         </Link>
       </ContentHeader>
       <ComponanceTable></ComponanceTable>
     </Content>
   </Page>
 );
};
 
export default WelcomePage;