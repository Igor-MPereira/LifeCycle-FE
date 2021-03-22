import AppHeader from '@/Components/AppHeader';
import GeneralError from '@/Components/GeneralError/GeneralError';
import DefaultStyles from '@/Components/UI/Theme/DefaultStyles';
import DefaultTheme from '@/Components/UI/Theme/DefaultTheme';
import { UserInfo } from '@/Models/User';
import Routes from '@/Routes';
import AuthenticationService from '@/Services/Authentication/AuthenticationService';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import withStyles from '@material-ui/styles/withStyles';
import React, { PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApplicationContextConsumer, ApplicationContextProvider, IApplicationContext, PageInfo } from './ApplicationContext';
import { ApplicationProps, ApplicationState } from './types';

let appContext = { 
  theme: DefaultTheme({}),
  User: new UserInfo(),
} as IApplicationContext;

let defaultStyles = DefaultStyles(appContext.theme);

class App extends PureComponent<ApplicationProps<keyof typeof defaultStyles>, ApplicationState> {
  private RememberMe: boolean;

  constructor(props: ApplicationProps) {
    super(props);
    
    appContext.Version = props.AppVersion;
    appContext.language = props.language;
    appContext.Auth = new AuthenticationService();
    appContext.UpdateUser = this.UpdateUser;
    // appContext.UpdatePage = this.UpdatePage;

    this.RememberMe = !!Number(localStorage.getItem("LFwaRMLoSt")) || !!Number(sessionStorage.getItem("LFwaRMSeSt"));

    if(this.RememberMe) appContext.User = appContext.Auth.LoadAuth();

    this.state = {
      appContext
    };
  }

  public UpdateUser = (User: UserInfo) => new Promise<void>((resolve, reject) => {
    this.setState(s => ({
      appContext: {
        ...s.appContext,
        User
      }
    }))
  });  

  public UpdatePage = (Page: PageInfo) => {
    this.setState(s => ({
      appContext: {
        ...s.appContext,
        Page
      }
    }));
  }
  
  async componentDidMount() {
    if(this.state.appContext.User.DisplayName === "" && this.RememberMe) {
      let User = await this.state.appContext.Auth.Refresh();
      this.setState(s => ({
        appContext: {
          ...s.appContext,
          User
        }
      }));
    }
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
                      <GeneralError>
                        <div className={classes.appBarSpacer}></div>
                        <Routes />
                      </GeneralError>
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
