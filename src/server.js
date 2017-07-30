const Koa = require("koa")
const path = require("path")
require("colors")
const Router = require("koa-router")
const router = new Router()
const convert = require("koa-convert")
const bodyParser = require("koa-body")
const logger = require("debug")
const send = require("koa-send")
const mount = require("koa-mount")
const serve = require("koa-static")
const staticCache = require("koa-static-cache")
const config = require("./config")
const root = "build"
const curl = require("curlrequest")

router
  .get("/api/images", async ctx => {
    const options = {url: 'http://localhost:1337/api/images', pretend: true};
    ctx.body = await new Promise((resolve, reject) => {
      curl.request({options}, (err, stdout, meta) => {
        if (err) reject(err)
        console.log(err, stdout)
        resolve(stdout)
      })
    })
  })
  .get("*", async ctx => {
    if ("/" === ctx.path) await send(ctx, `${root}/index.html`)
    if (ctx.path.startsWith("/page/")) await send(ctx, `${root}/index.html`)
    await send(ctx, root + ctx.path)
  })

const app = new Koa()
  .use(
    convert(
      staticCache(path.join(__dirname, "build"), {
        maxAge: 365 * 24 * 60 * 60
      })
    )
  )
  .use(convert(bodyParser()))
  .use(router.routes())
  .use(router.allowedMethods())

// Serve static files
Object.keys(config.http.static).forEach(staticURL => {
  logger("app:static")(staticURL)
  app.use(mount(staticURL, convert(serve(config.http.static[staticURL]))))
})

app.listen(config.http.port, _ => {
  logger("app:start")(`server.js listening on port ${config.http.port}`)
})
