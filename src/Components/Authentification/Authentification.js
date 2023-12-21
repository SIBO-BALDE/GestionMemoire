import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Auth } from 'firebase/auth';
import { Link } from 'react-router-dom';

// composant Inscription
export default function Authentification() {
   const handleSumit = ()=>{
    alert('je suis un ')
   }

    
  return (
    <div className='container'>
    <Form onSubmit={handleSumit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" placeholder="fall" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Prenom</Form.Label>
        <Form.Control type="text" placeholder="amadem" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="amadem10@gmail.com" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
        <Form.Label>Mot de pass</Form.Label>
        <Form.Control type="password"  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
        <Form.Label> Confirmation  mot de pass </Form.Label>
        <Form.Control type="password"  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
        <Form.Label> Télephone </Form.Label>
        <Form.Control type="tel"  />
      </Form.Group>
      <div>
      <Button type='submit' variant="primary">S'inscrire</Button>
      </div>
      <Link to={'/connexion'}>Vous avez dejas un? connectez vous</Link>
    </Form>
    </div>
  )
}
