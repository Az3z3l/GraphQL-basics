const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

const students= store.collection('students');
const colleges=store.collection('colleges');

module.exports = {
   students,
   colleges
};

// console.log(students.list())