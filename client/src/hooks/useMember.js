import { useQuery, useMutation } from '@apollo/client';
import { GET_MEMBERS } from '../graphql/queries/GET_MEMBERS';
import { ADD_MEMBER } from '../graphql/mutations/ADD_MEMBER';
import { UPDATE_MEMBER } from '../graphql/mutations/UPDATE_MEMBER';
import { DELETE_MEMBER } from '../graphql/mutations/DELETE_MEMBER';

export const useMembers = () => {
  const { loading, error, data, refetch } = useQuery(GET_MEMBERS);
  const [addMember] = useMutation(ADD_MEMBER);
  const [updateMember] = useMutation(UPDATE_MEMBER);
  const [deleteMember] = useMutation(DELETE_MEMBER);

  return {
    loading,
    error,
    data,
    refetch,
    addMember,
    updateMember,
    deleteMember,
  };
};
