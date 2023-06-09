const loader = {};

loader.showIn = (elemFather) => {
  const aux = document.createElement("div");
  aux.innerHTML = `
    <div class="loader">
    <div class="swivel"></div>
    </div>
    `;
  aux.children[0].classList.add("loader-visible");

  elemFather.style.position = "relative";
  elemFather.style.overflow = "visible";
  elemFather.style.margin = "1.5rem auto";
  elemFather.style.padding = "1.5rem";

  elemFather.appendChild(aux.children[0]);
};

loader.removeFrom = (elemFather) => {
  elemFather.querySelector(".loader").remove();
  elemFather.style.position = "";
  elemFather.style.overflow = "";
  elemFather.style.margin = "";
  elemFather.style.padding = "";
};

export default loader;
