import { useCallback, useState } from 'react';
import { API_URL } from '../../config/Environment';
export default function useFetch(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(
    async ({ jwt, query }) => {
      try {
        setLoading(true);
        let queryString = new URLSearchParams(query).toString();
        if (queryString) queryString = `?${queryString}`;

        const response = await fetch(API_URL + url + queryString, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(jwt && { Authorization: `Bearer ${jwt}` }),
          },
        });
        console.log(response);
        const bodyResponse = await response.json();
        if (!response.ok) {
          console
          throw new Error(JSON.stringify(bodyResponse));
        }
        setData(bodyResponse);
        return bodyResponse;
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { data, loading, error, fetchData };
}
