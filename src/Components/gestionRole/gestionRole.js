import '../gestionSujet/gestionSujet.css';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import {gestionmemoire} from '../../Firebase.Config.js'
import {updateDoc, deleteDoc, onSnapshot ,collection, addDoc, doc } from 'firebase/firestore';


export default  function Role(){
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [nomRole, setNomRole] = useState('');
  const [roles, setRole] = useState([]); 
  const [roleAEditer, setRoleAEditer] = useState(null);


  useEffect(() => {
    const chargerRole = async () => {
      try {
        const RoleCollectionRef = collection(gestionmemoire, 'role');
        const unsubscribe = onSnapshot(RoleCollectionRef, (snapshot) => {
          const nouveauxRole = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setRole(nouveauxRole);
        });
      } catch (error) {
        console.error('Erreur lors du chargement des Role :', error);
      }
    };
  
    chargerRole();
  }, []); 


  const handleModifierRole = (role) => {
    handleShowModal();
    setRoleAEditer(role);
    

    // Ouvrez le modal de modification
  
  };


  const modifierRole = async () => {
    try {
      if (roleAEditer) {
        // Effectuez la modification du sujet en utilisant les nouvelles valeurs
        await updateDoc(doc(gestionmemoire, 'role', roleAEditer.id), {
          nomRole: nomRole
        });
        handleCloseModal(); // Fermez le modal après la modification
        setRoleAEditer(null);
      
      }
    } catch (error) {
      console.error('Erreur lors de la modification du sujet :', error);
    }
  };
  
 
 
 
  const supprimerRole = async (roleId) => {
    try {
      const roleRef = doc(gestionmemoire, 'role', roleId);
      await deleteDoc(roleRef);
      console.log('role supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du role :', error);
    }
  };





  const ajouterRole = async (e)=>{
    e.preventDefault();
    
    try {
      if(nomRole===''  ) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vueillez remplir tous les champs",
      });
      
      } 
        // else if (!passwordPattern.test(password) ) {
        //   setPwdError(true); 
        //   Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text: "votre mot de pass  est invalide",
        //   });
        //   return  
        //   }
          else{
            // const result = await firestore.collection('gestionMemoire').addDoc({
            //   titre: titre,
            //   description: description,
            //   domaine: domaine,
            //   auteur: auteur,
            //   document: document,
            // });
            const userCollectionRef = collection(gestionmemoire, 'role');
            await addDoc(userCollectionRef, {
              nomRole: nomRole
             
           }
           
           );
          
           handleClose();
      
     
      Swal.fire({
        icon: "success",
        title: "Felicitation",
        text: "Votre formulaire a été envoyer avec succée",
      });
      setNomRole("");
      
  
     alert('role ajoute avec succès')
      console.log('role ajoute avec succès');
    }
    } catch (error) {
      alert(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vueillez entrer des information valide",
      });
    }

    }
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseModal = () => setShow1(false);
  const handleShowModal = () => setShow1(true);

    return(
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
            <div className='listeSujet'>
              <h2 className='text-center mt-5'>Liste des Roles</h2>

              <Button variant="dark" onClick={handleShow} className='ms-5 mb-4'>
               Ajouter Role
               </Button>
              <div className='container '>
                <Row md={2} className="g-4">
                
              {roles.map(role => (
          <Card key={role.id} style={{ width: '18rem' }} className='ms-3'>
            <Card.Body>
              <Card.Title>{role.nomRole}</Card.Title>
              <Card.Text></Card.Text>
              <Button variant="dark" onClick={() => handleModifierRole(role)}>Modifier</Button>
              <Button variant="danger" className='ms-2' onClick={() => supprimerRole(role.id)}>Supprimer</Button>
              </Card.Body>
          </Card>
        ))}
        </Row>
                </div>
              </div>

            
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3 needs-validation" noValidate >
  <div className="mb-4">
    <label for="validationCustom01" className="form-label">Nom</label>
    <input type="text" className="form-control" id="validationCustom01"  required  onChange={(e) => setNomRole(e.target.value)}/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  
</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark"  onClick={ajouterRole}>
           Ajouter
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Annuler
          </Button>
        </Modal.Footer>
            </Modal>
            <Modal show={show1} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3 needs-validation" noValidate >
  <div className="mb-4">
    <label for="validationCustom01" className="form-label">Nom</label>
    <input type="text" className="form-control" id="validationCustom01" placeholder={roleAEditer?.titre || ''}  required  onChange={(e) => setNomRole(e.target.value)}/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
 
</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark"  onClick={modifierRole}>
           Modifier
          </Button>
          <Button variant="danger" onClick={handleCloseModal}>
            Annuler
          </Button>
        </Modal.Footer>
            </Modal>
        </>
    )
}