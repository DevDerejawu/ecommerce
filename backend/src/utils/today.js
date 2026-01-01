 import dayjs from 'dayjs';
 function rightNow(){
   const today = dayjs();
   return today.format("YYYY-MM-DD HH:mm:ss");
}
export default rightNow;