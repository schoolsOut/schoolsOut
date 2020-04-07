import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HeroComponent extends Component {
  @tracked searchTerm;

  @action
  _search() {
    this.args.search(this.searchTerm)
  }
}
