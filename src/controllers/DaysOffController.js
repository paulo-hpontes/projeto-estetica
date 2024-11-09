const DaysOff = require("../models/DaysOff");
const moment = require("moment");

const newDayOff = async (req, res) => {
  const { date } = req.body;
  const user = req.user;

  try {

    if (!user.admin) {
      return res
        .status(401)
        .json({ message: ["Você precisa de autorização para esta tarefa!"] });
    }

    const newDay = await DaysOff.create({
      date,
      adminEmail: user.email,
    });

    return res.status(200).json({
      data: newDay,
      message: ["Data ficará indisponível para agendamento"],
    });
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

const removeDaysOff = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {

    if (!user || !user.admin) {
      return res
        .status(401)
        .json({ message: ["Você precisa de autorização para esta tarefa!"] });
    }

    const day = await DaysOff.findById(id);
    if (!day) {
      return res.status(422).json({ errors: ["Data inexistente"] });
    }
    await DaysOff.deleteOne(day);
    return res.status(200).json({
      data: day,
      message: [
        `Agora agendamento para o dia: ${moment(day.date).format(
          "DD-MM-YYYY"
        )} está disponível`,
      ],
    });
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

const getAllDaysOff = async (req, res) => {
  try {
    const daysOff = await DaysOff.find()
      .sort([["createdAt", -1]])
      .exec();
    return res.status(200).json(daysOff);
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

module.exports = {
  newDayOff,
  removeDaysOff,
  getAllDaysOff,
};
