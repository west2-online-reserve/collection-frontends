const Koa = require('koa')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const {koaBody} = require('koa-body')
const path = require('path')
const fs = require('fs-extra')

const app = new Koa()
const router = new Router()
//目标目录若不存在则创建目录
const UPLOAD_DIR = path.join(__dirname,'uploads')
if(!fs.existsSync(UPLOAD_DIR)){
  fs.mkdirSync(UPLOAD_DIR,{ recursive:true });
  console.log(`目录已创建: ${UPLOAD_DIR}`);
}
else{
  console.log(`目录已存在: ${UPLOAD_DIR}`);
}

router.post('/api/upload',koaBody( { multipart:true } ),async (ctx) =>{
  const {files} = ctx.request
  if(!files||!files.file){
    ctx.status=400
    ctx.body={error:'未找到文件！'}
  }
  const file = files.file
  const destPath = path.join(UPLOAD_DIR,file.originalFilename)
  try{
    fs.move(file.filepath,destPath)
    ctx.body={message:'文件上传成功！',fileUrl: `/uploads/${file.name}`}
  }catch(err){
    ctx.status=500
    ctx.body={error:'文件上传失败！'}
  }
})

router.delete('/api/delete',async (ctx) =>{
  const {filename} = ctx.query
  if(!filename){
    ctx.status=400
    ctx.body={error:'未找到文件名'}
  }
  filePath=path.join(UPLOAD_DIR,filename)
  try{
    await fs.remove(filePath)
    ctx.body={ message: `文件 ${filename} 已成功删除`}
  }catch(err){
    ctx.status=500
    ctx.body={error:'文件删除失败！'}
  }
})

router.get('/api/files',async (ctx) => {
  try{
    const files = await fs.readdir(UPLOAD_DIR)
    ctx.body={ files }
  }catch(err){
    ctx.status = 500
    ctx.body={error: '文件列表读取失败！'}
  }
})

app.use(koaStatic(path.join(__dirname, 'public')));
app.use(koaStatic(path.join(__dirname,'uploads')));
app.use(router.routes()).use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});