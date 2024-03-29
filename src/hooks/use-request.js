import { useCallback, useState } from 'react';

const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url
          ? requestConfig.url
          : 'https://react-http-48ff4-default-rtdb.firebaseio.com/MealDelivery/foodItems.json',
        {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        }
      );
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setIsLoading(false);
      return applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      //   console.log(error);
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useRequest;
