const { authClientWeb} = require('../../authentication/auth.js')
const UserTable = require('../../entity/UserTable.js')
const loginUser = (req, res, next) =>{
  authClientWeb.authenticate(UserTable.ROLE_USER, async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Xử lý trường hợp thất bại
      return res.status(401).json({message: "Login failed"})
    }
    // Xử lý trường hợp thành công
     req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }
      await req.session.save();
      // Send success response and user info
      console.log("session: ", req.session); 
      console.log(user)
      return res.status(200).json({ success: true, message: 'Login successful', user: user });
    });
  })(req, res, next);
}
module.exports = {loginUser};