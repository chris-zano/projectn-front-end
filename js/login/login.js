document.getElementById("get-started").addEventListener("click", function () {
    const authScreen = document.getElementById("auth-screen");
    authScreen.style.display = "flex";
    
    window.scroll({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
  
  function previewImage(event) {
    const image = document.getElementById("image-preview");
    const file = event.target.files[0];
    
    if (file) {
      image.src = URL.createObjectURL(file);
      image.style.display = "block";
    } else {
      image.src = "";
      image.style.display = "none";
    }
  }
  