export const adminDashboardController = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
};
