const mongoose = require("mongoose");

const Product = mongoose.model("Product");

module.exports = {
  //listar
  async index(req, res) {
    //await =  proxima linha executar so após ele buscar os registros
    const { page = 3 } = req.query;
    const products = await Product.paginate({}, { page, limit: 10 });
    return res.json(products);
  },
  async show(req, res) {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  },
  //criar
  async store(req, res) {
    const product = await Product.create(req.body);
    return res.json(product);
  },
  //update
  async update(req, res) {
    //sem o new volta o titulo antigo, com o new titulo novo
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(product);
  },
  //delete
  async destroy(req, res) {
    const product = await Product.findByIdAndRemove(req.params.id);
    //const product = await Product.findByIdAndDelete(req.params.id);
    //return res.json(product);
    return res.send();
  }
};
