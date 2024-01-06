import React, { useState, useEffect } from 'react';
import { gestionmemoire } from '../../Firebase.Config.js';
import { onSnapshot, collection } from 'firebase/firestore';
import '../gestionSujet/gestionSujet.css';
import Table from 'react-bootstrap/Table';

const ListWithPagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calcul de l'index de début et de fin pour les éléments à afficher sur la page actuelle
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Récupération des éléments pour la page actuelle
  const currentItems = data.slice(startIndex, endIndex);

  // Fonction pour changer de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Prenom </th>
            <th>Nom</th>
            <th>Email</th>
            <th>Telephone</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <td>{user.User_prenom}</td>
              <td>{user.User_nom}</td>
              <td>{user.User_email}</td>
              <td>{user.User_telephone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='text-center '>
        {/* Affichage des boutons de pagination */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} className='ms-2 border-0'>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const chargerUsers = async () => {
      try {
        const UsersCollectionRef = collection(gestionmemoire, 'user');
        const unsubscribe = onSnapshot(UsersCollectionRef, (snapshot) => {
          const nouveauxUsers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setUsers(nouveauxUsers);
        });
      } catch (error) {
        console.error('Erreur lors du chargement des Users :', error);
      }
    };

    chargerUsers();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-red navbar-dark">
        <div className="wrapper">
          
        </div>
  <div className="container-fluid all-show">
    <a className="navbar-brand" href="#">Penton <i className="fa fa-codepen"></i></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Gestion utilisateur</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Gestion Sujet</a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">Gestion Role </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">Gestion Domaine</a>
        </li>

       
        
        
      </ul>
    </div>
  </div>
      </nav>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Liste des utilisateurs</h2>
        <ListWithPagination data={users} itemsPerPage={itemsPerPage} />
      </div>
    </>
  );
};

export default Users;
