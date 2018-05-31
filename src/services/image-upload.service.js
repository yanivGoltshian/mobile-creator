import axios from 'axios';

export function uploadImage() {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', '*');
        input.setAttribute('multiple', true);
        input.style.display = 'none';
        document.body.appendChild(input);
        input.addEventListener('change', (e) => resolve(e.target.files));
        input.click();
    });
}

export function uploadToCloudinary(file) {
    var formData = new FormData();
    formData.append('upload_preset', 'unsigned1');
    formData.append('tags', 'browser_upload');
    formData.append('file', file);

    return axios.post('https://api.cloudinary.com/v1_1/playbuzz-cld/upload', formData)
        .then(response => response.data.secure_url);
}