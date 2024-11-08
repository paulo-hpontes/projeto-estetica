const Service = require("../models/Services");

const newService = async (req, res) => {
  const { serviceType, serviceName, serviceValue, time } = req.body;
  const user = req.user;

  try {

    if (!user || !user.admin) {
      return res
        .status(401)
        .json({ errors: [{ message: ["Usuário não autorizado!"] }] });
    }
    const data = await Service.create({
      serviceType,
      serviceName,
      serviceValue,
      time,
      userName: user.name,
    });
    return res
      .status(201)
      .json({ data, message: ["Novo serviço cadastrado com sucesso!"] });
  } catch (e) {
    console.log(e);
    return res.stauts(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(404)
        .json({ errors: [{ message: ["Serviço não encontrado!"] }] });
    }


    if (!user || !user.admin) {
      return res
        .status(401)
        .json({ errors: [{ message: ["Usuário não autorizado!"] }] });
    }
    
    await Service.deleteOne(service);
    return res
      .status(200)
      .json({ service, message: ["Serviço excluído com sucesso!"] });
  } catch (e) {
    console.log(e);
    return res.stauts(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { serviceName, serviceValue } = req.body;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(404)
        .json({ errors: [{ message: ["Serviço não encontrado!"] }] });
    }

    if (!user || !user.admin) {
      return res
        .status(401)
        .json({ errors: [{ message: ["Usuário não autorizado!"] }] });
    }

    if (serviceName) service.serviceName = serviceName;
    if (serviceValue) service.serviceValue = serviceValue;

    await service.save();
    return res
      .status(200)
      .json({ service, message: ["Serviço atualizado com sucesso"] });
  } catch (e) {
    console.log(e);
    return res.stauts(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
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
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const services = await Service.findById(id);
    return res.status(200).json(services);
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      errors: [{ message: ["Serviço não encontrado!"] }],
    });
  }
};

module.exports = {
  newService,
  deleteService,
  updateService,
  getAllService,
  getServiceById,
};
