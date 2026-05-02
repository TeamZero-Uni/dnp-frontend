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
      console.log("🔵 Request URL:", config.url);
      if (token) {
        console.log("🟢 Token existed");
        config.headers.Authorization = `Bearer ${token}`;
        console.log("🟢 Authorization header seted");
      } else {
        console.log("🔴 No token found");
      }
      return config;
    });

    const res = api.interceptors.response.use(
      (r) => r,
      async (err) => {
        const original = err.config;
        if (!original) return Promise.reject(err);

        const isAuthRequest =
          original.url?.includes("/auth/login") ||
          original.url?.includes("/auth/register") ||
          original.url?.includes("/auth/refresh");

        if (original.url?.includes("/auth/refresh")) {
          resetAuth();
          return Promise.reject(err);
        }

        if (
          err.response?.status === 401 &&
          !original._retry &&
          !isAuthRequest
        ) {
          original._retry = true;

          try {
            if (!refreshPromise) {
              refreshPromise = api
                .post("/auth/refresh")
                .then((r) => setToken(r.data.data.accessToken))
                .finally(() => (refreshPromise = null));
            }

            await refreshPromise;
            return api(original);
          } catch (error) {
            resetAuth();
            return Promise.reject(error);
          }
        }
        return Promise.reject(err);
      },
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
        setToken(r.data.data.accessToken);
        const u = await api.get("/auth/me");

        if (!mounted) return;

        setUser(u.data.data);
        setIsAuthenticated(true);
      } catch (error) {
        if (!mounted) return;
        resetAuth();
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
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
      throw new Error(error?.response?.data?.message || "Login failed");
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
