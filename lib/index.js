const app = require('koa')()
const _ = require('lodash')
const request = require('request')
const sharp = require('sharp')
const tmp = require('tmp')
const fs = require('fs')

const defaultPort = 3000
const numberParams = ['square', 'width', 'height']
const validParams =  numberParams.concat(['cover', 'version', 'format'])
const allowedHosts = []

function getTmpFile() {
  return new Promise((resolve, reject) => {
    tmp.file((err, path, fd, cleanup) => {
      if (err) return reject(err)
      resolve([path, fd, cleanup])
    })
  })
}

function download(url) {
  return getTmpFile()
    .then(([filepath, fd, cleanup]) => new Promise((resolve, reject) => {
      request(url)
        .on('error', err => reject(error))
        .pipe(fs.createWriteStream(filepath))
        .on('close', () => {
          resolve([filepath, cleanup])
        })
    }))
}

// x-response-time
app.use(function *(next){
  const start = new Date()
  yield next
  const ms = new Date() - start;
  this.set('X-Response-Time', ms + 'ms')
});

app.use(function *(next){
  if (this.request.method !== 'GET') this.throw(400)

  yield next
});

app.use(function *(){
  const urlIndex = this.request.url.indexOf('http')

  if (urlIndex < 1) return this.throw(400)

  const url = this.request.url.slice(urlIndex)

  const params = _(this.request.url.slice(1, urlIndex - 1))
    .split('/')
    .chunk(2)
    .filter(([name, val]) => validParams.includes(name) && val)
    .map(([name, val]) => [name, numberParams.includes(name) ? parseInt(val, 10) : val] )
    .fromPairs()
    .value()

  if (_.isEmpty(params)) return this.throw(400)

  const [file, cleanup] = yield download(url)

  const transformer = sharp(file)

  const {orientation, format} = yield sharp(file).metadata()

  if (orientation !== "undefined" && orientation >= 5) transformer.rotate()

  if (params.square) params.width = params.height = params.square

  if (params.width || params.height) transformer.resize(params.width, params.height)

  if (params.format && params.format != format && ['jpeg', 'png', 'webp', 'raw'].includes(params.format)) {
    this.type = params.format
    transformer.toFormat(params.format)
  } else {
    this.type = format
  }

  this.set('Cache-Control', 'max-age=31536000')
  this.body = yield transformer.toBuffer()

  cleanup()
});

app.listen(process.env.PORT || defaultPort)

console.log(`Listening at ${process.env.PORT || defaultPort}`)