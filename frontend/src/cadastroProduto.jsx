import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CadastroProduto.styles";

export default function CadastroProduto() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetchProdutos(token);
  }, [navigate]);

  const fetchProdutos = async (token) => {
    setCarregando(true);
    try {
      const res = await fetch("http://localhost:3000/produtos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }

      const data = await res.json();
      setProdutos(data);
    } catch {
      setErro("Erro ao buscar produtos");
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    const token = localStorage.getItem("token");

    if (!nome || !valor || !quantidade) {
      setErro("Preencha todos os campos");
      return;
    }

    const produto = {
      nome,
      valor: parseFloat(valor),
      quantidade: parseInt(quantidade),
    };

    const url = editandoId
      ? `http://localhost:3000/produtos/${editandoId}`
      : "http://localhost:3000/produtos";

    const method = editandoId ? "PUT" : "POST";

    try {
      setCarregando(true);
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(produto),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setErro(data.message || "Erro na operação");
        return;
      }

      setSucesso(
        editandoId
          ? "Produto atualizado com sucesso!"
          : "Produto cadastrado com sucesso!"
      );
      setNome("");
      setValor("");
      setQuantidade("");
      setEditandoId(null);
      fetchProdutos(token);
    } catch {
      setErro("Erro ao conectar com o servidor");
    } finally {
      setCarregando(false);
    }
  };

  const handleEditar = (produto) => {
    setNome(produto.nome);
    setValor(produto.valor.toString());
    setQuantidade(produto.quantidade.toString());
    setEditandoId(produto.id);
    setSucesso("");
    setErro("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExcluir = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      setCarregando(true);
      const res = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }

      setSucesso("Produto excluído com sucesso!");
      fetchProdutos(token);
    } catch {
      setErro("Erro ao excluir produto");
    } finally {
      setCarregando(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const formatarMoeda = (valor) => {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            {editandoId ? "Editar Produto" : "Cadastrar Novo Produto"}
          </h2>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Sair
          </button>
        </div>

        {erro && <div style={styles.alertError}>{erro}</div>}
        {sucesso && <div style={styles.alertSuccess}>{sucesso}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nome do Produto</label>
            <input
              type="text"
              placeholder="Digite o nome do produto"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Valor Unitário (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Quantidade em Estoque</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            style={editandoId ? styles.buttonEdit : styles.buttonSubmit}
            disabled={carregando}
          >
            {carregando ? (
              <span style={styles.buttonContent}>
                <span style={styles.spinner}></span>
                Processando...
              </span>
            ) : editandoId ? (
              "Atualizar Produto"
            ) : (
              "Cadastrar Produto"
            )}
          </button>

          {editandoId && (
            <button
              type="button"
              onClick={() => {
                setEditandoId(null);
                setNome("");
                setValor("");
                setQuantidade("");
              }}
              style={styles.buttonCancel}
            >
              Cancelar Edição
            </button>
          )}
        </form>

        <h3 style={styles.subtitle}>Lista de Produtos</h3>

        {carregando && produtos.length === 0 ? (
          <div style={styles.loading}>
            <span style={styles.spinner}></span>
            Carregando produtos...
          </div>
        ) : produtos.length === 0 ? (
          <div style={styles.emptyMessage}>Nenhum produto cadastrado</div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>Nome</th>
                  <th style={styles.tableHeader}>Valor</th>
                  <th style={styles.tableHeader}>Estoque</th>
                  <th style={styles.tableHeader}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{produto.nome}</td>
                    <td style={styles.tableCell}>
                      {formatarMoeda(produto.valor)}
                    </td>
                    <td style={styles.tableCell}>{produto.quantidade}</td>
                    <td style={styles.tableCellActions}>
                      <button
                        onClick={() => handleEditar(produto)}
                        style={styles.buttonActionEdit}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleExcluir(produto.id)}
                        style={styles.buttonActionDelete}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
