export function validarEmail(email) {
  const regexp =
    /^[\w\-]+(\.[\w\-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/;

  return regexp.test(email);
}

export function validarImagen(nombreArchivo) {
  // Expresión regular para verificar la extensión del archivo
  var extensionesImagen = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i;

  return extensionesImagen.test(nombreArchivo);
}

export function validarImgUrl(url) {
  // Expresión regular para verificar el formato de la URL
  const expresion =
    /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif|webp|bmp|svg|ico)/;

  // Verificar si la URL coincide con la expresión regular
  return expresion.test(url);
}
