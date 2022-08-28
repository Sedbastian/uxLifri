function dropDown(parentsClass, size, objMenu) {
  function revealMenu(event) {
    if (event.target.children[0].style.height === "0px") {
      event.target.childNodes[0].data = `\u{25B5}  ${objMenu["Name"]}`;
      event.target.children[0].style.height = `${event.target.children[0].scrollHeight}px`;
    } else if (event.target.children[0].style.height !== "0px") {
      event.target.childNodes[0].data = `\u{25BF}  ${objMenu["Name"]}`;
      event.target.children[0].style.height = "0px";
    }
  }

  const parent = document.getElementsByClassName(parentsClass)[0];
  parent.style.height = `${2.2 * size}rem`;
  const menuContainer = document.createElement("div");
  menuContainer.addEventListener("click", revealMenu);
  menuContainer.style.display = "inline-flex";
  menuContainer.style.flexDirection = "column";
  menuContainer.style.alignItems = "center";
  menuContainer.style.fontSize = `${size}rem`;
  menuContainer.style.margin = `${size / 2}rem`;
  menuContainer.style.color = "white";
  menuContainer.style.cursor = "pointer";
  menuContainer.textContent = `\u{25BF}  ${objMenu["Name"]}`;

  const items = document.createElement("div");
  items.style.display = "flex";
  items.style.flexDirection = "column";
  items.style.borderStyle = "solid";
  items.style.borderRadius = `${size / 4}rem`;
  items.style.borderWidth = `${size / 15}rem`;
  items.style.padding = "1rem";
  items.style.backgroundColor = "black";

  for (const item of Object.keys(objMenu)) {
    if (item !== "Name") {
      const itemA = document.createElement("a");
      itemA.textContent = item;
      itemA.href = objMenu[item];
      itemA.style.textDecoration = "none";
      itemA.style.color = "#999999";
      itemA.style.cursor = "pointer";
      itemA.addEventListener("mouseenter", event => {
        event.target.style.color = "white";
      });
      itemA.addEventListener("mouseout", event => {
        event.target.style.color = "#999999";
      });
      items.appendChild(itemA);
    }
  }

  // Este itemsWrapper se necesita para q height:0 haga desaparecer todo el div,
  // sin él aparecería el padding y el border (inclusive si se usa box-sizing: border-box).

  const itemsWrapper = document.createElement("div");
  itemsWrapper.style.position = "relative";
  itemsWrapper.style.zIndex = "2";
  itemsWrapper.style.top = `${size}rem`;
  itemsWrapper.style.overflow = "hidden";
  itemsWrapper.style.height = "0px";
  itemsWrapper.style.transition = "height 1s";

  itemsWrapper.appendChild(items);
  menuContainer.appendChild(itemsWrapper);
  parent.appendChild(menuContainer);
}

function tabsAndMores(parentsClass, menuContainerClass, size, ...tabsOrMores) {
  const parent = document.getElementsByClassName(parentsClass)[0];
  parent.style.height = `${2.2 * size}rem`;
  const menuContainer = document.createElement("div");
  menuContainer.classList.add(menuContainerClass);
  parent.appendChild(menuContainer);

  tabsOrMores.forEach((element, index) => {
    if (typeof element === "object") {
      if (Array.isArray(element) === true) {
        const itemA = document.createElement("a");
        itemA.classList.add(`${menuContainerClass}Item`);
        itemA.textContent = element[0];
        itemA.href = element[1];
        itemA.style.textDecoration = "none";
        itemA.style.fontSize = `${size}rem`;
        itemA.style.margin = `${size / 2}rem`;
        itemA.style.color = "white";
        itemA.style.cursor = "pointer";
        menuContainer.appendChild(itemA);
      } else {
        dropDown(menuContainerClass, size, element);
      }
    } else {
      console.log(`Wrong typeof ${element}, index: ${index}`);
    }
  });
}

function imageSlider(parentsClass, pictureFramePxWidth, ...imagesFiles) {
  let imageShowingIndex = 0;

  function translateLeft() {
    if (imageShowingIndex === 0) {
      return;
    }

    const dotToUnMark = document.querySelector(
      `[data-dotnumber="${imageShowingIndex}"]`
    );
    dotToUnMark.textContent = "\u{25C7}";

    const dotToMark = document.querySelector(
      `[data-dotnumber="${imageShowingIndex - 1}"]`
    );
    dotToMark.textContent = "\u{25C8}";

    const imageShowing = document.querySelector(
      `[data-imagenumber="${imageShowingIndex}"]`
    );
    const imageToShow = document.querySelector(
      `[data-imagenumber="${imageShowingIndex - 1}"]`
    );

    const translateImagesDivPx = parseInt(
      imageShowing.width / 2 + imageToShow.width / 2
    );
    // Se hace el slice para q funcione el parseInt
    const alreadyTranslatedPx = parseInt(imagesDiv.style.transform.slice(10));

    imagesDiv.style.transform = `translate(${alreadyTranslatedPx +
      translateImagesDivPx +
      2 * singleImagePxMargin}px)`;

    imageShowingIndex -= 1;
    set5sInterval();
  }

  function translateRight() {
    if (imageShowingIndex === imagesFiles.length - 1) {
      translateToDot(0);
      return;
    }

    const dotToUnMark = document.querySelector(
      `[data-dotnumber="${imageShowingIndex}"]`
    );
    dotToUnMark.textContent = "\u{25C7}";

    const dotToMark = document.querySelector(
      `[data-dotnumber="${imageShowingIndex + 1}"]`
    );
    dotToMark.textContent = "\u{25C8}";

    const imageShowing = document.querySelector(
      `[data-imagenumber="${imageShowingIndex}"]`
    );
    const imageToShow = document.querySelector(
      `[data-imagenumber="${imageShowingIndex + 1}"]`
    );

    const translateImagesDivPx = parseInt(
      imageShowing.width / 2 + imageToShow.width / 2
    );
    // Se hace el slice para q funcione el parseInt
    const alreadyTranslatedPx = parseInt(imagesDiv.style.transform.slice(10));

    imagesDiv.style.transform = `translate(${alreadyTranslatedPx -
      translateImagesDivPx -
      2 * singleImagePxMargin}px)`;

    imageShowingIndex += 1;
    set5sInterval();
  }

  function translateToDot(dotNumber) {
    const moveNimages = dotNumber - imageShowingIndex;
    if (moveNimages > 0) {
      const previousDot = document.querySelector(
        `[data-dotnumber="${imageShowingIndex}"]`
      );
      previousDot.textContent = "\u{25C7}";
      const nextDot = document.querySelector(`[data-dotnumber="${dotNumber}"]`);
      nextDot.textContent = "\u{25C8}";
      for (let i = 0; i < moveNimages; i++) {
        translateRight();
      }
    }
    if (moveNimages < 0) {
      const previousDot = document.querySelector(
        `[data-dotnumber="${imageShowingIndex}"]`
      );
      previousDot.textContent = "\u{25C7}";
      const nextDot = document.querySelector(`[data-dotnumber="${dotNumber}"]`);
      nextDot.textContent = "\u{25C8}";
      for (let i = 0; i > moveNimages; i--) {
        translateLeft();
      }
    }

    imageShowingIndex = parseInt(dotNumber);
    set5sInterval();
  }

  let intervalID;
  function set5sInterval() {
    clearInterval(intervalID);
    intervalID = setInterval(translateRight, 5000);
  }

  const imageSliderDiv = document.createElement("div");
  imageSliderDiv.style.display = "flex";
  imageSliderDiv.style.flexDirection = "column";
  imageSliderDiv.style.alignItems = "center";
  imageSliderDiv.style.margin = "1rem";

  const pictureFrameAndArrowsContainer = document.createElement("div");
  pictureFrameAndArrowsContainer.style.display = "flex";
  pictureFrameAndArrowsContainer.style.alignItems = "center";

  const divArrowLeft = document.createElement("div");
  divArrowLeft.textContent = "\u{25C0}";
  divArrowLeft.style.padding = "0.5rem";
  divArrowLeft.style.cursor = "pointer";
  divArrowLeft.addEventListener("click", translateLeft);
  pictureFrameAndArrowsContainer.appendChild(divArrowLeft);

  const pictureFrame = document.createElement("div");
  pictureFrameAndArrowsContainer.appendChild(pictureFrame);
  pictureFrame.style.width = `${pictureFramePxWidth}px`;
  pictureFrame.style.overflow = "hidden";
  pictureFrame.style.borderStyle = "solid";
  pictureFrame.style.display = "flex";

  const divArrowRight = document.createElement("div");
  divArrowRight.textContent = "\u{25B6}";
  divArrowRight.style.padding = "0.5rem";
  divArrowRight.style.cursor = "pointer";
  divArrowRight.addEventListener("click", translateRight);
  pictureFrameAndArrowsContainer.appendChild(divArrowRight);

  const imagesDiv = document.createElement("div");
  imagesDiv.style.display = "flex";
  imagesDiv.style.height = "50vh";
  imagesDiv.style.transition = "transform 1s";

  const dots = document.createElement("div");
  dots.style.display = "flex";

  const singleImagePxMargin = 20;

  imagesFiles.forEach((image, index) => {
    const singleImage = document.createElement("img");
    singleImage.classList.add("imageUxLifri");
    singleImage.src = image;
    singleImage.dataset.imagenumber = `${index}`;
    singleImage.style.margin = `${singleImagePxMargin}px`;
    if (index === 0) {
      singleImage.classList.add("showing");
    }
    imagesDiv.appendChild(singleImage);

    const dot = document.createElement("div");
    dot.dataset.dotnumber = `${index}`;
    if (index === 0) {
      dot.textContent = "\u{25C8}";
    } else {
      dot.textContent = "\u{25C7}";
    }
    dot.style.fontSize = "1.5rem";
    dot.style.cursor = "pointer";
    dot.addEventListener("click", event => {
      translateToDot(event.target.dataset.dotnumber);
    });
    dots.appendChild(dot);
  });

  pictureFrame.appendChild(imagesDiv);

  imageSliderDiv.appendChild(pictureFrameAndArrowsContainer);
  imageSliderDiv.appendChild(dots);

  parent = document.querySelector(`.${parentsClass}`);
  parent.appendChild(imageSliderDiv);

  window.addEventListener("load", () => {
    const firstImage = document.querySelector('[data-imagenumber="0"]');
    imagesDiv.style.transform = `translate(${pictureFramePxWidth / 2 -
      singleImagePxMargin -
      firstImage.width / 2}px)`;
  });

  set5sInterval();
}

export { dropDown, tabsAndMores, imageSlider };
