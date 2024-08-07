import { gql } from '@apollo/client';

export const ADD_MEMBER = gql`
  mutation AddMember($email: String!, $imageUrl: String!, $fullname: String!, $role: String!, $address: String!) {
    addMember(email: $email, imageUrl: $imageUrl, fullname: $fullname, role: $role, address: $address) {
      id
      email
      imageUrl
      fullname
      role
      address
    }
  }
`;
