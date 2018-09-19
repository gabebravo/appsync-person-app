import React, { Component } from "react";
import { Mutation } from 'react-apollo'
import { getPeople } from '../queries'
import { addPerson } from '../mutations'

import { withStyles } from '@material-ui/core/styles'
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from '@material-ui/core/TextField';
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  root: {
    width: "80%",
    margin: 'auto'
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0
  },
  subheader: {
    alignItems: 'center',
    display: 'flex',
    backgroundColor: grey[400],
    color: '#fff',
    fontSize: '1.7rem',
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.2rem',
    },
    minHeight: '4rem'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    marginBottom: 16,
    marginLeft: '2rem',
    [theme.breakpoints.only('xs')]: {
      marginLeft: '2rem',
    }
  }
});

const DEFAULT_STATE = { name: '', age: '' };

class PersonForm extends Component {
  state = DEFAULT_STATE;

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <List className={classes.list}>
          <ListSubheader disableSticky className={classes.subheader}>Add A Person</ListSubheader>
          <ListItem>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="outlined-full-name"
                label="Name"
                style={{ margin: 8 }}
                placeholder="enter name"
                value={this.state.name}
                onChange={this.handleChange('name')}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-full-age"
                label="Age"
                style={{ margin: 8 }}
                placeholder="enter age"
                value={this.state.age}
                onChange={this.handleChange('age')}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </ListItem>
        </List>
        <Mutation mutation={addPerson}
          refetchQueries={() => {
            return [{ query: getPeople }];
          }}
        >
          {(addPerson) => (
            <Button color="secondary" variant="contained" 
              onClick={() => 
                this.state.name.length > 0 && this.state.age.length > 0 &&
                addPerson({ variables: { name: this.state.name, age: this.state.age } })
                .then(result => (result ? this.setState(DEFAULT_STATE) : console.log('person not added')))
                .catch(error => console.log('error'))
              }
              className={classes.button}>
              SAVE
            </Button>
          )}
        </Mutation> 
      </Paper>
    );
  }
}

export default withStyles(styles)(PersonForm);