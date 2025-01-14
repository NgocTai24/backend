module.exports = (query) => {
    let filterStatus = [
        {
            name: "Tất Cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt Động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng Hoạt Động",
            status: "inactive",
            class: ""
        }
    ]
    // kiểm tra xem bản ghi nào có status bằng với active
    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status);
        // console.log(index);
        filterStatus[index].class = "active"; // thay tên class bằng active
    }else{
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active"; // thay tên class bằng active
    }
    return filterStatus;
}