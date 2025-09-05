// Author: TrungQuanDev: https://youtube.com/@trungquandev
import jwt from 'jsonwebtoken'

const generateToken = (payload, secretKey, expireTime) => {
  return jwt.sign(payload, secretKey, { expiresIn: expireTime })
}

const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey)
}

const JwtProvider = { generateToken, verifyToken }

export default JwtProvider