'use strict'
{
  const num_bth = document.querySelectorAll('.num_bth');
  let output_sub = document.getElementById('output_sub');//計算結果
  const output_total = document.getElementById('output_total');//計算過程
  let total = 0;//計算式を表す変数 
  let state = 'start';//最初の状態
  let mode = 'integer_mode'; 
  

  // 1-9の数字ボタンを押した時
    const one_nine = document.querySelectorAll('.one_nine');
    one_nine.forEach(index => {     
      index.addEventListener('click', () => {
        if(state === 'start') {
          total = index.dataset.indexId;         
        }else if(state === 'finish') {
          reset();
          total = index.dataset.indexId;  
        }else if(state === 'calculation'||state === 'calBtn'){
          
          total += index.dataset.indexId;
        }     
        output_sub.textContent = total;
        state = 'calculation'
      })  
    })

  // 0の時
  const zero = document.getElementById('zero');
  zero.addEventListener('click', () => {

  if(state==='start'||state==='finish'||state==='calBtn'){
      if(output_sub.textContent.slice(-1) === '0') {
        console.log('前の文字はゼロ');
        return;
      }
    }

    if(state==='start') {
      total = zero.dataset.indexId;  
    }else{
      total += zero.dataset.indexId;
    }      
    output_sub.textContent = total;
    changeOutput()
 })   

  // 小数点
  const point = document.getElementById('point');
  point.addEventListener('click', () => {
    console.log(point.dataset.indexId)
    if(mode === 'decimal_mode'){
      return; 
       }      
    if(state==='start'||state==='finish') {
      total = 0;
    }else if(state==='calBtn'){
      
      if(output_sub.textContent.slice(-1)!=='0'){
        total += 0;
      }   
    }
    total += point.dataset.indexId;

    output_sub.textContent = total;
    state = 'calculation'
    mode = 'decimal_mode'; 
    changeOutput()
  }) 

  //記号ボタン
  const cal = document.querySelectorAll('.cal');
  cal.forEach(index => {     
    index.addEventListener('click', () => {
      if(state === 'start') {
        return;
      }else if(state === 'calculation'){
        total += index.dataset.indexId;
      }else if(state === 'finish'){
        total = output_total.textContent;
        total += index.dataset.indexId;
        output_total.textContent = 0
      }else if(state ==='calBtn') {
        total = total.slice(0, -1)
        total += index.dataset.indexId;
      }

      output_sub.textContent = total;
      state = 'calBtn'
      mode ='integer_mode'
      changeOutput()
    }) 
  })

  //イコール
  const equal_btn = document.getElementById('equal_btn');
  equal_btn.addEventListener('click',() =>{
    console.log(eval(total));
    output_total.textContent = digitNum(eval(total));
    state = 'finish'//計算が終わった状態にする。
    mode ='integer_mode'
    changeOutput()
  });

  //Cボタン
  const clear = document.getElementById('clear')
  clear.addEventListener('click', () => {
    reset();
  })

 //リセット
  function reset() {
    total = 0; 
    output_sub.textContent = 0;
    output_total.textContent = 0;
    mode ='integer_mode'
    state ='start';
    changeOutput()
  }

  

  //桁数を揃える関数10桁を表示させる関数
  function digitNum(num) {
    return Math.round(num*100000000)/100000000;
  }

  //計算過程結果、計算結果画面の表示の切り替え
  function changeOutput(){
    if(state==='finish'){
      output_total.classList.add('active');
      output_sub.classList.remove('active');   
    }else{
      output_sub.classList.add('active');
      output_total.classList.remove('active'); 
    } 
  }

}
