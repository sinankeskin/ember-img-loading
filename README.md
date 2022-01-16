# ember-img-loading

This is an element modifier for images.
If the browser supports natively, it adds loading attribute to img tag,
if the browser doesn't support, it fallback and loads to lazysizes library and adds some data- attributes.

## Compatibility

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-img-loading
```

## Usage

Simply add modifier to img tag like;

```handlebars
<img {{loading type="lazy" src="/images/slide.png" srcset='/assets/images/slides/slide.png 1x, /assets/images/slides/slide@2x.png 2x' sizes="auto" }}>
```

- type parameter can be: "auto", "lazy" or "eager". If not present auto is the browser default.
- You can use src and srcset parameters together but you should set at least one.
- sizes parameter can be only "auto" and it works only lazysizes library which means your browser doesn't support native lazy loading.
- If you want to reach the browser lazy loading support this modifier adds img_loading parameter to window object.
- So you can reach with window.img_loading. Either "native" or "lazysizes" will return.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
