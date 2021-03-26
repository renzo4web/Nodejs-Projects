const jokeUrl = 'https://api.chucknorris.io/jokes/random';

const getJoke = async () => {
  try {
    const resp = await fetch(jokeUrl);
    const {id, icon_url, value} = await resp.json();
    return {id, icon_url, value};
  } catch (e) {
    // Return backup joke
    // return 'Chuck Norris is a Funny Dude 💪';
    throw e;
  }
};

export {
  getJoke,
};
