# resize on fly

Image resize web service

### Requirements
 - node.js >= v6

### Install
`npm -g install resize-on-fly`

### Usage
```
Usage: resize-on-fly [options]

Options:
  -p, --port     HTTP port number                      [number] [default: 3000]
  -v, --version  Show version number                                  [boolean]
  -h, --help     Show help                                            [boolean]
```

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
