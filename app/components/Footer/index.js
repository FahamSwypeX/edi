import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';

import Box from '@mui/material/Box';
import messages from './messages';

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: '#f7f7f7',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '3em 0',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          padding: '0 1em',
        }}
      >
        <section>
          <FormattedMessage {...messages.licenseMessage} />
        </section>
        <section>
          <LocaleToggle />
        </section>
        <section>
          <FormattedMessage
            {...messages.authorMessage}
            values={{
              author: (
                <A href="https://www.linkedin.com/in/fahamkhan/">Faham Khan</A>
              ),
            }}
          />
        </section>
      </div>
    </Box>
  );
}

export default Footer;
