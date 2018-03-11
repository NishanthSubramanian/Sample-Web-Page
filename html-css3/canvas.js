var canvas = document.querySelector('canvas.thecanvas');
var canvas2 = document.querySelector('canvas.thecanvas2');

var wide=187;
var high=2000;
canvas.width = wide;
canvas.height = high;
canvas2.width = wide;
canvas2.height = high;

var c = canvas.getContext('2d');
var d =canvas2.getContext('2d');
//c.fillStyle = 'rgba(255,0,0,0.5)';
//c.fillRect(100,100,100,100);
//c.fillStyle = 'rgba(0,255,0,0.5)';
//c.fillRect(300,100,100,100);
//c.fillStyle = 'rgba(0,0,255,0.5)';
//c.fillRect(500,100,100,100);

//console.log(canvas);
//
//Line
//c.beginPath();
//c.moveTo(50,300);
//c.lineTo(300,100);
//c.lineTo(400,500);
//c.strokeStyle = "blue";
//c.stroke();
//
//Arc
//c.beginPath();
//c.strokeStyle='magenta';
//c.arc(300,300,30,0,Math.PI*2,false);
//c.stroke();
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//for(var i=1;i<=300;i++)
//    {
//        var x = Math.random()*window.innerWidth;
//        var y = Math.random()*window.innerHeight;
//        var r = Math.floor(Math.random() * 256)
//         var g = Math.floor(Math.random() * 256)
//         var b = Math.floor(Math.random() * 256)
//         var rgb = 'rgba('+r+ ', ' +g+ ', ' +b+ ', ' +0.9+ ')';
//        c.beginPath();
//        c.arc(x,y,30,0,Math.PI*2,false);
//         c.strokeStyle= rgb;
//        c.stroke();
//    }
var colorArray=[
   '#000000',	
//    '#e2ff00',	
//	'#94f25a',	
//    '#6cef45',
//    '#008000'
];
var mouse={
    x:undefined,
    y:undefined
}
var scx=0;
var scy=0;
var maxRadius=40;
var minRadius=3;
window.addEventListener('mousemove',
                        function(event){
                            mouse.x=event.x;
                            mouse.y=event.y;
                            console.log(mouse);
                                        });
window.addEventListener('scroll',
                       function(e){
                                mouse.x=window.scrollX;
                                mouse.y=window.scrollY;
                                console.log(mouse);
});
window.addEventListener('resize',
                        function(){
    canvas.width = wide;
   canvas.height = high;
    canvas2.width = wide;
   canvas.height = high;
});
function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
//    this.color=getRandomColor();
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
        c.fillStyle = this.color;
        c.fill();  
        c.strokeStyle='#2501e8';
        c.lineWidth=0.4;
        c.stroke();
        d.beginPath();
        d.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
        d.fillStyle = this.color;
        d.fill();
        d.strokeStyle='#2501e8';
        d.lineWidth=0.4;
        d.stroke();

    }
    this.update = function(){
            this.x+=this.dx;
            this.y+=this.dy;
            if(this.x + this.radius >wide || this.x- this.radius <0)
                this.dx=-this.dx;
            if(this.y + this.radius >high || this.y- this.radius <0)
                this.dy=-this.dy;
        //interactivity
//        if(mouse.x-this.x < 50 && mouse.x-this.x > -50 && mouse.y-this.y < 50 && mouse.y-this.y > -50)
//        {
//            if(this.radius<maxRadius)
//            this.radius+=4;
//        }
//        else if(this.radius>this.minRadius)
//            this.radius-=1;
        this.draw();
    }
}
var circleArray=[];
for(var i=1;i<=800;i++)
    {
            var radius = Math.random()*3+1;
            var x = Math.random()*(wide-radius*2)+radius;
            var y = Math.random()*(high-radius*2)+radius;
            var dx = (Math.random()-0.5)*2;
            var dy = (Math.random()-0.5)*2;
        circleArray.push(new Circle(x,y,dx,dy,radius));

    }
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,wide,high);
    d.clearRect(0,0,wide,high);
    for(var i=0;i<circleArray.length;i++)
        {
            circleArray[i].update();
        }
  
}
animate();