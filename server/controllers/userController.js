const getAllUsers = (req, res) => {
   res.status(200).json({
      status: "success",
      message: "This is not yet implemented",
   });
};

const getUser = (req, res) => {
   res.status(200).json({
      status: "success",
      message: "This is not yet implemented",
   });
};

const createUser = (req, res) => {
   res.status(201).json({
      status: "success",
      message: "This is not yet implemented",
   });
};

const updateUser = (req, res) => {
   res.status(200).json({
      status: "success",
      message: "This is not yet implemented",
   });
};

const deleteUser = (req, res) => {
   res.status(204).json({
      status: "success",
      message: "This is not yet implemented",
   });
};

module.exports = {
   getAllUsers,
   getUser,
   createUser,
   updateUser,
   deleteUser,
};
