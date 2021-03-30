const divContainerInput = document.createElement('div');
const divContainerOutput = document.createElement('div');

const domUploader = () => {

  const html =
      `
        <h1>⬆Uploader⬆</h1>
        
<!--        <form class="box" method="post" action="" enctype="multipart/form-data">-->
        <form class="box" >
  <div class="box__input">
    <input class="box__file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />

    <label for="file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label>
    <button class="box__button" type="submit">Upload</button>
  </div>
  <div class="box__uploading"><span class="material-icons-outlined">
rotate_right
</span></div>
  <div class="box__success"><span class="material-icons-outlined">
check
</span></div>
  <div class="box__error"><span class="material-icons-outlined">
error
</span></div>
</form>

      `;

  divContainerInput.innerHTML = html;

};

const displayImgUploaded = (url) => {
  const divInner = document.createElement('div');
  divInner.classList.add('inner-output');
  const img = document.createElement('img');
  img.src = url;
  const linkImage = `<a target="_blank" href="${url}">full view</a>`;
  const clickToCopy = `<button id="copyBtn">copyToClipboard</button>`;

  divInner.appendChild(img);
  divInner.insertAdjacentHTML('beforeend', linkImage);
  divInner.insertAdjacentHTML('beforeend', clickToCopy);

  divContainerOutput.appendChild(divInner);

};

const domShowError = () => {
  divContainerOutput.innerHTML = '';
  divContainerOutput.innerHTML = `<h3 class="error">Invalid File</h3>`;
};

const addToBodyDom = (element) => {
  document.body.appendChild(element);

};

divContainerOutput.classList.add('output');
divContainerInput.classList.add('input-wrapper');
addToBodyDom(divContainerInput);
addToBodyDom(divContainerOutput);

const showFirstHiddenSec = (first, second) => {
  first.style.display = 'block';
  second.style.display = 'none';
};

export {
  domUploader,
  displayImgUploaded,
  domShowError,
  showFirstHiddenSec,
};
