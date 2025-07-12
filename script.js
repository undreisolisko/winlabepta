
const items = ["button1.png", "button2.png", "ring.png"];
const inventory = {};
const container = document.getElementById("falling-container");
const inventoryDiv = document.getElementById("inventory-items");
const pickaxe = document.getElementById("pickaxe");

function spawnItem() {
  const item = document.createElement("img");
  const type = items[Math.floor(Math.random() * items.length)];
  item.src = "assets/" + type;
  item.className = "falling";
  item.dataset.type = type;

  const column = Math.floor(Math.random() * 3);
  item.style.left = `${column * 33}%`;
  item.style.top = `-60px`;

  const speed = 2 + Math.random() * 2;
  let pos = -60;

  const move = () => {
    pos += speed;
    item.style.top = `${pos}px`;

    if (pos > window.innerHeight - 10) {
      container.removeChild(item);
      inventory[type] = Math.max((inventory[type] || 0) - 1, 0);
      updateInventory();
    } else {
      requestAnimationFrame(move);
    }
  };

  item.addEventListener("click", (e) => {
    pickaxe.style.left = `${e.pageX - 32}px`;
    pickaxe.style.top = `${e.pageY - 32}px`;
    pickaxe.style.display = "block";
    pickaxe.classList.add("swing");
    setTimeout(() => {
      pickaxe.classList.remove("swing");
      pickaxe.style.display = "none";
    }, 200);

    container.removeChild(item);
    inventory[type] = (inventory[type] || 0) + 1;
    updateInventory();
  });

  container.appendChild(item);
  requestAnimationFrame(move);
}

function updateInventory() {
  inventoryDiv.innerHTML = "";
  Object.entries(inventory).forEach(([type, count]) => {
    if (count > 0) {
      const div = document.createElement("div");
      div.className = "inventory-item";
      div.innerHTML = `<img src="assets/${type}" /><span>${count}</span>`;
      inventoryDiv.appendChild(div);
    }
  });
}

setInterval(spawnItem, 1000);
