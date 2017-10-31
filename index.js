const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const ip = require('ip')
const fs = require('fs')
const app = express()
const PORT = 6666

// Add cors support
app.use(cors())

// Used to parse body from post requests
app.use(bodyParser.json({
	limit: '1mb'
}))

// Add morgan as request logger on dev level
app.use(morgan('dev'))

//Add better logs for the server
app.post('*', function (req, res) {
	const txtFileName = `./logs/${Date.now()}.json`
	fs.writeFile(txtFileName, JSON.stringify(req.body, null, 2), (err) => {
		if (err) throw err
		console.log(`Saved body from ${req.originalUrl} to ${txtFileName}`)
	})
	res.send('200')
})

app.get('*', function (req, res) {
	res.send('200')
})

app.listen(PORT, function () {
  console.log('Example app listening on '+ ip.address() + ':' + PORT + '!')
})
