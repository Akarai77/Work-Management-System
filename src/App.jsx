import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import Tasks from "./components/Tasks";
import Users from "./components/Users";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import { AppContext, AppProvider } from "./context/provider";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";

const App = () => {
  return (
    <AppProvider>
      <AppContext.Consumer>
        {({ theme: appTheme, user }) => {
          const muiTheme = createTheme({
            palette: {
              mode: appTheme,
            },
          });

          return (
            <ThemeProvider theme={muiTheme}>
              <CssBaseline />
              {!user ? (
                <LoginPage />
              ) : (
                <Layout>
                  {({ currentPage }) => (
                    <>
                      {currentPage === 'dashboard' && <Dashboard />}
                      {currentPage === 'projects' && <Projects />}
                      {currentPage === 'tasks' && <Tasks />}
                      {currentPage === 'users' && <Users />}
                      {currentPage === 'reports' && <Reports />}
                      {currentPage === 'settings' && <Settings />}
                    </>
                  )}
                </Layout>
              )}
            </ThemeProvider>
          );
        }}
      </AppContext.Consumer>
    </AppProvider>
  );
};

export default App;
