import { createPlugin } from '@backstage/core';
import Patient from './components/Patient'
import Login from './components/Login'
import WelcomePage from './components/WelcomePage'

export const plugin = createPlugin({
  id: 'welcome',
  register({ router }) {
    router.registerRoute('/', Login);
    router.registerRoute('/WelcomePage', WelcomePage);
    router.registerRoute('/Patient', Patient);
    
    

  },
});
