import {drawGraph,edges,vertices, CreationDisable,setCreationDisable} from './canvas.js';

let dfsBtn = document.getElementById("dfsBtn");

dfsBtn.addEventListener('click',async ()=>{
    if(CreationDisable){
            window.alert("can't do anything while algo visualization");
            return;
        }
    setCreationDisable(true);
   
let adjList =Array.from({ length: vertices.length }, () => []);
 
edges.forEach((element,idx) => {
    adjList[element.idx1].push(element.idx2);  
 adjList[element.idx2].push(element.idx1);  
    
});
console.log(adjList);

   let visited = Array.from({length:vertices.length},()=>false);
   console.log(visited);
   let st = [];
   for(let i=0;i<vertices.length;i++){
  if(visited[i]==true){
    continue;
  }
   
 st.push(i);
 let prevNode = -1;
 const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
 while(st.length!=0){
    let x = st[st.length-1];
    st.pop();
    if(visited[x]){
        continue;
    }
    if(prevNode!=-1){
        vertices[prevNode].color="#3b82f6";
    }
    visited[x] = true;
    vertices[x].color = "red";
    prevNode=x;
     drawGraph();
await sleep(1000);
    for(let adjNode of adjList[x]){
           if(visited[adjNode]==false){
               st.push(adjNode);
           }
    }
 }
   if(prevNode!=-1){
     vertices[prevNode].color = "#3b82f6";
     drawGraph();
   }

}

 console.log(edges);
console.log(vertices);
setCreationDisable(false);
});
