import React, { Component } from 'react';
import backgroundImg from '../images/herobackground.png';
// import './App.css';
import { Container,
  Grid,
  Header,
  List,
  Segment } from 'semantic-ui-react';

class PrimaryFooter extends Component {
  render() {
    return (
      <Segment inverted vertical style={{ padding: '3em 0em',backgroundColor:'green', backgroundImage:  "url(" + backgroundImg + ")" }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Innehåll' />
                  <List link inverted>
                    <List.Item as='a'>Hem</List.Item>
                    <List.Item as='a'>Karta</List.Item>
                    <List.Item as='a'>Om Sparkpalette</List.Item>
                    <List.Item as='a'>JKontakt</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Kontakt' />
                  <List link inverted>
                    <List.Item>Tellus at urna 18</List.Item>
                    <List.Item>789 98 Cursus scelerisque</List.Item>
                    <List.Item>Eleifend: 099 - 99 99 999</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>Footer Header</Header>
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
    );
  }
}

export default PrimaryFooter;
