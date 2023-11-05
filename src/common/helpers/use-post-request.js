import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { API_URL } from '../../config/Environment';
export default function usePostRequest(url) {
  const [data, setData] = useState(null);
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
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      setData(result);
    },
    [url]
  );

  return { data, post };
}
usePostRequest.propTypes = {
  url: PropTypes.string.isRequired,
};
