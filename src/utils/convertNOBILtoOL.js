export function convertNOBILtoOL(type, data){
  if(type === 'position'){
    //TODO: check if pos is string
    // const alsikeLonLat = [17.766953, 59.764435];  Position: "(59.32634,18.04259)"
    const trimmedPositionString = data.substr(1).slice(0, -1);
    const positionArray = trimmedPositionString.split(','); 
    return [parseFloat(positionArray[1]), parseFloat(positionArray[0])]; 
  }
}