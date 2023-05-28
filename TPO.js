document.querySelectorAll('.img img').forEach(img =>{
    img.onclick = () => {
        document.querySelector('.popup-img').style.display = 'block';
        document.querySelector('.popup-img img').src = img.getAttribute('src');
    }
})

document.querySelector('.popup-img span').onclick = () => {
    document.querySelector('.popup-img').style.display = 'none';
}

window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 0);
  });
    
  const nav = document.querySelector("nav");
  document.querySelector(".menu").addEventListener("click", animateBars);
  
  var line1__bars = document.querySelector(".menuL1");
  var line2__bars = document.querySelector(".menuL2");
  var line3__bars = document.querySelector(".menuL3");
  
  function animateBars() {
    line1__bars.classList.toggle("menuActiveL1");
    line2__bars.classList.toggle("menuActiveL2");
    line3__bars.classList.toggle("menuActiveL3");
    nav.classList.toggle("active");
  }
  
  const menuLinks = document.querySelectorAll('.menuNavs a[href^="#"]');
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", function () {
      line1__bars.classList.remove("menuActiveL1");
    line2__bars.classList.remove("menuActiveL2");
    line3__bars.classList.remove("menuActiveL3")
      nav.classList.remove("active");
    });
    })
    
  let slider_index = 0;
  
  function show_slide(index) {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot-nav");
  
    if (index >= slides.length) slider_index = 0;
    if (index < 0) {
      slider_index = slides.length - 1;
    }
  
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].classList.remove("slide-active");
      dots[i].classList.remove("active-dot");
    }
  
    slides[slider_index].style.display = "block";
    slides[slider_index].classList.add("slide-active");
    dots[slider_index].classList.add("active-dot");
  }
  
  show_slide(slider_index);
  
  document.querySelector("#arrow-prev").addEventListener("click", () => {
    show_slide(--slider_index);
  });
  
  document.querySelector("#arrow-next").addEventListener("click", () => {
    show_slide(++slider_index);
  });
  
  let intervalo = setInterval(() => {
    show_slide(++slider_index);
  }, 6000);
  document.querySelector("#arrow-next").addEventListener("click", function () {
    clearInterval(intervalo);
    show_slide(slider_index);
    intervalo = setInterval(() => {
      show_slide(++slider_index);
    }, 6000);
  });
  document.querySelector("#arrow-prev").addEventListener("click", function () {
    clearInterval(intervalo);
    show_slide(slider_index);
    intervalo = setInterval(() => {
      show_slide(++slider_index);
    }, 6000);
  });
    
  window.addEventListener("load", () => {
    const form = document.querySelector("#formulario");
    const usuario = document.getElementById("usuario");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const evento = document.getElementById("evento");
    let cumpleU = false;
    let cumpleEm = false;
    let cumpleT = false;
    let cumpleE = false;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      validaCampos();
     setTimeout(()=> {
      if (cumpleU && cumpleEm && cumpleT && cumpleE) {
        document.getElementById("cumple").classList.add("cumpleOk");
        form.reset();
        setTimeout(() => {
          document.getElementById("cumple").classList.remove("cumpleOk");
          cumpleU = false;
          cumpleEm = false;
          cumpleT = false;
          cumpleE = false;
        }, 3000);
      }}, 800)
    });
  
    const validaCampos = () => {
      const usuarioValor = usuario.value.trim();
      const emailValor = email.value.trim();
      const telefonoValor = telefono.value.trim();
      const eventoValor = evento.value.trim();
  
      if (!usuarioValor) {
        validaFalla(usuario, "Este campo es obligatorio");
      } else if (!validaUsuario(usuarioValor)) {
        validaFalla(usuario, "El nombre no es valido");
      } else {
        validaOk(usuario);
        cumpleU = true;
      }
  
      if (!emailValor) {
        validaFalla(email, "Este campo es obligatorio");
      } else if (!validaEmail(emailValor)) {
        validaFalla(email, "El e-mail no es válido");
      } else {
        validaOk(email);
        cumpleEm = true;
      }
  
      if (!telefonoValor) {
        validaFalla(telefono, "Este campo es obligatorio");
      } else if (!validaTelefono(telefonoValor)) {
        validaFalla(telefono, "El telefono no es válido");
      } else {
        validaOk(telefono);
        cumpleT = true;
      }
  
      if (!eventoValor) {
        validaFalla(evento, "Este campo es obligatorio");
      } else if (!validaEvento(eventoValor)) {
        validaFalla(evento, "El nombre del evento no es válido");
      } else {
        validaOk(evento);
        cumpleE = true;
      }
  
    };
  
    const validaFalla = (input, msje) => {
      const formControl = input.parentElement;
      const aviso = formControl.querySelector("p");
      aviso.innerText = msje;
  
      formControl.className = "formControl falla";
    };
    const validaOk = (input) => {
      const formControl = input.parentElement;
      formControl.className = "formControl ok";
    };
  
    const validaUsuario = (usuario) => {
      return /^[a-zA-Z ]{3,50}$/.test(usuario);
    };
  
    const validaEmail = (email) => {
      return /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(email);
    };
  
    const validaTelefono = (telefono) => {
      return /^\+?\d{7,15}$/.test(telefono);
    };
  
    const validaEvento = (evento) => {
      return /^[a-zA-Z][a-zA-Z0-9\s]*$/.test(evento);
    };
  });