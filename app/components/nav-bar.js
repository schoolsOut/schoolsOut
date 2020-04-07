import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NaveBarComponent extends Component {
  @tracked isActive = false;

  @action
  toggleMenu() {
    this.isActive = !this.isActive;
  }
}
