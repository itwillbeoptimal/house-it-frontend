const theme = {
  COLORS: {
    MAIN: {
      PRIMARY: '#6c2eff',
      SECONDARY: '#c4abff',
      TERTIARY: '#f0eaff',
    },
    LABEL: {
      PRIMARY: '#111111',
      SECONDARY: 'rgba(60, 60, 67, 0.6)',
      TERTIARY: 'rgba(60, 60, 67, 0.3)',
      QUATERNARY: 'rgba(60, 60, 67, 0.18)',
      ALERT: '#f03e3e',
      SUCCESS: '#37b24d',
      INFO: '#4263eb',
    },
    BACKGROUND: '#f7f8fd',
    GRAY: {
      0: '#f8f9fa',
      1: '#f1f3f5',
      2: '#e9ecef',
      3: '#dee2e6',
      4: '#ced4da',
      5: '#adb5bd',
      6: '#868e96',
      7: '#495057',
      8: '#343a40',
      9: '#212529',
    },
  },
} as const;

export default theme;
