import {drawGraph,edges,vertices, CreationDisable,setCreationDisable} from './canvas.mjs';

let bfsBtn = document.getElementById("bfsBtn");


bfsBtn.addEventListener("click",async ()=>{
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
   let queue = [];
   for(let i=0;i<vertices.length;i++){
  if(visited[i]==true){
    continue;
  }
   
 queue.push(i);
 let prevNode = -1;
 const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
 while(queue.length!=0){
      let size = queue.length;

      for(let i=0;i<size;i++){
           let x = queue[0];
           queue.shift();
           if(visited[x]){
            continue;
           }
           vertices[x].color="red";
           if(prevNode!=-1){
           vertices[prevNode].color = "#3b82f6";
           }
            prevNode=x;
           drawGraph();
           
    
           await sleep(1000);
           visited[x]=true;
           for(let ele of adjList[x]){
            if(visited[ele]==false){
               queue.push(ele);
            }
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
})