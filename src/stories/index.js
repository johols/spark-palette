import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { SearchField } from '../components/SearchField';
import { Hero } from '../components/Hero';
import { DataCard } from '../components/DataCard/DataCard';
import { FloatingPanel } from '../components/FloatingPanel';

import StoryRouter from 'storybook-react-router';

export const defaultStats = [
  { id: '1', attr: 'Laddstationer Sverige', value: '4567'},
  { id: '2', attr: 'Laddpunkter Sverige', value: '4567' },
  { id: '3', attr: 'Laddstationer Norge', value: '4567' },
  { id: '4', attr: 'Laddpunkter Norge', value: '4567' },
  { id: '5', attr: 'Tesla ', value: '4567' },
  { id: '6', attr: 'Task 6', value: '4567' },
];

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with Ttext', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('Search field', module).add('to Storybook', () => <SearchField />);

storiesOf('Hero segment', module)
  .addDecorator(StoryRouter())
  .add('default', () => <Hero />);

  storiesOf('DataCard', module)
  .add('default', () => <DataCard />)
  .add('with title', () => <DataCard title='my title' />)
  .add('with data', () => <DataCard title='my title' stats={ defaultStats }/>);

storiesOf('Floating panel', module).add('default', () => <FloatingPanel />);