require('dotenv/config');
const express = require('express')
const JishoApi = require('unofficial-jisho-api')
const fetch = require('node-fetch')
const cors = require('cors')
const path = require('path')
const app = express();
const jisho = new JishoApi()

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())

app.use(express.json())

app.get(`/api/kanjiAlive/:kanji`, (req, res) => {
  const kanji = req.params.kanji
  if (kanji === undefined) {
    res.status(404).json({ error: "invalid input" })
    return
  }
  const url = `https://kanjiapi.dev/v1/kanji/${kanji}`
  const encodedURL = encodeURI(url)
  fetch(encodedURL, {
    path: encodeURIComponent
  })
    .then((response) => {
      if(response.status === 404){
        res.status(404).json({ error: kanji})
        return
      }
      return response.json()
    })
    .then(data => res.status(200).json(data))
    .catch(() => {
      res.status(404).json({ error: "Error Requesting kanjiAlive" })
    })
})

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
