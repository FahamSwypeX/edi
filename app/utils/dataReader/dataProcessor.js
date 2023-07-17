const data = require('./data.json');

// Function to get all tags
const getAllTags = () => {
  const tags = [];
  data.forEach(item => {
    tags.push(...item.Tags.map(tag => tag.toLowerCase()));
  });
  const uniqueTags = [...new Set(tags)];
  return uniqueTags.map(tag => ({
    title: capitalizeFirstLetter(tag),
    key: tag,
  }));
};

// Function to get all languages
const getAllLanguages = () => {
  const allLanguages = {}; // Use object to avoid duplicates
  data.forEach(item => {
    Object.keys(item.Translations).forEach(language => {
      allLanguages[language] = {
        title: capitalizeFirstLetter(language),
        key: language,
      };
    });
  });
  return Object.values(allLanguages); // Return array of unique objects
};

// Helper function to capitalize the first letter of each word
const capitalizeFirstLetter = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// Function to get items by tags (all)
const getByAllTags = tags =>
  data.filter(item => tags.every(tag => item.Tags.includes(tag)));

// Function to get items by tags (any)
const getByAnyTags = tags =>
  data.filter(item => tags.some(tag => item.Tags.includes(tag)));

// Function to get all subheadings
const getAllSubheadings = () => {
  const allSubheadings = {}; // Use object to avoid duplicates
  data.forEach(item => {
    allSubheadings[item.Subheading] = true;
  });
  return Object.keys(allSubheadings); // Return array of unique subheadings
};

// Function to group items by subheadings
const groupBySubheadings = items =>
  items.reduce((groups, item) => {
    const key = item.Subheading;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});

export {
  getAllTags,
  getAllLanguages,
  getByAllTags,
  getByAnyTags,
  getAllSubheadings,
  groupBySubheadings,
};
