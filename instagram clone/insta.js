document.addEventListener("DOMContentLoaded", () => {
  const postTitle = document.getElementById("postTitle");
  const postTextArea = document.getElementById("postTextArea");
  const postImage = document.getElementById("postImage");
  const CreatePost = document.getElementById("CreatePost");
  const postContainer = document.getElementById("postContainer");

  // insta post functionality logic
  CreatePost.addEventListener("click", () => {
    const postTitleInput = postTitle.value.trim();
    const postTextAreaInput = postTextArea.value.trim();
    const postImageInput = postImage.files[0];

    // check the tile and post fields. If any text and image is entered in the fields then it will go the if-block and create's the post.
    if (postTitleInput && postTextAreaInput) {
      const MainPostDiv = document.createElement("div");
      MainPostDiv.classList.add("post");

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("title");
      titleDiv.textContent = postTitleInput;

      const textAreaDiv = document.createElement("div");
      textAreaDiv.classList.add("textarea");
      textAreaDiv.textContent = postTextAreaInput;

      MainPostDiv.appendChild(titleDiv);
      MainPostDiv.appendChild(textAreaDiv);

      if (postImageInput) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const imgDiv = document.createElement("div");
          imgDiv.classList.add("image");

          const img = document.createElement("img");
          img.src = event.target.result;
          img.style.maxWidth = "100%";

          imgDiv.appendChild(img);
          MainPostDiv.appendChild(imgDiv);
        };
        reader.readAsDataURL(postImageInput);
      }
      postContainer.appendChild(MainPostDiv);

      postTitle.value = ""; // Clear title input
      postTextArea.value = ""; // Clear text area input
      postImage.value = ""; // Clear file input
    } else {
      alert("Please add tile and post message!!!");
    }
  });

  //story functionality

  const storyContainer = document.getElementById("storyItems");
  const storyImageInput = document.getElementById("storyImageInput");

  storyImageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const storyImageSrc = e.target.result;
        const storyId = "story_" + Date.now();

        const expiryTime = Date.now() + 30 * 1000;
        localStorage.setItem(
          storyId,
          JSON.stringify({ src: storyImageSrc, expiry: expiryTime })
        );

        addStoryToDOM(storyId, storyImageSrc);

        setTimeout(() => {
          document.getElementById(storyId).remove(); // after time completes we are writing a settimeout  to remove story from UI
          localStorage.removeItem(storyId); // as well as from local storage also we are removing after setTimeOut completes.
        }, 30 * 1000);
      };
      reader.readAsDataURL(file);
    }
  });

  // addStoryToDOM functionality

  function addStoryToDOM(storyId, storyImageSrc) {
    const storyDiv = document.createElement("div");
    storyDiv.classList.add("story-item");
    storyDiv.id = storyId;

    const storyInner = document.createElement("div");
    storyInner.classList.add("story-inner");

    const storeImage = document.createElement("img");
    storeImage.src = storyImageSrc;
    storeImage.classList.add("story-image");

    storyInner.appendChild(storeImage);
    storyDiv.appendChild(storyInner);

    storyContainer.appendChild(storyDiv);

    storyDiv.addEventListener("click", () => {
      openStoryModal(storyImageSrc);
    });

    //delete functionality
    /*
    const deleteStory = document.createElement('button');
    deleteStory.textContent = 'X';
    deleteStory.onclick = function(){
        storyContainer.remove(storyDiv);
    };
    storyDiv.appendChild(deleteStory);

    storyContainer.appendChild(storyDiv);
    */
  }

  // openStoryModal functionality

  function openStoryModal(imageSrc) {
    const modal = document.getElementById("storyModal");
    const fullStoryImage = document.getElementById("fullStoryImage");

    fullStoryImage.src = imageSrc;
    modal.style.display = "block";
  }

  // document.getElementById('closeModal').addEventListener('click', () =>{
  //     document.getElementById('storyModal').style.display = 'none';
  // });
  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("storyModal").style.display = "none";
  });

  Object.keys(localStorage).forEach((key) => {
    const storyData = JSON.parse(localStorage.getItem(key));
    if (storyData && storyData.expiry > Date.now()) {
      addStoryToDOM(key, storyData.src);
    } else {
      localStorage.removeItem(key);
    }
  });
});
