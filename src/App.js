import { useState, useEffect } from 'react'
import './App.css';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import olmes from './olmes.webp';
import axios from 'axios';

function App() {
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  let findByPhone = () => {
    axios.get(`http://localhost:3000/carnaval?phone=${phone}`)
      .then(item => setUsers(item.data))
  }

  let updateCheck = (id) => {
    axios.put(`http://localhost:3000/carnaval`, { id })
      .then(findByPhone)
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/carnavalcoutn`)
      .then(item => setUsersCount(item.data))
  }, [])

  return (
    <Container className="App" fluid>
      <Row fluid className='header mb-5' style={{ backgroundImage: `url(${olmes})` }} >
        <div className='fade-content'>
          <div className='fade-circle'>
            <span>{usersCount}</span>
          </div>
        </div>
      </Row>
      <Row className='main mb-5'>
        <Col xs={10}>
          <InputGroup >
            <FormControl type="tel" placeholder="Ingrese el telefono"
              aria-label="Ingrese el telefono" onChange={(el) => setPhone(el.target.value)} />
            <Button variant="outline-secondary" onClick={findByPhone}>
              Buscar
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row className='search-content'>
        {users.map(item =>
          <Col xs={10} className='mb-3' >
            <h5>{item.name}</h5>
            <p>
              Estado: <span>{item.checked ? "Validado" : "Pendiente"}</span> <br />
              Codigo: <span>{item._id}</span>
            </p>
            {!item.checked && <Button variant="outline-secondary" onClick={() => updateCheck(item._id)}>
              Validar
            </Button>}

          </Col>
        )}

      </Row>

    </Container>
  );
}

export default App;
