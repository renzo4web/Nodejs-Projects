const divContainerInput = document.createElement('div');
const divContainerOutput = document.createElement('div');

const domUploader = () => {

  const html =
      `
        <h1> ⬆Uploader⬆</h1>
        
<!--        <form class="box" method="post" action="" enctype="multipart/form-data">-->
        <form class="box" >
  <div class="box__input">
    <input class="box__file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />
    <label for="file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label>
    <button class="box__button" type="submit">Upload</button>
  </div>
  <div class="box__uploading">Uploading…</div>
  <div class="box__success">Done!</div>
  <div class="box__error">Error! <span></span>.</div>
</form>

      `;

  divContainerInput.classList.add('input-wrapper');
  divContainerInput.innerHTML = html;

};

const displayImgUploaded = (url) => {

  const img = document.createElement('img');
  img.src = url;
  divContainerOutput.appendChild(img);

};

const addToBodyDom = (element) => {
  document.body.appendChild(element);

};

addToBodyDom(divContainerInput);
addToBodyDom(divContainerOutput);

export {
  domUploader,
  displayImgUploaded
};
