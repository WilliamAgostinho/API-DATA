import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login.jsx'
import CadastroProduto from './cadastroProduto.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produtos" element={<CadastroProduto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
