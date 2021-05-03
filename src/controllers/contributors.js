const auth = require('../utils/auth')
const jwt = require("jsonwebtoken");

const create = async ({ Contributors }, req, res) => {
    try {
        let { name, email, password } = req.body;

        password = await auth.setPassword(password);

        const contributorId = await Contributors.create({ name, email, password });

        res.send({
            status: 200,
            data: contributorId,
            message: 'Colaborador cadastrado com sucesso!'
        });

    } catch (error) {
        res.send({
            status: 400,
            error: error.message,
        });
    }
}

const login = async ({ Contributors }, req, res) => {
    try {
        const userToRetrieve = {
            email,
            password
        } = req.body;
        const userRow = await Contributors.findOneByEmail({ email });
        const checkPass = await auth.checkPassword(
            userToRetrieve.password,
            userRow[0].password
        );
        if (!checkPass) {
            throw new Error("Credenciais inválidas");
        }
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 2880 * 60,
                data: { id: userRow[0].id, email: userRow[0].email, name: userRow[0].name },
            },
            process.env.JWT_SECRET
        );
        res.send({
            status: 200,
            data: token,
            message: "Dados recuperados",
        });
    } catch (error) {
        res.send({
            status: 400,
            error: error.message,
        });
    }
}

const getLastOs = async ({ Contributors }, req, res) => {
    try {
  
      const lastLocations = await Contributors.findLastLocation();
  
      res.send({
        status: 200,
        data: lastLocations,
        message: 'Dados recuperados!'
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
    login,
    getLastOs
};
