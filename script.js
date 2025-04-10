// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.width = "20px"
    cursor.style.height = "20px"
    cursorFollower.style.width = "30px"
    cursorFollower.style.height = "30px"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.width = "10px"
    cursor.style.height = "10px"
    cursorFollower.style.width = "40px"
    cursorFollower.style.height = "40px"
  })

  // Hover effect for links and buttons
  const links = document.querySelectorAll("a, button, .project-card, .skill-card, .contact-card")

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.width = "20px"
      cursor.style.height = "20px"
      cursorFollower.style.width = "0"
      cursorFollower.style.height = "0"
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
    })
  })

  // Mobile navigation
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Active navigation link on scroll
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === "#" + current) {
        item.classList.add("active")
      }
    })

    // Header scroll effect
    const header = document.querySelector("header")

    if (window.scrollY > 100) {
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)"
      header.style.height = "7rem"
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
      header.style.height = "8rem"
    }

    // Back to top button
    const backToTop = document.querySelector(".back-to-top")

    if (window.scrollY > 500) {
      backToTop.classList.add("active")
    } else {
      backToTop.classList.remove("active")
    }
  })

  // Back to top button click
  document.querySelector(".back-to-top").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-bar")

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const level = bar.getAttribute("data-level")
      bar.style.width = level
    })
  }

  // Intersection Observer for skill bars
  const skillsSection = document.querySelector(".skills")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars()
        }
      })
    },
    { threshold: 0.5 },
  )

  if (skillsSection) {
    observer.observe(skillsSection)
  }

  // Project filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block"
        } else if (card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For demonstration, we'll just log it to the console
      console.log({
        name,
        email,
        subject,
        message,
      })

      // Show success message (in a real application)
      alert("Thank you for your message! I will get back to you soon.")

      // Reset the form
      this.reset()
    })
  }
})
