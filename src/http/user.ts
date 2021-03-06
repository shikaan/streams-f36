export default class UserHTTPClient {
  private static INSTANCE: UserHTTPClient;

  static getInstance() {
    if (!UserHTTPClient.INSTANCE) {
      UserHTTPClient.INSTANCE = new UserHTTPClient()
    }
    return UserHTTPClient.INSTANCE
  }

  login(username: string, password: string) {
    const params = new URLSearchParams();

    params.append('username', username);
    params.append('password', password);

    return fetch(
      `${process.env.API_URL}session`,
      {
        method: 'POST',
        body: params.toString(),
        mode: 'cors',
        credentials: 'include'
      }
    ).then(response => {
      if (response.status > 299) {
        throw Object.assign(new Error, response.json())
      }

      return response.text()
    })
  }

  fetch() {

  }
}
