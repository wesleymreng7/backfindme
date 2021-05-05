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

const getAll = async ({ Clients }, req, res) => {
  try {

    const clients = await Clients.findAll();

    res.send({
      status: 200,
      data: clients,
      message: 'Cliente cadastrado com sucesso!'
    })

  } catch (error) {
    res.send({
      status: 400,
      error: error.message,
    })
  }
}

const update = async ({ Clients }, req, res) => {
  try {

    console.log(req.params, req.body);
    const { clientId } = req.params;
    const { name } = req.body
    const client = await Clients.updateOne({ name }, clientId);

    res.send({
      status: 200,
      data: client,
      message: 'Cliente cadastrado com sucesso!'
    })

  } catch (error) {
    res.send({
      status: 400,
      error: error.message,
    })
  }
}

const deleteOne = async ({ Clients }, req, res) => {
  try {

    const { clientId } = req.params;
    const client = await Clients.remove(clientId);

    res.send({
      status: 200,
      data: client,
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
  getAll,
  update,
  deleteOne
};
