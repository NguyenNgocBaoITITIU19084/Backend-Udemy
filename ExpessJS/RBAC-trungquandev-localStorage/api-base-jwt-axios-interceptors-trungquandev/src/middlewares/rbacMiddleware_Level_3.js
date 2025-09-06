'use strict'

import { StatusCodes } from 'http-status-codes'
import { getPermissionsFromRole } from '~/utils/rbacUtils'
// Level 3: Đối với level 3 mỗi user sẽ có nhiều roles được lưu trong db
// và mỗi role trong db có thế kế thừa permission từ trong role khác

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

    if (!Array.isArray(userRole) || userRole.length === 0) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'Role does not provide' })
      return
    }
    // bước 4: dựa vào role của user rồi tìm tiếp trong database để lấy đủ thông tin của user đó
    // Đối với các tác vụ cần xử lý hiệu suất cao chúng ta nên dùng SET object để tối ưu hiệu năng (thêm/ bớt/ sửa/ xóa) hơn là sử dụng Array
    let userPermissions = new Set()
    for (const roleName of userRole) {
      const permissions = await getPermissionsFromRole(roleName)
      permissions.forEach(i => userPermissions.add(i))
    }

    console.log('permission:::', userPermissions)

    // bước 5 kiểm tra permission của user role. nếu mảng rỗng thì có nghĩa là role nào cũng truy cập được api.
    const hasPermission = requiredPermissions?.every(permission => userPermissions.has(permission))

    if (!hasPermission) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not allowed to access this API!' })
      return
    }

    next()
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'error' })
  }
}

export const rbacMiddleware_Level_3 = {
  isValidPermission
}