import '../styles/globals.css'
import configureStore from '../ducks/store';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const store = configureStore();

const THEME = createTheme({
  typography: {
   fontFamily: `"M PLUS Rounded 1c", "Ubuntu", sans-serif`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: "M PLUS Rounded 1c";
          src: url('static/landing/MPLUSRounded1c-Light.ttf');
          src: url('static/landing/MPLUSRounded1c-Medium.ttf');
          src: url('static/landing/MPLUSRounded1c-Regular.ttf');
          font-weight: 600;
        }
      `,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/prop-types
  return (  <ThemeProvider theme={THEME}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ThemeProvider>);
}

export default MyApp
