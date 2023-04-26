let matrix;
function makeMatrix() {
  let no_of_layouts = document.getElementById("no_of_layouts").value;

  matrix = new Array(no_of_layouts);
  for (let i = 1; i <= no_of_layouts; i++) {
    matrix[i - 1] = new Array(no_of_layouts);
  }

  let matrix_div = document.getElementById("matrix");
  matrix_div.innerHTML = "";

  let row_div = document.createElement("div");
  for (let i = 1; i <= no_of_layouts; i++) {
    row_div.className = "flex flex-row justify-center";
    label = document.createElement("label");
    label.innerHTML = i;
    label.className = "text-lg font-bold m-2 w-24";
    row_div.appendChild(label);
  }

  matrix_div.appendChild(row_div);

  for (let i = 1; i <= no_of_layouts; i++) {
    let row_div = document.createElement("div");
    row_div.className = "flex flex-row justify-center";
    for (let j = 0; j <= no_of_layouts; j++) {
      if (j == 0) {
        label = document.createElement("label");
        label.innerHTML = i;
        label.className = "text-lg font-bold m-2";
        row_div.appendChild(label);
        continue;
      }
      let input = document.createElement("input");
      input.type = "text";
      input.id = "matrix_" + i + "_" + j;
      input.value = 0;
      input.className = "border-2 border-black w-24 h-10 p-2 m-2";
      row_div.appendChild(input);
    }
    matrix_div.appendChild(row_div);
  }

  let button = document.createElement("button");
  button.innerHTML = `<button onclick="getSolution()" class="rounded-lg bg-blue-700 w-36 text-white h-10 mt-4">Solve</button>`;

  matrix_div.appendChild(button);
}

function addValues() {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      matrix[i][j] = document.getElementById(`matrix_${i + 1}_${j + 1}`).value;
    }
  }
}

function computeDistance(matrix) {
  let forward = 0;
  let backward = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (i == j) continue;
      else if (j > i) forward += (j - i) * parseInt(matrix[i][j]);
      else backward += (i - j) * parseInt(matrix[i][j]);
    }
  }

  let total = forward + 2 * backward;

  if (backward == 0) return { total: total, stop: true };

  return { total: total, stop: false };
}

function swapRows(matrix, i, j) {
  for (let k = 0; k < matrix.length; k++) {
    let temp = matrix[i][k];
    matrix[i][k] = matrix[j][k];
    matrix[j][k] = temp;
  }
}

function swapColumns(matrix, i, j) {
  for (let k = 0; k < matrix.length; k++) {
    let temp = matrix[k][i];
    matrix[k][i] = matrix[k][j];
    matrix[k][j] = temp;
  }
}

function recur(intial, matrix,optSeq) {
  let optimal = intial;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (i == j) continue;

      swapRows(matrix, i, j);
      swapColumns(matrix, i, j);

      
      let new_intial = computeDistance(matrix);
      console.log("new distance-->", new_intial);

      if (new_intial.stop) return new_intial.total;

      if (new_intial.total < optimal.total) {
        optSeq=[];

        for(let i=0;i<matrix.length;i++) optSeq.push(i+1);

        optSeq[i]=j+1;
        optSeq[j]=i+1;
        
      
        optimal.total = new_intial.total;
        optimal.optSeq=optSeq;
      }
      swapRows(matrix, i, j);
      swapColumns(matrix, i, j);
    }
  }

  return optimal;
}

function solve(matrix,optSeq) {
  let intial = computeDistance(matrix,optSeq);

  if (intial.stop) return { ans: intial.total, intial: intial.total,seq:optSeq };

  optimal = recur(intial, matrix,optSeq);
  return { ans: optimal.total, intial: intial.total,seq:optimal.optSeq };
}

function getSolution() {
  addValues();
  
  let optSeq=[];
  for(let i=0;i<matrix.length;i++) optSeq.push(i+1);
  
  let ans = solve(matrix,optSeq);
  alert("intial Answer is: " + ans["intial"]);
  alert("Optimal Asnwer is: " + ans["ans"]);
  alert("optimal Sequnce is: "+optSeq);
}
