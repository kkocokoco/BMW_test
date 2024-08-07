import { gql } from '@apollo/client';

export const DELETE_MEMBER = gql`
  mutation DeleteMember($email: String!) {
    deleteMember(email: $email)
  }
`;
