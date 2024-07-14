import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { API_URL } from '../../config/Environment';
export default function useDeleteRequest(url) {
  const Delete = useCallback(
    async ({ jwt, params }) => {
      const response = await fetch(API_URL + url + params, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(jwt && { Authorization: `Bearer ${jwt}` }),
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    },
    [url]
  );

  return { Delete };
}
useDeleteRequest.propTypes = {
  url: PropTypes.string.isRequired,
};
