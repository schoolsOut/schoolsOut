import Route from '@ember/routing/route';

export default class UpdateRoute extends Route {
  model() {
    return "foo"
  }
  setupController(controller, model) {
    super.setupController(controller, model);

    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const body = {"name":"Yoda"}

    const options = {
      method: "POST",
      headers,
      mode: "cors",
      body: JSON.stringify(body),
    }

    fetch("https://enqq50rdx06voa7.m.pipedream.net", options).then(response => {
      response.json().then(data => {
        controller.message = data.message;
      })
    })
  }
}
