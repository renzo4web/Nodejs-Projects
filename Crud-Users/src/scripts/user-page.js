import {
  deleteUser,
  getTableUsers,
  getUser,
  postUser,
  updateUser,
} from './http-provider';
import {
  addToContainerDom,
  createBtns,
  createUserLisTable,
  domInputId,
  domPostUser,
} from './dom-components';

let containerUsersTable, btnUser, btnGetUser, btnForm, idInput, btnPostUser,
    btnUpdateUser, btnDeleteUser;

const addUserToDom = (users) => {

  if (!containerUsersTable) {
    createUserLisTable();
    containerUsersTable = document.querySelector('.container-user-list');
  }

  containerUsersTable.innerHTML += Array.from(users).map(
      ({id, email, first_name, avatar}, i) => {
        return `
          <tr>
            <td>${i}</td>
            <td>${email}</td>
            <td>${first_name}</td>
            <td> <img src="${avatar}" alt="user avatar"></td>
          </tr>
        `;
      }).join('');
};

const handler = async (event) => {
  const btnClicked = event.target;

  if (btnClicked.id === 'btn-getTableUsers') {

    try {
      btnUser.disabled = true;
      const usersList = await getTableUsers();
      console.log(usersList);
      btnUser.disabled = false;
      addUserToDom(usersList);
    } catch (e) {
      console.warn(e);
    }
  }

  if (btnClicked.id === 'btn-getUser' || btnClicked.id === 'btn-deleteUser') {
    console.log(btnClicked.id);
    domInputId();

    btnForm = document.getElementById('get-user-form');
    idInput = document.getElementById('input-id');

    const inputFormHandler = async (e) => {

      e.preventDefault();
      try {

        if (btnClicked.id === 'btn-getUser') {

          const {id, email, first_name, avatar} = await getUser(idInput.value);

          const html = `
          <tr>
            <td>${id}</td>
            <td>${email}</td>
            <td>${first_name}</td>
            <td> <img src="${avatar}" alt="user avatar"></td>
          </tr>
        `;
          if (!containerUsersTable) {
            createUserLisTable(['id', ' email', ' name', ' avatar']);
            containerUsersTable = document.querySelector(
                '.container-user-list');
          }
          containerUsersTable.innerHTML += html;
        } else {
          const res = await deleteUser(idInput.value);
          console.log(res);
          const html = (res)
              ? `<h3>User id:${idInput.value} deleted</h3>`
              : `<h3>User id:${idInput.value} not found</h3>`;

          addToContainerDom(html);
        }

      } catch (e) {
        console.warn(e);
      }
    };

    btnForm.addEventListener('submit', inputFormHandler);

  }

  if (btnClicked.id === 'btn-postUser') {

    domPostUser();
    btnForm = document.getElementById('get-user-form');

    const inputFormHandler = async (e) => {
      e.preventDefault();

      const username = document.getElementById('username');
      const jobInput = document.getElementById('job');

      try {

        const {name, job, id, createdAt} = await postUser(username.value,
            jobInput.value);
        const html = `
          <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${job}</td>
            <td>${createdAt}</td>
          </tr>
        `;

        if (!containerUsersTable) {
          createUserLisTable(['id', 'name', 'job', 'createdAt']);
          containerUsersTable = document.querySelector('.container-user-list');
        }
        containerUsersTable.innerHTML += html;

      } catch (e) {
        console.warn(e);
      }
    };

    btnForm.addEventListener('submit', inputFormHandler);

  }

  if (btnClicked.id === 'btn-updateUser') {

    domPostUser('withId');
    btnForm = document.getElementById('get-user-form');

    const inputFormHandler = async (e) => {
      e.preventDefault();

      const username = document.getElementById('username');
      const jobInput = document.getElementById('job');
      const idInput = document.getElementById('input-id');

      try {

        const {name, job, updatedAt} = await updateUser(idInput.value,
            username.value,
            jobInput.value);
        const html = `
          <tr>
            <td>${idInput.value}</td>
            <td>${name}</td>
            <td>${job}</td>
            <td>${updatedAt}</td>
          </tr>
        `;

        if (!containerUsersTable) {
          createUserLisTable(['id', 'name', 'job', 'update at']);
          containerUsersTable = document.querySelector('.container-user-list');
        }
        containerUsersTable.innerHTML += html;

      } catch (e) {
        console.warn(e);
      }
    };

    btnForm.addEventListener('submit', inputFormHandler);

  }

};

const events = () => {
  btnUser = document.getElementById('btn-getTableUsers');
  btnGetUser = document.getElementById('btn-getUser');
  btnPostUser = document.getElementById('btn-postUser');
  btnUpdateUser = document.getElementById('btn-updateUser');
  btnDeleteUser = document.getElementById('btn-deleteUser');
  [
    btnUser,
    btnGetUser,
    btnPostUser
    , btnUpdateUser
    , btnDeleteUser,
  ].forEach(btn => btn.addEventListener('click', handler));

};

export const init = () => {
  createBtns();
  events();
};
