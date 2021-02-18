import React, { PureComponent } from 'react';
import { IApplicationContext } from './ApplicationContext';
import { ApplicationProps, ApplicationState } from './types';

let appContext = {

} as IApplicationContext;

class App extends PureComponent<ApplicationProps, ApplicationState> {
  constructor(props: ApplicationProps) {
    super(props);

    appContext.Version = props.AppVersion;

    this.state = {
      appContext
    };
  }
}

export default App;
