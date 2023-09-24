import { AuthProvider } from "./contexts/AuthContext";
import { RarotouilleRoutes } from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <RarotouilleRoutes />
    </AuthProvider>
  );
}

export default App;
