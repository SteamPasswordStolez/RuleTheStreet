const KEY="drive_player_patch1";
export function loadPlayer(){
  const raw=localStorage.getItem(KEY);
  if(raw) return JSON.parse(raw);
  const data={credits:0,car:"senna_stock",distance:0,quest:0};
  localStorage.setItem(KEY,JSON.stringify(data));
  return data;
}
export function savePlayer(d){
  localStorage.setItem(KEY,JSON.stringify(d));
}
