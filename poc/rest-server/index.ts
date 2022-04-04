import express from 'express'
import child_process from 'child_process'

const app = express()
const port = 3000

app.get('/double', (req, res) => {
  const num = req.query.num

  child_process.execSync(
    `python ./index ${num}`
)
  res.status(200).send({result: 'x'})
})

app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})