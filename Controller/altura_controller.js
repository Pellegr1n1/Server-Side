import Altura from "../Models/altura_models.js";

const getAltura = async (req, res) => {
    try {
        const altura = await Altura.findAll()
        if (!altura) {
            return res.status(404).json({
                msg: "Erro nenhuma altura foi encontrada"
            })
        }
        else {
            return res.status(200).json({
                altura
            })
        }
    } catch (e) {
        console.log("Erro,", e)
        return res.status(500).json({
            msg: "Ocorreu um erro ao buscar altura"
        })
    }
}

const createAltura = async (req, res) => {
    try {
        const { codigo_altura, categoria } = req.body
        if (!codigo_altura) {
            return res.status(422).json({
                msg: "O codigo é obrigatorio!"
            })
        }

        if (!categoria) {
            return res.status(422).json({
                msg: "A categoria é obrigatoria!"
            })
        }
        else {
            const altura = await Altura.create(req.body)
            return res.status(200).json({
                altura,
                msg: "Altura criada com sucesso!"
            })
        }
    } catch (e) {
        console.log("Erro,", e)
        return res.status(500).json({
            msg: "Ocorreu um erro ao criar altura"
        })
    }
}

const updateAltura = async (req, res) => {
    try {
        const cod = req.params.cod
        const { codigo_altura, categoria } = req.body
        const altura = await Altura.findByPk(cod)

        if (!altura) {
            return res.status(404).json({
                msg: 'Altura não foi encontrada'
            })
        }

        if (!categoria) {
            return res.status(422).json({
                msg: "A categoria é obrigatoria!"
            })
        }

        await altura.update({
            codigo_altura: codigo_altura,
            categoria: categoria
        })

        return res.status(200).json({
            altura,
            msg: "Altura atualizada com sucesso!"
        })
    } catch (e) {
        console.log("Erro:", e)
        return res.status(500).json({
            msg: "Ocorreu um erro ao atualizar a altura"
        })
    }
}

const deleteAltura = async (req, res) => {
    try {
        const altura = await Altura.findByPk(req.params.cod)

        if (!altura) {
            return res.status(404).json({
                msg: 'A altura não foi encontrada'
            })
        }

        await altura.destroy();

        return res.status(200).json({
            msg: `Altura ${altura.codigo_altura} excluído com sucesso!`
        })
    } catch (e) {
        console.log("Erro,", e)
        return res.status(500).json({
            msg: "Ocorreu ao deletar altura"
        })
    }
}

export { getAltura, createAltura, updateAltura, deleteAltura }