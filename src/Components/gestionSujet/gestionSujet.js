import './gestionSujet.css'
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import {gestionmemoire} from '../../Firebase.Config.js'
import {updateDoc, deleteDoc, onSnapshot ,collection, addDoc, doc } from 'firebase/firestore';


export default  function Sujet(){
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [domaine, setDomaine] = useState('');
  const [auteur, setAuteur] = useState('');
  const [document, setDocument] = useState('');
  const [sujets, setSujets] = useState([]); 
  const [sujetAEditer, setSujetAEditer] = useState(null);


  useEffect(() => {
    const chargerSujets = async () => {
      try {
        const sujetsCollectionRef = collection(gestionmemoire, 'sujet');
        const unsubscribe = onSnapshot(sujetsCollectionRef, (snapshot) => {
          const nouveauxSujets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSujets(nouveauxSujets);
        });
      } catch (error) {
        console.error('Erreur lors du chargement des sujets :', error);
      }
    };
  
    chargerSujets();
  }, []); 


  const handleModifierSujet = (sujet) => {
    handleShowModal();
    setSujetAEditer(sujet);
    

    // Ouvrez le modal de modification
  
  };


  const modifierSujet = async () => {
    try {
      if (sujetAEditer) {
        // Effectuez la modification du sujet en utilisant les nouvelles valeurs
        await updateDoc(doc(gestionmemoire, 'sujet', sujetAEditer.id), {
          titre: titre,
          description: description,
          domaine: domaine,
          auteur: auteur,
          document: document,
        });
        handleCloseModal(); // Fermez le modal après la modification
        setSujetAEditer(null);
      
      }
    } catch (error) {
      console.error('Erreur lors de la modification du sujet :', error);
    }
  };
  
 
 
 
  const supprimerSujet = async (sujetId) => {
    try {
      const sujetRef = doc(gestionmemoire, 'sujet', sujetId);
      await deleteDoc(sujetRef);
      console.log('Sujet supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du sujet :', error);
    }
  };





  const ajouterSujet = async (e)=>{
    e.preventDefault();
    
    try {
      if(titre==='' || description==='' || domaine==='' || auteur==='' || document==='' ) {
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
            const userCollectionRef = collection(gestionmemoire, 'sujet');
            await addDoc(userCollectionRef, {
              titre: titre,
              description: description,
              domaine: domaine,
              auteur: auteur,
              document: document,
             
           }
           
           );
          
     
      
     
      Swal.fire({
        icon: "success",
        title: "Felicitation",
        text: "Votre formulaire a été envoyer avec succée",
      });
      setTitre("");
      setDescription("");
      setDomaine("");
      setAuteur("");
      setDocument("");
  
     alert('sujet ajoute avec succès')
      console.log('sujet ajoute avec succès');
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
              <h2 className='text-center mt-5'>Liste des Sujets</h2>

              <Button variant="dark" onClick={handleShow} className='ms-5 mb-4'>
               Ajouter Sujet
               </Button>
              <div className='container '>
                <Row md={2} className="g-4">
                
              {sujets.map(sujet => (
          <Card key={sujet.id} style={{ width: '18rem' }} className='ms-3'>
            <Card.Body>
              <Card.Title>{sujet.titre}</Card.Title>
              <Card.Text>{sujet.description}</Card.Text>
              <Button variant="dark" onClick={() => handleModifierSujet(sujet)}>Modifier</Button>
              <Button variant="danger" className='ms-2' onClick={() => supprimerSujet(sujet.id)}>Supprimer</Button>
              </Card.Body>
          </Card>
        ))}
        </Row>
                </div>
              </div>

            
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout Sujet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3 needs-validation" noValidate >
  <div className="mb-4">
    <label for="validationCustom01" className="form-label">Titre</label>
    <input type="text" className="form-control" id="validationCustom01"  required  onChange={(e) => setTitre(e.target.value)}/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="mb-4">
    <label for="validationCustom02" className="form-label">Domaine</label>
    <input type="text" className="form-control" id="validationCustom02"  required onChange={(e) => setDomaine(e.target.value)}/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
 
  <div className="mb-3">
    <label for="validationCustom03" className="form-label">description</label>
    <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          onChange={(e) => setDescription(e.target.value)}  />
      </FloatingLabel>
    <div class="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>
  <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Document</Form.Label>
        <Form.Control type="file" onChange={(e) => setDocument(e.target.value)}/>
      </Form.Group>
 
  <div className="mb-3">
    <label for="validationCustom05" className="form-label">auteur</label>
    <input type="text" className="form-control" id="validationCustom05" required onChange={(e) => setAuteur(e.target.value)}/>
    <div className="invalid-feedback">
      Please provide a valid name.
    </div>
  </div>

  
</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark"  onClick={ajouterSujet}>
           Ajouter
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Annuler
          </Button>
        </Modal.Footer>
            </Modal>
            <Modal show={show1} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Sujet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3 needs-validation" noValidate >
  <div className="mb-4">
    <label for="validationCustom01" className="form-label">Titre</label>
    <input type="text" className="form-control" id="validationCustom01" placeholder={sujetAEditer?.titre || ''}  required  onChange={(e) => setTitre(e.target.value)}/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="mb-4">
    <label for="validationCustom02" className="form-label">Domaine</label>
    <input type="text" className="form-control" id="validationCustom02"  required onChange={(e) => setDomaine(e.target.value)} placeholder={sujetAEditer?.domaine || ''} />
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
 
  <div className="mb-3">
    <label for="validationCustom03" className="form-label">description</label>
    <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder={sujetAEditer?.description || ''} 
          style={{ height: '100px' }}
          onChange={(e) => setDescription(e.target.value)} />
      </FloatingLabel>
    <div class="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>
  <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Document</Form.Label>
        <Form.Control type="file" onChange={(e) => setDocument(e.target.value)}  />
      </Form.Group>
 
  <div className="mb-3">
    <label for="validationCustom05" className="form-label">auteur</label>
    <input type="text" className="form-control" id="validationCustom05" required onChange={(e) => setAuteur(e.target.value)} placeholder={sujetAEditer?.auteur || ''} />
    <div className="invalid-feedback">
      Please provide a valid name.
    </div>
  </div>

  
</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark"  onClick={modifierSujet}>
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