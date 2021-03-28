const div = document.createElement('div');

const addToContainerDom = (elem) => {

  div.classList.add('container');
  div.innerHTML += elem;
  document.body.appendChild(div);

};

// #
// email
// nombre
// avatar

const createUserLisTable = (row) => {

  const htmlTable = `  
<table>
    <thead>
    <tr>
        <th scope="col">${row[0]}</th>
        <th scope="col">${row[1]}</th>
        <th scope="col">${row[2]}</th>
        <th scope="col">${row[3]}</th>
    </tr>
    </thead>
    <tbody class="container-user-list">
    </tbody>

</table>

  `;

  addToContainerDom(htmlTable);
};

const domInputId = () => {

  const html =
      `
  <form id="get-user-form">
      <label for="input-id">Id</label>
      <input type="number" id="input-id">
      <button type="submit">get</button>
   </form>

      `;

  addToContainerDom(html);
};

const domPostUser = (updateUser) => {

  let idInput = '';

  if (updateUser) {
    idInput =
        `
      <label for="input-id">Id</label>
      <input type="number" id="input-id">
    `;
  }

  const html =
      `
  <form id="get-user-form">
        ${idInput}
      <label for="username">Name</label>
      <input type="text" id="username">
        <label for="job">Job</label>
      <input type="text" id="job">
      <button type="submit">get</button>
   </form>

      `;

  addToContainerDom(html);
};

const createBtns = () => {

  const html = `  
  <div class="btn-container">
  <button id="btn-getTableUsers">get table</button>
  <button id="btn-getUser">get singleUser</button>
  <button id="btn-postUser">post user</button>
  <button id="btn-updateUser">update user</button>
  <button id="btn-deleteUser">delete user</button>
  </div>
  `;

  addToContainerDom(html);

};

export {
  addToContainerDom,
  createUserLisTable,
  createBtns,
  domInputId,
  domPostUser,
};
