import gql from 'graphql-tag';

export const getPeople = gql`{
  allPeople {
    id
    name
    age
  }
}`;

export const getPerson = gql`
query($id: String!) {
  getPerson(id: $id) {
    id
    name
    age
  }
}`