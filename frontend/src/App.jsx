import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login.jsx";
import CadastroProduto from "./cadastroProduto.jsx";

// Componente para proteger rotas privadas
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redireciona para login se não estiver autenticado
    return <Navigate to="/" replace />;
  }

  // Se token existir, renderiza o componente protegido
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rota protegida */}
        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <CadastroProduto />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
