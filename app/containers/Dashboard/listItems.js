import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { getAllSubheadings } from 'utils/dataReader/dataProcessor'; // You need to import this function

const subheadings = getAllSubheadings();

export const mainListItems = (
  <React.Fragment>
    {subheadings.map(subheading => (
      <ListItemButton
        component="a"
        href={`#${subheading.replace(/\s+/g, '_').toLowerCase()}`}
      >
        <ListItemIcon>
          <ArrowForwardIosIcon />
        </ListItemIcon>
        <ListItemText primary={subheading} />
      </ListItemButton>
    ))}
  </React.Fragment>
);
