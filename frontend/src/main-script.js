import { eyeMover } from "./modules/slime-eyes.js";
import { updateBody, setDirtLevel } from "./modules/slime-body.js";

eyeMover('path3810-5-6-8', 'path3832-6-8-9', 'path3810-1-7-1-1','path3832-7-1-9-8');

updateBody();

const changeDirtyLevel = setDirtLevel();

setTimeout(()=>{changeDirtyLevel(2)}, 5000)
setTimeout(()=>{changeDirtyLevel(1)}, 2000)
setTimeout(()=>{changeDirtyLevel(1)}, 8000)
setTimeout(()=>{changeDirtyLevel(0)}, 9000)
setTimeout(()=>{changeDirtyLevel(2)}, 11000)
setTimeout(()=>{changeDirtyLevel(1)}, 13000)

