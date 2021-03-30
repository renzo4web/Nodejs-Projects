import {displayImgUploaded, domUploader} from './domPageElems';
import {uploadImage} from './provider';

let btnSubmit, btnCopy;

const createInputFile = () => {
  domUploader();
};

const copyToClipboard = (text) => {
  btnCopy = document.getElementById('copyBtn');
  btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(`${text}`).then(() => {
      btnCopy.classList.add('success');
      btnCopy.textContent = 'Copied';
    }, () => btnCopy.classList.add('copy-error'));
  });
};

const handlerForm = async (e) => {
  e.preventDefault();
  const file = document.getElementById('file');

  const multipleImages = async () => {
    let imgs = [];

    for (const img of file.files) {
      await imgs.push(uploadImage(img));
    }

    return imgs;
  };

  const img = (file.files.length < 1)
      ? await uploadImage(file.files[0])
      : await multipleImages();

  console.log(img);

  for (const imgElement of img) {
    imgElement.then(({public_id, url}) => {
      console.log(url);
      displayImgUploaded(url);
      copyToClipboard(url);
    });
  }

  // domShowError();

  console.log(img);
};

const events = () => {
  btnSubmit = document.querySelector('.box');
  btnSubmit.addEventListener('submit', handlerForm);
};

export const init = () => {
  createInputFile();
  events();
};




