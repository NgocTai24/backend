// button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href); // khởi tạo 1 url


    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }
            // console.log(url.href);
            window.location.href = url.href; // chuyển hướng đến các trang đó
        })
    })
};
//End button status

// TÌm Kiểm Sản Phẩm
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href); // khởi tạo 1 url để truyền tên sản phẩm vào

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href; // chuyển hướng đến các trang đó
    });
}
//  kết Thúc TÌm Kiểm Sản Phẩm
// pagination: phân trang
const buttonsPagination = document.querySelectorAll("[button-pagination]");
// console.log(buttonsPagination);
if (buttonsPagination) {
    let url = new URL(window.location.href); // khởi tạo 1 url để truyền tên sản phẩm vào

    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page", page);
            window.location.href = url.href; // chuyển hướng đến các trang đó
        })
    })

}
// pagination: phân trang

// Checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(intput => {
                intput.checked = true;
            })
        } else {
            inputsId.forEach(intput => {
                intput.checked = false;
            })
        };
    });

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
            // console.log(countChecked);
            // console.log(inputsId.length);
        })
    });
}
// End Checkbox multi

// form-change-multi
const formChangeMulti = document.querySelector("#form-change-multi");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();// để không loat lại trang
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        // tính năng xóa tất cả
        const typeChange = e.target.elements.type.value;
        if (typeChange == "delete-all") {
            const isConfirm = confirm("Bạn Có Chắn Chắn Xóa !");
            if (!isConfirm) {
                return;
            }
        };

        // console.log(typeChange);




        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name = 'ids']");

            inputsChecked.forEach(input => {
                const id = input.value;
                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name = 'position']").value;
                    // console.log(`${id}-${position}`);
                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }

            });

            // console.log(ids.join(", ")); // join: chuyển dạng mảng về dạng text 
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất một bản ghi !");
        }
    })
} else {
    // alert("khong có formChangeMulti !");
}
// End form-change-multi


// Hiển Thị thông Báo
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time)

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}
//Kết thúc Hiển Thị thông Báo

// upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        // console.log(e);
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })

    const buttonImage = document.querySelector("[button-huy ]");
    if(buttonImage){
        buttonImage.addEventListener("click", () =>{
            uploadImageInput.value="";
            uploadImagePreview.src="";
        })
    } 
}
// End upload image