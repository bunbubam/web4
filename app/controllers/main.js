var service = new SanPhamService();

function getEle(id) {
    return document.getElementById(id)
}

function getData() {
    service.getListProductAPI()
    //thành công
    .then(function(result){
        renderListProduct(result.data)
    })

    //thất bại
    .catch(function(error){
        console.log(error);
    })
}
getData()

function renderListProduct(list) {
    var content = "";

    for(var i = 0; i < list.length; i++) {
        content += `
            <tr>
                <td>${i+1}</td>
                <td>${list[i].tenSP}</td>
                <td>${list[i].gia}</td>
                <td>
                    <img src="./../../assets/img/${list[i].hinhAnh}">
                </td>
                <td>${list[i].moTa}</td>
                <td>
                <button id="btnEditSP" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="suaSanPham(${list[i].id})">
                    Sửa
                </button>
                <button id="btnDeleteSP" class="btn btn-danger" onclick="deleteProduct(${list[i].id})">
                    Xóa
                </button>
              </td>
            </tr>
        `
    }
    document.getElementById("tblDanhSachSP").innerHTML=content
}

getEle("btnThemSP").addEventListener("click", function() {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm"
    var footer = '<button class="btn btn-success" onclick="addProduct()">Thêm sản phẩm</button>'
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer
})


//thêm sản phẩm
function addProduct() {
    var tenSP = getEle("TenSP").value
    var giaSP = getEle("GiaSP").value
    var hinhSP = getEle("HinhSP").files[0].name //Hình dùng .files
    var motaSP = getEle("moTaSP").value

    var sanPham = new SanPham("", tenSP, giaSP, hinhSP, motaSP)

    service.addProductAPI(sanPham)
    .then(function(rs){
        console.log(rs)
        document.getElementsByClassName("close")[0].click()
        getData()
    })
    .catch(function(error){
        console.log(error);
    })
}

//Xóa sản phẩm
function deleteProduct(id) {
    service.deleteProductAPI(id)
    .then(function(){
        // alert("Xóa thành công");
        getData(); //để khỏi load lại trang
    })
    .catch(function(error){
        console.log(error);
    })
}

function suaSanPham(id) {
    document.getElementsByClassName("modal-title").innerHTML = "Sửa sản phẩm"
    var footer = `<button onclick="capNhapSP(${id})">Cập nhật</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer

    service.getListProductIDAPI(id)
    .then(function(rs){
        getEle("TenSP").value = rs.data.tenSP;
        getEle("GiaSP").value = rs.data.gia;
        getEle("HinhSP").value = rs.data.hinhAnh;
        getEle("moTaSP").value = rs.data.moTa;
    })
    .catch(function(error){
        console.log(error);
    })
}

function capNhapSP(id) {
    var tenSP = getEle("TenSP").value;
    var giaSP = getEle("GiaSP").value;
    var hinhSP = getEle("HinhSP").value;
    var motaSP = getEle("moTaSP").value;

    var sanPham = new SanPham(id, tenSP, giaSP, hinhSP, motaSP)

    service.editProductAPI(sanPham)
    .then(function(){
        alert("Cập nhật thành công")
        document.getElementsByClassName("close")[0].click()
        getData()
    })
    .catch(function(error){
        console.log(error)
    })
}

getEle("enter").addEventListener("click", function(){
    var index_1 = getEle("txtSearch").value
    service.findProdcutIDAPI(index_1)
    .then(function(rs){
        table(rs.data)
    })
    .catch(function(error){
        console.log(error)
    })
})

function table(rs) {
    var content = "";
        content += `
            <tr>
                <td>${rs.id}</td>
                <td>${rs.tenSP}</td>
                <td>${rs.gia}</td>
                <td>
                    <img src="./../../assets/img/${rs.hinhAnh}">
                </td>
                <td>${rs.moTa}</td>
                <td>
                <button id="btnEditSP" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="suaSanPham(${rs.id})">
                    Sửa
                </button>
                <button id="btnDeleteSP" class="btn btn-danger" onclick="deleteProduct(${rs.id})">
                    Xóa
                </button>
              </td>
            </tr>
        `
    document.getElementById("tblDanhSachSP").innerHTML=content
}