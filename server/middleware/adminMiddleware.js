const adminMiddleware = (req, res, next) => {

  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Admin Access Only",
    });
  }

  next();

};

export default adminMiddleware;