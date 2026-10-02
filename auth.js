// Authentication and User Management
document.addEventListener("DOMContentLoaded", () => {
  // Apply theme on page load
  const isDarkMode = localStorage.getItem("theme") === "dark"
  if (isDarkMode) {
    document.body.classList.add("dark-theme")
    const themeToggleIcon = document.querySelector(".theme-toggle i")
    if (themeToggleIcon) {
      themeToggleIcon.classList.remove("fa-moon")
      themeToggleIcon.classList.add("fa-sun")
    }
  }

  // Initialize theme toggle
  initializeThemeToggle()

  // Check for dark mode preference
  const isDarkModeInitial = localStorage.getItem("theme") === "dark"
  if (isDarkModeInitial) {
    document.body.classList.add("dark-theme")
    const themeToggleIcon = document.querySelector(".theme-toggle i")
    if (themeToggleIcon) {
      themeToggleIcon.classList.remove("fa-moon")
      themeToggleIcon.classList.add("fa-sun")
    }
  }

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const currentUser = localStorage.getItem("currentUser")

  // If user is logged in, show logged in state
  if (isLoggedIn && currentUser) {
    const userInfo = JSON.parse(localStorage.getItem("users"))[currentUser]
    if (userInfo) {
      showLoggedInState(userInfo.name)
    }
  }

  // Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")
      const icon = themeToggle.querySelector("i")

      if (document.body.classList.contains("dark-theme")) {
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
        localStorage.setItem("theme", "dark")
      } else {
        icon.classList.remove("fa-sun")
        icon.classList.add("fa-moon")
        localStorage.setItem("theme", "light")
      }
    })
  }

  // Predefined OTP logic
  const predefinedOtp = "123456"
  let isOtpVerified = false

  // Auth Tabs Functionality
  const authTabs = document.querySelectorAll(".auth-tab")
  const authForms = document.querySelectorAll(".auth-form")
  const formLinks = document.querySelectorAll(".form-link")

  function switchAuthTab(tabId) {
    authTabs.forEach((tab) => tab.classList.remove("active"))
    authForms.forEach((form) => form.classList.remove("active"))

    document.querySelector(`.auth-tab[data-tab="${tabId}"]`).classList.add("active")
    document.getElementById(`${tabId}Form`).classList.add("active")

    const otpSection = document.getElementById("otpSection")
    const otpMessage = document.getElementById("otpMessage")
    if (otpSection) otpSection.style.display = "none"
    if (otpMessage) otpMessage.innerText = ""
  }

  authTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")
      switchAuthTab(tabId)
    })
  })

  formLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const tabId = this.getAttribute("data-tab")
      switchAuthTab(tabId)
    })
  })

  if (authTabs.length > 0 && !isLoggedIn) {
    switchAuthTab("login")
  }

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify({}))
  }

  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = document.getElementById("loginEmail").value
      const password = document.getElementById("loginPassword").value
      const loginError = document.getElementById("loginError")

      if (loginError) loginError.innerText = ""

      if (!email || !password) {
        if (loginError) loginError.innerText = "Please fill in all fields."
        return
      }

      const users = JSON.parse(localStorage.getItem("users"))
      if (users[email] && users[email].password === password) {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("currentUser", email)

        const urlParams = new URLSearchParams(window.location.search)
        const redirectUrl = urlParams.get("redirect")

        alert(`Welcome back, ${users[email].name}!`)
        this.reset()
        showLoggedInState(users[email].name)
        window.location.href = redirectUrl || "index.html"
      } else {
        if (loginError) loginError.innerText = "Invalid email or password."
      }
    })
  }

  const signupForm = document.getElementById("signupForm")
  if (signupForm) {
    const sendOtpBtn = document.getElementById("sendOtp")
    if (sendOtpBtn) {
      sendOtpBtn.addEventListener("click", () => {
        const email = document.getElementById("signupEmail").value.trim()
        const name = document.getElementById("signupName").value.trim()

        const emailError = document.getElementById("emailError")
        const nameError = document.getElementById("nameError")
        if (emailError) emailError.innerText = ""
        if (nameError) nameError.innerText = ""

        if (!email || !email.includes("@")) {
          emailError.innerText = "Enter a valid email."
          return
        }

        if (!name) {
          nameError.innerText = "Enter your name."
          return
        }

        const users = JSON.parse(localStorage.getItem("users"))
        if (users[email]) {
          emailError.innerText = "This email is already registered."
          return
        }

        isOtpVerified = false
        const otpSection = document.getElementById("otpSection")
        if (otpSection) otpSection.style.display = "block"

        const otpMessage = document.getElementById("otpMessage")
        if (otpMessage) {
          otpMessage.innerText = "✅ OTP sent to your email! (Demo OTP: 123456)"
          otpMessage.style.color = "green"
        }
      })
    }

    const verifyOtpBtn = document.getElementById("verifyOtp")
    if (verifyOtpBtn) {
      verifyOtpBtn.addEventListener("click", () => {
        const enteredOtp = document.getElementById("otp").value.trim()
        const otpError = document.getElementById("otpError")
        const otpMessage = document.getElementById("otpMessage")

        if (otpError) otpError.innerText = ""

        if (enteredOtp === predefinedOtp) {
          isOtpVerified = true
          if (otpMessage) {
            otpMessage.innerText = "✅ OTP Verified Successfully!"
            otpMessage.style.color = "green"
          }
        } else {
          if (otpError) otpError.innerText = "❌ Invalid OTP. Try again."
        }
      })
    }

    signupForm.addEventListener("submit", (event) => {
      event.preventDefault()

      let valid = true
      const name = document.getElementById("signupName").value.trim()
      const email = document.getElementById("signupEmail").value.trim()
      const password = document.getElementById("signupPassword").value.trim()
      const confirmPassword = document.getElementById("signupConfirmPassword").value.trim()

      const nameError = document.getElementById("nameError")
      const emailError = document.getElementById("emailError")
      const passwordError = document.getElementById("passwordError")
      const confirmPasswordError = document.getElementById("confirmPasswordError")
      const otpError = document.getElementById("otpError")

      if (nameError) nameError.innerText = ""
      if (emailError) emailError.innerText = ""
      if (passwordError) passwordError.innerText = ""
      if (confirmPasswordError) confirmPasswordError.innerText = ""
      if (otpError) otpError.innerText = ""

      if (name === "") {
        nameError.innerText = "Name is required."
        valid = false
      }

      if (email === "" || !email.includes("@")) {
        emailError.innerText = "Valid email is required."
        valid = false
      }

      if (password.length < 6) {
        passwordError.innerText = "Password must be at least 6 characters."
        valid = false
      }

      if (password !== confirmPassword) {
        confirmPasswordError.innerText = "Passwords do not match."
        valid = false
      }

      if (!isOtpVerified) {
        otpError.innerText = "Verify OTP before signing up."
        valid = false
      }

      if (valid) {
        const users = JSON.parse(localStorage.getItem("users"))

        if (users[email]) {
          emailError.innerText = "This email is already registered."
          return
        }

        users[email] = {
          name: name,
          password: password,
          registeredOn: new Date().toISOString(),
        }

        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("currentUser", email)

        const urlParams = new URLSearchParams(window.location.search)
        const redirectUrl = urlParams.get("redirect")

        alert("🎉 Sign-up successful! You are now logged in.")
        signupForm.reset()
        document.getElementById("otpSection").style.display = "none"
        document.getElementById("otpMessage").innerText = ""
        showLoggedInState(name)
        window.location.href = redirectUrl || "index.html"
      }
    })
  }

  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("currentUser")
      showLoginForm()
      window.location.href = "index.html"
    })
  }

  function showLoggedInState(userName) {
    const authContainer = document.querySelector(".auth-container")
    if (authContainer) {
      authContainer.innerHTML = `
        <div class="auth-card">
          <div class="user-profile">
            <div class="user-avatar">
              <i class="fas fa-user-circle"></i>
            </div>
            <h2>Welcome, ${userName}!</h2>
            <p>You are successfully logged in.<br></p><br><br>
            <div class="user-actions">
              <a href="identify.html" class="btn btn-primary">Identify Pests</a>
              <a href="#" id="logoutBtn" class="btn btn-secondary">Logout</a>
            </div>
          </div>
        </div>
      `
      const newLogoutBtn = document.getElementById("logoutBtn")
      if (newLogoutBtn) {
        newLogoutBtn.addEventListener("click", (e) => {
          e.preventDefault()
          localStorage.removeItem("isLoggedIn")
          localStorage.removeItem("currentUser")
          showLoginForm()
        })
      }
    }

    updateNavigation(true)
    initializeThemeToggle()
  }

  function showLoginForm() {
    const authContainer = document.querySelector(".auth-container")
    if (authContainer) {
      window.location.reload()
    }
    updateNavigation(false)
  }

  function updateNavigation(isLoggedIn) {
    const authNavLink = document.querySelector('.nav-link[href="auth.html"]')
    if (authNavLink) {
      if (isLoggedIn) {
        const currentUser = localStorage.getItem("currentUser")
        const users = JSON.parse(localStorage.getItem("users"))
        const userName = users[currentUser]?.name || "User"
        authNavLink.innerHTML = `<i class="fas fa-user"></i> ${userName}`
      } else {
        authNavLink.innerText = "Login/Sign Up"
      }
    }
  }

  if (isLoggedIn && currentUser) {
    updateNavigation(true)
  }
})

// Theme toggle reinit
function initializeThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle")
  if (themeToggle) {
    const newThemeToggle = themeToggle.cloneNode(true)
    themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle)

    const isDarkMode = localStorage.getItem("theme") === "dark"
    const icon = newThemeToggle.querySelector("i")

    if (isDarkMode) {
      document.body.classList.add("dark-theme")
      icon?.classList.replace("fa-moon", "fa-sun")
    } else {
      document.body.classList.remove("dark-theme")
      icon?.classList.replace("fa-sun", "fa-moon")
    }

    newThemeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")
      const toggleIcon = newThemeToggle.querySelector("i")
      if (document.body.classList.contains("dark-theme")) {
        toggleIcon.classList.replace("fa-moon", "fa-sun")
        localStorage.setItem("theme", "dark")
      } else {
        toggleIcon.classList.replace("fa-sun", "fa-moon")
        localStorage.setItem("theme", "light")
      }
    })
  }
}

function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true"
}

function protectPage() {
  if (!isAuthenticated()) {
    window.location.href = "auth.html?redirect=" + encodeURIComponent(window.location.href)
    return false
  }
  return true
}

function getCurrentUser() {
  const currentUser = localStorage.getItem("currentUser")
  if (!currentUser) return null
  const users = JSON.parse(localStorage.getItem("users") || "{}")
  return users[currentUser] || null
}