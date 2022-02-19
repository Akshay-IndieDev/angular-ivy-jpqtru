function addUser(){
  if($("#firstName").val() != null && $("#lastName").val != null && $("#email")){
    addToTable();
  }
}

function addToTable(){
  if($("#userTable tbody").length == 0){
    $("#userTable").append("<tbody></tbody>");
  }

  $("#userTable tbody").append("<tr>"+
  "<td>" +$("#firstName").val()+"</td>"+
  "<td>" +$("#lastName").val()+"</td>"+
  "<td>" +$("#email").val()+"</td>"+"</tr>");

}