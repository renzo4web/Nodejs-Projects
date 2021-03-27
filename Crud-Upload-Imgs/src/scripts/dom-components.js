const div = document.createElement('div');

const addToContainerDom = (elem) => {

  div.classList.add('container');
  div.innerHTML += elem;
  document.body.appendChild(div);

};

const createUserLisTable = () => {

  const htmlTable = `  
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

const createBtns = () => {

  const html = `  
  <button id="btn-getTableUsers">get table</button>
  <button id="btn-getUser">get singleUser</button>
  `;

  addToContainerDom(html);

};



export {
  addToContainerDom,
  createUserLisTable,
  createBtns,
  domInputId,
};
