
import './App.css';
import Authentification from './Components/Authentification/Authentification';
import {Route, Routes} from 'react-router-dom'
import PageAccueil from './Components/PageAccueil/PageAccueil';
import Connexion from './Components/Authentification/Connexion';
import DashbordUtilisateur from './Components/DashbordUtilisateur/DashbordUtilisateur';
import Sujet from './Components/gestionSujet/gestionSujet';
import Users from './Components/gestionUser/gestionUser';

function App() {
  return (
 <>
  <Routes>
    <Route path="/" element={<PageAccueil />}></Route>
      <Route path="connexion" element={<Connexion />} />
      <Route path="auth" element={<Authentification />} />
      <Route path="dashbord" element={<DashbordUtilisateur />} />
      <Route path="sujet" element={<Sujet />} />
      <Route path="users" element={<Users />} />
  </Routes>
  </>
  );
}

export default App;
