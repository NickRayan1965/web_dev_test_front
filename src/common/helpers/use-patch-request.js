import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { API_URL } from '../../config/Environment';
export default function usePatchRequest(url) {
  const patch = useCallback(
    async ({ body, jwt, params }) => {
      const response = await fetch(API_URL + url + params, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(jwt && { Authorization: `Bearer ${jwt}` }),
        },
        body: JSON.stringify(body),
      });
      const responseBody = await response.json();
      if (!response.ok) {
        console.log(responseBody);
        throw new Error(JSON.stringify(responseBody));
      }
      return responseBody;
    },
    [url]
  );

  return { patch };
}
usePatchRequest.propTypes = {
  url: PropTypes.string.isRequired,
};
