import Component from '@glimmer/component';

export default class FilterHeadingComponent extends Component {
  get queryParams() {
    const h = {};
    h[this.args.queryParam] = !this.args.state;
    return h;
  }
}
