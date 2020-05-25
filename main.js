let array = [
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0],
            ]
document.addEventListener('keydown', move);

function Random(array) {
  let arr = [];
  if(!endgame(array)){
      for(let i = 0; i < 4; i++){
          for(let j =0; j<4; j++){
              if(array[i][j] === 0){
                  arr.push([i,j]);
              }
          }
      }
      randomNumber(arr);
      randomNumber(arr);
  }
}
function randomNumber(arr) {
  if(arr.length > 0){
    console.log(arr.length);
    let index = Math.floor(Math.random() * Math.floor(arr.length));
    let [index_i, index_j] = arr[index];
    console.log(index);
    let a =  document.getElementById("a" +index_i +""+ index_j);
    let value = Math.random() > 0.5 ? 2 : 4;
    console.log(value);
    array[index_i][index_j] = value;
    a.innerText =  array[index_i][index_j];
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
          if(array[i][j] === 0){
            td.innerText = "";
          }else{
          td.innerText = array[i][j];
          }
          tr.appendChild(td);
        }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    div.appendChild(table);
    body.appendChild(div);
    Random(array);
}
// all number move right
function changeArrayR(array) {
    const bool = [];
    for (let i = 0; i < array.length; i++) {
        for(let j = 0; j<array[i].length; j++){
              array[i] = thesameR(array[i])
      }
    }
    draw(array);
    return array;
}
// all number move left
function changeArrayL(array) {
    for (let i = 0; i < array.length; i++) {
          for(let j = 0; j<array[i].length; j++){
            array[i] = thesameL(array[i])
        }
    }
    draw(array)
    return array;
}
// all number move up
function changeArrayU(array) {
    for(let i = 0; i<array.length; i++){
          for(let j = 0; j<array[i].length; j++){
            let arr = getcheil(array, i);
            arr = thesameL(arr)
            setcheil(array,i,arr);
      }
  }
  draw(array)
  return array;
}
// all nummber move down
function changeArrayD(array) {
  for (let i = 0; i < array.length; i++) {
      for(let j = 0; j<array[i].length; j++){
        let arr = getcheil(array, i);
        arr = thesameR(arr)
        setcheil(array,i,arr);
      }
  }
    draw(array)
    return array;
}
function thesameR(arr) {
  arr = sideR(arr);
  arr = sum(arr);
  arr = sideR(arr);
  return arr
}
function thesameL(arr) {
  arr = sideL(arr);
  arr = sumL(arr);
  arr = sideL(arr);
  return arr
}
// get columns
function getcheil(array,i) {
  let arr = []
      for(let j = 0; j<array.length; j++){
          arr.push(array[j][i]);
      }
  return arr;
}
// set columns;
function setcheil(array,i,arr) {
      for(let j = 0; j<array.length; j++){
        array[j][i] = arr[j];
      }
}
function sum(array) {
  for(let i = array.length-1; i >= 1; i--){
    if (array[i] === array[i-1]) {
        array[i] +=  array[i-1];
        array[i-1] = 0;
    }
  }
  return array;
}
function sumL(array) {
  for(let i = 0; i <array.length; i++){
    if (array[i] === array[i+1]) {
        array[i] +=  array[i+1];
        array[i+1] = 0;
    }
  }
  return array;
}
function check(arr,array) {
    for (var i = 0; i < array.length; i++) {
      if(array[i] !== arr[i]){
        return false;
      }
    }
    return true;
}
function sideR(array) {
  let result = array.filter(element => element);
  let mess =  4 - result.length;
  let zero = Array(mess).fill(0);
  result = zero.concat(result);
  return result;
}
function sideL(array) {
  let result = array.filter(element => element);
  let mess =  4 - result.length;
  let zero = Array(mess).fill(0);
  result = result.concat(zero);
  return result;
}
function draw(array) {
  for(let i =0; i<array.length; i++){
    for(let j = 0; j<array[i].length; j++){
        let a =  document.getElementById("a" +i +""+ j);
        if(array[i][j] === 0){
            a.innerText = "";
        }else{
        a.innerText = array[i][j];
        }
    }
  }
  count(array);
}
function move(e) {
   switch (e.code) {
     case "ArrowDown":
          const arrD = changeArrayD(array);
          endgame(arrD);
         break;
       case "ArrowUp":
        const arrU = changeArrayU(array);
         endgame(arrU)
         break;
       case "ArrowRight":
        const arrR = changeArrayR(array);
           endgame(arrR)
         break;
       case "ArrowLeft":
        const arrL = changeArrayL(array);
           endgame(arrL)
         break;
   }
     Random(array);
}

function count(array) {
  let a =  document.getElementById("points");
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    array[i].forEach((item, i) => {
      sum = sum + item;
    });
  }
  a.innerText = "count : " +sum;
}
function endgame(array) {
  let bool = true;
  let a =  document.getElementById("end");
  let a1 =  document.getElementById("gameover");
  for (var i = 0; i < array.length; i++) {
    if(array[i].includes(0)){
      bool = false;
        break;
    }else{
      bool = true;
    }
  }
  if(bool === true){
    a.setAttribute("id","lose");
    a1.innerText = "gameover";
  }
  return bool;
}
createTable(array);
