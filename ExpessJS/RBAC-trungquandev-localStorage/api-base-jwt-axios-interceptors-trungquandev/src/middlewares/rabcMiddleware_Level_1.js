import { StatusCodes } from 'http-status-codes'

// Level 1: đơn giản nhất và phổ biến nhất mỗi user chỉ có một quyền hạn duy nhất

// allowedPermission là một mảng các permission được phép truy cập vào api này 
const isValidPermission = (allowedPermission) => async (req, res, next) => {
  try {
    // bước 1: phải hiểu luồng chạy của middleware RBAC sẽ luôn chạy sau authMiddleware, vì vậy đảm bảo JWT token
    // phải hợp lệ trước đã sau đó mới phân quyền 
    // console.log(req.jwtDecoded)

    // Bước 2: Lấy role của user trong dữ liệu payload decoded của jwt
    // Lưu ý: tùy vào loại dự án và công ty, nếu người ta sẵn sàng hy sinh đánh về hiệu năng có thể truy cập thẳng vào db để lấy role và dữ liệu của user cũng như là permission
    const user = req.jwtDecoded

    const userRole = user?.role

    if (!userRole || !allowedPermission.includes(userRole)) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not allowed to access this API' })
      return
    }

    next()
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
  }
}

export const rbacMiddleware_Level_1 = {
  isValidPermission
}