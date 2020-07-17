import React, { useState } from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { personType } from '../util/constants'

export default function AddForm(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState(null);

    const savePerson = async () => {
        const person = {
            name,
            email,
            phone,
            age: Number(age),
            interests: []
        };
        console.log(person);
        var buf = personType.toBuffer(person);
        await axios({
          method: 'post',
          url: "http://localhost:5000/avro",
          data: buf
        });
        props.closeModal();
    };

    return (
        <Grid
        style={{height: '100%'}}
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <TextField style={{width: '100%'}} id="input-name" label="Name" variant="outlined" onChange={(event) => {
            setName(event.target.value);
        }}/>
        <TextField style={{width: '100%'}}  id="input-email" label="E-mail" variant="outlined" onChange={(event) => {
            setEmail(event.target.value);
        }}/>
        <TextField style={{width: '100%'}}  id="input-phone" label="Phone" variant="outlined"  onChange={(event) => {
            setPhone(event.target.value);
        }}/>
        <TextField style={{width: '100%'}}  id="input-age" label="Age" type="number" variant="outlined"  onChange={(event) => {
            setAge(event.target.value);
            console.log(event.target.value);
        }}/>
        <Button variant="contained" color="primary" size="large" onClick={() => {
            savePerson();
          }}>
            Save
        </Button>
      </Grid>
    );
}
