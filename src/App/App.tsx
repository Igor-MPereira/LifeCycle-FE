import AppHeader from '@/Components/AppHeader';
import DefaultStyles from '@/Components/UI/Theme/DefaultStyles';
import DefaultTheme from '@/Components/UI/Theme/DefaultTheme';
import { UserInfo } from '@/Models/User';
import Routes from '@/Routes';
import AuthenticationService from '@/Services/Authentication/AuthenticationService';
import RequestService from '@/Services/Request/RequestService';
import { Divider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from '@material-ui/core/styles';
import withStyles from '@material-ui/styles/withStyles';
import React, { PureComponent } from 'react';
import { BrowserRouter, RouteComponentProps } from 'react-router-dom';
import { ApplicationContextConsumer, ApplicationContextProvider, IApplicationContext } from './ApplicationContext';
import { ApplicationProps, ApplicationState } from './types';

let appContext = { 
  theme: DefaultTheme({}),
  Auth: AuthenticationService.Instance,
  User: new UserInfo()
} as IApplicationContext;

let defaultStyles = DefaultStyles(appContext.theme);

class App extends PureComponent<ApplicationProps<keyof typeof defaultStyles>, ApplicationState> {
  constructor(props: ApplicationProps) {
    super(props);

    appContext.Version = props.AppVersion;
    appContext.language = props.language;
    appContext.UpdateUser = this.UpdateUser;

    this.state = {
      appContext,
    };
  }

  async componentDidMount() {
  }

  public UpdateUser = async (User: UserInfo) => {
    return new Promise<void>((resolve, reject) => {
      this.setState(s => {
        if(s.appContext) {
          resolve();
          return { appContext: { ...appContext, User} };
        } else {
          reject();
          return null;
        }
      })
    });
  }

  render() {
    const { appContext } = this.state;
    const { classes = { } } = this.props;

    return (
      <div className='app'>
        <CssBaseline />
        <ApplicationContextProvider value={appContext}>
          <ApplicationContextConsumer>
            {ctx => (
              <MuiThemeProvider theme={appContext.theme}>
                <BrowserRouter>
                  <div className={classes.root}>
                    <AppHeader
                      UserInfo={ctx?.User ?? new UserInfo()}
                      isLoggedIn={AuthenticationService.Instance.IsAuthenticated}
                    />
                    <main className={classes.content}>
                      <div className={classes.appBarSpacer}></div>
                      <Routes />
                    </main>
                  </div>
                </BrowserRouter>
              </MuiThemeProvider>
            )}  
          </ApplicationContextConsumer>
        </ApplicationContextProvider>
      </div>
    );
  }
}

export default withStyles(defaultStyles)(App);
