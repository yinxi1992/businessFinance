import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default function getXLS(id, title) {
   /* generate workbook object from table */
   // 判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去，
   var fix = document.querySelector('.el-table__fixed');
   var wb;
   if (fix) {
     wb = XLSX.utils.table_to_book(document.querySelector(id).removeChild(fix));
     document.querySelector(id).appendChild(fix);
   } else {
     wb = XLSX.utils.table_to_book(document.querySelector(id));
   }
   /* get binary string as output */
   var wbout = XLSX.write(wb, {
     bookType: 'xlsx',
     bookSST: true,
     type: 'array'
   });
   try {
     FileSaver.saveAs(
       new Blob([wbout], {
         type: 'application/octet-stream'
       }),
       `${title}.xls`
     );
   } catch (e) {
     if (typeof console !== 'undefined') console.log(e, wbout);
   }
   return wbout;
 }
 


