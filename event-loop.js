setTimeout(() => {
  console.log('1')
  new Promise((resolve) => { console.log('2'); resolve(); })
  .then(() => { console.log('3') })
  new Promise((resolve)=> { console.log('4'); resolve()})
  .then(() => { console.log('5') })
  setTimeout(() => { 
    console.log('6')
    setTimeout(() => {
      console.log('7')
      new Promise((resolve) => { console.log('8'); resolve() })
      .then( () => {  console.log('9') })
      new Promise((resolve) => { console.log('10'); resolve() })
      .then(() => {  console.log('11') })
    })
    setTimeout(() => { console.log('12') }, 0)
  })
  setTimeout(() => { console.log('13') }, 0)
})

setTimeout(() => { console.log('14') }, 0)

new Promise((resolve) => { console.log('15'); resolve() })
.then( ()=> { console.log('16') })

new Promise((resolve) => { console.log('17'); resolve() })
.then(() => { console.log('18') })