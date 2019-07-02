import React, { Component } from 'react';
// import './App.css';
import herobackgroundImg from '../../images/herobackground.png';
import wiresImg from '../../images/wires.jpg';
import { Route, Link } from 'react-router-dom';
import { Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Card,
  Item,
  Image,
  List,
  Menu,
  Segment,
  Visibility } from 'semantic-ui-react';


class HomePage extends Component {
  render() {
    return (
      <div>
      <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 100, padding: '1em 0em', backgroundColor: 'black', backgroundImage:  "url(" + wiresImg + "" }}
          vertical>
          <Container text>
            <Header
              as='h1'
              content='Plannera din laddning'
              inverted
              style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: '1em', marginTop: '2em' }}
            />
            <Header
              as='h2'
              content='Allt du behöver veta för elbil på långresa'
              inverted
              style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
            <Button size='huge' style={{ backgroundColor: 'lightgrey',marginTop: '1em', marginBottom: '1em' }}>
              Visa Laddpunkter
              <Icon name='right arrow' />
            </Button>
          </Container>
        </Segment>

        <Segment style={{ padding: '4em 0em' }} vertical>

          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>

              <Grid.Column>
              <Container text>
                <p style={{ fontSize: '1.33em' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Erat velit scelerisque in dictum non consectetur a erat. 
                Eget dolor morbi non arcu risus quis varius. 
                Etiam non quam lacus suspendisse faucibus interdum. 
                Sed nisi lacus sed viverra tellus in hac habitasse. 
                </p>
              </Container>
              </Grid.Column>

            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                {/* <Button size='huge'>Läs hela nyheten</Button> */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '2em 2em', backgroundColor: '#F6F8FB'}} vertical>
          <Divider horizontal><span style={{ fontSize: '2em' }}>Statistik</span></Divider>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>

              <Grid.Column>
              <Container>
              </Container>
              <Container text textAlign='center'>
                <p>Laddstationer totalt: 1848 </p>
                <p>Laddpunkt totalt: 7914</p>
                <p>Laddpunkt offentlige: 7899</p>
                <p>Schuko: 451</p>
                <p>AC: 1857</p>
                <p>Laddstationer semi/snabb: 1146</p>
                <p>CHAdeMO snabbladdare: 370</p>




              </Container>
              </Grid.Column>

            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Button size='huge'>Visa all statistik</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row columns={3}>
            <Grid.Column textAlign='center'>
              <Container style={{border: '2px solid grey', borderRadius: '10px 10px 10px 10px',padding: '2em', backgroundColor: '#F6F8FB'}} >
                <Header as='h3' style={{ fontSize: '2em' }}>CHAdeMO</Header>
                <p>Urna molestie at elementum eu facilisis sed odio morbi.
                Et netus et malesuada fames. Ornare suspendisse sed nisi lacus sed viverra. 
                Nunc congue nisi vitae suscipit tellus mauris a diam. 
                </p>
                <Button size='huge'>
                  Läs mer
                  <Icon name='right arrow' />
                </Button>
              </Container>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Container style={{border: '2px solid grey', borderRadius: '10px 10px 10px 10px',padding: '2em', backgroundColor: '#F6F8FB'}} >
              <Header as='h3' style={{ fontSize: '2em' }}>AC Type 2</Header>
              <p>Urna molestie at elementum eu facilisis sed odio morbi.
                Et netus et malesuada fames. Ornare suspendisse sed nisi lacus sed viverra. 
                Nunc congue nisi vitae suscipit tellus mauris a diam.</p>
                <Button size='huge'>
                  Läs mer
                  <Icon name='right arrow' />
                </Button>
              </Container>
            </Grid.Column>
            <Grid.Column textAlign='center'>
            <Container style={{border: '2px solid grey', borderRadius: '10px 10px 10px 10px',padding: '2em', backgroundColor: '#F6F8FB'}} >
            <Header as='h3' style={{ fontSize: '2em' }}>Combo / CCS</Header>
            <p>Urna molestie at elementum eu facilisis sed odio morbi.
                Et netus et malesuada fames. Ornare suspendisse sed nisi lacus sed viverra. 
                Nunc congue nisi vitae suscipit tellus mauris a diam.</p>
              <Button size='huge'>
                Läs mer
                <Icon name='right arrow' />
                </Button>
            </Container>
            </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        

        <Segment style={{ padding: '0em' }} vertical>
           <Grid celled='internally' columns='equal' stackable>
             <Grid.Row textAlign='center'>
               <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                 <Header as='h3' style={{ fontSize: '2em' }}>Bilmodell</Header>
                 <p style={{ fontSize: '1.33em' }}>Ange din bilmodell så visas alla stationer som passar för dig</p>
               </Grid.Column>
               <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                 <Header as='h3' style={{ fontSize: '2em' }}>Reseplanerare</Header>
                 <p style={{ fontSize: '1.33em' }}>
                   Beräkna körsträcka mellan laddningar
                 </p>
               </Grid.Column>
             </Grid.Row>
           </Grid>
         </Segment>
      </div>
    );
  }
}

export default HomePage;
