
export default function Formatear(num){
  
  if (typeof num === 'number'){
    num = num.toString();
    if (num.indexOf('.') !== -1)
    {
      num = num.replace('.',',')
    }
  }

  let len_num = num.length
  var float = ''
  if(num.indexOf(',') !== -1){
    let index = num.indexOf(',')
    var entero = num.substring(0,index)
    float = num.substring(index + 1,index + 4);
    while (float.indexOf(',') !== -1 ){
      float = float.replace(',','')
    }
    float = ',' + float
  }
  else
  {
    entero = num.toString();
  }

  if(typeof entero === 'string' && entero !== ''){

    while(entero.indexOf('.') !== -1){
      entero = entero.replace('.','')
    }
  }

  let resultado = '';
  for (var j, i = entero.length - 1, j = 0; i >= 0; i--, j++)
      resultado = entero.charAt(i) + ((j > 0) && (j % 3 === 0) ? "." : "") + resultado;
  return (resultado + float);
  
}