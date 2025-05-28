import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/produtos");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.mensagem || "Erro no login");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/produtos");

      setTimeout(() => {
        alert("Sessão expirada! Faça login novamente.");
        localStorage.removeItem("token");
        navigate("/");
      }, 2 * 60 * 1000);
    } catch (err) {
      console.error(err);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.logoContainer}>
          <svg style={styles.logo} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
            />
          </svg>
          <p style={styles.subtitle}>Faça login para continuar</p>
        </div>

        {erro && <div style={styles.errorMessage}>{erro}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#121212", // Fundo escuro
    padding: "20px",
  },
  loginBox: {
    backgroundColor: "#1e1e1e", // Card mais claro que o fundo
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)", // Sombra mais intensa
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    border: "1px solid #333", // Borda sutil
  },
  logoContainer: {
    marginBottom: "30px",
  },
  logo: {
    width: "60px",
    height: "60px",
    color: "#7c3aed", // Roxo mais vibrante no escuro
    margin: "0 auto",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#f3f4f6", // Texto claro
    margin: "15px 0 5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#9ca3af", // Cinza mais claro
    margin: "0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#d1d5db", // Texto claro para labels
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #374151", // Borda mais escura
    fontSize: "14px",
    transition: "all 0.3s",
    boxSizing: "border-box",
    backgroundColor: "#2d2d2d", // Fundo escuro para inputs
    color: "#f3f4f6", // Texto claro
    outline: "none",
    ":focus": {
      borderColor: "#7c3aed",
      boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.3)",
    },
  },
  button: {
    backgroundColor: "#7c3aed", // Roxo mais vibrante
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    marginTop: "10px",
    ":hover": {
      backgroundColor: "#6d28d9", // Tom mais escuro no hover
      transform: "translateY(-1px)",
    },
    ":active": {
      transform: "translateY(0)",
    },
  },
  errorMessage: {
    backgroundColor: "#2e2222", // Fundo escuro para erro
    color: "#f87171", // Vermelho mais suave
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "20px",
    borderLeft: "4px solid #f87171", // Destaque lateral
  },
  footer: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#9ca3af", // Cinza mais claro
  },
  footerText: {
    margin: "0 0 10px",
  },
  footerLink: {
    color: "#8b5cf6", // Roxo mais claro
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s",
    ":hover": {
      color: "#7c3aed",
      textDecoration: "underline",
    },
  },
  forgotPassword: {
    color: "#8b5cf6",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "13px",
    transition: "color 0.2s",
    ":hover": {
      color: "#7c3aed",
      textDecoration: "underline",
    },
  },
};
