import Component from '@glimmer/component';
import { set } from '@ember/object';

export default class HeroComponent extends Component {
  get searchTerm() {
    if (this._searchTerm == undefined) {
      this._searchTerm = this.args.searchTerm;
    }
    return this._searchTerm;
  }

  set searchTerm(val) {
    set(this, '_searchTerm', val);
  }
}
