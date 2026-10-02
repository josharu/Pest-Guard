// Preloader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".preloader").classList.add("fade-out")
  }, 1000)
})

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navLinks = document.querySelector(".nav-links")

mobileMenuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active")
  const icon = this.querySelector("i")
  if (icon.classList.contains("fa-bars")) {
    icon.classList.remove("fa-bars")
    icon.classList.add("fa-times")
  } else {
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
})
// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle")
const body = document.body
const themeIcon = themeToggle.querySelector("i")

// Check if user has a theme preference stored
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme")
  themeIcon.classList.remove("fa-moon")
  themeIcon.classList.add("fa-sun")
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme")
  if (themeIcon.classList.contains("fa-moon")) {
    themeIcon.classList.remove("fa-moon")
    themeIcon.classList.add("fa-sun")
    localStorage.setItem("theme", "dark")
  } else {
    themeIcon.classList.remove("fa-sun")
    themeIcon.classList.add("fa-moon")
    localStorage.setItem("theme", "light")
  }
})

// Navigation - only handle active class, allow default link behavior
const navLinks2 = document.querySelectorAll(".nav-link")

// Set active class based on current page
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  navLinks2.forEach((link) => {
    const linkPage = link.getAttribute("href")
    if (linkPage === currentPage) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
})

// Scroll Animation
function checkScroll() {
  const elements = document.querySelectorAll(".scroll-animation")
  const windowHeight = window.innerHeight

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    if (elementPosition < windowHeight - 100) {
      element.classList.add("animate")
    }
  })
}

window.addEventListener("scroll", checkScroll)
window.addEventListener("load", checkScroll)

// Image Upload Preview
const uploadArea = document.getElementById("uploadArea")
const uploadInput = document.getElementById("uploadInput")
const uploadPreview = document.getElementById("uploadPreview")

uploadArea.addEventListener("click", () => {
  uploadInput.click()
})

uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault()
  uploadArea.style.borderColor = "#9C27B0"
  uploadArea.style.backgroundColor = "rgba(156, 39, 176, 0.1)"
})

uploadArea.addEventListener("dragleave", () => {
  uploadArea.style.borderColor = ""
  uploadArea.style.backgroundColor = ""
})

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault()
  uploadArea.style.borderColor = ""
  uploadArea.style.backgroundColor = ""

  if (e.dataTransfer.files.length) {
    uploadInput.files = e.dataTransfer.files
    displayPreview(e.dataTransfer.files[0])
  }
})

uploadInput.addEventListener("change", () => {
  if (uploadInput.files.length) {
    displayPreview(uploadInput.files[0])
  }
})

function displayPreview(file) {
  if (file.type.startsWith("image/")) {
    const reader = new FileReader()

    reader.onload = (e) => {
      uploadPreview.src = e.target.result
      uploadPreview.style.display = "block"
      document.querySelector(".upload-icon").style.display = "none"
      document.querySelector(".upload-text").style.display = "none"
    }

    reader.readAsDataURL(file)
  }
}

// Pest Identification
const identifyBtn = document.getElementById("identifyBtn")
const describeBtn = document.getElementById("describeBtn")
const loadingSpinner = document.getElementById("loadingSpinner")
const resultContent = document.getElementById("resultContent")
const pestResult = document.getElementById("pestResult")

identifyBtn.addEventListener("click", () => {
  if (!uploadInput.files.length) {
    alert("Please upload an image first.")
    return
  }

  // Show loading spinner
  loadingSpinner.style.display = "block"
  resultContent.style.display = "none"
  pestResult.style.display = "none"

  // Simulate API call
  setTimeout(() => {
    loadingSpinner.style.display = "none"
    pestResult.style.display = "block"
  }, 2000)
})

describeBtn.addEventListener("click", () => {
  const description = document.querySelector(".description-input").value

  if (!description.trim()) {
    alert("Please enter a description of the pest.")
    return
  }

  // Show loading spinner
  loadingSpinner.style.display = "block"
  resultContent.style.display = "none"
  pestResult.style.display = "none"

  // Simulate API call
  setTimeout(() => {
    loadingSpinner.style.display = "none"
    pestResult.style.display = "block"
  }, 2000)
})

// Auth Tabs
const authTabs = document.querySelectorAll(".auth-tab")
const authForms = document.querySelectorAll(".auth-form")
const formLinks = document.querySelectorAll(".form-link")

function switchAuthTab(tabId) {
  // Remove active class from all tabs and forms
  authTabs.forEach((tab) => tab.classList.remove("active"))
  authForms.forEach((form) => form.classList.remove("active"))

  // Add active class to selected tab and form
  document.querySelector(`.auth-tab[data-tab="${tabId}"]`).classList.add("active")
  document.getElementById(`${tabId}Form`).classList.add("active")
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

// Form Validation
const loginForm = document.getElementById("loginForm")
const signupForm = document.getElementById("signupForm")

loginForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  // Simple validation
  if (!email || !password) {
    alert("Please fill in all fields.")
    return
  }

  // Simulate login
  alert("Login successful! (This is a demo)")
  this.reset()
})

signupForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const name = document.getElementById("signupName").value
  const email = document.getElementById("signupEmail").value
  const password = document.getElementById("signupPassword").value
  const confirmPassword = document.getElementById("signupConfirmPassword").value

  // Simple validation
  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.")
    return
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.")
    return
  }

  // Simulate signup
  alert("Account created successfully! (This is a demo)")
  this.reset()
  switchAuthTab("login")
})

// Hero buttons - allow default navigation
const heroButtons = document.querySelectorAll(".hero-buttons .btn")

heroButtons.forEach((button) => {
  // No preventDefault here, let the links work normally
  // Just add active class to the corresponding nav link
  button.addEventListener("click", function () {
    const targetPage = this.getAttribute("href")

    // Remove active class from all links
    navLinks2.forEach((link) => link.classList.remove("active"))

    // Add active class to corresponding nav link
    navLinks2.forEach((link) => {
      if (link.getAttribute("href") === targetPage) {
        link.classList.add("active")
      }
    })
  })
})
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active")
    })
  }

  // News scroller functionality
  const newsContainer = document.querySelector(".news-container")
  const scrollLeftBtn = document.querySelector(".scroll-left")
  const scrollRightBtn = document.querySelector(".scroll-right")

  if (newsContainer && scrollLeftBtn && scrollRightBtn) {
    const scrollAmount = 300

    scrollLeftBtn.addEventListener("click", () => {
      newsContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      })
    })

    scrollRightBtn.addEventListener("click", () => {
      newsContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    })

    // Update scroll button states
    function updateScrollButtons() {
      const isAtStart = newsContainer.scrollLeft <= 0
      const isAtEnd = newsContainer.scrollLeft + newsContainer.clientWidth >= newsContainer.scrollWidth - 1

      scrollLeftBtn.disabled = isAtStart
      scrollLeftBtn.style.opacity = isAtStart ? "0.5" : "1"

      scrollRightBtn.disabled = isAtEnd
      scrollRightBtn.style.opacity = isAtEnd ? "0.5" : "1"
    }

    newsContainer.addEventListener("scroll", updateScrollButtons)
    window.addEventListener("resize", updateScrollButtons)

    // Initial update
    updateScrollButtons()
  }

  // Search form submission
  const searchForm = document.getElementById("search-form")

  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const searchInput = this.querySelector(".search-input")
      const query = searchInput.value.trim()

      if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`
      }
    })
  }
})

// Main JavaScript for PestGuard Website

// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader")
  setTimeout(() => {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }, 500)
})

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu-btn') && !e.target.closest('.nav-links')) {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
        }}
    });
});

// Scroll Animations
function checkScroll() {
    const elements = document.querySelectorAll('.scroll-animation');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        if (elementPosition < windowHeight - 50) {
            element.classList.add('animate');
        }
    });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// Theme Toggle Function
function setupThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    // Apply current theme
    const isDarkMode = localStorage.getItem("theme") === "dark";
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      const icon = themeToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
    }
    
    // Add event listener
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const icon = themeToggle.querySelector("i");
      
      if (document.body.classList.contains('dark-theme')) {
        // Dark mode is active, show sun icon
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
      } else {
        // Light mode is active, show moon icon
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
      }
    });
  }
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  
  // Update navigation based on login state
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = localStorage.getItem("currentUser");
  
  if (isLoggedIn && currentUser) {
    const authNavLink = document.querySelector('.nav-link[href="auth.html"]');
    if (authNavLink) {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      const userName = users[currentUser]?.name || "User";
      authNavLink.innerHTML = `<i class="fas fa-user"></i> ${userName}`;
    }
  }
});

