import { demoTasks, demoUser } from './demoData';

export const isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true';

export function getDemoPreloadedState() {
  if (!isDemoMode) {
    return undefined;
  }

  return {
    user: {
      user: demoUser,
      userDetails: {
        id: demoUser.id,
        location: 'Remote',
        address: 'Portfolio demo',
        number: '1',
        telephone: '+1 555 0100',
      },
      profileImage: '',
      isFulfilled: true,
      isPending: false,
      isRejected: false,
      errorMessage: '',
      isAuthenticated: true,
      isExpiredToken: false,
    },
    tasks: {
      tasks: demoTasks,
      isFulfilled: true,
      isPending: false,
      isRejected: false,
      isPushed: false,
    },
  };
}

export { demoTasks };
