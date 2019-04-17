let game = {
  draw: function(){
    canvas = document.getElementById('battlefield').getContext('2d');
    let isCross = true; // proveryat ochered' hoda
    let fin = false; // proveryaet ne zakonchilas li igra
    const size = 19; // razmer polya
    let mas = new Array(size); // massive kletok
    let x = 0; //x coordinate
    let y = 0; //y coordinate
    let moves = 0; // schetchik kolichetsva hodod
    let potential = new Array(size); // massiv potencial'nih hodov

    vesa = [ // Шаблоны весов
      {w: 10000, p: ['xxxxx']},
      {w: 1000, p: ['0xxxx0']},
      {w: 750, p: ['xxxx0', '0xxxx']},
      {w: 400, p: ['xx0xx', 'xxx0x', 'x0xxx']},
      {w: 100, p: ['00xxx000', '000xxx00']},
      {w: 80, p: ['00xxx00']},
      {w: 75, p: ['0xxx00', '00xxx0']},
      {w: 50, p: ['0xxx0', 'xxx00', '00xxx']},
      {w: 25, p: ['0x0xx', 'xx0x0', 'x0xx0', '0xx0x', 'x00xx', 'xx00x']},
      {w: 10, p: ['000xx000']},
      {w: 7, p: ['00xx00']},
      {w: 5, p: ['xx000', '000xx', '0xx00', '00xx0']},
      {w: 3, p: ['0xx0']}
    ];
    //sozdaem massiv v massive
    for (let i = 0; i < mas.length; i++){
      mas[i] = new Array();
      potential[i] = new Array();
    };
    // risuem setku. Vse kletki ravni 0.
    // Vse kletki s "X" budut = 1;
    // Vse kletki s "O" budut = 2;
    for (let i = 0; i < size; i++){
        for (let j = 0; j < size; j++){
            canvas.fillStyle = 'rgb(189,229,231)';
            canvas.strokeStyle = 'rgb(254,250,203)';
            canvas.fillRect(j*30, i*30, 30, 30);
            canvas.strokeRect(j*30, i*30, 30, 30);
            mas[i][j] = 0;
        }
    };
    // massive mas sozdan

    //opredelyaem paru gloal'nih elementov
    let element = document.getElementById('battlefield');
    let box = element.getBoundingClientRect();
    //first automove for X
    mas[9][9] = 1;
    potential[9][9] = 0;
    for (let k = 0; k < 5 ; k++) {
      for (let m = 0; m < 5; m++) {
        if (9-2+k >= 0 && 9-2+k < 19 && 9-2+m >= 0 && 9-2+m < 19){
          if (potential[9-2+k][9-2+m] != 0 && potential[9-2+k][9-2+m] != 1) {
            potential[9-2+k][9-2+m] = 1;
          }
        }
      }
    }
    firstmove = element.getContext('2d');
    firstmove.beginPath();
    firstmove.moveTo(9 * 30 + 5, 9 * 30 + 5);
    firstmove.lineTo(9 * 30 + 25, 9 * 30 + 25);
    firstmove.moveTo(9 * 30 + 25, 9 * 30 + 5);
    firstmove.lineTo(9 * 30 + 5, 9 * 30 + 25);
    firstmove.strokeStyle = 'rgb(130,109,178)';
    firstmove.stroke();
    moves = moves + 1;
    firstmove.fillStyle = '#777';
    firstmove.fillText(moves, 9 * 30, 9 * 30 + 8);
    isCross = false;
    //vse chto proishodit posle clicka pol'zovatelya.
    // Zapolnyaem massiv potencial'nih hodov.
    // 1 = kletka s potencial'nim hodom. radius 2 kletki.
    // 0 = kletka v kotoruu uje hodili
    // vse ostal'nie kletki = undefined.

    element.addEventListener("click", function(e){
      //proverka na konec igri.
      if (fin == true){
        return 0;
      }
      //opredelyaem mesto clicka.
      y = e.clientY;
      x = e.clientX - box.left;
      let i = Math.floor(y/30);
      let j = Math.floor(x/30);

      if (mas[i][j]==0 && isCross==false){
        mas[i][j] = 2;
        isCross = true;
        let ctx = element.getContext('2d');
        ctx.beginPath();
        ctx.arc(j * 30 + 15, i * 30 + 15, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgb(239,144,121)';
        ctx.stroke();
        moves = moves + 1;
        ctx.fillStyle = '#777';
        ctx.fillText(moves, j * 30, i * 30 + 8);
        potent(i, j);
      }
      //proverka na hod v tu kletku v kotoruu uje hodili.
      else {
        console.log('uje hodili suda');
        return 0;
      }

      function potent(w,z){
        potential[w][z] = 0;
        for (let k = 0; k < 5 ; k++) {
          for (let m = 0; m < 5; m++) {
            if (w-2+k >= 0 && w-2+k < 19 && z-2+m >= 0 && z-2+m < 19){
              if (potential[w-2+k][z-2+m] != 0 && potential[w-2+k][z-2+m] != 1) {
                potential[w-2+k][z-2+m] = 1;
              }
            }
          }
        }
      };
      //function proverki viigrisha
      function Win(coordI,coordJ){
        if (moves >= 9){
          // v stroku
          for (let k = 0; k < 5; k++){
            if (
              mas[coordI][coordJ-4+k] == mas[coordI][coordJ-3+k] &&
              mas[coordI][coordJ-3+k] == mas[coordI][coordJ-2+k] &&
              mas[coordI][coordJ-2+k] == mas[coordI][coordJ-1+k] &&
              mas[coordI][coordJ-1+k] == mas[coordI][coordJ+k]){
                let ctx = element.getContext('2d');
                ctx.beginPath();
                ctx.moveTo((coordJ-4+k)*30, coordI*30+15);
                ctx.lineTo((coordJ+k)*30+30, coordI*30+15);
                ctx.strokeStyle = 'rgb(140, 89, 197)';
                ctx.lineWidth = 2;
                ctx.stroke();
                fin = true;
            }
            // v stolbec
            else if(coordI-4+k >= 0 && coordI+k < size &&
              mas[coordI-4+k][coordJ] == mas[coordI-3+k][coordJ] &&
              mas[coordI-3+k][coordJ] == mas[coordI-2+k][coordJ] &&
              mas[coordI-2+k][coordJ] == mas[coordI-1+k][coordJ] &&
              mas[coordI-1+k][coordJ] == mas[coordI+k][coordJ]){
                let ctx = element.getContext('2d');
                ctx.beginPath();
                ctx.moveTo(coordJ*30+15, (coordI-4+k)*30);
                ctx.lineTo(coordJ*30+15, (coordI+k)*30 + 30);
                ctx.strokeStyle = 'rgb(140, 89, 197)';
                ctx.lineWidth = 2;
                ctx.stroke();
                fin = true;
            }
            // po diagonali vverh levo - vniz vrpavo
            else if (coordI-4+k >= 0 && coordJ+k < size && coordI+k < size &&
              mas[coordI-4+k][coordJ-4+k] == mas[coordI-3+k][coordJ-3+k] &&
              mas[coordI-3+k][coordJ-3+k] == mas[coordI-2+k][coordJ-2+k] &&
              mas[coordI-2+k][coordJ-2+k] == mas[coordI-1+k][coordJ-1+k] &&
              mas[coordI-1+k][coordJ-1+k] == mas[coordI+k][coordJ+k]){
                let ctx = element.getContext('2d');
                ctx.beginPath();
                ctx.moveTo((coordJ-4+k)*30, (coordI-4+k)*30);
                ctx.lineTo((coordJ+k)*30 + 30, (coordI+k)*30 + 30);
                ctx.strokeStyle = 'rgb(140, 89, 197)';
                ctx.lineWidth = 2;
                ctx.stroke();
                fin = true;
              }
              // po diagonali vverh pravo - vniz vlevo
              else if (coordI-4+k >= 0 && coordI+k < size &&
                mas[coordI-4+k][coordJ+4-k] == mas[coordI-3+k][coordJ+3-k] &&
                mas[coordI-3+k][coordJ+3-k] == mas[coordI-2+k][coordJ+2-k] &&
                mas[coordI-2+k][coordJ+2-k] == mas[coordI-1+k][coordJ+1-k] &&
                mas[coordI-1+k][coordJ+1-k] == mas[coordI+k][coordJ-k]){
                  let ctx = element.getContext('2d');
                  ctx.beginPath();
                  ctx.moveTo((coordJ+4-k)*30 + 30, (coordI-4+k)*30);
                  ctx.lineTo((coordJ-k)*30, (coordI+k)*30 + 30);
                  ctx.strokeStyle = 'rgb(140, 89, 197)';
                  ctx.lineWidth = 2;
                  ctx.stroke();
                  fin = true;
                }
          }
        }// konec proverki viigrisha
      };
      // zapusk proverki viigrisha
      Win(i, j);
      console.log(moves,i,j);

      // AI turn to make his move

      //sozdaem massiv vesov attacki i zaschiti.
      let attack = new Array(size);
      let defense = new Array(size);
      for (let r = 0; r < attack.length; r++){
        attack[r] = new Array();
        defense[r] = new Array();
      };

      //Sravnivaem linii veson s liniyami potencial'nih hodov.
      for (let o = 0; o < 19; o++){
        for (let p = 0; p < 19; p++) {
          if (potential[o][p] == 1){
            //Chitaem vesa dlya atacki
            let dumbVstroku = new Array(8);
            let dumbVstolbec = new Array(8);
            let dumbDiagonalOne = new Array(8);
            let dumbDiagonalTwo = new Array(8);
            for (let k = 0; k < 9; k++) {
              if (o-4+k >= 0 && o-4+k < 19 && p-4+k >= 0 && p-4+k < 19){
                dumbVstroku[k] = mas[o][p-4+k];
                dumbVstolbec[k] = mas[o-4+k][p];
                dumbDiagonalOne[k] = mas[o-4+k][p-4+k];
              }
              else {
                dumbVstroku[k] = 3;
                dumbVstolbec[k] = 3;
                dumbDiagonalOne[k] = 3;
              }
              if (p-4+k >= 0 && p-4+k < 19 && o+4-k >= 0 && o+4-k < 19) {
                dumbDiagonalTwo[k] = mas[o+4-k][p-4+k];
              }
              else {
                dumbDiagonalTwo[k] = 3;
              }
            };

              dumbVstroku[4] = 1;
              dumbVstolbec[4] = 1;
              dumbDiagonalOne[4] = 1;
              dumbDiagonalTwo[4] = 1;
            // }
            // Perevodim massiv v stroku.
            let vstroku = dumbVstroku.join('');
            let vstolbec = dumbVstolbec.join('');
            let diagonalOne = dumbDiagonalOne.join('');
            let diagonalTwo = dumbDiagonalTwo.join('');
            // Sravnivaen vesa shablonov s liniyami.

            let maxAttack = 0; // maximal'niy ves dlya atacki.
            let line = '';

            //Sravnivaem vesa shablonov liniy dlya atacki cherez function Sravnenie()
            function SravnenieAttack(naprav, ves, b){
              for (let z of vesa){
                for (let c of z.p){
                  line = new RegExp(c.replace(/x/g, b));
                  if (naprav.search(line) != -1){
                    if (ves > 1){
                     return maxAttack = maxAttack + z.w;
                    }
                    else{
                      return maxAttack = z.w;
                    }
                  }
                }
              }
            };
            SravnenieAttack(vstroku, maxAttack, 1);
            SravnenieAttack(vstolbec, maxAttack, 1);
            SravnenieAttack(diagonalOne, maxAttack, 1);
            SravnenieAttack(diagonalTwo, maxAttack, 1);

            //Prisvaivaem massivu atacki maximal'noe znachenie
            if (maxAttack > 1) {
              attack[o][p] = maxAttack;
            }

            //
            //Chitaem vesa dlya zashiti
            for (let k = 0; k < 9; k++) {
              if (o-4+k >= 0 && o-4+k < 19 && p-4+k >= 0 && p-4+k < 19){
                dumbVstroku[k] = mas[o][p-4+k];
                dumbVstolbec[k] = mas[o-4+k][p];
                dumbDiagonalOne[k] = mas[o-4+k][p-4+k];
              }
              else {
                dumbVstroku[k] = 3;
                dumbVstolbec[k] = 3;
                dumbDiagonalOne[k] = 3;
              }
              if (p-4+k >= 0 && p-4+k < 19 && o+4-k >= 0 && o+4-k < 19) {
                dumbDiagonalTwo[k] = mas[o+4-k][p-4+k];
              }
              else {
                dumbDiagonalTwo[k] = 3;
              }
            };
            //hodim v potencial'nuu kletku nolikom

            dumbVstroku[4] = 2;
            dumbVstolbec[4] = 2;
            dumbDiagonalOne[4] = 2;
            dumbDiagonalTwo[4] = 2;

            // Perevodim massiv v stroku.
            vstroku = dumbVstroku.join('');
            vstolbec = dumbVstolbec.join('');
            diagonalOne = dumbDiagonalOne.join('');
            diagonalTwo = dumbDiagonalTwo.join('');

            let maxDefense = 0; // maximal'niy ves dlya zaschiti.
            line = '';
            //Function Defense
            function SravnenieDefense(naprav, ves, b){
              for (let z of vesa){
                for (let c of z.p){
                  line = new RegExp(c.replace(/x/g, b));
                  if (naprav.search(line) != -1){
                    if (ves > 1){
                     return maxDefense = maxDefense + z.w;
                    }
                    else{
                      return maxDefense = z.w;
                    }
                  }
                }
              }
            };
            //zapuskaem function SravnenieDefense()
            SravnenieDefense(vstroku, maxDefense, 2);
            SravnenieDefense(vstolbec, maxDefense, 2);
            SravnenieDefense(diagonalOne, maxDefense, 2);
            SravnenieDefense(diagonalTwo, maxDefense, 2);

              //Prisvaivaem massivu zaschiti maximal'noe znachenie
            if (maxDefense > 1) {
              defense[o][p] = maxDefense;
            }

          }
        }
      };

      //Uznaem maximal'noe znachenie dlya atacki
      let attackW = 0, attackX = 0, attackY = 0;
      for (let k = 0; k < 19; k++){
        for (let m = 0; m < 19; m++){
          if (attack[k][m] > attackW){
            attackW = attack[k][m];
            attackX = m;
            attackY = k;
          }
        }
      };

      //Uznaem maximal'noe znachenie dlya zaschiti
      let defenseW = 0, defenseX = 0, defenseY = 0;
      for (let k = 0; k < 19; k++){
        for (let m = 0; m < 19; m++){
          if (defense[k][m] > defenseW){
            defenseW = defense[k][m];
            defenseX = m;
            defenseY = k;
          }
        }
      };
      console.log('Attack', attackW, attackY, attackX);
      console.log('Defense', defenseW, defenseY, defenseX);
      //Sravnivaem vesa shablonov liniy dlya zachiti

      //sravnivaem atacku i zashitu, provodim hod AI.
      if (attackW * 1.1 >= defenseW && fin == false){
        mas[attackY][attackX] = 1;
        isCross = false;
        let ctx = element.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(attackX * 30 + 5, attackY * 30 + 5);
        ctx.lineTo(attackX * 30 + 25, attackY * 30 + 25);
        ctx.moveTo(attackX * 30 + 25, attackY * 30 + 5);
        ctx.lineTo(attackX * 30 + 5, attackY * 30 + 25);
        ctx.strokeStyle = 'rgb(130,109,178)';
        ctx.stroke();
        moves = moves + 1;
        ctx.fillStyle = '#777';
        ctx.fillText(moves, attackX * 30, attackY * 30 + 8);
        Win(attackY, attackX);
        potent(attackY, attackX);
        console.log(moves, attackY, attackX);
      }
      else if(fin == false){
        mas[defenseY][defenseX] = 1;
        isCross = false;
        let ctx = element.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(defenseX * 30 + 5, defenseY * 30 + 5);
        ctx.lineTo(defenseX * 30 + 25, defenseY * 30 + 25);
        ctx.moveTo(defenseX * 30 + 25, defenseY * 30 + 5);
        ctx.lineTo(defenseX * 30 + 5, defenseY * 30 + 25);
        ctx.strokeStyle = 'rgb(130,109,178)';
        ctx.stroke();
        moves = moves + 1;
        ctx.fillStyle = '#777';
        ctx.fillText(moves, defenseX * 30, defenseY * 30 + 8);
        Win(defenseY, defenseX);
        potent(defenseY, defenseX);
        console.log(moves, defenseY, defenseX);
      }
    });
  }
}
game.draw();
