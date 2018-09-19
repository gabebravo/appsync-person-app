import gql from 'graphql-tag';

export const addPerson = gql`
mutation($name: String!, $age: Int) {
  addPerson(name: $name, age: $age) {
    id
    name
    age
  }
}`

export const deletePerson = gql`
mutation($id: String!) {
  deletePerson(id: $id) {
    id
  }
}`