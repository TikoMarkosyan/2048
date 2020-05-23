let array = [
              ["","","",""],
              ["","","",""],
              ["","","",""],
              ["","","",""],
            ]

document.addEventListener('keydown', move);

function Random(array) {
  let arr = [];
    for (let i = 0; i < 2; i++) {
        arr[i] = new Array(2);
        for (let j = 0; j < 1; j++) {
              let index_i = Math.floor(Math.random() * Math.floor(3));
              let index_j = Math.floor(Math.random() * Math.floor(3));
              let value = Math.random() > 0.5 ? 2 : 4;
              if(array[index_i][index_j] !== ""){
                  --j;
              }else{
                let a =  document.getElementById("a" +index_i +""+ index_j);
                array[index_i][index_j] = value;
                a.innerText = array[index_i][index_j];
              }
        }
    }
}
function createTable(array) {
    let body = document.getElementsByTagName('body')[0];
    let div = document.getElementsByTagName('div')[0];
    let table = document.createElement('table');
    table.setAttribute('border', '1');
    var tbody = document.createElement('tbody');
    for (let i = 0; i < array.length; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < array[i].length; j++) {
          var td = document.createElement('td');
          td.classList.add("forTd");
          td.setAttribute("id", "a" + i+""+j);
          td.innerText = array[i][j];
          tr.appendChild(td);
        }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    div.appendChild(table);
    body.appendChild(div);
    Random(array);
}
function changeArrayR(array) {
    for (let i = 0; i < array.length; i++) {
          for(let j = 0; j<array[i].length-1; j++){
            let newj = j+1;
            let a =  document.getElementById("a" +i +""+ j);
            let a1 =  document.getElementById("a" +i +""+ newj);
                if(array[i][j] === array[i][j+1]){
                  array[i][j+1] += array[i][j];
                  a1.innerText  = array[i][j+1];
                  array[i][j] = "";
                  a.innerText = array[i][j];
                }
                if(array[i][j+1] === ""){
                  array[i][j+1] = array[i][j];
                  a1.innerText  = array[i][j+1];
                  array[i][j] = "";
                  a.innerText = array[i][j];
                }
        }
    }
}

function changeArrayL(array) {
    for (let i = array.length-1; i >= 0; i--) {
          for(let j = array[i].length-1; j>=0; j--){
            let newj = j-1;
            let a =  document.getElementById("a" +i +""+ j);
            let a1 =  document.getElementById("a" +i +""+ newj);
                if(array[i][j] === array[i][j-1]){
                  array[i][j-1] += array[i][j];
                  a1.innerText  = array[i][j-1];
                  array[i][j] = "";
                  a.innerText = array[i][j];
                }
                if(array[i][j-1] === ""){
                  array[i][j-1] = array[i][j];
                  a1.innerText  = array[i][j-1];
                  array[i][j] = "";
                  a.innerText = array[i][j];
                }
        }
    }
}
function changeArrayU(array) {
  for (let i = array.length-1; i >= 0; i--) {
        for(let j = array[i].length-1; j>0; j--){
          let newj = j-1;
          let a =  document.getElementById("a" +j +""+ i);
          let a1 =  document.getElementById("a"+ newj +""+ i);
          console.log(j-1);
              if(array[j][i] === array[j-1][i]){
                array[j-1][i] += array[j][i];
                a1.innerText  = array[j-1][i];
                array[j][i] = "";
                a.innerText = array[j][i];
              }
              if(array[j-1][i] === ""){
                array[j-1][i] = array[j][i];
                a1.innerText  = array[j-1][i];
                array[j][i] = "";
                a.innerText = array[j][i];
              }
      }
  }
}
function changeArrayD(array) {
  for (let i = 0; i < array.length; i++) {
        for(let j = 0; j<array[i].length-1; j++){
          let newj = j+1;
          let a =  document.getElementById("a" +j +""+ i);
          let a1 =  document.getElementById("a"+ newj +""+ i);
              if(array[j][i] === array[j+1][i]){
                array[j+1][i] += array[j][i];
                a1.innerText  = array[j+1][i];
                array[j][i] = "";
                a.innerText = array[j][i];
              }
              if(array[j+1][i] === ""){
                array[j+1][i] = array[j][i];
                a1.innerText  = array[j+1][i];
                array[j][i] = "";
                a.innerText = array[j][i];
              }
      }
  }
}
function move(e) {
   console.log(e.code);
   switch (e.code) {
     case "ArrowDown":
        changeArrayD(array);
        Random(array)
       break;
       case "ArrowUp":
       changeArrayU(array);
       Random(array)
         break;
       case "ArrowRight":
              changeArrayR(array);
              Random(array);
         break;
       case "ArrowLeft":
              changeArrayL(array);
              Random(array);
         break;
     default:

   }
}
createTable(array);
