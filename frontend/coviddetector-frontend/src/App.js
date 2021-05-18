import AdminPage from './admin/AdminPage';
import theme from './themes';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from '@material-ui/core';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyles />
    <AdminPage/>
  </ThemeProvider>
  
  );
}

export default App;
