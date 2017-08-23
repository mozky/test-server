const express = require('express')
const bodyParser = require('body-parser')
const ip = require('ip')
const app = express()
const fs = require('fs')
const PORT = 6666

app.use(bodyParser.json())

app.post('*', function (req, res) {
	const txtFileName = `./logs/${Date.now()}.json`
	fs.writeFile(txtFileName, JSON.stringify(req.body, null, 2), (err) => {
		if (err) throw err
		console.log(`POST request to ${req.originalUrl} saved to ${txtFileName}`)
	})
	res.send('200')
})

app.get('*', function (req, res) {
	console.log('good')
	res.send('200')
})

app.listen(PORT, function () {
  console.log('Example app listening on '+ ip.address() + ':' + PORT + '!')
})
