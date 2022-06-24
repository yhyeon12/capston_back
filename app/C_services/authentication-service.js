const pool = require('../D_database/pool');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// 회원가입
// async : 비동기 -> 사람많은 사이트일 경우 사용, 순서x
exports.signUp = async (body) => {
    try {
        const salt = 10;

        const query = "INSERT INTO user SET ?";
        const dept = body.dept
        const sno = body.sno
        const name = body.name
        const account = body.account
        const password = await bcrypt.hash(body.password, salt);
        const data = {dept, sno, name, account, password}; // password 암호화 : bcrypt 라이브러리
        await pool.query(query, [data]);

        return data[0];
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
};

exports.login = async (sno, password_from_front) => {
    try {
        // ID 확인
        const query = "SELECT password FROM user WHERE sno = ?";
        const user = await pool.query(query, [sno]);
        console.log('user : ', user)
        console.log('user[0] : ', user[0])
        console.log('user[0][0] : ', user[0][0])
        
        // 해당 ID 없음
        if (!user[0][0]) {
            return { status:'error', error:'해당 id 없음' };
        } else {
            const password_from_db = Object.values(user[0][0])[0]
            console.log(password_from_db)
            // 비번 일치 검증
            if (await bcrypt.compare(password_from_front, password_from_db)) {  // 비번 일치
                const token = jwt.sign(
                    {
                        user_id: sno,
                        isLogged: true
                    }, // payload
                    "diewn~#$GJsial124nsj$%)aWgm1", // secret key 원래는 tokenConfig.SECRET_KEY
                    { expiresIn: '6h' },
                );
                return { status:'ok', token:token};
            }
            // 비번 틀림
            return { status:'error', error:'비번 틀림' }
        }
    } catch (err) {
        console.log(err);
        throw Error(err);
    }
}
