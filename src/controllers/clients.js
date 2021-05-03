const create = async ({ Clients }, req, res) => {
  try {
    const { name } = req.body;

    const clientId = await Clients.create({ name });

    res.send({
      status: 200,
      data: clientId,
      message: 'Cliente cadastrado com sucesso!'
    })

  } catch (error) {
    res.send({
      status: 400,
      error: error.message,
    })
  }
}


module.exports = {
  create,
};
