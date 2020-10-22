import { createPlugin } from '@backstage/core';
import Patient from './components/Patient'
import Login from './components/Login'
import Table from './components/Table'

export const plugin = createPlugin({
  id: 'welcome',
  register({ router }) {
    router.registerRoute('/', Login);
    router.registerRoute('/Table', Table);
    router.registerRoute('/Patient', Patient);
    
    

  },
});
