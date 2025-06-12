// src/hooks/useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (api) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        const result = response.data;

        // Firebase returns an object, not an array

          if (result && typeof result === 'object' && !Array.isArray(result)) {
          const keys = Object.keys(result);
          const isList = keys.every((key) => typeof result[key] === 'object');

          if (isList) {
            const loadedData = keys.map((key) => ({
              id: key,
              ...result[key],
            }));
            setData(loadedData);
          } else {
            // It's a single object (like product details)
            setData(result);
          }
        } else {
          // If result is already an array or a primitive
          setData(result);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  return { data, loading, error };
};

export default useFetch;
