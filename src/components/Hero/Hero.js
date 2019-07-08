import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Segment, Icon, Grid, Image, Button } from 'semantic-ui-react';
// import paletteThinImg from '../../images/palette_thin_white.png';


const Hero = props => {
  return (
    

<Segment style={{ padding: '2em 0em', backgroundColor: '#3E4458', color: 'ghostwhite' }} vertical>
<Grid container stackable verticalAlign='middle'>
  <Grid.Row>
    <Grid.Column width={6} textAlign='center'>
      <h1>{props.headline}</h1>
      <p style={{ fontSize: '1.33em' }}>
        {props.subheadline}
      </p>
      <Link to='/map'>
        <Button inverted size='huge'>Starta här<Icon name='right arrow' /> </Button>
      </Link>
    </Grid.Column >
    <Grid.Column floated='right' width={10}>
      <Image src={require('../../images/palette_thin_white2.png')} centered/>
    </Grid.Column>
  </Grid.Row>
  {/* <Grid.Row>
    <Grid.Column textAlign='center'>
        <Button size='huge'>Upptäck våra produkter </Button>
    </Grid.Column>
  </Grid.Row> */}
</Grid>
</Segment>
  )
}

Hero.propTypes = {
  headline: PropTypes.string,
  subheadline: PropTypes.string
}

Hero.defaultProps = {
  headline: 'SparkPalette',
  subheadline: 'subheadline' 
}

export default Hero;
