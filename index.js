require('dotenv/config');
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
        res.status(404).json({error: "No valid kanji for query."})
        return
      }
      res.json(singleChar)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({error: "Error Requesting unofficial-jisho-api"})
    })
  })

app.listen(process.env.PORT, () =>
  console.log('Listening 3001')
)
