import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState,useEffect } from 'react';
import React from 'react'
import { Form, Image } from 'react-bootstrap';
import profile from '../../assets/compte.avif'
import {gestionmemoire, collection } from '../../Firebase.Config.js'
import { getDocs } from 'firebase/firestore';
import { storage} from '../../Firebase.Config.js'



// import { gestionmemoire, storage } from './';

export default function DashbordUtilisateur() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [titre,setTitre]=useState("");
    const [file,setFile]=useState(null);
    const [description,setDescription]=useState("");
    const [autheur,setAutheur]=useState("");
    const [sujets, setSujets] = useState([]);

    const handleFileChange = (e) => {
        // Gérer le changement du fichier
        const selectedFile = e.target.files[0];
        console.log('files',selectedFile)
        setFile(selectedFile);
        console.log('fil pour verif',file)
      };
      useEffect(() => {
        const fetchSujets = async () => {
          // Utilisez getDocs pour obtenir une collection
          const sujetsSnapshot = await getDocs(collection(gestionmemoire, 'sujet'));
          const nouveauxSujets = sujetsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setSujets(nouveauxSujets);
        };
      
        fetchSujets();
      }, []);
      

      const handleSubmit = async (e) => {
        e.preventDefault();
      
       try {
         // Envoyer le fichier vers Firebase Storage
         const storageRef = storage().ref(`files/${file.name}`);
         await storageRef.put(file);
       
         // Obtenir l'URL du fichier téléchargé
         const fileUrl = await storageRef.getDownloadURL();
       
         // Ajouter les données du sujet dans Firestore
         await gestionmemoire.collection('sujet').add({
           titre,
           description,
           autheur,
           fileUrl,
           createdAt: new Date(), 
           createdBy: 'utilisateur actuel'
         });
       
         // Rafraîchir la liste des sujets
         const sujetsSnapshot = await gestionmemoire.collection('sujet').get();
         const nouveauxSujets = sujetsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
         setSujets(nouveauxSujets);
       
         // Réinitialiser le formulaire après l'ajout du sujet
         setTitre('');
         setDescription('');
         setAutheur('');
         setFile(null);
        
       } catch (error) {
        alert(error.message);
        
       }
      };
      

    
  return (
    <div>
      <div className='content-dashbord-apprenant'>
        <div className='content1'>
            <div className='content-img_profile mt-4 ms-4'>
                <Image src={profile} alt='' className='content-profile' />
            </div>
            <p className='text-center'>USER</p>
                <hr />
            </div>
        <div className='content2 '>
        <div className='navbar-content-dashbord d-flex justify-content-between align-items-center '>
      <div><FontAwesomeIcon icon={faBars} className='menu' /></div>
      <div><FontAwesomeIcon icon={faUser}  className='compte'/></div>
      </div>
        <div className='mt-5 ms-5'>
        <Button variant="primary" onClick={handleShow} className='mb-2'>
        Ajouter memoire
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un sujet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
     <Form.Label>Auteur</Form.Label>
     <Form.Control value={autheur} type="text"  onChange={(e)=>setAutheur(e.target.value)} />
   </Form.Group>
   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
     <Form.Label>Titre</Form.Label>
     <Form.Control value={titre} type="text"  onChange={(e)=>setTitre(e.target.value)} />
   </Form.Group>

   <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
     <Form.Label>Fichier</Form.Label>
     <Form.Control type="file"  onChange={handleFileChange} />
   </Form.Group>

   <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
     <Form.Label>Description</Form.Label>
     <Form.Control  value={description} as="textarea" rows={3}   onChange={(e)=>setDescription(e.target.value)} />
   </Form.Group>
 </Form>
 </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Autheur</th>
          <th>Titre</th>
          <th>File</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
      {sujets.map((sujetel, index) => (
    <tr key={index}>
      <td>{index +1}</td>
      <td>{sujetel.autheur}</td>
      <td>{sujetel.titre}</td>
      {/* <td>{sujetel.file && sujetel.file.name}</td> */}
      <td>{sujetel.fileUrl && <a href={sujetel.fileUrl} target="_blank" rel="noopener noreferrer">Voir fichier</a>}</td>

      <td>{sujetel.description}</td>
    </tr>
  ))}
      </tbody>
    </Table>
        </div>

        </div>
      </div>
    </div>
  )
}
