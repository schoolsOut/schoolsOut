import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class UpdateController extends Controller {
  @tracked message;
}
