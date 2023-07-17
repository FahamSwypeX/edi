const csv = require('csvtojson');
const fs = require('fs');

// Define the path for the csv and json files
const csvFilePath = './scripts/translations.csv';
const jsonFilePath = './app/utils/dataReader/data.json';

csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    const formattedJson = jsonObj.map((item, index) => {
      const translations = {};

      Object.keys(item).forEach(key => {
        if (key.includes('- Roman')) {
          const lang = key.split(' - ')[0]; // Get the language name
          if (translations[lang]) {
            translations[lang].RomanTranslation = item[key];
          } else {
            translations[lang] = {
              Translation: '',
              RomanTranslation: item[key],
            };
          }
        } else if (['Subheading', 'Tags', 'English'].includes(key)) {
          // Do nothing
        } else if (translations[key]) {
          translations[key].Translation = item[key];
        } else {
          translations[key] = {
            Translation: item[key],
            RomanTranslation: '',
          };
        }
      });

      return {
        id: index + 1, // Add a unique id to each entry
        Subheading: item.Subheading,
        Tags: item.Tags.split(', '),
        English: item.English,
        Translations: translations,
      };
    });

    fs.writeFileSync(jsonFilePath, JSON.stringify(formattedJson, null, 4));
    console.log('CSV to JSON conversion is done.');
  });
