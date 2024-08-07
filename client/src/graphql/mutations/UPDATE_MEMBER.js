import { gql } from '@apollo/client';

export const UPDATE_MEMBER = gql`
  mutation UpdateMember($email: String!, $imageUrl: String, $fullname: String, $role: String, $address: String) {
    updateMember(email: $email, imageUrl: $imageUrl, fullname: $fullname, role: $role, address: $address) {
      id
      email
      imageUrl
      fullname
      role
      address
    }
  }
`;
