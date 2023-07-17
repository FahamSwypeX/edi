/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  bgcolor: background.paper;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="EDI" defaultTitle="EDI">
        <meta
          name="description"
          content="An application that helps doctors communicate with their patients who dont speak english"
        />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path={['/', '/home']} component={HomePage} />
        <Route exact path="/translations" component={Dashboard} />
        <Route path="/about" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
