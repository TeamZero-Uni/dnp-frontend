import { useEffect, useLayoutEffect, useState } from "react";
import AuthContext from "../hooks/useAuth";
import api, { logout } from "../api/api";

let token = null;
let refreshPromise = null;

export const setToken = (t) => {
  token = t;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const resetAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
  };

  useLayoutEffect(() => {
    const req = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const res = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const original = error.config;

        if (!original) return Promise.reject(error);

        const isAuthRequest =
          original.url?.includes("/auth/login") ||
          original.url?.includes("/auth/register") ||
          original.url?.includes("/auth/refresh");

        if (isAuthRequest) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !original._retry) {
          original._retry = true;

          try {
            if (!refreshPromise) {
              refreshPromise = api
                .post("/auth/refresh")
                .then((r) => {
                  const newToken = r.data.data.accessToken;
                  setToken(newToken);
                  return newToken;
                })
                .finally(() => {
                  refreshPromise = null;
                });
            }

            await refreshPromise;

            return api(original);
          } catch (err) {
            resetAuth();
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(req);
      api.interceptors.response.eject(res);
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const r = await api.post("/auth/refresh");

        const newToken = r.data.data.accessToken;
        setToken(newToken);

        const u = await api.get("/auth/me");
        setUser(u.data.data);
        setIsAuthenticated(true);
      } catch (error) {
        resetAuth();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);


  const loginUser = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);

      const newToken = response.data.data.accessToken;
      setToken(newToken);

      const u = await api.get("/auth/me");

      setUser(u.data.data);
      setIsAuthenticated(true);

      return u.data.data;
    } catch (error) {
      resetAuth();
      throw new Error(
        error?.response?.data?.message || "Login failed"
      );
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      resetAuth();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};