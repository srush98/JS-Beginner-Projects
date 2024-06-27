let uploadedImage;

document.getElementById('image-input').addEventListener('change', function () {
    const imageContainer = document.getElementById('image-container');
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImage = document.getElementById('uploaded-image');
            uploadedImage.src = e.target.result;
            imageContainer.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
    else {
        imageContainer.style.display = 'none';
    }
});

// function to resize the image
function resizeImage(width, height, uploadedImage) {
    uploadedImage.width = width;
    uploadedImage.height = height;
}

// event listeners 
document.getElementById('instagram-resizer').addEventListener('click', function () {
    resizeImage(1080, 1080, document.getElementById('uploaded-image'))
});

document.getElementById('facebook-resizer').addEventListener('click', function () {
    resizeImage(600, 600, document.getElementById('uploaded-image'))
});

document.getElementById('twitter-resizer').addEventListener('click', function () {
    resizeImage(900, 900, document.getElementById('uploaded-image'))
});

document.getElementById('website-resizer').addEventListener('click', function () {
    resizeImage(600, 300, document.getElementById('uploaded-image'))
});

document.getElementById('download-btn').addEventListener('click', function () {
    const link = document.createElement('a');
    link.download = `${uploadedImage.width}x${uploadedImage.height}.png`;
    link.href = uploadedImage.src;
    link.click();
});