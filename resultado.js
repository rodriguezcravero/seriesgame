const divResultados = document.querySelector(".resultados");
const tBody = document.querySelector("tbody");
const puntos = document.querySelector(".puntos");

let puntaje = 0;

let res = localStorage.getItem("resultados");

console.log(res);
console.log(typeof res);

res = JSON.parse(res);

console.log(res);
console.log(typeof res);

let str = "";
let num = 1;

res.forEach((item) => {
  let clase = item.adivinada == true ? "acierto" : "desacierto";
  if (item.adivinada == true) puntaje++;
  str += `
  <tr ">
  <th scope="row">${num++}</th>
  <td >${item.titulos[0].toUpperCase()}</td>
  <td class="${clase}">${
    item.adivinada == true
      ? "<i class='far fa-check-circle icono'></i>"
      : "<i class='far fa-times-circle icono'></i>"
  }</td>
  </tr>
  `;
});

puntos.innerHTML = puntaje;

console.log(str);

tBody.innerHTML = str;

{
  /* <tr class="table-success>
<th scope="row">2</th>
<td class="table-danger">Jacob</td>
<td>Thornton</td>
</tr>
<tr>
<th scope="row">3</th>
<td>Larry</td>
<td>the Bird</td>
</tr> */
}
