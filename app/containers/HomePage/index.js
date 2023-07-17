/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Footer from 'components/Footer';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
  makeSelectTags,
  makeSelectLanguage,
} from 'containers/App/selectors';

import { getAllTags, getAllLanguages } from 'utils/dataReader/dataProcessor';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername, setTags, setLanguage } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({ username, onSubmitForm, onSetTags, onSetLanguage }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [allTags, setAllTags] = useState([{ title: 'Loading...' }]);
  const [allLanguages, setAllLanguages] = useState([{ title: 'Loading...' }]);

  useEffect(() => {
    setAllTags(getAllTags());
    setAllLanguages(getAllLanguages());
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const handleTagSelection = (event, values) => {
    const selectedTags = values.map(value => value.title);
    onSetTags(selectedTags);
  };

  const handleLanguageSelection = (event, value) => {
    const selectedLanguage = value.title;
    onSetLanguage(selectedLanguage);
  };

  return (
    <article>
      <Helmet>
        <title>EDI</title>
        <meta
          name="description"
          content="An application to help doctors communicate with patients who don't speak English."
        />
      </Helmet>
      <div>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              <FormattedMessage {...messages.startProjectHeader} />
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              <FormattedMessage {...messages.startProjectMessage} />
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="column"
              spacing={2}
              justifyContent="center"
            >
              <Autocomplete
                sx={{ width: '100%' }}
                id="tags-standard"
                options={allLanguages}
                onChange={handleLanguageSelection}
                getOptionLabel={option => option.title}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select Target Language"
                    placeholder="Language"
                  />
                )}
              />
              <Autocomplete
                sx={{ width: '100%' }}
                multiple
                id="tags-standard"
                options={allTags}
                onChange={handleTagSelection}
                getOptionLabel={option => option.title}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select symptoms"
                    placeholder="Symptoms"
                  />
                )}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Link to="/translations" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" style={{ color: 'white' }}>
                    Get Questions
                  </Button>
                </Link>
              </div>
            </Stack>
          </Container>
        </Box>
      </div>
      <Footer />
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
  onSetTags: PropTypes.func,
  onSetLanguage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  tags: makeSelectTags(),
  language: makeSelectLanguage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    onSetTags: tags => dispatch(setTags(tags)),
    onSetLanguage: language => dispatch(setLanguage(language)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
