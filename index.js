const express = require('express')
const JishoApi = require('unofficial-jisho-api')

const app = express();
const jisho = new JishoApi()

// jisho.searchForKanji('一樹')
//   .then(result => console.log(result))

const resultArray = []

jisho.searchForPhrase('house')
  .then(result => result.data)
  .then(data => {
    const singleCharObj = data.filter(data => data.slug.length === 1)
    console.log(singleCharObj)
    const singleChar = singleCharObj.map(obj => obj.slug)
    console.log(singleChar)
  })
