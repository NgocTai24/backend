module.exports =  (objectPagination, query, countProduct) =>{
    if(query.page){
        objectPagination.currenPage = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currenPage -1 )*objectPagination.limitItem; // công thức tính trang

    
    const totalPage = Math.ceil(countProduct/objectPagination.limitItem); // hàm ceil để làm tròn lên
    objectPagination.totalPage = totalPage;
    return objectPagination;
}