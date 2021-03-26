import {getJoke} from './http-provider';

let containerJokes, btnJoke;

const createJokeHtml = () => {

  const html = `  
                <h1>Jokes</h1>
                <ul class="container-joke-list">
                </ul>
              <button id="btn-getJoke">get joke</button>
  `;

  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.insertAdjacentElement('afterbegin', div);

};

const addJokeToDom = ({icon_url, value}) => {
  const joke = value.replace('Chuck Norris', '<strong>Chuck Norris</strong>');
  containerJokes.innerHTML += `<li> <img src="${icon_url}" alt="Chuck Norris"> ${joke}</li>`;
};

const handleClickJoke = async () => {

  try {
    btnJoke.disabled = true;
    const jokeToDom = await getJoke();
    btnJoke.disabled = false;
    addJokeToDom(jokeToDom);
  } catch (e) {

  }
};

const events = () => {
  containerJokes = document.querySelector('.container-joke-list');
  btnJoke = document.getElementById('btn-getJoke');
  btnJoke.addEventListener('click', handleClickJoke);
};

export const init = () => {
  createJokeHtml();
  events();
};
