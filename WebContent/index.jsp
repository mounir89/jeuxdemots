<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Navigateur Jeux de Mots</title>
<link rel="stylesheet" type="text/css" href="Css/design.css"/>
<link rel="stylesheet" type="text/css" href="Css/style.css"/>
<script src="http://code.jquery.com/jquery-2.2.2.min.js"></script>
</head>
<body>
     <% ArrayList<String> relations =(ArrayList<String>) request.getAttribute("relations"); %>
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-default">
  				<div class="panel-body">
					     <div class="form-group col-md-3">
							     <select class="form-control input-lg" id="forme" >
							     		<option>La forme </option>					             
								     <% for(String relation : relations ){ %>
								     	<option><% out.print(relation); %></option>
								     <%} %>
							     </select>
				          </div>
				        <div class="form-group col-md-9">
				          <div class="input-group">
				          <input class="form-control input-lg" placeholder="Search" type="text" id="motrechercher">
				          <span class="input-group-addon btn btn-warning input-lg" id="search"><i class="glyphicon glyphicon-search"></i></span>
				          </div>
				         </div>
  				</div>
			</div>
		
			 
		</div>
		
	</div>
</div>
<script type="text/javascript">

jQuery(function ($) {
	
	
	var mot;
	
	var forme ;
	
	$('#search').click(function(){
		
		mot = $('#motrechercher').val();

		forme = $('#forme').val();
	
		var paramRecherche = new Object();
		
		if(forme == "La forme"){
		    console.log(mot);
			paramRecherche.mot = mot;
			
			$.ajax({
				
			    url: "http://localhost:8080/JeuxdemotsV1/index",
			    type: 'POST',
		        dataType: 'json',
		        data: JSON.stringify(paramRecherche),
		        contentType: 'application/json',
		        mimeType: 'application/json',

			    success: function (data) {
			    	
			    	console.log(data);
			    	
			    	 $.each(data, function (key, value) {
			    		 console.log(key);
			    		 console.log(value);
			    	 });
			    	
			    }
			    	
			  });
		}
		
		
	});

	
	
});

</script>

<script type="text/javascript" src="Js/script.min.js"></script>
</body>
</html>






















