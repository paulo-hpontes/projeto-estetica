const Scheduling = require("../models/Scheduling");
const User = require("../models/User");
const moment = require('moment');

const newScheduling = async (req, res) => {
  const { title, start, end, service, userEmail } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(422).json({
        errors: [
          { message: ["É necessário fazer login para marcar um agendamento!"] },
        ],
      });
    }

    const scheduling = await Scheduling.find();
    if (scheduling) {
      const verify = scheduling.filter((el) => {
        if (
          moment(start) >= moment(el.start) &&
          moment(start) < moment(el.end)
        ){
          return el;
        }else if(
          moment(end) >= moment(el.start) &&
          moment(end) <= moment(el.end)
        ){
          return el;
        }
      });

      if (verify.length) {
        return res.status(400).json({
          errors: [{ message: ["Horário indisponível!"] }],
        });
      }
    }

    const newData = await Scheduling.create({
      title,
      start,
      end,
      service: {
        typeService: service.type,
        nameService: service.name,
      },
      userEmail,
    });
    return res
      .status(201)
      .json({ newData, message: ["Horário agendado com sucesso!"] });
  } catch (e) {
    console.log(e);
    return res.status(422).json({
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
    return res.status(200).json({
      data: scheduling,
      message: ["Agendamento excluído com sucesso!"],
    });
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
