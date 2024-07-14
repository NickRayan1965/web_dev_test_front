import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { API_URL } from '../../config/Environment';
export default function usePostRequest(url) {
  const post = useCallback(
    async ({ body, jwt }) => {
      const response = await fetch(API_URL + url, {
        method: 'POST',
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

  return { post };
}
usePostRequest.propTypes = {
  url: PropTypes.string.isRequired,
};
