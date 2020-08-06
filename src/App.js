import React, { useEffect, useState } from 'react';
import logo from './tranzynergyLogo.png';
import './App.css';
import { getTenUsers, getTwoUsers } from './service/userService'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

function App() {
  const [ users, setUsers ] = useState([])
  const [ open, setOpen ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState(0)

  useEffect(() => {
    getTenUsers()
    .then((response) => {
      setUsers(response.data.results)
    }).catch((err) => {
      console.error(err)
      setOpen(true)
    })
  }, [ setUsers ])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleNext = () => {
    if  (currentUser === 8) {
      getTwoUsers()
      .then((response) => {
        const newUsers = [...users, ...response.data.results]
        newUsers.splice(0,2)
        setUsers(newUsers)
        setCurrentUser(currentUser - 1)
      }).catch((err) => {
        console.error(err)
        setOpen(true)
      })
    } else {
      setCurrentUser(currentUser + 1)
    }
  }
  
  const handlePrevious = () => {
    setCurrentUser(currentUser - 1)
  }

  if (users.length < 1) {
    return <></>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          All data used is from{' '}
          <a
            className="App-link"
            href="https://randomuser.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            randomuser
          </a>
        </p>        
      
        <div style={{color: 'white'}}>
          <Card style={{maxWidth: 400, width: 600 }}>
            <CardActionArea>
              <CardMedia
                style={{height: 400}}
                image={users[currentUser].picture.large}
                title="User"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {`${users[currentUser].name.first} ${users[currentUser].name.last}`}
              </Typography>
              <PersonInfo person={users[currentUser]} />
              </CardContent>
            </CardActionArea>
            <CardActions style={{float: 'right'}}>
              <Button disabled={currentUser === 0} color="primary" onClick={handlePrevious}>
                Previous
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </CardActions>
          </Card>
        </div>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Error Getting Users"
        action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </header>
    </div>
  );
}

function PersonInfo({ person }) {
  return (
    <List>
      <ListItem>
        <ListItemText>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <strong>Address: </strong>
            </Grid>
            <Grid item xs={9}>
              {`${person.location.street.number} ${person.location.street.name}`}<br />
              {person.location.city},<br />
              {person.location.state} {person.location.postcode}
            </Grid>
          </Grid>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <strong>Email: </strong>
            </Grid>
            <Grid item xs={9}>
              {person.email}
            </Grid>
          </Grid>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <strong>Gender: </strong>
            </Grid>
            <Grid item xs={9}>
              {person.gender}
            </Grid>
          </Grid>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <strong>Phone Number: </strong>
            </Grid>
            <Grid item xs={9}>
              {person.cell}
            </Grid>
          </Grid>
        </ListItemText>
      </ListItem>
    </List>
  )
}

export default App;
