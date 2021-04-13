module.exports = {
  'GET /api/cart': (req, res) => {
    res.send({
      status: 200,
      data: Array(5).fill(undefined).map((v, i) => ({
        id: i,
        name: `商品${i}`,
        price: Math.round(Math.random() * 100)
      }))
    })
  }
}