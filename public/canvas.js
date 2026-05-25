const canvas = document.getElementById('myCanvas');
 const ctx = canvas.getContext('2d');
 const clearBtn = document.getElementById('clearBtn');
 function isClickInsideCircle(mouseX, mouseY, circleX, circleY, radius) {
    const distance = Math.hypot(mouseX - circleX, mouseY - circleY);
    
    return distance <= radius;
}
let currEdge = [];
let vertices = [];
let edges = [];
const drawGraph = ()=>{
    let i = 0;
       for(let x of vertices){
            makeCircle(x.x,x.y,20,x.color);
            ctx.fillStyle = "#120606";          
           ctx.font = "bold 16px sans-serif";  
           ctx.textAlign = "center";          
           ctx.textBaseline = "middle";        
           ctx.fillText(`${i++}`, x.x, x.y);
       }
       edges.forEach((x)=>{        
       makeLine(x.node_1.x, x.node_1.y, x.node_2.x, x.node_2.y, 3, "rgba(255, 255, 255, 0.25)");
       });

}
let CreationDisable = false;

function setCreationDisable(value){
     CreationDisable = value;
}

const makeCircle = (x,y,radius,color) =>{
            ctx.beginPath();
              ctx.arc(x,y,radius,0,Math.PI*2);
              ctx.fillStyle = color;
              ctx.fill();
}

const makeLine = (xSt,ySt,x,y,width,color) =>{
              ctx.beginPath();
              ctx.moveTo(xSt,ySt);
              ctx.lineTo(x,y);
              ctx.strokeStyle = color;
              ctx.lineWidth = width;
              ctx.stroke();   
}
// makeLine(20,25,150,155,4,'white');
let grabbedNode = null;
let isGrabing = false;
canvas.addEventListener('mousedown',(event)=>{
    if(CreationDisable){
        window.alert("can't do anything while algo visualization");
        return;
    }
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
  let idx =0;
    for(let v of vertices){
        idx++;
        if(isClickInsideCircle(mouseX,mouseY,v.x,v.y,20)){
            grabbedNode = v;
            isGrabing = true;
            v.color = "#10b981";
            currEdge.push(v);
            currEdge[currEdge.length-1]["idx"] = idx;
            if(currEdge.length == 2){

                edges.push({
                    "node_1" :  currEdge[0],
                    "node_2" : currEdge[1],
                    "color" : "red",
                    "idx1": currEdge[0]["idx"],
                    "idx2" : currEdge[1]["idx"],
                });
                currEdge[0].color = "#3b82f6";
                currEdge[1].color = "#3b82f6";
                currEdge=[];

            }
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGraph();
            return;
        }
    }


    vertices.push({"x":mouseX,"y":mouseY,"color":"#3b82f6"});
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGraph();     
     
});
canvas.addEventListener('mousemove',(event)=>{
    if(CreationDisable){
        // window.alert("can't do anything while algo visualization");
        return;
    }
      if(!isGrabing||!grabbedNode){
        return ;
      }
      const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

   
    grabbedNode.x = mouseX;
    grabbedNode.y = mouseY;

  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGraph();
});

canvas.addEventListener('mouseup',()=>{
if(CreationDisable){
        window.alert("can't do anything while algo visualization");
        return;
    }
    isGrabing = false;
    grabbedNode = null;
})
clearBtn.addEventListener('click',()=>{
    if(CreationDisable){
        window.alert("can't do anything while algo visualization");
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    vertices=[];
    edges=[];
});
export {drawGraph,edges,vertices,CreationDisable,setCreationDisable};              