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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
    })

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
                <h2>Liste des domaines</h2>
                <button onClick={handleShow}>Ajouter un domaine</button>

                {/* Modal pour ajouter un domaine  */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nom du domaine</Form.Label>
                                    <Form.Control type="text" placeholder="santé.." onChange={(e) => setNomDomaine(e.target.value)} />
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
            </div>
        </>
     );
}
 
export default Domaine;