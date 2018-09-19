import React from 'react';
import ReactDOM from 'react-dom';
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import appSyncConfig from './appsync';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import deepOrange from '@material-ui/core/colors/deepOrange';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: { main: cyan[500], light: cyan[200] }, // Purple and green play nicely together.
    secondary: { main: deepOrange[500], light: deepOrange[200] }, // This is just green.A700 as hex.
  }
});

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey,
  },
  disableOffline: true,
  connectToDevTools: true
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Rehydrated>
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));
