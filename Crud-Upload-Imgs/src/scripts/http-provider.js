const usersUrl = 'https://reqres.in/api/users?page=2';

const getUser = async () => {
  try {
    const resp = await fetch(usersUrl);
    const {data} = await resp.json();
    return data;
  } catch (e) {
    // Return backup joke
    // return 'Chuck Norris is a Funny Dude 💪';
    throw e;
  }
};

export {
  getUser,
};
