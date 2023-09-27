import { useNavigate } from "react-router";
import { logout } from "../../service/apiDeletes";
import { useAuthContext } from "../../contexts/AuthContext";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Erro durante o logout:", error);
    }
  };

  return (
    <button type="button" onClick={handleLogout}>
      Sair
    </button>
  );
};
