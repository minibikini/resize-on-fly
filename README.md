# resize on fly

Image resize web service

### Install
  1. Clone the repo
  2. Run `yarn`

### Run
`yarn start` or `node lib/`

### Env Vars
 - `PORT` - HTTP port, `3000` by default

### API Usage Examples
```
http://HOST/square/200/http://foo.com/bar.jpg
http://HOST/width/200/http://foo.com/bar.jpg
http://HOST/width/200/height/100/format/webp/http://foo.com/bar.jpg
http://HOST/height/100/http://foo.com/bar.jpg
http://HOST/width/200/height/100/contain/fff/http://foo.com/bar.jpg
```

#### Contain
Scale an image to fit width and height and fill the empty space with a color.

Usage: `contain/HEXCOLOR`

Examples:
  - `contain/fff`, `contain/ffffff` - fill with white
  - `contain/3a83f2` - fill with blue


### Supported output formats
- JPEG
- PNG
- WEBP
- RAW
