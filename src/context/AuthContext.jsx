import { useEffect, useLayoutEffect, useState } from "react";
import AuthContext from "../hooks/useAuth";
import api, { logout } from "../api/api";

let token = null;
let refreshPromise = null;

export const setToken = (t) => {
  token = t;

  if (t) {
    api.defaults.headers.common.Authorization = `Bearer ${t}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
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
    const req = api.interceptors.request.use(
      (config) => {
        console.log("🔵 Request URL:", config.url);
        return config;
      },
      (error) => Promise.reject(error)
    );

    const res = api.interceptors.response.use(
      (response) => response,

      async (error) => {
        const original = error.config;

        if (!original) {
          return Promise.reject(error);
        }

        const isAuthRequest =
          original.url?.includes("/auth/login") ||
          original.url?.includes("/auth/register") ||
          original.url?.includes("/auth/refresh");

        if (
          error.response?.status === 401 &&
          !original._retry &&
          !isAuthRequest
        ) {
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
    let mounted = true;

    const init = async () => {
      try {
        const r = await api.post("/auth/refresh");
        const accessToken = r.data.data.accessToken;
        setToken(accessToken);
        const u = await api.get("/auth/me");
        if (!mounted) return;
        setUser(u.data.data);
        setIsAuthenticated(true);

      } catch (error) {
        if (!mounted) return;
        resetAuth();
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const refreshAccessToken = async () => {
      try {
        const r = await api.post("/auth/refresh");
        const newToken = r.data.data.accessToken;
        setToken(newToken);
      } catch (error) {
        resetAuth();
      }
    };

    const interval = setInterval(
      refreshAccessToken,
      1000 * 60 * 9
    );

    return () => clearInterval(interval);

  }, [isAuthenticated]);

  const loginUser = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const accessToken = response.data.data.accessToken;
      setToken(accessToken);
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

  if (loading) {
    return <div>Loading...</div>;
  }

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