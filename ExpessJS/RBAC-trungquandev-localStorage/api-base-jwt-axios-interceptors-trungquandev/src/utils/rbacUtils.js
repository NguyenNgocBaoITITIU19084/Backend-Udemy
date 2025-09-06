import {MOCK_ROLES_LEVEL_3} from '../model/MockDatabase_level_3'

// Lấy tất cả permission của một role, bao gồm cả kế thừa
export const getPermissionsFromRole = async (roleName) => {
  // thực tế bước này sẽ phải vào database để lấy dữ liệu
  const role = MOCK_ROLES_LEVEL_3.find(role => role.NAME === roleName)
  // nếu không tồn tại role thì trả về mảng rỗng []
  if (!role) return []
  console.log('role', role)
  
  // xử lý hiệu xuất cao với SEt thay vì là Array
  let perrmisions = new Set(role.PERMISSION)

  // xử lý kế thừa quyền nếu như role có tồn tại field inherits
  if (Array.isArray(role.INHERITS) && role.INHERITS.length > 0) {
    for (const roleNameInherits of role.INHERITS) {
      // đệ quy lại chính function này để lấy lại toàn bộ roleName
      let permissionInherit = await getPermissionsFromRole(roleNameInherits)
      permissionInherit.forEach(i => perrmisions.add(i))
    }
  }

  // trả ngược lại array vì permissions đang ở SET object (set -> array)
  return Array.from(perrmisions)
}