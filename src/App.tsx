import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { RarotouilleRoutes } from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RarotouilleRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
