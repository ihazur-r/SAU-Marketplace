// ===============================
// FORM SWITCHING
// ===============================
function setActive(id, title) {
  document.querySelectorAll(".form").forEach(f => f.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");

  const titleEl = document.getElementById("formTitle");
  if (titleEl) titleEl.innerText = title;
}

function showLogin() { setActive("loginForm", "Welcome Back"); }
function showRegister() { setActive("registerForm", "Create Account"); }
function showForgot() { setActive("forgotForm", "Forgot Password"); }
function showReset() { setActive("resetForm", "Reset Password"); }


// ===============================
// LOGIN (EMAIL OR MOBILE)
// ===============================
async function login() {
  const loginId = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  if (!loginId || !password) {
    alert("Please enter both fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ loginId, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed ❌");
      return;
    }

    alert("Login successful ✅");

    localStorage.setItem("user", loginId);
    window.location.href = "choice.html";

  } catch (err) {
    console.error(err);
    alert("Server error ❌");
  }
}


// ===============================
// REGISTER (EMAIL + MOBILE)
// ===============================
async function register() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const mobile = document.getElementById("regMobile").value.trim();
  const password = document.getElementById("regPass").value.trim();

  if (!name || !email || !mobile || !password) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, mobile, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed ❌");
      return;
    }

    alert("Registered successfully ✅");

    showLogin();

  } catch (err) {
    console.error(err);
    alert("Server error ❌");
  }
}


// ===============================
// SEND OTP (EMAIL ONLY)
// ===============================
async function sendOTP() {
  const email = document.getElementById("forgotEmail").value.trim();

  if (!email) {
    alert("Enter email");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to send OTP ❌");
      return;
    }

    alert("OTP sent to email 📩");

    // move to reset screen
    showReset();

  } catch (err) {
    console.error(err);
    alert("Server error ❌");
  }
}


// ===============================
// RESET PASSWORD
// ===============================
async function resetPassword() {
  const email = document.getElementById("forgotEmail").value.trim();
  const otp = document.getElementById("otp").value.trim();
  const newPassword = document.getElementById("newPass").value.trim();

  if (!email || !otp || !newPassword) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp, newPassword })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Password reset failed ❌");
      return;
    }

    alert("Password updated successfully ✅");

    showLogin();

  } catch (err) {
    console.error(err);
    alert("Server error ❌");
  }
}
async function resendOTP() {
  const email = document.getElementById("forgotEmail").value.trim();

  if (!email) {
    alert("Enter email first");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("New OTP sent 📩");

  } catch (err) {
    console.error(err);
    alert("Failed to resend OTP ❌");
  }
}


// ===============================
// NAVIGATION
// ===============================
function goGrab() {
  window.location.href = "grab.html";
}

function goDrop() {
  window.location.href = "drop.html";
}

// ===============================
// GOOGLE LOGIN HANDLER
// ===============================
function handleCredentialResponse(response) {
  console.log("Google JWT:", response.credential);

  // Decode JWT (basic frontend decode)
  const data = JSON.parse(atob(response.credential.split('.')[1]));

  console.log("User Info:", data);

  // Save user locally (temporary)
  localStorage.setItem("user", data.email);

  alert("Google Login Successful ✅");

  window.location.href = "choice.html";
}


// ===============================
// RESEND OTP
// ===============================
async function resendOTP() {
  const email = document.getElementById("forgotEmail").value.trim();

  if (!email) {
    alert("Enter email first");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    alert("OTP resent 📩");

  } catch (err) {
    console.error(err);
    alert("Failed to resend OTP ❌");
  }
}
