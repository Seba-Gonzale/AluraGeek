export function validarImgUrl(url) {
  // Expresión regular para verificar el formato de la URL
  const expresion =
    /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif|webp|bmp|svg|ico)/;

  // Verificar si la URL coincide con la expresión regular
  console.log(url);
  return expresion.test(url);
}
