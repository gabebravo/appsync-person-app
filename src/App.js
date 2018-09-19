import React, { Component } from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '1rem'
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <CssBaseline />
          <Grid container spacing={16}>
            <Grid item sm={12} md={6}>
              <PersonForm />
            </Grid>
            <Grid item sm={12} md={6}>
              <PersonList />
            </Grid>
          </Grid>
          {/* <ClearButton /> */}
        </div>
    );
  }
}

export default withStyles(styles)(App);
