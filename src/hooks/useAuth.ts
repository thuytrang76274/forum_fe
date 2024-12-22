import { useCallback, useState } from "react";
import { User } from "../dtos";

const useAuth = () => {
  const LOCAL_STORAGE_KEY = "user";
  const [user, setUser] = useState<User | undefined>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : undefined;
  });
  const login = useCallback((newUser: User) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUser));
    }
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);
  return { user, login, logout };
};

export default useAuth;
