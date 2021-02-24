# ember-img-loading

This an element modifier for images. If the browser supports natively it adds loading attribute to img tag, if the browser doesn't support it fallback and loads to lazysizes library and adds some data- attributes.

## Compatibility

- Ember.js v3.16 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Installation

```
ember install ember-img-loading
```

## Usage

Simply add modifier to img tag like;

```handlebars
<img {loading type="lazy" src="/images/slide.png" srcset='/assets/images/slides/slide.png 1x, /assets/images/slides/slide@2x.png 2x' sizes="auto" }>
```

type parameter can be: "auto", "lazy" or "eager"
You can src and srcset parameters together but you should set at least one.
sizes parameter can be only "auto" and it works only lazysizes library.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
