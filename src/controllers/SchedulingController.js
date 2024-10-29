const Scheduling = require("../models/Scheduling");
const User = require("../models/User");

const newScheduling = async (req, res) => {
  const { date, time } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const userName = user.name;
    const userEmail = user.email;

    if (!user) {
      return res.status(422).json({
        errors: [
          { message: ["É necessário fazer login para marcar um agendamento!"] },
        ],
      });
    }

    const newScheduling = await Scheduling.create({
      date,
      time,
      userName,
      userEmail,
    });

    return res
      .status(201)
      .json({ newScheduling, message: "Horário agendado com sucesso!" });
  } catch (e) {
    console.log(e);
    return res.stauts(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

const deleteScheduling = async (req, res) => {
  const { id } = req.params;

  try {
    const scheduling = await Scheduling.findById(id);

    if (!scheduling) {
      res
        .status(422)
        .json({ errors: [{ message: ["Agendamento não encontrado"] }] });
      return;
    }

    await Scheduling.deleteOne(scheduling);
    return res
      .status(200)
      .json({ message: "Agendamento excluído com sucesso!" });
  } catch (e) {
    console.log(e);
    return res.stauts(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

const getAllScheduling = async (req, res) => {
  try {
    const scheduling = await Scheduling.find()
      .sort([["createdAt", -1]])
      .exec();

    return res.status(200).json(scheduling);
  } catch (e) {
    console.log(e);
    return res.stauts(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

const getSchedulingById = async (req, res) => {
  const { id } = req.params;

  try {
    const scheduling = await Scheduling.findById(id);
    return res.status(200).json(scheduling);
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      errors: [{ message: ["Agendamento não encontrado!"] }],
    });
  }
};

module.exports = {
  newScheduling,
  deleteScheduling,
  getAllScheduling,
  getSchedulingById,
};
