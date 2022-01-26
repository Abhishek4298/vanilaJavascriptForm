let userList = [];
let errorName = document.getElementById("error-name");
let errorAge = document.getElementById("error-age");
const storeUserData = () => {
  let formData = {
    id: new Date().getTime(),
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    state: document.getElementById("state").value,
  };
  // Validation
  const error = dataValidation(formData);
  if (error.name) {
    errorName.innerHTML = error.name;
  } else {
    errorName.innerHTML = "";
  }
  if (error.age) {
    errorAge.innerHTML = error.age;
  } else {
    errorAge.innerHTML = "";
  }

  if (error.name || error.age || error.state) {
    return;
  }
  userList.push(formData);
  localStorage.setItem("userData", JSON.stringify(userList));
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("state").value = "";
  displayTable();
};

const displayTable = () => {
  const table = document.getElementById("user-table-data");
  userList = JSON.parse(localStorage.getItem("userData")) || [];
  if (!userList || !userList.length) {
    table.innerHTML = "<p>No user Found</p>";
  } else {
    let userHtml = "";
    userList.forEach((user, i) => {
      userHtml += `<tr><td>${user.name}</td><td>${user.age}</td><td>${user.state}</td></tr>`;
    });
    table.innerHTML = userHtml;
  }
};

const dataValidation = (user) => {
  const error = {
    name: false,
    age: false,
    state: false,
  };

  if (user.name) {
    error.name = false;
  } else {
    error.name = "name is required";
  }

  if (user.age) {
    if (user.age < 18 && user.age > 100) {
      error.age = "Enter your correct Age";
    } else {
      error.age = false;
    }
  } else {
    error.age = "Age is required";
  }
  return error;
};
