const { Preference } = require("mercadopago");
const client = require("../config/apiMercadoPago");

const Payment = require("../models/Payment");

const payment = async (req, res) => {
  const preference = new Preference(client);

  const { id, unitPrice, userEmail } = req.body;

  const price = Number(unitPrice);

  try {
    const body = {
      items: [
        {
          id,
          title: "Rani Lash Designer",
          quantity: 1,
          currency_id: "BRL",
          unit_price: price,
        },
      ],
      auto_return: "all",
      back_urls: {
        success: "https://www.rannilashdesigner.com.br/success",
        failure: "https://www.rannilashdesigner.com.br/failure",
        pending: "https://www.rannilashdesigner.com.br/failure",
      },
    };

    const data = await preference.create({ body });

    await Payment.create({
      userEmail: userEmail,
      productId: id,
      paymentId: data.id,
      paymentStatus: "pending",
    });

    return res.status(201).json(data.init_point);
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

const getAllPayment = async (req, res) => {
  try {
    const data = await Payment.find()
      .sort([["createdAt", -1]])
      .exec();

    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const pay = Payment.findById(id);
    await Payment.deleteOne(pay);
    return res.status(200);
  } catch (e) {
    console.log(e);
    return res.status(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;

  try {
    const pay = await Payment.findById(id);
    if (!pay) {
      return res
        .status(404)
        .json({ errors: [{ message: ["Pagamento não encontrado!"] }] });
    }

    if (paymentStatus) pay.paymentStatus = paymentStatus;

    await pay.save();
    return res.status(200).json(pay);
  } catch (e) {
    console.log(e);
    return res.stauts(422).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde!"] },
      ],
    });
  }
};

module.exports = {
  payment,
  getAllPayment,
  deletePayment,
  updatePayment,
};
