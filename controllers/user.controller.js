const userService = require("../services/user.service");
const { generateToken } = require("../utils/token");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await userService.createUserService(req.body);
    const { password, ...data } = newUser.toObject();
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email & Password is not valid!" });
    }
    const user = await userService.findOneUserService({ email });

    const { password: userPassword, ...data } = user?.toObject();

    if (!user) {
      return res.status(400).json({ success: false, error: "No User Found!" });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, error: "Password is wrong" });
    }

    const token = generateToken(user);

    res.status(200).json({ success: true, data: data, token });
  } catch (error) {
    next(error);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const { email } = req.user;

    const user = await userService.findOneUserService({ email });

    const { password, ...data } = user?.toObject();

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const loggedEmail = req.user?.email;

    const loggedUser = await userService.findOneUserService({
      email: loggedEmail,
    });
    if (loggedUser.email !== loggedEmail) {
      return res
        .status(400)
        .json({
          success: false,
          error: "You're not authorized to update data",
        });
    }



    const { name, email, currentPassword, newPassword, confirmNewPassword } =
      req.body;

    const data = {
      email: loggedEmail,
      body: {
        name: name ?? loggedUser?.name,
        email: email ?? loggedEmail,
      },
    };

    if (currentPassword) {
      const isPasswordValid = loggedUser.comparePassword(
        currentPassword,
        loggedUser.password
      );

      if (isPasswordValid) {
        if (newPassword === confirmNewPassword) {
          data.body.password = bcrypt.hashSync(newPassword);
        } else {
          return res
            .status(400)
            .json({ success: false, error: "Password does not matched" });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Current password is wrong" });
      }
    }

    const updatedUser = await userService.updateOneUserService(data);

    if (!updatedUser.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Nothing has modified" });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const id = req.params?.id;
    const data = {
      _id: id,
      body: {
        role: req.body?.role,
      },
    };
    if (!data.body.role) {
      return res
        .status(400)
        .json({ success: false, error: "Please insert user role" });
    }

    const updatedRole = await userService.updateUserRoleService(data);
    res.status(200).json({ success: true, data: updatedRole });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req?.params;
    const deletedUser = await userService.deleteOneUserService(id);

    if (!deletedUser.deletedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Could not delete the user" });
    }
    res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    next(error);
  }
};
