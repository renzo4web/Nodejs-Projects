import {getUser} from './http-provider';

let containerUsersTable, btnUser;

const createUserListDom = () => {

  const html = `  
  <button id="btn-getUser">get user</button>
<table>
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">email</th>
        <th scope="col">nombre</th>
        <th scope="col">avatar</th>
    </tr>
    </thead>
    <tbody class="container-user-list">
    </tbody>

</table>

  `;

  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.insertAdjacentElement('afterbegin', div);

};

const addUserToDom = (users) => {
  containerUsersTable.innerHTML = users.map(
      ({id, email, first_name, avatar}) => {
        return `
          <tr>
            <td>${id}<td>
            <td>${email}</td>
            <td>${first_name}</td>
            <td> <img src="${avatar}" alt="user avatar"></td>
          </tr>
        `;
      }).join('');
};

const handleClickJoke = async () => {

  try {
    btnUser.disabled = true;
    const usersList = await getUser();
    console.log(usersList);
    btnUser.disabled = false;
    addUserToDom(usersList);
  } catch (e) {

  }
};

const events = () => {
  containerUsersTable = document.querySelector('.container-user-list');
  btnUser = document.getElementById('btn-getUser');
  btnUser.addEventListener('click', handleClickJoke);
};

export const init = () => {
  createUserListDom();
  events();
};
