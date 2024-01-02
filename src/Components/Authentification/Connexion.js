import React, { useState } from 'react'
import {  Button, Form, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import photo from '../../assets/profile.png'


export default function Connexion() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate(); 


// function pour se connecter
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      if(email===''|| password===''){
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Vueillez remplir les champs vides",
        });
        return

      }else if(email==='admin@gmail.com' && password=== 'admin1234'){
        Swal.fire({
          icon: "success",
          title: "Felicitation",
          text: "Vous etes connecter avec succée",
        });
        navigate('/dashbordadmin')
        return
      }
      else{
        const auth = getAuth(); // Récupérer l'objet d'authentification
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // L'utilisateur est maintenant connecté
      const user = userCredential.user;
      Swal.fire({
        icon: "success",
        title: "Felicitation",
        text: "Vous etes connecter avec succée",
      });
      navigate('/')
      console.log('Utilisateur connecté avec succès', user);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Ce compte n'hesite pas",
      });
      console.error('Erreur lors de la connexion', error.message);
    }
      
  };


  
  return (
    <div className='container content-flex-signin'>
      <div className='img-content-form'>
    <Image src={photo} alt='' />
  </div>
  <div className='content-left-form'>
    <Form  onSubmit={handleLogin}>
      <h1 className='text-center'>CONNEXION</h1>
   <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
     <Form.Label>Email</Form.Label>
     <Form.Control type="email" placeholder="amadem10@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}  />
   </Form.Group>

   <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
     <Form.Label>Mot de pass</Form.Label>
     <Form.Control type="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
   </Form.Group>
   <div className='btn-content-position'>
   <Button type='submit' variant="primary" className='btn-colour'>Connexion</Button>
   </div>
   <Link to={'/auth'} className='content-link'>Vous n'avez encore de compte? Inscrivez vous</Link>
    </Form>
  </div>
    </div>
  )
}
