const usersUrl = 'https://reqres.in/api/users?page=2';
const urlCRUD = 'https://reqres.in/api/users';

const getTableUsers = async () => {
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

const getUser = async (id) => {

  try {
    const resp = await fetch(`${urlCRUD}/${id}`);
    const {data: user} = await resp.json();
    return user;
  } catch (e) {
    return {};
  }

};

export {
  getTableUsers,
    getUser
};
