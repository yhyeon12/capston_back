const url = require('url');
const AuthenticationService = require('../C_services/authentication-service');

// const BoardController = require('./board-controller');

// 회원가입
exports.signUp = async (req, res) => {
  try {
    console.log(req.body);

    await AuthenticationService.signUp(req.body)

    return res.send('<script>alert("회원가입에 성공했습니다.");history.back();</script>');
  } catch (err) {
    return res.status(500).json(err);
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const inputSno = req.body.sno;
    const inputPassword = req.body.password;

    console.log(inputSno, inputPassword)
    const response = await AuthenticationService.login(inputSno, inputPassword)

    if (response.status === 'ok') {
      console.log('로그인 성공')
      return res.cookie('token', response.token, {
        maxAge: 1000 * 60 * 60 * 24, // 1h
        httpOnly: true,
      })
        .status(200)
        .json();
    } else {
      return res.json(response);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};