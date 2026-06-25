import {drawGraph,edges,vertices, CreationDisable,setCreationDisable} from './canvas.mjs';

let topoBtn = document.getElementById("topoBtn");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

topoBtn.addEventListener('click',async ()=>{
    if(CreationDisable){
            window.alert("can't do anything while algo visualization");
            return;
        }


    setCreationDisable(true);
   
let adjList =Array.from({ length: vertices.length }, () => []);
let inDegree = Array.from({length:vertices.length},()=>0);

edges.forEach((element,idx) => {
    adjList[element.idx1].push(element.idx2);    
    inDegree[element.idx2]++;
});
let queue = [];
for(let x in vertices){
    if(inDegree[x]==0){
        queue.push(x);
    }
}

while(queue.length!=0){
    let node = queue[0];
    vertices[node].color = "#f43f5e";
    drawGraph();
    await sleep(350);
    queue.shift();
    for(let adj of adjList[node]){
         inDegree[adj]--;
         if(inDegree[adj]==0){
            queue.push(adj);
         }
    }
}
let cycle=true;

for(let x in vertices){
    if(inDegree[x]==0){
        queue.push(x);
        cycle = false;
    }
}

if(cycle){
  window.alert("there is an cycle in a graph rebuild the graph without cycle for topo sort");
}

for(let node in vertices){
    vertices[node].color = "#6366f1";
}
drawGraph();
sleep(100);
setCreationDisable(false);
   
});
