import Modifier from 'ember-modifier';

export default class LoadingModifier extends Modifier {
  didUpdateArguments() {
    this._setAttibutes();
  }

  didInstall() {
    this._check();
    this._setAttibutes();
  }

  _setAttibutes() {
    if (window.img_loading === 'native') {
      if (this.args.named.src) {
        this.element.setAttribute('src', this.args.named.src);
      } else if (this.args.named.srcset) {
        this.element.setAttribute('srcset', this.args.named.srcset);
      }

      this.element.setAttribute('loading', this.args.named.type);
    } else if (window.img_loading === 'lazysizes') {
      if (this.args.named.src) {
        this.element.dataset.src = this.args.named.src;
      } else if (this.args.named.srcset) {
        this.element.dataset.srcset = this.args.named.srcset;
      }
    }

    this.element.classList.add('lazyload');
  }

  _check() {
    if (window.img_loading) {
      return;
    } else {
      if ('loading' in HTMLImageElement.prototype) {
        window.img_loading = 'native';
      } else {
        window.img_loading = 'lazysizes';

        let script = document.createElement('script');
        script.async = true;
        script.src =
          'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.0/lazysizes.min.js';
        document.body.appendChild(script);
      }
    }
  }
}
