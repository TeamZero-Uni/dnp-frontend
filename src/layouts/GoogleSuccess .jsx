import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken } from "../context/AuthContext"
import api from "../api/api";

const GoogleSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      try {
        const token = params.get("token");

        if (!token) return navigate("/login");

        setToken(token);

        const res = await api.get("/auth/me");

        const user = res.data.data;

        if (user.role === "ADMIN") {
          navigate("/dash");
        } else {
          navigate("/account/dashboard");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    login();
  }, []);

  return <div>Logging in...</div>;
};

export default GoogleSuccess;