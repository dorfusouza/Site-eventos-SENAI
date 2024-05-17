import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GraficosPage from "./projeto_admin/Pages/GraficosPage/GraficosPage.jsx";
import InicioPageAdmin from "./projeto_admin/Pages/InicioPageAdmin/InicioPageAdmin.jsx";
import EditarEvento from "./projeto_admin/Pages/EditarEvento/EditarEvento.jsx";
import CriarEvento from "./projeto_admin/Pages/CriarEvento/CriarEvento.jsx";
import Usuarios from "./projeto_admin/Pages/Usuarios/Usuarios.jsx";
import Pedidos from "./projeto_admin/Pages/Pedidos/Pedidos.jsx";
import LoginPage from "./projeto_portaria/pages/LoginPage/LoginPage.jsx";
import ValidacaoPage from "./projeto_portaria/pages/ValidacaoPage/ValidacaoPage.jsx";
import CameraPage from "./projeto_portaria/pages/CameraPage/CameraPage.jsx";
import ConfirmacaoPage from "./projeto_portaria/pages/ConfirmacaoPage/ConfirmacaoPage.jsx";
import InvalidoPage from "./projeto_portaria/pages/InvalidoPage/InvalidoPage.jsx";
import TenteNovamentePage from "./projeto_portaria/pages/TenteNovamentePage/TenteNovamentePage.jsx";
import QrPage from "./projeto_portaria/pages/QrPage/QrPage.jsx";
import PerfilPage from "./projeto_reserva/pages/PerfilPage/PerfilPage.jsx";
import MeusIngressos from "./projeto_reserva/pages/MeusIngressos/index.jsx";
import InicioReservaPage from "./projeto_reserva/pages/InicioReservaPage/InicioReservaPage.jsx";
import InicioPageReserva from "./projeto_reserva/pages/InicioPage/InicioPage.jsx";
import RegistroPage from "./projeto_reserva/pages/RegistroPage/RegistroPage.jsx";
import SuportePage from "./projeto_reserva/pages/SuportePage/SuportePage.jsx";
import LoginPagesReserva from "./projeto_reserva/pages/LoginPageReserva/LoginPagesReserva.jsx";

function App() {
    localStorage.setItem('inDevelopment', 'false')
  return (
      <Router>
          <Routes>
              <Route path="/">
                  <Route path="/" element={<InicioPageReserva />} />
                  <Route path="/Login" element={<LoginPagesReserva/>} />
                  <Route path="/Perfil" element={<PerfilPage />} />
                  <Route path="/MeusIngressos" element={<MeusIngressos/>} />
                  <Route path="/InicioReserva/:eventoId" element={<InicioReservaPage />} />
                  <Route path="/RegistrarAcesso" element={<RegistroPage />} />
                  <Route path="/suporte" element={<SuportePage/>} />
              </Route>
              <Route path="/portaria">
                  <Route path="/portaria" element={<LoginPage/>} />
                  <Route path="/portaria/validacao" element={<ValidacaoPage/>}/>
                  <Route path="/portaria/camera" element={<CameraPage/>}/>
                  <Route path="/portaria/confirmacao" element={<ConfirmacaoPage/>}/>
                  <Route path="/portaria/invalido" element={<InvalidoPage/>}/>
                  <Route path="/portaria/TenteNovamente" element={<TenteNovamentePage/>}/>
                  <Route path="/portaria/qrpage" element={<QrPage/>}/>
              </Route>
              <Route path="/admin">
                  <Route path="/admin/" element={<InicioPageAdmin/>} />
                  <Route path="/admin/editar_evento" element={<EditarEvento/>} />
                  <Route path="/admin/criar_evento" element={<CriarEvento />} />
                  <Route path="/admin/usuarios" element={<Usuarios />} />
                  <Route path="/admin/pedidos" element={<Pedidos />} />
                  <Route path="/admin/graficos/:idEvento" element={<GraficosPage/>} />
              </Route>
          </Routes>
      </Router>
  )
}

export default App
