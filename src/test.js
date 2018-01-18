var regexp = /^[a-zA-Z0-9_]{3,}$/

let str = 'aA9_(';
if(regexp.test(str)){
  console.log('ok')
}else{
  console.log('no')
}