import { gql } from '@apollo/client';

export const GET_MEMBERS = gql`
  query GetMembers {
    members {
      id
      email
      imageUrl
      fullname
      role
      address
    }
  }
`;
