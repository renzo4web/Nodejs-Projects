import {getTableUsers, getUser} from './http-provider';
import {createBtns, createUserLisTable, domInputId} from './dom-components';

let containerUsersTable, btnUser, btnGetUser, btnForm, idInput;

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

  if (btnClicked.id === 'btn-getUser') {
    domInputId();

    btnForm = document.getElementById('get-user-form');
    idInput = document.getElementById('input-id');

    const inputFormHandler = async (e) => {

      e.preventDefault();
      try {
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
          createUserLisTable();
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
  btnUser.addEventListener('click', handler);
  btnGetUser.addEventListener('click', handler);
};

export const init = () => {
  createBtns();
  events();
};
