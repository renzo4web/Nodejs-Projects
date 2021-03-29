import {displayImgUploaded, domUploader} from './domPageElems';
import {uploadImage} from './provider';

let btnSubmit;

const createInputFile = () => {
  domUploader();
};

const handlerForm = async (e) => {

  e.preventDefault();
  const file = document.getElementById('file');
  const img = await uploadImage(file);
  console.dir(img);

  displayImgUploaded(img.url);

};

const events = () => {
  btnSubmit = document.querySelector('.box');
  btnSubmit.addEventListener('submit', handlerForm);
};

export const init = () => {
  createInputFile();
  events();
};




