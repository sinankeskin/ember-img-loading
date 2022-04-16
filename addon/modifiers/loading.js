import { isBlank, isPresent } from '@ember/utils';

import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';

export default class LoadingModifier extends Modifier {
  element = null;

  modify(element, _, { type, src, srcset, sizes }) {
    this.element = element;

    if (!window.img_loading) {
      this._check();
    }

    this._setAttibutes(type, src, srcset, sizes);
  }

  _setAttibutes(type, src, srcset, sizes) {
    if (window.img_loading === 'native') {
      if (isBlank(src) && isBlank(srcset)) {
        assert('You should set whether src or srcset parameter.');
      } else {
        if (isPresent(src)) {
          this.element.setAttribute('src', src);
        }

        if (isPresent(srcset)) {
          this.element.setAttribute('srcset', srcset);
        }
      }

      if (isPresent(type)) {
        this.element.setAttribute('loading', type);
      } else {
        this.element.setAttribute('loading', 'auto');
      }
    } else if (window.img_loading === 'lazysizes') {
      if (isBlank(src) && isBlank(srcset)) {
        assert('You should set whether src or srcset parameter.');
      } else {
        if (isPresent(src)) {
          this.element.dataset.src = src;
        }

        if (isPresent(srcset)) {
          this.element.dataset.srcset = srcset;
        }
      }

      if (isPresent(sizes)) {
        this.element.dataset.sizes = sizes;
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
