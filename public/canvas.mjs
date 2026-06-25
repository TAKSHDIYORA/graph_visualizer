const canvas = document.getElementById('myCanvas');
 const ctx = canvas.getContext('2d');
 const clearBtn = document.getElementById('clearBtn');
 function isClickInsideCircle(mouseX, mouseY, circleX, circleY, radius) {
    const distance = Math.hypot(mouseX - circleX, mouseY - circleY);
    
    return distance <= radius;
}
// Calculates the shortest distance from a point to a line segment
function getDistanceToLineSegment(px, py, x1, y1, x2, y2) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    
    // In case of 0 length line
    if (len_sq != 0) {
        param = dot / len_sq;
    }

    let xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    
    return Math.hypot(dx, dy);
}
let currEdge = [];
let vertices = [];
let edges = [];
const drawGraph = ()=>{
    let i = 0;
       for(let x of vertices){
            makeCircle(x.x,x.y,20,x.color);
            ctx.fillStyle = "#ffffff";
           ctx.font = "700 15px Inter, system-ui, sans-serif";
           ctx.textAlign = "center";          
           ctx.textBaseline = "middle";        
           ctx.fillText(`${i++}`, x.x, x.y);
       }
       edges.forEach((x)=>{        
       makeLine(x.node_1.x, x.node_1.y, x.node_2.x, x.node_2.y, 3, "rgba(71, 85, 105, 0.38)");
       const midX = (x.node_1.x + x.node_2.x) / 2;
        const midY = (x.node_1.y + x.node_2.y) / 2;
       ctx.fillStyle = "#333333"; 
        ctx.font = "600 14px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        // Offset the text slightly so it doesn't overlap perfectly with the line
        ctx.fillText(x.weight, midX, midY - 10);
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
    for(let v of vertices){
        
        if(isClickInsideCircle(mouseX,mouseY,v.x,v.y,20)){
            grabbedNode = v;
            isGrabing = true;
            v.color = "#14b8a6";
            currEdge.push(v);
            if(currEdge.length == 2){

                edges.push({
                    "node_1" :  currEdge[0],
                    "node_2" : currEdge[1],
                    "color" : "red",
                    "idx1": currEdge[0].id,
                    "idx2" : currEdge[1].id,
                    "weight" : 0,
                });
                currEdge[0].color = "#6366f1";
                currEdge[1].color = "#6366f1";
                currEdge=[];

            }
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGraph();
            return;
        }
    }


    for (let e of edges) {
        // Use a 10px tolerance for clicking the line
        if (getDistanceToLineSegment(mouseX, mouseY, e.node_1.x, e.node_1.y, e.node_2.x, e.node_2.y) <= 10) {
            // Prompt the user to update the weight
            const newWeight = window.prompt("Enter new edge weight:", e.weight);
            
            // Validate input and update
            if (newWeight !== null && newWeight.trim() !== "" && !isNaN(newWeight)) {
                e.weight = Number(newWeight);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawGraph();
            }
            return; // Stop executing, we handled an edge click
        }
    }


    vertices.push({id: vertices.length,"x":mouseX,"y":mouseY,"color":"#6366f1"});
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
