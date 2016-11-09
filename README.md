# resize on fly

Image resize web service

### APIc Usage Examples
```
http://HOST/square/200/http://foo.com/bar.jpg
http://HOST/width/200/http://foo.com/bar.jpg
http://HOST/width/200/height/100/format/webp/http://foo.com/bar.jpg
http://HOST/height/100/http://foo.com/bar.jpg
```

### Install
  1. Clone the repo
  2. Run `yarn`

### Run
`yarn start`

### Supported output formats
- JPEG
- PNG
- WEBP
- RAW
