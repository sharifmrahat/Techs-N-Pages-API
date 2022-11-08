module.exports = (...role) => {

    return (req, res, next) => {
      const userRole = req.user?.role;
      if(!role.includes(userRole)){
        return res.status(403).json({
            success: false,
          status: "failed",
          error: "You are not authorized to access"
        });
      }
      next();
    };
  };