import express, { Express, Router, Request, Response } from 'express'
import axios from "axios"
import { save } from './database'

const app: Express = express()
const router: Router = express.Router()

app.use("/api", router)



router.get('/list', async function (req: Request, res: Response) {
  //前端封装了ajax，后端封装了http
  await axios.post("https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=diseaseh5Shelf,statisGradeCityDetail")
    .then(v => {
      res.json(v.data)
    })
})















// save(result) // 在自己数据库存一份
// let data = result.data.data.statisGradeCityDetail;


// router.get('/cityList', async function (req: Request, res: Response) {
//   let city = req.query.city
//   //前端封装了ajax，后端封装了http
//   const result = await axios.post('https://api.inews.qq.com' + '/newsqa/v1/query/pubished/daily/list?province=' + city)
//   // save(result) // 在自己数据库存一份
//   let data = result;
//   res.json({
//     data: data
//   })
// })

app.listen(3000, () => {
  console.log("success");
})

