const aMicrophone = document.getElementById('microphone');
const aCamera = document.getElementById('camera');
const aExit = document.getElementById('exit-door');
const aShare = document.getElementById('share-option');
const closeWindow = document.getElementById('close-window');

const lightboxDownloads = document.getElementById('container-resources');
const lightbox = document.getElementById('lightbox');
const exitVideo = document.getElementById('exit');

aMicrophone.addEventListener("click",function(event){
    var micro = document.getElementById('icon-microphone');
    if(micro.style.color === 'rgb(0, 255, 0)')micro.style.color = 'rgb(0, 0, 0)';
    else micro.style.color = 'rgb(0, 255, 0)';
})

aCamera.addEventListener("click", function(event){
    var cam = document.getElementById('icon-camera');
    if(cam.style.color === 'rgb(0, 255, 0)')cam.style.color = 'rgb(0, 0, 0)';
    else cam.style.color = 'rgb(0, 255, 0)';
})

aExit.addEventListener("click", function(event){
    if(lightbox.style.display === 'none')lightbox.style.display = 'block';
    else lightbox.style.display = 'none';
})

exitVideo.addEventListener("click",function(event){
    window.location.href = "commit.html" + "?user=" + encodeURIComponent(user) +
    "&rol=" + encodeURIComponent(type);
})

aShare.addEventListener("click", function(event){
    if(lightboxDownloads.style.display==='none')lightboxDownloads.style.display='block';
    else lightboxDownloads.style.display = 'none';
})

closeWindow.addEventListener("click",function(event){
    if(lightboxDownloads.style.display==='block')lightboxDownloads.style.display='none';
})