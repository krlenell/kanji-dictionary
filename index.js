const express = require('express')
const JishoApi = require('unofficial-jisho-api')
const cors = require('cors')

const app = express();
const jisho = new JishoApi()


app.use(cors())

app.use(express.json())

app.get(`/api/kanji/:word`, (req, res) => {
  const word = req.params.word
  jisho.searchForPhrase(word)
    .then(result => result.data)
    .then(data => {
      if(data.length === 0){
        res.status(404).json({error: "nothing found for query"})
        return
      }
      const singleCharObj = data.filter(data => data.slug.length === 1)
      const singleChar = singleCharObj.map(obj => obj.slug)
      if(singleChar.length === 0){
        res.status(404).json({error: "no kanji found for this query"})
        return
      }
      res.json(singleChar)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({error: "kanji not found in API"})
    })
  })

app.get(`/api/test`, (req, res) => {
  res.status(200).json({tested: "the test works"})
})

app.listen(3001, () =>
  console.log('Listening 3001')
)
