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

const Domaine = () => {
    const [show, setShow] = useState(false);
    const [showModif, setShowModif] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseModif = () => setShowModif(false);
    const handleShowModif = () => setShowModif(true);
    const [domaineAEditer, setDomaineAEditer] = useState(null);
    const [nomDomaine, setNomDomaine] = useState("");
    const [domaines, setDomaines] = useState([]);

    // Methode pour ajouter un domaine 
    const ajoutDomaine = async (e) =>{
        e.preventDefault();
    
        try {
            if(nomDomaine===''  ) {
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Vueillez remplir tous les champs",
            });
            
            } 
            else{
                const userCollectionRef = collection(gestionmemoire, 'domaine');
                    await addDoc(userCollectionRef, {
                    nomDomaine: nomDomaine          
                    }           
                );
            
               handleClose();
        
        
                Swal.fire({
                    icon: "success",
                    title: "Felicitation",
                    text: "Votre ajout a été effectué avec succée",
                });
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
    
    // Methode pour lister un domaine 
    useEffect(() =>{
        const chargerDomaine = () =>{
            try{
                const domainesCollectionRef = collection(gestionmemoire, "domaine");
                const unsubscribe = onSnapshot (domainesCollectionRef, (snapshot) =>{
                    const listeDomaines = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
                    setDomaines(listeDomaines);
                })

            }catch (error){
                console.log("Erreur lors du chagement des domaines "+error)
            }
        }
        chargerDomaine();
    }, [])

    
  const handleModifierDomaine = (domaine) => {
    handleShowModif();
    setDomaineAEditer(domaine);
    

    // Ouvrez le modal de modification
  
  };


  const modifierDomaine = async () => {
    try {
      if (domaineAEditer) {
        // Effectuez la modification du sujet en utilisant les nouvelles valeurs
        await updateDoc(doc(gestionmemoire, 'domaine', domaineAEditer.id), {
          nomDomaine: nomDomaine
        });
       // Fermez le modal après la modification
        setDomaineAEditer(null);
        handleCloseModif();
      
      }
    } catch (error) {
      console.error('Erreur lors de la modification du sujet :', error);
    }
  };
  
 
 
 
  const supprimerDomaine = async (domaineId) => {
    try {
      const domaineRef = doc(gestionmemoire, 'domaine', domaineId);
      await deleteDoc(domaineRef);
      console.log('domaine supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du role :', error);
    }
  };



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

            <div className="container">
                <h2 className='text-center mt-5'>Liste des domaines</h2>
                <button onClick={handleShow} variant="dark" className='ms-5 mb-4 border-0'>Ajouter un domaine</button>
                <div className='container '>
                <Row md={2} className="g-4">
                
              {domaines.map(domaine => (
          <Card key={domaine.id} style={{ width: '18rem' }} className='ms-3'>
            <Card.Body>
              <Card.Title>{domaine.nomDomaine}</Card.Title>
              <Card.Text></Card.Text>
              <Button variant="dark"onClick={() => handleModifierDomaine(domaine)} >Modifier</Button>
              <Button variant="danger" className='ms-2' onClick={() => supprimerDomaine(domaine.id)}>Supprimer</Button>
              </Card.Body>
          </Card>
        ))}
        </Row>
                </div>

                {/* Modal pour ajouter un domaine  */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nom du domaine</Form.Label>
                                    <Form.Control type="text" placeholder="Nom du domaine" onChange={(e) => setNomDomaine(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={ajoutDomaine}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* modal pour modifier domaine */}
                <Modal show={showModif} onHide={handleCloseModif}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Domaine</Modal.Title>
        </Modal.Header> 
        <Modal.Body>
        <form className="row g-3 needs-validation" noValidate >
  <div className="mb-4">
    <label for="validationCustom01" className="form-label">Nom</label>
    <input type="text" className="form-control" id="validationCustom01" placeholder={domaineAEditer?.nomDomaine || ''}  required  onChange={(e) => setNomDomaine(e.target.value)}/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
 
</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark"  onClick={modifierDomaine}>
           Modifier
          </Button>
          <Button variant="danger" onClick={handleCloseModif}>
            Annuler
          </Button>
        </Modal.Footer>
            </Modal>
            </div>
        </>
     );
}
 
export default Domaine;