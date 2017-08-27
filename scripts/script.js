$(document).ready(function(){
  var money;
  var tax_incl = 0;
  var list = [];
  var listNames = [];
  var p = 0;
  var tax_rate;
  var no_of_lis = 1;

  function calculate(){

      tax_rate = $("#rate").val();

      if (tax_rate == "" || tax_rate == undefined || tax_rate !== tax_rate){

        alert("Enter an appropriate tax rate");

      }else{

        tax_rate = parseFloat(tax_rate);

        money = parseFloat($("#entry").val());

        if(money !== money){
          alert("Error! Invalid Entry")
          $("#entry").val("");
        
        }else{

          tax_incl = (money + ((tax_rate/100) * money)).toFixed(2);
        
          $("#tax_result").empty();
        
          $("#tax_result").append("<p class='stuff'>$" + money + " + " + tax_rate + "% = $" + tax_incl + "</p");
        }
      }
  };

  $("#entry_button").click(function(){
    calculate();
  })

  $("#cart").on("click", ".del", function(){
    var position = $(this).parent().attr("data-number");
    for (i = 0; i < list.length; i++) {
      if(list[i].unique == position){
        list.splice(i,1)
      }else{}
    } 
    populate();
    
  });

  $(document).on("change", "#tax_list", function(){
    var opt_val = $(this).val()
    if (opt_val != ""){
      $("#rate").prop("readOnly", true);
    }else{
      $("#rate").prop("readOnly", false)
    }
    $("#rate").val(opt_val);
      
  })

  function populate(){

    $("li").each(function(){
    
        var save = $(this).attr("data-number");
        var found = list.filter(function(obj){
          return obj.unique == save;
        });
       
        for(i=0; i<list.length; i++){
          if(list[i].unique == save){
             list[i].itemname = $(this).children("input").val();
          }else{}
        }
        
    });
    

    $("#cart").empty();
    for(i = 0; i < list.length; i++){p
    
        $("#cart").prepend("<li class='container' data-number='" + list[i].unique + "'>$" + list[i].price.toFixed(2) + "<input class='iNames' value='" + list[i].itemname + "' placeholder='Item Name'></input><button class='del'><img height='15px' width='15px' src='close_delete-128.png'></button></li><br>");
   
     }
    getTotal();
  }

  $("#entry").keyup(function(event){
       if (event.keyCode == 13){
            calculate();
       }
  });

  $("#entry").keyup(function(event){
       if (event.keyCode == 65){
            $("#add").click();
       }
  });

  $(document).keyup(function(event){
       if (event.keyCode == 76){
            $("#tax_list").focus();
       }
  });

  $("#entry").keyup(function(event){
       if (event.keyCode == 67){
            $("#clear").click();
       }
  });


  $("#add").click(function(){

    if(tax_incl !== undefined){

      function obj(name, value, identifier){
        this.itemname = name;
        this.unique = identifier
        this.price = value;
      } 
      var c = new obj("", parseFloat(tax_incl), p);
      p++;
      list.push(c);

    }else{}
   
    tax_incl = 0;
    $("#entry").val("");
    $("#tax_result").empty();

     
    populate();
  });

  $("#clear").click(function(){
    list = [];
    populate();
  });

  
  function getTotal(){
      $("#list_total").empty();
      var total = 0;
      
      for (i = 0; i < list.length; i++) {
        total = (total + list[i].price);
      };
      
      $("#list_total").append("<p class='stuff'>Total = $" + total.toFixed(2) + "</p>");
  }


});