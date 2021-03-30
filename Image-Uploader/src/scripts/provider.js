const hostImg = 'https://api.cloudinary.com/v1_1/turbopila/upload';

const uploadImage = async (img) => {

  try {

    const formdata = new FormData();
    formdata.append('upload_preset', 'swtztc0y');
    formdata.append('file', img);

    const req = await fetch(hostImg, {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    });
    const {public_id, url} = await req.json();
    console.log();

    return (req.ok) ? {public_id, url} : '';

  } catch (e) {

    return 'File invalid';

  }

};

export {
  uploadImage,
};
