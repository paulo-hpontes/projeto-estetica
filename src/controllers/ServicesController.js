const Service = require("../models/Services");
const User = require("../models/User");

const newService = async (req, res) => {
  const { serviceType, serviceName, serviceValue } = req.body;
  const reqUser = req.user._id;

  try {
    const user = await User.findById(reqUser);
    if (!user || !user.admin) {
      return res.status(401).json({ errors: ["Usuário não autorizado!"] });
    }
    await Service.create({
      serviceType,
      serviceName,
      serviceValue,
      userName: user.name
    });
    return res
      .status(201)
      .json({ message: ["Novo serviço cadastrado com sucesso!"] });
  } catch (e) {
    console.log(e);
    return res.stauts(422).json({
      errors: ["Houve um erro inesperado, por favor tente mais tarde!"],
    });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user._id;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ errors: ["Serviço não encontrado!"] });
    }

    const user = await User.findById(reqUser);
    if (!user || !user.admin) {
      return res.status(401).json({ errors: ["Usuário não autorizado!"] });
    }

    await Service.deleteOne(service);
    return res.status(200).json({ message: "Serviço excluído com sucesso!" });
  } catch (e) {
    console.log(e);
    return res.stauts(422).json({
      errors: ["Houve um erro inesperado, por favor tente mais tarde!"],
    });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user._id;
  const { serviceName, serviceValue } = req.body;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ errors: ["Serviço não encontrado!"] });
    }

    const user = await User.findById(reqUser);
    if (!user || !user.admin) {
      return res.status(401).json({ errors: ["Usuário não autorizado!"] });
    }

    if (serviceName) service.serviceName = serviceName;
    if (serviceValue) service.serviceValue = serviceValue;

    await service.save();
    return res
      .status(200)
      .json({ service, message: "Serviço atualizado com sucesso" });
  } catch (e) {
    console.log(e);
    return res.stauts(422).json({
      errors: ["Houve um erro inesperado, por favor tente mais tarde!"],
    });
  }
};

const getAllService = async (req, res) => {
  try {
    const services = await Service.find()
      .sort([["createdAt", -1]])
      .exec();
    return res.status(200).json(services);
  } catch (e) {
    console.log(e);
    return res.stauts(422).json({
      errors: ["Houve um erro inesperado, por favor tente mais tarde!"],
    });
  }
};

const getServiceById = async (req, res) => {
  const {id} = req.params;
  try {
    const services = await Service.findById(id);
    return res.status(200).json(services);
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      errors: ["Serviço não encontrado!"],
    });
  }
};

module.exports = {
  newService,
  deleteService,
  updateService,
  getAllService,
  getServiceById
};
