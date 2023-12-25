import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import {gestionmemoire} from '../../Firebase.Config.js'
import { collection, addDoc } from 'firebase/firestore';
// pour la redirection vers un autre composant
import { useNavigate } from 'react-router-dom';
// pour verifier le regex
import { emailPattern, passwordPattern} from './Regex/Regex.js';
import { auth } from '../../Firebase.Config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Image } from 'react-bootstrap';
import photo from '../../assets/profile.png'

// composant Inscription
export default function Authentification() {

  const [nom,setNom]=useState("");
  const [prenom,setPrenom]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [telephone,setTelephone]=useState("");
  const [passwordConf,setPasswordConf]=useState("");
  // state pour la validation des erreur de formulaire
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  // declarer la variable pour permetre la redirection d'ans un autre composant
  const navigate = useNavigate(); 



  const handleSumit = async (e)=>{
    e.preventDefault();
    
    try {
      if(nom==='' || prenom==='' || email==='' || password==='' || passwordConf==='' || telephone==='') {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vueillez remplir tous les champs",
      });

      } else if (!emailPattern.test(email) ) {
        setEmailErr(true); 
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "votre email est invalide",
        });
        return  
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
          else if (passwordConf !== password) {
            setPwdError(true); 
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "la confirmation  du mot de pass à échouer",
            });
            return  
            }else{
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );
          
      const user = userCredential.user;
      console.log('Utilisateur inscrit avec succès', user);
       const userCollectionRef = collection(gestionmemoire, 'user');
       await addDoc(userCollectionRef, {
        User_nom: nom,
        User_prenom: prenom,
        User_email: email,
        User_password: password,
        User_passwordConf: passwordConf,
        User_telephone: telephone,
        
      }
      
      );
      Swal.fire({
        icon: "success",
        title: "Felicitation",
        text: "Votre formulaire a été envoyer avec succée",
      });
      setNom("");
      setPrenom("");
      setEmail("");
      setPassword("");
      setPasswordConf("");
      setTelephone("");
      navigate('/connexion');
      console.log('Utilisateur inscrit avec succès', user);
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


return (
 <div className='container  content-flex-signin'>
  <div className='img-content-form'>
    <Image src={photo} alt='' />
  </div>
  <div className='content-left-form'>
 <Form onSubmit={handleSumit}>
  <h1 className='text-center'> INSCRIPTION</h1>
   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
     <Form.Label>Nom</Form.Label>
     <Form.Control type="text" placeholder="fall"  onChange={(e)=>setNom(e.target.value)} minLength={2}/>
   </Form.Group>

   <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
     <Form.Label>Prenom</Form.Label>
     <Form.Control type="text" placeholder="amadem" onChange={(e)=>setPrenom(e.target.value)} minLength={2}/>
   </Form.Group>

   <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
     <Form.Label>Email</Form.Label>
     <Form.Control type="text" placeholder="amadem10@gmail.com"  onChange={(e)=>setEmail(e.target.value)} />
   </Form.Group>

   <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
     <Form.Label>Mot de pass</Form.Label>
     <Form.Control type="password"  onChange={(e)=>setPassword(e.target.value)} />
   </Form.Group>

   <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
     <Form.Label> Confirmation  mot de pass </Form.Label>
     <Form.Control type="password"   onChange={(e)=>setPasswordConf(e.target.value)}/>
   </Form.Group>

   <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
     <Form.Label> Télephone </Form.Label>
     <Form.Control type="tel" onChange={(e)=>setTelephone(e.target.value)} />
   </Form.Group>
   <div className='btn-content-position'>
   <Button type='submit'  className='btn-colour'>S'inscrire</Button>
   </div>
   <Link to={'/connexion'} className='content-link'>Vous avez dejas un? connectez vous</Link>
 </Form>
  </div>
 </div>
)
  } 
   

