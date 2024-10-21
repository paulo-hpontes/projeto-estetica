const DaysOff = require("../models/DaysOff");
const User = require("../models/User");

const newDayOff = async (req, res) => {
  const { date } = req.body;
  const reqUser = req.user;

  try {
    const user = await User.findById(reqUser._id);
    if (!user.admin) {
      return res
        .status(401)
        .json({ message: ["Você precisa de autorização para esta tarefa!"] });
    }

    await DaysOff.create({
      date,
      userEmail: reqUser.email,
    });

    return res
      .status(200)
      .json({ message: ["Data ficará indisponível para agendamento"] });
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      errors: [
        "Houve um erro inesperado, por favor tente novamente mais tarde!",
      ],
    });
  }
};

const removeDaysOff = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const user = await User.findById(reqUser._id);
    if (!user.admin) {
      return res
        .status(401)
        .json({ message: ["Você precisa de autorização para esta tarefa!"] });
    }

    const daysOff = DaysOff.findById(id);
    if (!daysOff) {
      return res.status(422).json({ errors: ["Data inexistente"] });
    }

    await DaysOff.deleteOne(daysOff);
    return res.status(200).json({
      message: ["Agora agendamento está disponível para este dia!"],
    });
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      errors: [
        "Houve um erro inesperado, por favor tente novamente mais tarde!",
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
        "Houve um erro inesperado, por favor tente novamente mais tarde!",
      ],
    });
  }
};

module.exports = {
  newDayOff,
  removeDaysOff,
  getAllDaysOff
};
