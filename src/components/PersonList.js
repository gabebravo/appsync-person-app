import React from "react";
import { Mutation, Query } from 'react-apollo'
import { getPeople } from '../queries'
import { deletePerson } from '../mutations'

import { withStyles } from '@material-ui/core/styles'
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Icon from '@material-ui/core/Icon';
import cyan from '@material-ui/core/colors/cyan';

const styles = theme => ({
  root: {
    width: "80%",
    margin: 'auto',
    [theme.breakpoints.only('xs')]: {
      width: '97%',
      marginLeft: '2rem'
    }
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0, 
    minHeight: 287
  },
  listItem: {
    minHeight: '4rem'
  },
  drinkSub: {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    minHeight: '4rem',
    backgroundColor: cyan[500],
    color: '#fff',
    fontSize: '1.7rem',
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.2rem',
    }
  },
  listTextBox: {
    width: '30%'
  }
});

const DeleteButton = ({ id }) => (
  <Mutation mutation={deletePerson}
    refetchQueries={() => {
      return [{ query: getPeople }];
    }}
  >
    {(deletePerson) => (
      <Icon style={{ fontSize: '2rem' }} color="secondary"
        onClick={() => deletePerson({ variables: { id } })}>
        delete_forever
      </Icon>
    )}
  </Mutation> 
)

const PersonList = ({ classes }) => (
  <Query query={getPeople}>
    {({ data }) => (
        <Paper className={classes.root}>
          <List className={classes.list}>
            <div>
              <ListSubheader disableSticky className={ classes.drinkSub }>
                <span>People List</span>
              </ListSubheader>
              {data.allPeople && data.allPeople.map( (person, index) => (
                <ListItem key={`item-${index}-${person}`} divider className={classes.listItem}>
                  <ListItemText className={classes.listTextBox} primary={`Name: ${person.name}`} />
                  <ListItemText className={classes.listTextBox} primary={`Age: ${person.age}`} />
                  <DeleteButton id={person.id} />
                </ListItem>
              ))}
            </div>
          </List>
        </Paper>
      )
    }
  </Query>
)

export default withStyles(styles)(PersonList);