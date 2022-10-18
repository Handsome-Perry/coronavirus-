import mysql from "mysql"

var connection = mysql.createConnection({// 连接数据库
  host     : 'localhost',       
  user     : 'root',              
  password : 'LPyshuai8',       
  port: 3306,                   
  database: 'coronavirus' // 数据库的名字
}); 

// 存自己数据库一份
export function save(result){
// 删除原有表
let del = `drop table if exists statisGradeCityDetailCp;`
// 创建数据库,保存了一份在statisGradeCityDetail， 实际使用的是statisGradeCityDetailCp
let creat = `
create table statisGradeCityDetailCp(
  province VARCHAR(20) NOT NULL,
  city VARCHAR(20) NOT NULL,
  grade VARCHAR(30) DEFAULT "点击查看详情",
  mtime DATE NOT NULL,
  syear YEAR,
  sdate VARCHAR(30) DEFAULT NULL,
  wzz_add VARCHAR(30),
  nowConfirm VARCHAR(30) DEFAULT 0,
  confirmAdd VARCHAR(30) DEFAULT 0,
  confirm VARCHAR(30) DEFAULT 0,
  dead VARCHAR(30) DEFAULT 0,
  heal VARCHAR(30) DEFAULT 0,
  date VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (city)
)`;

let statisGradeCityDetail = result.data.data.statisGradeCityDetail

let values = "VALUES"
for (let i = 0; i < statisGradeCityDetail.length; i++) {
  values += `("${statisGradeCityDetail[i].province}","${statisGradeCityDetail[i].city}","${statisGradeCityDetail[i].grade}","${statisGradeCityDetail[i].mtime}","${statisGradeCityDetail[i].syear}","${statisGradeCityDetail[i].sdate}","${statisGradeCityDetail[i].wzz_add}","${statisGradeCityDetail[i].nowConfirm}","${statisGradeCityDetail[i].confirmAdd}","${statisGradeCityDetail[i].confirm}","${statisGradeCityDetail[i].dead}","${statisGradeCityDetail[i].heal}","${statisGradeCityDetail[i].date}"),\n`
}
values = values.slice(0,values.length-2) + ";";

connection.connect((err) => {
  connection.query(del, (err) => {
    if (err) {
      console.log('[delete ERROR] - ', err.message);
      return;
    }
    connection.query(creat, (err) => {
      if (err) {
        console.log('[CREATE ERROR] - ', err.message);
        return;
      }
      console.log("CREATED")
    })


    let addSql = `INSERT INTO statisGradeCityDetailCp(province,city,grade,mtime,syear,sdate,wzz_add,nowConfirm,confirmAdd,confirm,dead,heal,date) ${values}
    `
      connection.query(addSql,(err)=>{
        if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
         }       
      })
  })
})
}

export default connection