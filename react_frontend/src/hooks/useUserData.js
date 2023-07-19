import { useState } from 'react';

export const useUserData = () => {
  const [userData, setUserData] = useState();

  const updateUserData = (newValue) => {
    setUserData(newValue);
  };

  return [userData, updateUserData];
};
