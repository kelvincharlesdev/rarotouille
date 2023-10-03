import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ListControlProvider } from "./contexts/ListControlContext";
import { RarotouilleRoutes } from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <ListControlProvider>
        <CartProvider>
          <RarotouilleRoutes />
        </CartProvider>
      </ListControlProvider>
    </AuthProvider>
  );
}

export default App;
