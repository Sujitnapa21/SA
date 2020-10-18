import { createPlugin } from '@backstage/core';
import Patient from './components/Patient'
import Login from './components/Login'

export const plugin = createPlugin({
  id: 'welcome',
  register({ router }) {
    router.registerRoute('/', Login);
    router.registerRoute('/Patient', Patient);
    

  },
});
