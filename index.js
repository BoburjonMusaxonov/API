
const kattaIshlar = document.querySelector(".kattaIshlar")
const birinchiekran = document.querySelector(".birinchiekran")
const ikkinchiEkran = document.querySelector(".ikkinchiEkran")
const askarlar = document.querySelector(".askarlar")
const btn = document.querySelector(".btn")

let oldiQisim = [];
let index = "";

const apifunksiya = async function () {
    try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories")
        const data = await res.json()
        console.log(data);
        oldiQisim = data;

        let html = "";
        data.forEach((el) => {
            html += `
        <div class="look  bg-teal-300 dark:bg-gray-800 p-8">
             <div class="">
               <h2 class="text-xl text-gray-600 dark:text-white">
                  ${el.name}
               </h2>
            </div>
            <div class="flex justify-center items-center mt-8 md:mt-24">
                <img src="${el.image}" alt="">
            </div>
        </div>`;
        });
        kattaIshlar.innerHTML = html
        const cardes = document.querySelectorAll(".look");
        console.log(cardes);

        cardes.forEach((look, idx) => {
            look.addEventListener("click", () => {
                console.log(idx);
                index = idx + 1;
                birinchiekran.classList.add("hidden");
                ikkinchiEkran.classList.remove("hidden");
                clothes();
            });
        });
    } catch (arr) {
        console.log("error");
    }
};
apifunksiya();

async function clothes() {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${index}/products`);
    const kitob = await res.json();
    console.log(kitob);

    let html = "";
    kitob.forEach((item) => {
        html += `
        <div class="w-full bg-gray-900 rounded-lg sahdow-lg p-12
           flex flex-col justify-center items-center">          
            <div class="mb-8">
              <img
                class="object-center object-cover rounded-full h-36 w-36"
                src="${item.images}"
                alt="photo"
              />
            </div>
            <div class="text-center">
              <p class="text-xl text-white font-bold mb-2">${item.title}</p>
            </div>
          </div>
        `;
    });
    askarlar.innerHTML = html;

    btn.addEventListener("click", () => {
        birinchiekran.classList.remove("hidden");
        ikkinchiEkran.classList.add("hidden");
    })
};
