module.exports = (query) =>{
    let objectSearch = {
        keyword: ""
    }

    if(query.keyword){
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");// dùng regex để tìm từ có nh loại sp cùng tên
        objectSearch.regex = regex;
    }
    return objectSearch;
}