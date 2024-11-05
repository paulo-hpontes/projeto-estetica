const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(422)
      .json({ errors: [{ message: ["E-mail já cadastrado!"] }] });
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
    });

    return res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id),
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde"] },
      ],
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ errors: [{ message: ["Usuário não encontrado!"] }] });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(422)
        .json({ errors: [{ message: ["Senha inválida."] }] });
    }

    return res.status(200).json({
      _id: user._id,
      token: generateToken(user._id),
      admin: user.admin,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde"] },
      ],
    });
  }
};

const getCurrentUser = async (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res
      .status(404)
      .json({ errors: [{ message: ["Usuário não encontrado!"] }] });
  }
};

const updateAdminUser = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const verifyUser = await User.findById(reqUser._id);
    const user = await User.findById(id);

    if (!verifyUser.admin) {
      return res.status(422).json({
        errors: [
          { message: ["Você precisa de autorização para esta tarefa!"] },
        ],
      });
    } 

    if (!user) {
      return res.status(422).json({
        errors: [{ message: ["Usuário não encontrado!"] }],
      });
    }

    if (user.admin === false) {
      user.admin = true;
    } else {
      user.admin = false;
    }
    await user.save();
    return res
      .status(200)
      .json({ message: "Administrador atualizado com sucesso!" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errors: [
        { message: ["Houve um erro inesperado, por favor tente mais tarde"] },
      ],
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  getUserById,
  updateAdminUser,
};
