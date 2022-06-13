import instance from "../instance";

export const getMaxTicket = ()=>{
  let url=`https://game.slimeroyale.com/api/info/lottery/max`;
  return instance.get(url)
}
