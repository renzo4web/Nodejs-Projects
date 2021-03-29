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

const postUser = async (name, job) => {

  const user = {name, job};

  try {

    const req = await fetch(urlCRUD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const body = await req.json();
    console.log(body);
    return body;
  } catch (e) {
    console.warn(e);
  }

};

const updateUser = async (id, name, job) => {
  const user = {name, job};

  try {
    const req = await fetch(`${urlCRUD}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const body = await req.json();
    console.log(body);
    return body;
  } catch (e) {
    console.warn(e);
  }

};

const deleteUser = async (id) => {

  try {
    const res = await fetch(`${urlCRUD}/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (e) {
    return {};
  }

};

export {
  getTableUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
};
