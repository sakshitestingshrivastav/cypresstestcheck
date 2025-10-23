// Login page selectors
export const loginSelectors = {
  emailInput: 'input[type="email"], input[name="email"], #email',
  passwordInput: 'input[type="password"], input[name="password"], #password',
  loginButton: 'button[type="submit"], input[type="submit"], .login-btn, #login-btn',
  errorMessage: '.error, .alert-danger, .invalid-feedback, [role="alert"]',
  forgotPasswordLink: 'a[href*="forgot"], .forgot-password',
  rememberMeCheckbox: 'input[type="checkbox"], .remember-me',
  loadingSpinner: '.spinner, .loading, [data-testid="loading"]'
}

// Common selectors
export const commonSelectors = {
  navigationMenu: 'nav, .navbar, .navigation',
  userProfile: '.user-profile, .profile-menu, [data-testid="user-menu"]',
  logoutButton: 'button:contains("Logout"), a:contains("Logout"), .logout'
}
