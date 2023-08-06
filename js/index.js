document.addEventListener("DOMContentLoaded", () => {
  const draggableItems = document.querySelectorAll(".draggable-area__item");
  const draggableAreaContainers = document.querySelectorAll(
    ".draggable-area__container"
  );

  let draggedItem = null;
  let droppedItem = null;

  function onHandleDragStart() {
    this.classList.add("draggable-area__item--active");

    draggedItem = this;
  }

  function onHandleDragEnd() {
    this.classList.remove("draggable-area__item--active");

    draggedItem = null;
  }

  function onHandleDragOver(e) {
    e.preventDefault();
  }

  function onHandleDragEnter(e) {
    e.preventDefault();

    this.classList.add("draggable-area__container--active");
  }

  function onHandleDragLeave(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.classList.remove("draggable-area__container--active");
    }
  }

  function onHandleDraggableItemEnter(draggableItem) {
    if (draggableItem !== droppedItem) {
      droppedItem = draggableItem;
    }
  }

  function onHandleDraggableItemLeave() {
    droppedItem = null;
  }

  function onHandleDrop(e) {
    e.preventDefault();

    if (droppedItem) {
      if (droppedItem.parentElement === draggedItem.parentElement) {
        const childrenElements = Array.from(draggedItem.parentElement.children);

        const draggedItemIndex = childrenElements.indexOf(draggedItem);
        const droppedItemIndex = childrenElements.indexOf(droppedItem);

        if (draggedItemIndex > droppedItemIndex) {
          draggedItem.parentElement.insertBefore(draggedItem, droppedItem);
        } else {
          draggedItem.parentElement.insertBefore(
            draggedItem,
            droppedItem.nextElementSibling
          );
        }
      } else {
        this.insertBefore(draggedItem, droppedItem);
      }
    } else {
      this.appendChild(draggedItem);
    }

    this.classList.remove("draggable-area__container--active");
  }

  draggableItems.forEach((draggableItem) => {
    draggableItem.addEventListener("dragstart", onHandleDragStart);
    draggableItem.addEventListener("dragend", onHandleDragEnd);

    draggableItem.addEventListener("dragenter", () =>
      onHandleDraggableItemEnter(draggableItem)
    );
    draggableItem.addEventListener("dragleave", onHandleDraggableItemLeave);
  });

  draggableAreaContainers.forEach((draggableArea) => {
    draggableArea.addEventListener("dragover", onHandleDragOver);
    draggableArea.addEventListener("dragenter", onHandleDragEnter);
    draggableArea.addEventListener("dragleave", onHandleDragLeave);
    draggableArea.addEventListener("drop", onHandleDrop);
  });
});
