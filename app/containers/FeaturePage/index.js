import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';

export default function FeaturePage() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', padding: '0 20px' }}
    >
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Helmet>
          <title>Feature Page</title>
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <List>
          <ListItem>
            <p>
              We are a team of medical students who faced an issue and decided
              to resolve it
            </p>
          </ListItem>
        </List>
      </div>
    </div>
  );
}
