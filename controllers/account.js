const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const UserSchema = require("../models/account");
const config = require("config");

class Account {
  async index(req, res) {
    try {
      const user = await UserSchema.findById(req.user.id).select("-password");
      res.json(user);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error..." });
    }
  }
  async Register(req, res) {
   try {
      let { firstname, lastname, email, phone, password } = req.body;
        let user = await UserSchema.findOne({ email });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(401).json({ errors: errors.array() });
        }
        if (user) {
          return res
            .status(401)
            .json({ msg: "There is already with this email" });
        }
        const salt = await bcryptjs.genSalt(10);
        password = await bcryptjs.hash(password, salt);
        user = new UserSchema({
          firstname,
          lastname,
          email,
          phone,
          password,
        });
        await user.save();
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } catch (error) {
        // console.log(error.message);
        return res.status(500).json({ msg: "Server Error..." });
       
   }
  }
  // Login
  async Login(req, res) {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      let user = await UserSchema.findOne({ email });
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      if (!user) {
        return res.status(401).json({ msg: "There is no user on this email" });
      }
      let isPasswordMatch = await bcryptjs.compare(password, user.password);
      if (isPasswordMatch) {
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } else return res.status(401).json({ msg: "Password Wrong" });
    } catch (error) {
      //  console.log(error.message);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
  //Change password
  async Changepassword(req, res) {
    let { id, password } = req.body;
    try {
      const salt = await bcryptjs.genSalt(10);
      password = await bcryptjs.hash(password, salt);
      await UserSchema.updateOne({ _id: id }, { password: password });
      res.json({ msg: "Change Success" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error..." });
    }
  }
  // Submit Update
  async SubmitUpdate(req, res) {
    let { id, firstname, lastname, phone } = req.body;
    try {
      await UserSchema.updateOne(
        { _id: id },
        { firstname: firstname, lastname: lastname, phone: phone }
      );
      res.json({ msg: "Update profile success" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Server Error..." });
    }
  }

  //Verify OTP Phone number
  async Verify(req, res) {
    const nexmo = new Nexmo({
      apiKey: "9b22c8f1",
      apiSecret: "we2SJx3KrGZTROPm",
    });
    let Phone = "84935432561";
    var gen = await rn.generator({
      min: 1000,
      max: 9999,
      integer: true,
    });
    var code = gen();
    keyOTP.push(code);
    const from = "";
    var text = "  Send OTP " + code + "Thank You ";
    //Gửi mã OTP
    console.log(keyOTP);
    // nexmo.message.sendSms(from, Phone, text,(err,result)=>{
    //     if(err) console.log(err);
    //     console.log(parseInt(Phone,10) +   " ma xac minh   " +code);
    //     res.json({
    //         result:true,
    //         message:"Đã gửi OTP thành công"
    //     });
    //  });
    //  key_OTP se bi xoa trong vong 3 phut   =>>>>> bug then  2 acconut send OTP
    setTimeout(() => {
      keyOTP.splice(keyOTP.indexOf(code), 1);
    }, 1000 * 60);
  }
  // Get OTP
  async GetVerify(res, req) {
    if (req.isAuthenticated()) {
      let { key_OTP, number_phone } = req.body;
      if (keyOTP.indexOf(parseInt(key_OTP)) === -1) {
        res.json({
          message:
            "Vui lòng kiểu tra lại mã OTP hoặc OTP của bạn quá lâu! Bạn cần chờ 60 giây để nhập lại mã",
          result: false,
        });
      } else {
        await User.findByIdAndUpdate(
          { _id: req.user.id },
          {  number_phone: number_phone },
          (err, result) => {
            if (err) console.log(err);
            res.json({
              message: "Xác thực thành công",
              result: true,
            });
            // The key_OTP will be delete if process success
            keyOTP.splice(keyOTP.indexOf(key_OTP), 1);
          }
        );
      }
    } else {
      res.json({
        message: "Bạn cần phải đăng nhập để thực hiện chức năng này",
        result: false,
      });
    }
  }

  // FeedBack
  async Feedback(res, req) {}
  //List Feedback
  async listFeedback(res, req) {}

  //Get Information User By id
  async getInforById(res, req) {
    let id = res.params.slug;

    try {
      await UserSchema.findOne({ _id: id }, (err, result) => {
        if (err) console.log(err);
        req.json({
          result,
        });
      });
    } catch (err) {
      res.json({
        result: false,
        message: err,
      });
    }
  }
}

module.exports = new Account();
