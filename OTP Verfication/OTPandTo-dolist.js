function showOTPPage() {
  const email = document.getElementById("email").value;
  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  // Check if the entered email matches the @gmail.com pattern
  if (gmailPattern.test(email)) {
    document.getElementById("email-page").classList.add("hidden");
    document.getElementById("otp-page").classList.remove("hidden");
    // Generate the OTP after switching to the OTP page
    generateOTP();
  } else {
    let error = document.getElementById("email-error");
    error.innerHTML = "Please enter a valid Gmail address";
    error.style.color = "red";
    // alert('Please enter a valid Gmail address (e.g., example@gmail.com)');
  }
}

// Generate the OTP
function generateOTP() {
  const otp = Math.floor(1000 + Math.random() * 9000); // it will generate the 4 digit OTP
  document.getElementById("generated-otp").innerHTML = otp;
}

// it will re-direct to the GenerateOTP method and give new OTP to the user
function resendOTP() {
  generateOTP();
}

// this function verify the enterOTP and generatedOTP
function VerifyOTP() {
  const enteredOTP =
    document.getElementById("otp1").value +
    document.getElementById("otp2").value +
    document.getElementById("otp3").value +
    document.getElementById("otp4").value;

  const generatedOTP = document.getElementById("generated-otp").innerText;

  if (enteredOTP === generatedOTP) {
    document.getElementById("user-login").innerHTML =
      "User login successfully!!!";
    document.getElementById("otp-page").classList.add("hidden");
    document.getElementById("todo-page").classList.remove("hidden");
  } else {
    document.getElementById("user-login").innerHTML =
      "Invalid OTP. Please try again.";
    alert("Invalid OTP. Please try again.");
  }

  // emptings input values after verification
  document.getElementById("otp1").value = "";
  document.getElementById("otp2").value = "";
  document.getElementById("otp3").value = "";
  document.getElementById("otp4").value = "";
}

// To-do add task logic
function addTask() {
  const task = document.getElementById("new-task").value;
  const priority = document.getElementById("task-priority").value;

  // if the input value is there it will go to if block (orelse) it will go to else block
  if (task) {
    const listItem = document.createElement("li");
    listItem.innerHTML = task + "-";

    const prioritySpan = document.createElement("span");
    prioritySpan.classList.add("priority-text");

    if (priority === "high") {
      prioritySpan.classList.add("priority-high");
      prioritySpan.innerHTML = "High Priority";
    } else if (priority === "medium") {
      prioritySpan.classList.add("priority-medium");
      prioritySpan.innerHTML = "Medium Priority";
    } else {
      prioritySpan.classList.add("priority-low");
      prioritySpan.innerHTML = "Low Priority";
    }

    listItem.appendChild(prioritySpan);

    document.getElementById("task-list").appendChild(listItem);

    document.getElementById("new-task").value = "";
  } else {
    alert("Please enter a task");
  }
}

// it will delete the all tasks
function deleteAllTask() {
  document.getElementById("task-list").innerHTML = "";
}
