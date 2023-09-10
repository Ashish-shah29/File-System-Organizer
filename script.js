// $(document).ready(function () {
//   $("#executeBtn").click(function () {
//     const folderPath = $("#folderPath").val().trim();

//     if (!folderPath) {
//       alert("Please enter a valid folder path.");
//       return;
//     }

//     // Send the folderPath to the backend for processing
//     $.ajax({
//       url: "http:localhost:3000/organizeFiles",
//       method: "POST",
//       data: { folderPath: folderPath },
//       success: function (response) {
//         $("#output").text(response);
//       },
//       error: function (error) {
//         $("#output").text("Error: " + error.responseText);
//       },
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const executeBtn = document.getElementById("executeBtn");
  const folderPathInput = document.getElementById("folderPath");
  const outputDiv = document.getElementById("output");

  executeBtn.addEventListener("click", function () {
    const folderPath = folderPathInput.value.trim();

    if (!folderPath) {
      alert("Please enter a valid folder path.");
      return;
    }

    // Send the folderPath to the backend for processing using Axios
    axios
      .post("/organizeFiles", { folderPath: folderPath })
      .then((response) => {
        outputDiv.textContent = response.data;
      })
      .catch((error) => {
        outputDiv.textContent = "Error: " + error.response.data;
      });
  });

  // Programmatic trigger of click event on page load
  executeBtn.click();
});
