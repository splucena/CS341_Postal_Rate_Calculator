const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express()

// tell it to use the public directory as on where static files live
app.use(express.static(__dirname + '/public'))

// views is directory for all template files
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// main form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/form.html'))    
})

app.get('/get_rate', (req, res) => {
  res.render('pages/result', getData(req))
})

app.get('/get_rate_service', (req, res) => {
  res.json(getData(req))
})

// Functions

let getData = (req) => {
  const weight = req.query.weight
  const typeOfMail = req.query.type_of_mail
  let typeOfMailDesc = ''

  return calculateRate(weight, typeOfMail)
}

let calculateRate = (w, t) => {
  let total = 0
  let cost = 0

  switch(t) {
    case 'stamped':
      typeOfMailDesc = 'Letters (Stamped)'

      if (w < 2) {
        cost = 0.55
      } else if (w < 3) {
        cost = 0.70
      } else if (w < 3.5) {
        cost = 0.85
      } else {
        cost = 1.00
      }      
      break
    case 'metered':
      typeOfMailDesc = 'Letters (Metered)'
      if (w < 2) {
        cost = 0.50
      } else if (w < 3) {
        cost = 0.65
      } else if (w < 3.5) {
        cost = 0.80
      } else {
        cost = 1.95
      } 
      break
    case 'flats':
      typeOfMailDesc = 'Large Envelopes (Flats)'
      
      if (w < 2) {
        cost = 1.00
      } else if (w < 3) {
        cost = 1.20
      } else if (w < 4) {
        cost = 1.40
      } else if (w < 5) {
        cost = 1.60
      } else if (w < 6) {
        cost = 1.80
      } else if (w < 7) {
        cost = 2.00
      } else if (w < 8) {
        cost = 2.20
      } else if (w < 9) {
        cost = 2.40
      } else if (w < 10) {
        cost = 2.60
      } else if (w < 11) {
        cost = 2.80
      } else if (w < 12) {
        cost = 3.00
      } else if (w < 13) {
        cost = 3.20
      } else {
        cost = 3.40
      }
      break;
    case 'retail':
      typeOfMailDesc = 'First-Class Package Service—Retail'
      if (w < 5) {
        cost = 3.80
      } else if (w < 9) {
        cost = 4.60
      } else if (w < 13) {
        cost = 5.30
      } else {
        cost = 5.90
      }
      break
    default:
      break
  }

  total = parseFloat(cost).toFixed(2)

  return {weight: w, 
          type_of_mail: t, 
          result: total,
          cost: total,
          type_of_mail_desc: typeOfMailDesc}
}

app.listen(PORT, () => {
  console.log(`Node app is running on port ${PORT}`)
})
