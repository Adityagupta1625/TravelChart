let matrix;
function makeMatrix(){
  let no_of_layouts=document.getElementById("no_of_layouts").value;

  matrix = new Array(no_of_layouts);
  for(let i=1;i<=no_of_layouts;i++){
    matrix[i-1] = new Array(no_of_layouts);
  }

  let matrix_div = document.getElementById("matrix");
  matrix_div.innerHTML = "";

  let row_div = document.createElement("div");
  for(let i=1;i<=no_of_layouts;i++){
    row_div.className = "flex flex-row justify-center";
    label = document.createElement("label");
    label.innerHTML = i;
    label.className = "text-lg font-bold m-2 w-24";
    row_div.appendChild(label);
  }

  matrix_div.appendChild(row_div);


  for(let i=1;i<=no_of_layouts;i++){
    let row_div = document.createElement("div");
    row_div.className = "flex flex-row justify-center";
    for(let j=0;j<=no_of_layouts;j++){
      if(j==0){
        label = document.createElement("label");
        label.innerHTML = i;
        label.className = "text-lg font-bold m-2";
        row_div.appendChild(label);
        continue;
      }
      let input = document.createElement("input");
      input.type = "text";
      input.id = "matrix_"+i+"_"+j;
      input.value = 0;
      input.className="border-2 border-black w-24 h-10 p-2 m-2"
      row_div.appendChild(input);
    }
    matrix_div.appendChild(row_div);
  }

  pairs = getPairs(no_of_layouts);

}



function computeDistance(){
    let forward=0;
    // upper diagonal sum exculding main diagonal
    let level=0;
    for(let i=0;i<matrix.length;i++){
      for(let j=i+1;j<matrix.length;j++){
        forward += level*parseInt(matrix[i][j]);
      }
      level++;
    }

    let backward=0;

    // lower diagonal sum excluding main diagonal

    level=0;

    for(let i=matrix.length-1;i>=0;i--){
      for(let j=i-1;j>=0;j--){
        backward += 2*level*parseInt(matrix[i][j]);
      }
      level++;
    }

    let total = forward + backward;

    if(backward==0) return {total:total,stop:true};

    return {total:total,stop:false};
}

function swapRows(matrix,i,j){
  for(let k=0;k<matrix.length;k++){
    let temp = matrix[i][k];
    matrix[i][k] = matrix[j][k];
    matrix[j][k] = temp;
  }
}

function swapColumns(matrix,i,j){
  for(let k=0;k<matrix.length;k++){
    let temp = matrix[k][i];
    matrix[k][i] = matrix[k][j];
    matrix[k][j] = temp;
  }
}

function recur(intial,matrix){
  let optimal=intial;
  for(let i=0;i<matrix.length;i++){
    for(let j=i+1;j<matrix.length;j++){
      swapRows(matrix,i,j);
      swapColumns(matrix,i,j);
      let new_intial = computeDistance();
      if(new_intial.stop) return new_intial.total;

      if(new_intial.total<optimal.total){
        optimal = recur(new_intial,matrix);
      }
      swapRows(matrix,i,j);
      swapColumns(matrix,i,j);
    }
  }

  return optimal;
}

function solve(){
  let intial=computeDistance();
  if(intial.stop) return intial.total;

  optimal=recur(intial,matrix);
  
}

function getSolution(){
  let ans=solve();

  alert("Optimal Asnwer is: "+ans);

}