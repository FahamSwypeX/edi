import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // <-- Import useSelector
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { makeSelectTags, makeSelectLanguage } from 'containers/App/selectors';
import { getAllTags, getAllLanguages } from 'utils/dataReader/dataProcessor';
import { mainListItems } from './listItems';

import Translations from './Translations';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [currentSelectedTags, setCurrentSelectedTags] = useState([]);
  const [currentSelectedLanguage, setCurrentSelectedLanguage] = useState('');
  const [allTags, setAllTags] = useState([{ title: 'Loading...' }]);
  const [allLanguages, setAllLanguages] = useState([{ title: 'Loading...' }]);

  const selectTags = makeSelectTags();
  const selectLanguage = makeSelectLanguage();

  // Inside Dashboard component
  const selectedTags = useSelector(selectTags);
  const selectedLanguage = useSelector(selectLanguage);

  useEffect(() => {
    setCurrentSelectedTags(selectedTags);
    setCurrentSelectedLanguage(selectedLanguage);
    setAllTags(getAllTags());
    setAllLanguages(getAllLanguages());
  }, []);

  const handleTagSelection = (event, values) => {
    setCurrentSelectedTags(values.map(value => value.title));
  };

  const handleLanguageSelection = (event, value) => {
    setCurrentSelectedLanguage(value.title);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Drawer variant="permanent" open="true">
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: 'auto',
            display: 'flex', // add this
            flexDirection: 'column', // add this
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              mt: 4,
              mb: 4,
              flex: '1 0 auto',
            }}
          >
            {/* adjust this */}
            <Grid container spacing={5}>
              {/* Recent Translations */}
              <Grid item xs={3}>
                <Autocomplete
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
              </Grid>
              <Grid item xs={9}>
                <Autocomplete
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
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flex: '1 0 auto' }}>
            {/* adjust this */}
            <Grid container spacing={3}>
              {/* Recent Translations */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Translations
                    tags={currentSelectedTags}
                    language={currentSelectedLanguage}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
