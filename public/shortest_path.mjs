import {drawGraph,edges,vertices, CreationDisable,setCreationDisable} from './canvas.mjs';

let shortestPathBtn = document.getElementById("shortestPathBtn");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

shortestPathBtn.addEventListener('click',async ()=>{
    if(CreationDisable){
            window.alert("can't do anything while algo visualization");
            return;
    }
   let src = parseInt(document.getElementById("srcInput").value);
    let dest = parseInt(document.getElementById("destInput").value);
    let unitDistanceCheck = document.getElementById("unitDistanceCheck").checked; // Use .checked
    let isUnDirected = document.getElementById("directedLabel").checked; // Use .checked

    // Validate inputs
    if (isNaN(src) || isNaN(dest) || src < 0 || src >= vertices.length || dest < 0 || dest >= vertices.length) {
        window.alert("Invalid source or destination node.");
        return;
    }
    setCreationDisable(true);

let adjList =Array.from({ length: vertices.length }, () => []);
for(let edge of edges){    
    adjList[edge.idx1].push([edge.idx2,edge.weight]);
    if(isUnDirected){
           adjList[edge.idx2].push([edge.idx1,edge.weight]);
    }
}
let dist = Array.from({length : vertices.length},()=>Number.MAX_SAFE_INTEGER);
let queue = [];

dist[src]=0;
queue.push([src,0,[0]]);
let finalPath;
while(queue.length!=0){
    queue.sort((a,b)=>a[1]-b[1]);
   let node = queue[0];
   queue.shift();
   let dis = node[1];
   let path = node[2];
   if(node[0]==dest){
    finalPath = path;
   }
   if (dis > dist[node[0]]) continue;
   for(let adj of adjList[node[0]]){
        let wt;
        if(unitDistanceCheck){
            wt = 1;
        }else{
            wt = adj[1];
        }
        if(dis+wt<dist[adj[0]]){
        dist[adj[0]] = dis+wt;
        queue.push([adj[0],dis+wt,[...path,adj[0]]]);
        }
   }
}
let minDist = dist[dest];
for(let node of finalPath){
    vertices[node].color = "#f43f5e";
    drawGraph();
    await sleep(700);
}
for(let node of finalPath){
    vertices[node].color = "#6366f1";
}
 drawGraph();
await sleep(100);
window.alert(`the minimum distance between ${src} and ${dest} is ${minDist}`);
setCreationDisable(false);
});