// service: là nơi chứa các dg đãn api
function SanPhamService() {
    this.getListProductAPI = function() {
        return axios({
            url:"https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products",
            method:"GET",
        })
    };
    //add  
    this.addProductAPI = function(product) {
        return axios({
            url:"https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products",
            method:"POST",
            data : product
        }) 
    
    };
    //Delete
    this.deleteProductAPI = function(id) {
        return axios({
            url:`https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products/${id}`,
            method:"DELETE",
        })
    };
    //Edit

    //Đầu tiên lấy thông tin cần sửa
    this.getListProductIDAPI = function(id) {
        return axios({
            url:`https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products/${id}`,
            method:"GET",
        })
    };
    //Giờ mới sửa nè
    this.editProductAPI = function(product) {
        return axios({
            url:`https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products/${product.id}`,
            method:"PUT",
            data : product
        })
    };
    //Tìm kiếm
    this.findProdcutIDAPI = function(id) {
        return axios({
            url:`https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/products/${id}`,
            method:"GET",
        })
    }
}