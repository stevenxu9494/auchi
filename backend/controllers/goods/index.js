const { mysql } = require('../../mysql')

// 点击左侧菜单获取的分类商品
async function detailAction(ctx) {
  
  const goodsId = ctx.query.goodsId
  const info = await mysql('auchi_goods').where({
    'goods_id':goodsId
  }).select()

  ctx.body = {
    'info': info
  }
}

module.exports = {
  detailAction
}