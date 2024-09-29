export default function getArray() {  
  const arr = []

  for (let i = 0; i < 15; i ++) {
    arr.push(Math.floor((Math.random()) * 101));
  }

  return arr;
}