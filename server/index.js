require('dotenv/config');
const express = require('express')
const JishoApi = require('unofficial-jisho-api')
const cors = require('cors')
const path = require('path')
const app = express();
const jisho = new JishoApi()

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())

app.get(`/api/kanjiAlive/:kanji`, (req, res) => {
  const kanji = req.params.kanji
  console.log("kanji", kanji)
  if (kanji === undefined) {
    res.status(404).json({ error: "invalid input" })
    return
  }
  fetch(`https://kanjiapi.dev/v1/kanji/${kanji}`)
    .then((response) => console.log(response))
    .then(data => console.log(data))
})

app.use(express.json())

app.get(`/api/kanji/:word?`, (req, res) => {
  const word = req.params.word
  if(word === undefined){
    res.status(404).json({error: "invalid input"})
    return
  }
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
        res.status(404).json({error: "No valid kanji for query"})
        return
      }
      res.json(singleChar)
    })
    .catch(err => {
      res.status(404).json({error: "Error Requesting unofficial-jisho-api"})
      console.error(err)
    })
  })




app.listen(process.env.PORT, () =>
  console.log(`Listening Port ${process.env.PORT}`)
)
