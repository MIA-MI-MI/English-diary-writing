export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { isValid: boolean; message: string } {
  if (password.length < 8) {
    return {
      isValid: false,
      message: '密码至少需要 8 个字符',
    }
  }

  return {
    isValid: true,
    message: '',
  }
}

export function validateNickname(nickname: string): { isValid: boolean; message: string } {
  if (nickname.length === 0) {
    return {
      isValid: true,
      message: '',
    }
  }

  if (nickname.length > 100) {
    return {
      isValid: false,
      message: '昵称不能超过 100 个字符',
    }
  }

  return {
    isValid: true,
    message: '',
  }
}