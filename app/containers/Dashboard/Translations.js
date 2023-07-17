import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import {
  getByAnyTags,
  getAllSubheadings,
} from 'utils/dataReader/dataProcessor';
import Title from './Title';

export default function Translations({ language, tags }) {
  const translations = tags ? getByAnyTags(tags) : [];

  // TODO Move this to a util file
  const capitalizeFirstLetter = str =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const separatedBySubheading = () => {
    const subheadings = getAllSubheadings();
    return subheadings.map(subheading =>
      createTable(
        translations.filter(item => item.Subheading === subheading),
        subheading,
      ),
    );
  };

  const createTable = (givenTranslations, subheading) => (
    <div
      id={subheading.replace(/\s+/g, '_').toLowerCase()}
      style={{ marginBottom: '100px' }}
    >
      <TableContainer>
        <Title>{subheading}</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Englsh</TableCell>
              <TableCell>{language} - Roman</TableCell>
              <TableCell>Symptoms</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {givenTranslations.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.English}</TableCell>
                <TableCell>
                  {row.Translations[language].RomanTranslation}
                </TableCell>
                <TableCell>
                  {row.Tags.map(tag => capitalizeFirstLetter(tag)).join(', ')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  return <div>{separatedBySubheading()}</div>;
}

Translations.propTypes = {
  tags: PropTypes.array,
  language: PropTypes.string,
};
