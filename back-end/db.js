const { v4: uuidv4 } = require("uuid");

module.exports = () => ({
  admin: [],
  products: [
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/vaso-stormtroopers.png",
      name: "vaso de stormtroopers",
      price: 60.0,
      categoryId: 0,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/camiseta-Atari.png",
      name: "Camiseta Atari",
      price: 70,
      categoryId: 1,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/game-boy.png",
      name: "Game Boy",
      price: 30,
      categoryId: 2,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/camiseta-snes.png",
      name: "Camiseta SNES",
      price: 28,
      categoryId: 2,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/darth-vader.png",
      name: "Muñecos Darth Vader",
      price: 10,
      categoryId: 0,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/disfraz-picachu.png",
      name: "Disfraz Picachu",
      price: 100,
      categoryId: 2,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/figura-sony.png",
      name: "Figura Sony",
      price: 12,
      categoryId: 2,
    },
    {
      id: uuidv4(),
      image:
        "http://localhost:3000/images/productos/gafas-realidad-virtual.png",
      name: "Gafas de Realida Virtual",
      price: 150,
      categoryId: 2,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/kylo-ren.png",
      name: "Kilo Ren",
      price: 10,
      categoryId: 0,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/mando-xbox.png",
      name: "Mando Xbox",
      price: 50,
      categoryId: 1,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/nintendo-switch.png",
      name: "Nintendo Switch",
      price: 200,
      categoryId: 1,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/nintendo.png",
      name: "Nintendo",
      price: 60,
      categoryId: 1,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/play-station-5.png",
      name: "Play Station 5",
      price: 210,
      categoryId: 1,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/relog-retro.png",
      name: "Reloj retro",
      price: 20,
      categoryId: 2,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/stormtroopers.png",
      name: "Figura Stormtroopers",
      price: 15,
      categoryId: 0,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/xbox-serie-x.png",
      name: "Xbox serie X",
      price: 220,
      categoryId: 1,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/yoda-bebe.png",
      name: "Bebé Yoda",
      price: 18,
      categoryId: 0,
    },
    {
      id: uuidv4(),
      image: "http://localhost:3000/images/productos/yoda.png",
      name: "Figura Yoda",
      price: 16,
      categoryId: 0,
    },
  ],
  categorys: [
    {
      id: 0,
      name: "Star Wars",
    },
    {
      id: 1,
      name: "Consolas",
    },
    {
      id: 2,
      name: "Diverso",
    },
  ],
});
