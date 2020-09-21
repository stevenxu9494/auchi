const { mysql } = require('../../mysql')

// 加入购物车
async function addCart(ctx) {
  // 货物/用户信息
  let { goodsId, userId, goodsName, retailPrice, number, thumbUrl, imageUrl, checked } = ctx.request.body
  // const goodsId = ctx.query.goodsId
  // const userId = ctx.query.userId
  // const goodsName = ctx.query.goodsName
  // const retailPrice = ctx.query.retailPrice
  // const number = ctx.query.number
  // const thumbUrl = ctx.query.thumbUrl
  // const imageUrl = ctx.query.imageUrl
  goodsId = parseInt(goodsId)
  retailPrice = parseFloat(retailPrice)
  number = parseInt(number)
  if (checked) {
    checked = 1
  }else {
    checked = 0
  }
  // 判断购物车是否包含此数据
  const haveGoods = await mysql('auchi_cart').where({
    'user_id': userId,
    'goods_id': goodsId
  }).select()
  if (haveGoods.length === 0) { 
    // const goods = await mysql('nideshop_goods').where({
    //   'id': goodsId
    // }).select()
    // // console.log(goods);
    // const { retail_price, name, list_pic_url } = goods[0]
    // 如果不存在
    await mysql('auchi_cart').insert({
      'user_id': userId,
      'goods_id': goodsId,
      number,
      'goods_name': goodsName,
      'retail_price': retailPrice,
      'thumb_url': thumbUrl,
      'image_url': imageUrl,
      checked
    })
  } else {
    const oldNumber = await mysql('auchi_cart').where({
      'user_id': userId,
      'goods_id': goodsId
    }).column('number').select()
    // 更新数据
    await mysql('auchi_cart').where({
      'user_id': userId,
      'goods_id': goodsId
    }).update({
      // 'number': oldNumber[0].number + number
      'number': number,
      checked
    })
  }
  ctx.body = {
    data: 'success'
  }
}

// 获取购物车列表
async function cartList(ctx) {
  const { userId } = ctx.query
  
  const cartList = await mysql('auchi_cart').where({
    'user_id': userId
  }).select()
  ctx.body = {
    data: cartList
  }
}
module.exports = {
  addCart,
  cartList
}