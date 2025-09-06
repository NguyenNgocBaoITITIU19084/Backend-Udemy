
export const MOCK_ROLES_LEVEL_3 = [
  {
    ID: '1',
    NAME: 'client',
    PERMISSION: [
      'create_message',
      'read_message',
      'update_message',
      'delete_message'
    ],
    INHERITS: []
  },
  {
    ID: '2',
    NAME: 'moderator',
    PERMISSION: [
      // 'create_message',
      // 'read_message',
      // 'update_message',
      // 'delete_message',

      // support
      'create_support',
      'read_support',
      'update_support',
      'delete_support'
    ],
    INHERITS: ['client']
  },
  {
    ID: '3',
    NAME: 'admin',
    PERMISSION: [
      // 'create_message',
      // 'read_message',
      // 'update_message',
      // 'delete_message',

      // support
      // 'create_support',
      // 'read_support',
      // 'update_support',
      // 'delete_support',

      // admin-tools
      'create_admin_tools',
      'read_admin_tools',
      'update_admin_tools',
      'delete_admin_tools'
    ],
    INHERITS: ['client', 'moderator']
  }
]

export const MOCK_USER_DATABASE_LEVEL_3 = {
  ID: 'trungquandev-sample-id-12345678',
  EMAIL: 'trungquandev.official@gmail.com',
  PASSWORD: 'trungquandev@123',
  //level: 2 vaf 1
  // ROLE: 'client'

  // level_3
  // ROLE: ['client'] // lưu ý role phải là unique và trùng với name ở mock role
  ROLE: ['moderator']
  // ROLE: ['admin']
  // ROLE: ['admin', 'client', 'moderator']
}