const auth = require('../utils/auth')

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

module.exports = {
    create
};
