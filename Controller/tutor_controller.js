import Tutor from "../Models/tutor_models.js";

const getTutor = async (req, res) => {
    try {
        const get = await Tutor.findAll()
        return res.status(200).json({
            get
        })
    } catch (e) {
        console.log("Erro : ", e)
        return res.status(500).json({
            msg: "Ocorreu um erro ao buscar os tutores"
        })
    }
}

const getTutorById = async (req, res) => {
    try {
        const getPk = await Tutor.findByPk(req.params.cpf);

        if (!getPk) {
            return res.status(404).json({
                msg: "CPF não encontrado"
            });
        }
        return res.send(getPk);
    } catch (error) {
        console.log("Erro : ", error);
        return res.status(500).json({
            msg: "Ocorreu um erro ao buscar o CPF"
        });
    }
};

const createTutor = async (req, res) => {
    try {
        const { cpf, nome, email } = req.body
        if (!cpf) {
            return res.status(422).json({
                msg: "Erro : O cpf é obrigatorio!"
            })
        }
        if (!nome) {
            return res.status(422).json({
                msg: "Erro : O nome é obrigatorio!"
            })
        }
        if (!email) {
            return res.status(422).json({
                msg: "Erro : O email é obrigatorio!"
            })
        }
        const findCpf = await Tutor.findByPk(cpf);
        if (findCpf) {
            return res.status(409).json({
                msg: "Erro : CPF já cadastrado!"
            })
        } else {
            const tutor = await Tutor.create(req.body);
            return res.status(200).json({
                tutor,
                msg: `Tutor ${req.body.cpf} criado com sucesso`
            })
        }
    } catch (e) {
        console.log("Erro : ", e)
        return res.status(500).json({
            msg: "Ocorreu um erro ao criar o tutor"
        })
    }
}


const updateTutor = async (req, res) => {
    try {
        const up = req.params.cpf
        const update = await Tutor.update(req.body, {
            where: {
                cpf: up
            }
        })
        if (update > 0) {
            return res.status(200).json({
                msg: `A alteração do CPF: ${req.params.cpf} foi concluída com sucesso`
            })
        } else {
            return res.status(404).json({
                msg: `CPF ${req.params.cpf} não encontrado para efetuar a atualização`
            })
        }
    } catch (e) {
        console.log("Erro : ", e)
        return res.status(500).json({
            msg: `Ocorreu um erro ao atualizar o cadastro ${req.params.cpf}`
        })
    }
}

const deleteTutor = async (req, res) => {
    try {
        const del = await Tutor.destroy({
            where: {
                cpf: req.params.cpf
            }
        })
        if (!del) {
            return res.status(404).json({
                msg: `Tutor ${req.params.cpf} não encontrado`
            })
        } else {
            return res.status(200).json({
                msg: `Tutor ${req.params.cpf} deletado com sucesso!`
            })
        }
    } catch (e) {
        console.log("Erro : ", e)
        return res.status(500).json({
            msg: `Ocorreu um erro ao deletar o tutor ${req.params.cpf}`
        })
    }
}
export { getTutor, getTutorById, createTutor, updateTutor, deleteTutor } 