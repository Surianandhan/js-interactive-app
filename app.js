import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-storage.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "mini--drive-a96af.firebaseapp.com",
  projectId: "mini--drive-a96af",
  storageBucket: "mini--drive-a96af.firebasestorage.app",
  messagingSenderId: "31251741543",
  appId: "1:31251741543:web:2c7646b2d4b029f2a04dc2"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// 🔼 Upload
window.uploadFile = function () {
  const file = document.getElementById("fileInput").files[0];

  if (!file) {
    alert("Select a file");
    return;
  }

  const uniqueName = Date.now() + "_" + file.name;
  const storageRef = ref(storage, "files/" + uniqueName);

  uploadBytes(storageRef, file).then(() => {
    alert("Uploaded");
    loadFiles(); // refresh list
  });
};

// 📄 List Files
function loadFiles() {
  const listRef = ref(storage, "files/");
  const fileList = document.getElementById("fileList");

  fileList.innerHTML = "";

  listAll(listRef).then((res) => {
    res.items.forEach((item) => {
      const li = document.createElement("li");

      // Download
      getDownloadURL(item).then((url) => {
        li.innerHTML = `
          ${item.name}
          <button onclick="window.open('${url}')">Download</button>
          <button onclick="deleteFile('${item.fullPath}')">Delete</button>
        `;
      });

      fileList.appendChild(li);
    });
  });
}

// ❌ Delete
window.deleteFile = function (path) {
  const fileRef = ref(storage, path);

  deleteObject(fileRef).then(() => {
    alert("Deleted");
    loadFiles();
  });
};

// Load files on start
loadFiles();