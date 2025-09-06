import { StatusCodes } from 'http-status-codes'
import { MOCK_ROLES_LEVEL_2 } from '~/model/MockDatabase_level_2'

// Level 1: đơn giản nhất và phổ biến nhất mỗi user chỉ có một quyền hạn duy nhất

// allowedPermission là một mảng các permission được phép truy cập vào api này 
const isValidPermission = (requiredPermissions) => async (req, res, next) => {
  try {
    // bước 1: phải hiểu luồng chạy của middleware RBAC sẽ luôn chạy sau authMiddleware, vì vậy đảm bảo JWT token
    // phải hợp lệ trước đã sau đó mới phân quyền
    // console.log(req.jwtDecoded)

    // Bước 2: Lấy role của user trong dữ liệu payload decoded của jwt
    // Lưu ý: tùy vào loại dự án và công ty, nếu người ta sẵn sàng hy sinh đánh về hiệu năng có thể truy cập thẳng vào db để lấy role và dữ liệu của user cũng như là permission
    const user = req.jwtDecoded

    const userRole = user?.role

    if (!userRole) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'Role does not provide' })
      return
    }
    // bước 4: dựa vào role của user rồi tìm tiếp trong database để lấy đủ thông tin của user đó
    const fullUserRole = MOCK_ROLES_LEVEL_2.find(role => role.NAME === userRole)

    if (!fullUserRole) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'Your role is not existed in the system!' })
      return
    }

    // bước 5 kiểm tra permission của user role. nếu mảng rỗng thì có nghĩa là role nào cũng truy cập được api.
    const hasPermission = requiredPermissions?.every(permission => fullUserRole.PERMISSION.includes(permission))

    if (!hasPermission) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not allowed to access this API!' })
      return
    }

    next()
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
  }
}

export const rbacMiddleware_Level_2 = {
  isValidPermission
}