import React, { useEffect, useState } from 'react';
import './App.css';
import { Card, CardDeck, Form, CardColumns } from 'react-bootstrap';
import Moment from 'react-moment';
import axios from 'axios';


function App () {

  const [ lated, setLated ] = useState([]);
  const [ results, setResults ] = useState([]);
  const [ searchCountry, setSearchCountry ] = useState('');

  useEffect(() => {
    axios
    .all([
      axios.get('https://corona.lmao.ninja/v2/all'),
      axios.get('https://corona.lmao.ninja/v2/countries')
    ])
    .then( res => {
      setLated(res[0].data);
      setResults(res[1].data);
    })
  }, []);

  const date = new Date(parseInt(lated.updated));
  const lastUpdated = date.toString();

  const filterCountry = results.filter( item => {
    return searchCountry !== "" ? item.country.includes(searchCountry) : item;
  });

  const countries = filterCountry.map( (data, i) => {
    return(
      <Card key={i} bg='light' text='dark' className='text-center'>
        <Card.Img variant='top' src={data.countryInfo.flag}/>
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>

          <Card.Text>Continent: { data.continent }</Card.Text>
          <Card.Text>Active: { data.active } </Card.Text>
          <Card.Text>Cases: { data.cases }</Card.Text>
          <Card.Text>Deaths: { data.deaths }</Card.Text>
          <Card.Text>Recovered: { data.recovered }</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div>
      <CardDeck>
        <Card bg='secondary' text={'white'} className='text-center' style={{margin: '10px'}}>
          <Card.Body>
            <Card.Title>Case</Card.Title>
            <Card.Text>
              {lated.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Moment>
              {lastUpdated}
            </Moment>
          </Card.Footer>
        </Card>

        <Card bg='danger' text={'white'} className='text-center' style={{margin: '10px'}}>
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
              {lated.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Moment>
              {lastUpdated}
            </Moment>
          </Card.Footer>
        </Card>

        <Card bg='success' text={'white'} className='text-center' style={{margin: '10px'}}>
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              {lated.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Moment>
              {lastUpdated}
            </Moment>
          </Card.Footer>
        </Card>
      </CardDeck>

      <Form>
        <Form.Group>
          <Form.Label>Search</Form.Label>
          <Form.Control onChange={e => setSearchCountry(e.target.value)} type='text' placeholder='Search a country'/>
        </Form.Group>
      </Form>

      <CardColumns>
        {countries}
      </CardColumns>
    </div>
  );
}

export default App;
