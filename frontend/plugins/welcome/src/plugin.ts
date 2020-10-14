import { createPlugin } from '@backstage/core';
import WelcomePage from './components/WelcomePage';
import Patient from './components/Patient'

export const plugin = createPlugin({
  id: 'welcome',
  register({ router }) {
    router.registerRoute('/', WelcomePage);
    router.registerRoute('/patient', Patient);

  },
});
