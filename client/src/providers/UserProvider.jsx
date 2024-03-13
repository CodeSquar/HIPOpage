import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
  token: undefined,
  setToken: () => undefined,
  isAuth: false,
  setIsAuth: () => false,
  expiresIn: undefined,
  setExpiresIn: () => undefined,
});

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || undefined);
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('isAuth')) || false);
  const [expiresIn, setExpiresIn] = useState(localStorage.getItem('expiresIn') || undefined);

  useEffect(() => {
    localStorage.setItem('isAuth', JSON.stringify(isAuth));
  }, [isAuth]);

  useEffect(() => {
    localStorage.setItem('expiresIn', expiresIn);
  }, [expiresIn]);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        isAuth,
        setIsAuth,
        expiresIn,
        setExpiresIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
