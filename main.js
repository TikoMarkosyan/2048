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
      for (let i = 0; i < 2; i++) {
          arr[i] = new Array(2);
          for (let j = 0; j < 1; j++) {
                let index_i = Math.floor(Math.random() * Math.floor(3));
                let index_j = Math.floor(Math.random() * Math.floor(3));
                let value = Math.random() > 0.5 ? 2 : 4;
                if(array[index_i][index_j] !== 0){
                    j = 0;
                    continue;
                }else{
                  let a =  document.getElementById("a" +index_i +""+ index_j);
                  array[index_i][index_j] = value;
                  a.innerText = array[index_i][index_j];
                }
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
function changeArrayR(array) {
    const bool = [];
    for (let i = 0; i < array.length; i++) {
        for(let j = 0; j<array[i].length; j++){
              array[i] = sideR(array[i]);
              array[i] = sum(array[i]);
              array[i] = sideR(array[i]);
      }
    }
    draw(array);
    return array;
}
function changeArrayL(array) {
    for (let i = 0; i < array.length; i++) {
          for(let j = 0; j<array[i].length; j++){
            array[i] = sideL(array[i]);
            array[i] = sumL(array[i]);
            array[i] = sideL(array[i]);
        }
    }
    draw(array)
    return array;
}
function changeArrayU(array) {
    for(let i = 0; i<array.length; i++){
          for(let j = 0; j<array[i].length; j++){
            let arr = getcheil(array, i);
            arr = sideL(arr);
            arr = sumL(arr);
            arr = sideL(arr);
            setcheil(array,i,arr);
      }
  }
  draw(array)
  return array;
}
function changeArrayD(array) {
  for (let i = 0; i < array.length; i++) {
      for(let j = 0; j<array[i].length; j++){
        let arr = getcheil(array, i);
        arr = sideR(arr);
        arr = sum(arr);
        arr = sideR(arr);
        setcheil(array,i,arr);
      }
  }
    draw(array)
    return array;
}
function getcheil(array,i) {
  let arr = []
      for(let j = 0; j<array.length; j++){
          arr.push(array[j][i]);
      }
  return arr;
}
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
