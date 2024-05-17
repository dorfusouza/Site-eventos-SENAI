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
import ProtectedRoute from './componentes/ProtectedRoute.jsx';
import LoginPageAdmin from './projeto_admin/Pages/LoginPageAdmin/LoginPageAdmin.jsx';

function App() {
    localStorage.setItem('inDevelopment', 'false')
    const perfil = localStorage.getItem('perfil');
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
            <Route path="/portaria/validacao" element={
                <ProtectedRoute allowedProfiles={['portaria']}>
                    <ValidacaoPage/>
                </ProtectedRoute>
            }/>
            <Route path="/portaria/camera" element={
                <ProtectedRoute allowedProfiles={['portaria']}>
                    <CameraPage/>
                </ProtectedRoute>
            }/>
            <Route path="/portaria/confirmacao" element={
                <ProtectedRoute allowedProfiles={['portaria']}>
                    <ConfirmacaoPage/>
                </ProtectedRoute>
            }/>
            <Route path="/portaria/invalido" element={
                <ProtectedRoute allowedProfiles={['portaria']}>
                    <InvalidoPage/>
                </ProtectedRoute>
            }/>
            <Route path="/portaria/TenteNovamente" element={
                <ProtectedRoute allowedProfiles={['portaria']}>
                    <TenteNovamentePage/>
                </ProtectedRoute>
            }/>
            <Route path="/portaria/qrpage" element={
                <ProtectedRoute allowedProfiles={['portaria']}>
                    <QrPage/>
                </ProtectedRoute>
            }/>
        </Route>
        <Route path="/admin">
            <Route path="/admin/" element={<LoginPageAdmin/>} />
            <Route path="/admin/inicioadmin" element={
                <ProtectedRoute allowedProfiles={['admin']}>
                    <InicioPageAdmin/>
                </ProtectedRoute>
            } />
            <Route path="/admin/editar_evento" element={
                <ProtectedRoute allowedProfiles={['admin']}>
                    <EditarEvento/>
                </ProtectedRoute>
            } />
            <Route path="/admin/criar_evento" element={
                <ProtectedRoute allowedProfiles={['admin']}>
                    <CriarEvento />
                </ProtectedRoute>
            } />
            <Route path="/admin/usuarios" element={
                <ProtectedRoute allowedProfiles={['admin']}>
                    <Usuarios />
                </ProtectedRoute>
            } />
            <Route path="/admin/pedidos" element={
                <ProtectedRoute allowedProfiles={['admin']}>
                    <Pedidos />
                </ProtectedRoute>
            } />
            <Route path="/admin/graficos/:idEvento" element={
                <ProtectedRoute allowedProfiles={['admin']}>
                    <GraficosPage/>
                </ProtectedRoute>
            } />
            <Route path="/admin/perfil" element={
                <ProtectedRoute allowedProfiles={['admin']}>
                    <PerfilPage/>
                </ProtectedRoute>
            } />
        </Route>
    </Routes>
</Router>
  )
}

export default App
