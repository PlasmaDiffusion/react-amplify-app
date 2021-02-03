export function getClientUrl() {
  return process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://main.d1vyqeq0245pij.amplifyapp.com";
}

export function getServerUrl() {
  return process.env.NODE_ENV == "development"
    ? "http://localhost:4000"
    : "https://shopping-mockup.herokuapp.com";
}
