import React, { useState, useEffect } from 'react';
import axios from "axios";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { peopleType } from '../util/constants'
import AddForm from './AddForm';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    position: 'absolute',
    width: 500,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function SimpleTable() {
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const [rows, setRows] = useState([]);
    const [checked, setChecked] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    const handleModal = (value) => {
      setOpenModal(value);
    };

    useEffect(() => {
        (async () => {
          if (checked) {
            const result = await axios("http://localhost:5000/avro");
            var data = peopleType.fromBuffer(Buffer.from(result.data, 'utf8'));
            setRows(data);
          } else {
            const result = await axios("http://localhost:5000/json");
            setRows(result.data);
          }
        })();
      }, [checked, openModal]);

    return (
       <Card>
         <CardContent>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell >E-mail</TableCell>
                    <TableCell >Phone</TableCell>
                    <TableCell >Age</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell>
                        {row.name}
                    </TableCell>
                    <TableCell >{row.email}</TableCell>
                    <TableCell >{row.phone}</TableCell>
                    <TableCell >{row.age}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
          </CardContent>
          <CardActions>
            <Fab color="primary" aria-label="add"
              onClick={() => {
                handleModal(true);
              }}>
              <AddIcon />
            </Fab>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Json</Grid>
              <Grid item>
                <AntSwitch checked={checked} onChange={handleChange} name="checkedC" />
              </Grid>
              <Grid item>Avro</Grid>
            </Grid>
            <Modal
              open={openModal}
              onClose={() => {
                handleModal(false);
              }}
              aria-labelledby="Add person">
                <div style={modalStyle} className={classes.paper}>
                  <AddForm closeModal={() => {
                    handleModal(false);
                  }}/>
                </div>
            </Modal>
          </CardActions>
        </Card>
    );
}
