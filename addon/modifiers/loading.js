import { isBlank, isPresent } from '@ember/utils';

import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';

export default class LoadingModifier extends Modifier {
  didUpdateArguments() {
    this._setAttibutes();
  }

  didInstall() {
    if (!window.img_loading) {
      this._check();
    }

    this._setAttibutes();
  }

  _setAttibutes() {
    if (window.img_loading === 'native') {
      if (isBlank(this.args.named.src) && isBlank(this.args.named.srcset)) {
        assert('You should set whether src or srcset parameter.');
      } else {
        if (isPresent(this.args.named.src)) {
          this.element.setAttribute('src', this.args.named.src);
        }

        if (isPresent(this.args.named.srcset)) {
          this.element.setAttribute('srcset', this.args.named.srcset);
        }
      }

      if (isPresent(this.args.named.type)) {
        this.element.setAttribute('loading', this.args.named.type);
      } else {
        this.element.setAttribute('loading', 'auto');
      }
    } else if (window.img_loading === 'lazysizes') {
      if (isBlank(this.args.named.src) && isBlank(this.args.named.srcset)) {
        assert('You should set whether src or srcset parameter.');
      } else {
        if (isPresent(this.args.named.src)) {
          this.element.dataset.src = this.args.named.src;
        }

        if (isPresent(this.args.named.srcset)) {
          this.element.dataset.srcset = this.args.named.srcset;
        }
      }

      if (isPresent(this.args.named.sizes)) {
        this.element.dataset.sizes = this.args.named.sizes;
      }

      this.element.classList.add('lazyload');
    }
  }

  _check() {
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
