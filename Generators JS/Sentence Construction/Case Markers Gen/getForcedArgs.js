function getForcedArgs (id, value) {
 console.groupCollapsed("getForcedArgsLog");
 console.log(`LOG: getForcedArgs called with id ${id} and value ${value}`);
 console.log(`LOG: now fixing ID`);

  if (id == "timingBox") {id = "timing"} else
  if (id == "locBox") {id = "locative"} else
  if (id == "ablBox") {id = "ablative"} else
  if (id == "instrBox") {id = "instrumental"} else
  if (id == "indirobjBox") {id = "indirobj"} else
  if (id == "destBox") {id = "destination"} else
  if (id == "dirobjBox") {id = "dirobj"} else
  if (id == "vocBox") {id = "vocative"}
  
  console.log(`LOG: id was fixed into ${id}. now splicing`);
  if (value == true) {forcedArgsArray.splice(0, 0, id)} else
  if (value == false) {forcedArgsArray.splice(forcedArgsArray.indexOf(id), 1)}
  console.log(`LOG: forcedArgs now ${forcedArgsArray}`);
  
  console.groupEnd();
}
