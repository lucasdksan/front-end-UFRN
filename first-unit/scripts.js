const PATH = "http://localhost:3000/products/";

function mainModal() {
    const overlayModal = document.querySelector("#overlay-modal");

    return {
        init: function () {
            overlayModal.addEventListener("click", function (event) {
                if (event.target === this) {
                    this.setAttribute("data-modal-state", "false");
                }
            });
        },
        addElement: function (element) {
            const modal = overlayModal.querySelector("#modal");

            if (modal && element) {
                modal.innerHTML = "";
                modal.appendChild(element);
            }
        },
        openModal: function () {
            overlayModal.setAttribute("data-modal-state", "true");
        },
        closeModal: function () {
            overlayModal.setAttribute("data-modal-state", "false");
        }
    }
}

function btnAdd() {
    const btn = document.querySelector("#add-product");

    function formAddProduct() {
        const form = document.createElement('form');

        form.classList = "add-product-form w-full p-2";
        form.innerHTML = `
        <div class="flex flex-col space-y-2 mt-4">
            <label for="name" class="text-sm font-medium text-gray-700">Nome do Produto</label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite o nome do produto"
                class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>

        <div class="flex flex-col space-y-2 mt-4">
            <label for="category" class="text-sm font-medium text-gray-700">Categoria</label>
            <input
                type="text"
                id="category"
                name="category"
                placeholder="Ex: móveis, cama, mesa..."
                class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>

        <div class="flex flex-col space-y-2 mt-4">
            <label for="listPrice" class="text-sm font-medium text-gray-700">Preço de Lista (R$)</label>
            <input
                type="number"
                step="0.01"
                id="listPrice"
                name="listPrice"
                placeholder="Ex: 999.00"
                class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>

        <div class="flex flex-col space-y-2 mt-4">
            <label for="bestPrice" class="text-sm font-medium text-gray-700">Melhor Preço (R$)</label>
            <input
                type="number"
                step="0.01"
                id="bestPrice"
                name="bestPrice"
                placeholder="Ex: 549.00"
                class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>

        <div class="flex flex-col space-y-2 mt-4">
            <label for="url" class="text-sm font-medium text-gray-700">URL da Imagem</label>
            <input
                type="text"
                id="url"
                name="url"
                placeholder="Ex: /images/p-1.webp"
                class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>

        <div class="flex flex-col space-y-2 mt-4">
            <label for="description" class="text-sm font-medium text-gray-700">Descrição</label>
            <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Digite a descrição do produto"
                class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            ></textarea>
        </div>

        <div class="flex justify-end">
            <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
            Salvar Produto
            </button>
        </div>
        `;
        return form;
    }

    return {
        init: function (callback, callbackAddModal) {
            btn.addEventListener("click", function () {
                const form = formAddProduct();

                callbackAddModal(form);
                callback();
            });
        }
    }
}

function crudProduct() {
    const areaGallaryItems = document.querySelector("#gallary-items");
    const list = async function () {
        const response = await fetch(PATH);
        const data = await response.json();

        return data;
    };
    const createElementProduct = function (url, name, listPrice, bestPrice, category, id, index) {
        const element = document.createElement("div");

        element.className = "product-element w-[280px] py-2 px-3 flex flex-col gap-2";
        element.setAttribute("data-index", index);
        element.setAttribute("data-product-id", id);
        element.innerHTML = `
            <div class="w-full flex flex-col gap-2 relative">
                <img src="/first-unit/${url}" alt="${name}" />
                <span class="category-line font-inter font-normal font-bold text-xs leading-[120%] flex items-center tracking-[0.25em] uppercase text-[#0E663C] text-left">${category}</span>
                <div class="flex gap-2 justify-between absolute right-4 top-2">
                    <button id="edit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button id="view" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors duration-200 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <button id="delete" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors duration-200 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="w-full flex flex-col gap-1">
                <span class="font-inter font-normal font-medium text-xs leading-4 text-[#828282] text-left">${name}</span>
                <span class="font-inter text-[#828282] font-normal font-medium text-xs leading-4 pl-0 line-through">${listPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                <span class="font-inter text-black font-normal font-medium text-xl leading-[23px] pl-0">${bestPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
        `;

        return element;
    };

    return {
        init: async function () {
            const products = await list();

            products.forEach((product, index) => {
                const element = createElementProduct(product.url, product.name, product.listPrice, product.bestPrice, product.category, product.id, index);

                areaGallaryItems.appendChild(element);
            });
        },

        reset: async function() {
            const products = await list();

            products.forEach((product, index) => {
                const element = createElementProduct(product.url, product.name, product.listPrice, product.bestPrice, product.category, product.id, index);

                areaGallaryItems.appendChild(element);
            });
        },

        add: function (data) { },

        remove: function (index) {
            return fetch(`${PATH}${index}`, {
                method: 'DELETE'
            });
        },

        update: function (index, data) { },

        get: function (index) { },
    }
}

function productEvents({
    callbackGet,
    callbackRemove,
    callbackUpdate,

}) {
    const products = document.querySelectorAll("#gallary-items .product-element")

    return {
        init: function() {
            products.forEach(function(product){
                const editProduct = product.querySelector("#edit");
                const viewProduct = product.querySelector("#view");
                const deleteProduct = product.querySelector("#delete");
                const id = product.getAttribute("data-product-id");

                deleteProduct.addEventListener("click", function(){
                    const result = confirm("Tem certeza que deseja excluir este produto?");
                    if(!result) return;
                    
                    callbackRemove(id, function(){
                        product.remove();
                    });
                });
            });
        }
    }
}

function main() {
    const { init, openModal, addElement } = mainModal();
    const { init: initBtn } = btnAdd();
    const { init: initCRUDproduct, remove, update, get, reset } = crudProduct();

    init();
    initBtn(openModal, addElement);
    initCRUDproduct().then(() => {
        const { init: initProductEvents } = productEvents({
            callbackRemove: function(id, callback) {
                remove(id).then(() => {
                    callback();
                    reset();
                });
            },
            callbackUpdate: update,
            callbackGet: get
        });
        initProductEvents();
    });
}

main();