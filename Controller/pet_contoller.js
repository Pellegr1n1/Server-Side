import Pet from "../Models/pet_models.js";
import Altura from "../Models/altura_models.js";

const getPet = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      include: {
        model: Altura,
        as: 'Altura',
        attributes: ['categoria']
      }
    });
    return res.status(200).json({
      pets
    })
  } catch (e) {
    console.log("Erro:", e);
    return res.status(500).json({
      msg: "Ocorreu um erro ao acessar os pets",
    })
  }
}

const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.cod, {
      include: {
        model: Altura,
        as: 'Altura',
        attributes: ['categoria']
      }
    });

    if (!pet) {
      return res.status(404).json({
        msg: `O pet ${req.params.cod} não foi encontrado`
      })
    }

    return res.status(200).json({
      pet
    })
  } catch (error) {
    console.log('Erro:', error);
    return res.status(500).json({
      msg: 'Ocorreu um erro ao acessar os pets'
    })
  }
}

const createPet = async (req, res) => {
  try {
    const { nome, genero, altura, cpf } = req.body
    let codigo;

    if (!nome) {
      return res.status(422).json({
        msg: "O nome é obrigatório!"
      })
    }
    if (!genero) {
      return res.status(422).json({
        msg: "O genero é obrigatório!"
      })
    }
    if (!altura) {
      return res.status(422).json({
        msg: "A altura é obrigatória!"
      })
    }
    if (!cpf) {
      return res.status(422).json({
        msg: "O cpf é obrigatório!"
      })
    }

    // Pequeno
    if (altura <= 15) {
      codigo = 1
      // Médio
    } else if (altura > 15 && altura < 45) {
      codigo = 2
      // Alto
    } else {
      codigo = 3
    }
    const objPet = {
      nome: nome,
      genero: genero,
      altura: altura,
      cpf: cpf,
      codigo_altura: codigo
    }
    const create = await Pet.create(objPet)

    return res.status(200).json({
      create,
      msg: `Pet ${create.codigo_pet} criado com sucesso!`
    })
  } catch (e) {
    console.log("Erro: ", e);
    return res.status(500).json({
      msg: "Ocorreu um erro ao criar Pet"
    })
  }
}

const updatePet = async (req, res) => {
  try {
    const { nome, genero, altura, cpf } = req.body
    const pet = await Pet.findByPk(req.params.cod)
    let codigo

    if (!pet) {
      return res.status(404).json({
        msg: 'O pet não foi encontrado'
      })
    }

    if (!nome) {
      return res.status(422).json({
        msg: "O nome é obrigatório!"
      })
    }
    if (!genero) {
      return res.status(422).json({
        msg: "O genero é obrigatório!"
      })
    }
    if (!altura) {
      return res.status(422).json({
        msg: "A altura é obrigatória!"
      })
    }
    if (!cpf) {
      return res.status(422).json({
        msg: "O cpf é obrigatório!"
      })
    }

    // Pequeno
    if (altura <= 15) {
      codigo = 1
      // Médio
    } else if (altura > 15 && altura < 45) {
      codigo = 2
      // Alto
    } else {
      codigo = 3
    }

    await pet.update({
      nome: nome,
      genero: genero,
      altura: altura,
      cpf: cpf,
      codigo_altura: codigo
    })

    return res.status(200).json({
      msg: `Pet ${pet.codigo_pet} atualizado com sucesso!`
    })
  } catch (error) {
    console.log('Erro:', error)
    return res.status(500).json({
      msg: 'Ocorreu um erro ao atualizar o pet'
    })
  }
}

const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.cod)

    if (!pet) {
      return res.status(404).json({
        msg: 'O pet não foi encontrado'
      })
    }

    await pet.destroy();

    return res.status(200).json({
      msg: `Pet ${pet.codigo_pet} excluído com sucesso!`
    })
  } catch (error) {
    console.log('Erro:', error)
    return res.status(500).json({
      msg: 'Ocorreu um erro ao excluir o pet'
    })
  }
}

export { getPet, getPetById, createPet, updatePet, deletePet }
