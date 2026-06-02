import {drawGraph,edges,vertices, CreationDisable,setCreationDisable} from './canvas.mjs';
const BASE_HUE = 0;       
const SATURATION = 80;    
const LIGHTNESS = 60;     

function getSequentialColor(colorIndex) {
    const goldenRatioConjugate = 0.618033988749895;
    
    let hue = (BASE_HUE + (colorIndex * goldenRatioConjugate * 365)) % 365;
    
    return `hsl(${Math.round(hue)}, ${SATURATION}%, ${LIGHTNESS}%)`;
}



let MColorBtn = document.getElementById("MColorBtn");
let setColors = document.getElementById("setMcolor");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function MColor(node,adjList,visited,colors){
     if(node==visited.length){
        return true;
     }
     for(let i=0;i<colors.length;i++){
        let f = false;
         for(let j=0;j<adjList[node].length;j++){
              if(visited[adjList[node][j]]==colors[i]){
                f=true;
                break;
              }
         }
         if(!f){
          visited[node]=colors[i];
          vertices[node].color = colors[i];
   console.log(vertices,colors);
   
          drawGraph();
          await sleep(1000);
              const success = await MColor(node+1,adjList,visited,colors);
              if(success){
                return true;
              }
              visited[node] = "blue"; // Visual reset indicator
            vertices[node].color = "blue";
            drawGraph();
            await sleep(500);
         }
     }
     return false;
}

async function dfs(m,adjList){
     let visited = new Array(vertices.length).fill("blue");
     let colors = new Array(m);
     for(let i=0;i<m;i++){
        colors[i] = getSequentialColor(i);
     }
     for(let i=0;i<vertices.length;i++){
        if(visited[i]=="blue"){
           if(!await MColor(i,adjList,visited,colors)){
          window.alert("colors not sufficient increase no of colors");
          return;

           }
        }
     }
}



MColorBtn.addEventListener('click',async ()=>{
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
let m = parseInt(setColors.value,10);
await dfs(m,adjList);
console.log(adjList); 
for(let i =0 ;i<vertices.length;i++){
    vertices[i].color = "blue";
} 
sleep(5000);
drawGraph();
sleep(1000);
setCreationDisable(false); 
});
