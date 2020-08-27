var x=11;
var obj={
 x:22,
 say:() => {
   console.log(this.x);
 },
 say2:function(){
    console.log(this.x)
  }
}
obj.say();
obj.say2();

var name = 'window'; 

var A = {
   name: 'A',
   sayHello: () => {
      console.log(this.name)
   }
}

A.sayHello();// 还是以为输出A ? 错啦，其实输出的是window