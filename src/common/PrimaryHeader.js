import React, { Component } from 'react';
import './PrimaryHeader.css';
import { NavLink } from 'react-router-dom';
import { Container, Menu, Segment } from 'semantic-ui-react';

class PrimaryHeader extends Component {
  
  render() {

    return (
      <div>
          <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 70, padding: '1em 0em', backgroundColor: '#3E4458'}}
              vertical>
            <Container>
              <Menu inverted pointing secondary size='large' >
                <Menu.Item as={NavLink} to='/home'>Hem</Menu.Item>
                <Menu.Item as={NavLink} to='/map'>Karta</Menu.Item>
                <Menu.Item as={NavLink} to='/about'>Om</Menu.Item>
                <Menu.Item as={NavLink} to='/contact'>Kontakt</Menu.Item>
              </Menu>
            </Container>
            
          </Segment>
      </div>
    );
  }
}

export default PrimaryHeader;
