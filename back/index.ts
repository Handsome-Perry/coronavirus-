import express, { Express, Router, Request, Response } from 'express'
import axios from "axios"
import { save } from './database'

const app: Express = express()
const router: Router = express.Router()

app.use("/api", router)

router.get('/list', async function (req: Request, res: Response) {
  //前端封装了ajax，后端封装了http
  const result = await axios.post("https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,deseaseh55hellf")
  save(result) // 在自己数据库存一份

  res.json({
    data: result.data
  })

})
app.listen(3000, () => {
  console.log("success");
})

