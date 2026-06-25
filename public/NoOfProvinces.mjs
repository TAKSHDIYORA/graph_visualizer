import {drawGraph,edges,vertices, CreationDisable,setCreationDisable} from './canvas.mjs';
const BASE_HUE = 0;       
const SATURATION = 80;    
const LIGHTNESS = 60;     

function getSequentialColor(colorIndex) {
    const goldenRatioConjugate = 0.618033988749895;
    
    let hue = (BASE_HUE + (colorIndex * goldenRatioConjugate * 365)) % 365;
    
    return `hsl(${Math.round(hue)}, ${SATURATION}%, ${LIGHTNESS}%)`;
}



let NoOfProvincesBtn = document.getElementById("NoOfProvincesBtn");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function dfsVisit(node,adjList,visited,color){
    visited[node]=true;
    for(let adjNode of adjList[node]){
        if(visited[adjNode]){
            continue;
        }
        vertices[adjNode].color=color;
        drawGraph();
        await sleep(650);
        await dfsVisit(adjNode,adjList,visited,color);
    }
    
}

async function dfs(adjList){
     let visited = new Array(vertices.length).fill(false);
     let count =0 ;
     for(let i=0;i<vertices.length;i++){
        if(visited[i]==false){
            count++;
            let color = getSequentialColor(i);
                vertices[i].color = color;
                drawGraph();
                await sleep(650);
           await dfsVisit(i,adjList,visited,color);         
        }
     }
     window.alert(`number of provinces is ${count}`);
}



NoOfProvincesBtn.addEventListener('click',async ()=>{
    if(CreationDisable){
            window.alert("can't do anything while algo visualization");
            return;
        }
    setCreationDisable(true);
   console.log(vertices);
   
let adjList =Array.from({ length: vertices.length }, () => []);
edges.forEach((element,idx) => {
    adjList[element.idx1].push(element.idx2);  
 adjList[element.idx2].push(element.idx1);      
});

for(let i =0 ;i<vertices.length;i++){
    vertices[i].color = "lightgray";
} 
drawGraph();
await sleep(650);
await dfs(adjList);
console.log(adjList); 
for(let i =0 ;i<vertices.length;i++){
    vertices[i].color = "#6366f1";
} 
await sleep(2200);
drawGraph();
await sleep(650);
setCreationDisable(false); 
});
