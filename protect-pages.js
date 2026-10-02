// Page Protection Script
document.addEventListener("DOMContentLoaded", () => {
    // Pages that require authentication
    const protectedPages = ["identify.html", "solutions.html"]
  
    // Get current page
    const currentPage = window.location.pathname.split("/").pop()
  
    // Check if current page is protected
    if (protectedPages.includes(currentPage)) {
      // Check if user is logged in
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  
      if (!isLoggedIn) {
        // Create protected notice
        const mainContent = document.querySelector("main") || document.querySelector("section:not(.auth-container)")
  
        if (mainContent) {
          // Save original content
          const originalContent = mainContent.innerHTML
  
          // Replace with protected notice
          mainContent.innerHTML = `<center>
                      <div class="auth-card">
                <div class="user-profile">
                    <h3><i class="fas fa-lock"></i> Protected Content</h3><br><br>
                    <p>You need to be logged in to access this page.</p><br><br>
                    <div class="user-actions">
                        <a href="auth.html" class="btn btn-primary">Login / Sign Up</a>
                    </div>
                </div>
            </div>
            </center>

                  `
  
          // Store original content in session storage
          sessionStorage.setItem("originalContent_" + currentPage, originalContent)
        }
      } else {
        // If user is logged in and there was stored content, restore it
        const storedContent = sessionStorage.getItem("originalContent_" + currentPage)
        const mainContent = document.querySelector("main") || document.querySelector("section:not(.auth-container)")
  
        if (storedContent && mainContent && mainContent.querySelector(".protected-notice")) {
          mainContent.innerHTML = storedContent
        }
      }
    }
  })
  
  