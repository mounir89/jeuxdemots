

Highcharts.Renderer.prototype.symbols.vline = function(x, y, width, height) {
    
    return ['M',x ,y + width / 2,'L',x+height,y + width / 2];
};

/**
 * Définir la couleur pour chaque valeur de la fiabilité
 * @param reliability
 * @param minvalue
 * @param maxvalue
 * @returns {String}
 */

function getColorbyReliability(reliability, minvalue, maxvalue){
    var colorResult = "";
    minvalue = (minvalue == undefined )? 0: minvalue;
    maxvalue = (maxvalue == undefined )? 1: maxvalue;
    
    var interval = (maxvalue - minvalue)/10;
    if(reliability < minvalue +(1 * interval)){
        colorResult = '#F7060E';
    }
    else if(reliability < minvalue +(2 * interval)){
        
         colorResult = '#DC5E77';
    }
    else if(reliability < minvalue +(3 * interval)){
       
         colorResult = '#EC4343';
    
    }
    else if(reliability < minvalue +(4 * interval)){
         
        
       colorResult ='#770202';
    }
     else if(reliability < minvalue +(5 * interval)){
        colorResult = '#F7B34E';
        
    }
     else if(reliability < minvalue +(6 * interval)){
        colorResult = '#EFA73E';
        
    }
     else if(reliability < minvalue +(7 * interval)){
        colorResult = '#C17C15';
        
    }
     else if(reliability < minvalue +(8 * interval)){
        colorResult = '#FF9800';
        
    }
     else if(reliability < minvalue +(9 * interval)){
        colorResult = '#35A255';
        
    }
    
        else {
        colorResult = '#036115';
    }
    
    
    return colorResult;
    }

	function calculerInterval(max, min)
	{
	    var valeurIntervale = (max - min);
	    
	    return valeurIntervale;
	}

   /**
    * Afficher le graphe 
    * @param nameFile
    */

    function showgraphVisualisation(nameFile){
    
    var options = {
        chart: {
            renderTo: 'garphic',
            type: 'scatter',
            zoomType: 'xy',
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF ',
            borderWidth: 2,
            height: 500,
            width: 1072,
            ignoreHiddenSeries: true
        },
        title: {
            text: 'Best Experience',
               style: {
                   color: '#000',
                   fontWeight: 'bold',
                   fontSize: "20px"

                }
        },
        xAxis: {
            max: 100,
            title: {
                text: 'E-Factor (%)',
             style: {
                   color: '#00000',
                   fontWeight: 'bold',
                   fontSize: "20px"

                }
            },
            categories: []
        },
        yAxis: {
        	min: 0,
            title: {
                text: 'Glucose Yield (kg)',
                  style: {
                   color: '#000000',
                   fontWeight: 'bold',
                   fontSize: "20px"

                }
            },
            

            categories1: []

        },

        legend: {
      
         title: {
         text: "Biorefinery process | Index de fiabilite",
         style: {  

                   color: '#000000',
                   fontWeight: 'bold',
                   fontSize: '15px',
                   margin:'40px'

                }
           },
   
     
            x:50,
            margin:20,
            width: 1050,
            align: 'left',
            x: 70, 
            itemWidth: 80,
            borderWidth: 0
        },

     
        navigation: {
                 buttonOptions: {
                height: 40,
                width: 48,
                symbolSize: 24,
                symbolX: 23,
                symbolY: 21,
                symbolStrokeWidth: 2,
                  theme: {
                    'stroke-width': 4,
                  
                           
                    width:1000,
                    r: 2,

                    states: {
                        hover: {
                            fill: '#000'
                        },
                        select: {
                            stroke: '#FF9800',
                            fill: 'pink'
                        }
                    }
                }}
        },
    
    series: []
    };
    options.plotOptions = {
        
        series: {
            events: {
                legendItemClick: function(event) {
                     var evenementselectionne = this.name.trim();
                    
                     var topic="pm";
	                 if (evenementselectionne==topic)
	                 {
	                     var  serie= options.series[4];
	                 
	                        Modificationserie(serie[4]);
	                    
	                          
	                  }
             
                      return false;
                            
                }
            },
                point: {
                    
                    events: {
                        click: function () {
                            
                            $.ajax({
         			           type: 'GET',
         			           url: './LienDocument.jsp?numerodocument='+this.numDoc,
         			           timeout: 9000,
         			           success: function (data) {
         			           
                               location.href = data;
                                  
         			           }
         			         });
                           },
                           remove: function () {
                            if (!confirm('Do you really want to remove the first point?')) {
                                return false;
                            }
                           }
                    }
                }
        },

        scatter: {
            marker: {
                radius: 10,
                states: {
                    hover: {
                        enabled: false,
                        lineColor: 'rgb(100,100,00)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false,


                    }
                }
            }
     
            
        }
    
    };
       
    var userID = sessionStorage.getItem("userID");
    
    var chemin = 'http://localhost:5355/TERWEB2016/DirectoryUsers/'.concat(userID).concat('/').concat(nameFile).concat(userID).concat('.csv');
   
    /**
     * Chargement du fichier correspondant au calcul de l'efactor
     */
    
    $.get(chemin, function(data) {
   
    	var lines = data.split('\n');
	        
    	 Highcharts.Renderer.prototype.symbols.hline= function(x, y, width, height, obj1, obj2) {
	           return ['M',x ,y + width / 2,'L',x+height,y + width / 2];
	     };
	     var datapm = {
		        name:" pm",
		        color:'#01A9DB',
		        data: [],
		        marker: {
		                symbol: 'triangle',
		             
		                  radius: 13
		            
		            }
	    };
	    var datapmfiabilite =  {
		        name:" pm_fiabilite",
		        color: 'rgba(0, 245, 30, 1)',
		        data: [],
		        datapmteste:[],
		        showInLegend: false,
		        marker: {
		                symbol: 'triangle',
		                  radius: 19
		            
		            }
	     };
	     var datapm_ufm = {
		        name:" pm_ufm",
		        color: '#01A9DB',
		        data: [],
		        marker: {
		                symbol: 'diamond',
		                  radius: 13
		            
		            }
		 };
         var datapmufmfiabilite =  {
		        name:" pm",
		        data: [],
		        showInLegend: false,
		        marker: {
		                symbol: 'diamond',
		                  radius: 19
		            
		            }
		 };
	     var datapm_pc_ufm_ps = {
		        name:" pm_pc_ufm_ps",
		        data: [],
		        marker: {
		                symbol: 'square',
		                  radius: 13
		            
		            }
		 };
	     var datapmufmpsfiabilite =  {
		        name:" pm_pc_ufm_ps",
		        id: "ikbal",
		        data: [],
		        showInLegend: false,
		        marker: {
		                symbol: 'square',
		                  radius: 19
		            
		            }
	     };
	     var datapm_pc_ps = {
	        
	        name:" pm-pc-ps",
	        data: [],
	        marker: {
	                symbol: 'circle',
	                  radius: 13
	            
	       }
	     };
	     var datalinepmx= {
		        name:" pm-x",
		        showInLegend: false,
		        data: [],
		        marker:{
		        symbol:'hline',
		            lineColor:'#c00',
		            lineWidth:1
		        }
	        
	    
	      };
	        var datalinepmufmx= {
		        name:" pm-ufm",
		        color:'rgba(0,0,0, 1)',
		        showInLegend: false,
		        data: [],
		        marker:{
		        symbol:'hline',
		            lineColor:'#c00',
		            lineWidth:1
		        }
		        
	    
	       };
	       var datalinepmpcpsx= {
	                name:" pm-pc-ps",
	              
	                 showInLegend: false,
	
	                data: [],
	                marker:{
	                symbol:'hline',
	                    lineColor:'#c00',
	                    lineWidth:1
	                }
	        
	    
	        };
	        var datalinepmpcufmpsx= {
	                name:" pm-pc-ps",
	                color:'rgba(0,0,0, 1)',
	                 showInLegend: false,
	
	                data: [],
	                marker:{
	                symbol:'hline',
	                    lineColor:'#c00',
	                    lineWidth:13
	                }
	        };
	        var datalineV = {
	                name:" pm-pc-ps",
	                color:'rgba(0,0,0, 1)',
	                showInLegend: false,
	
	                data: [],
	                marker:{
	                symbol:'vline',
	                    lineColor:'#c00',
	                    lineWidth:1
	                }
	        };
	        var couleur01 = 
	                {
	                    name:" 0.1",
	                    data: [],
	                    color: '#F7060E',
	                    marker :{
	                        symbol :'circle',
	                        radius:7
	                        
	                        }
	        };
	        var couleur02 = 
	                {
	                    name:" 0.2",
	                    data: [],
	                    color:'#DC5E77',
	                    marker :{
	                        symbol :'circle',
	                        radius:7
	                        }
	         };
	         var couleur03 = 
	                {
	                    name:" 0.3",
	                    data: [],
	                    color: '#EC4343',
	                    marker :{
	                        symbol :'circle',
	                        radius:7
	                        }
	          };
	          var couleur04 = 
	                {
	                    name:" 0.4",
	                    data: [],
	                    color: '#B92D2D',
	                    marker :{
	                        symbol :'circle',
	                        radius:7
	                        }
	          };
	          var couleur05 = 
	                {
	                    name:" 0.5",
	                    data: [],
	                    color:  '#F7B34E',
	                    marker :{
	                        symbol :'circle',
	                        radius:7
	                        }
	           };
	           var couleur06 = 
	                {
	                    name:" 0.6",
	                    data: [],
	                    color: '#FF9800',
	                    marker :{
	                        symbol :'circle',
	                        radius:7
	                        }
	            };
	            var couleur07 = 
	                {
	                    name:" 0.7",
	                    data: [],
	                    color: '#C17C15',
	                    marker :{
	                        symbol :'circle',
	                        radius:7
	                        }
	             };
	             var couleur08 = 
	                {
	                    name:" 0.8",
	                    data: [],
	                    color: '#60CA4E',
	                    marker :{
	                        symbol :'circle',
	                        radius:7
	                        }
	             };
	             var couleur09 = 
	                {
	                    name:" 0.9",
	                    data: [],
	                    color: '#35A255',
	                    marker :{
	                        symbol :'circle',
	                        radius:7
	                        }
	             };
	             var couleur010 = 
	                {
	                    name:" 1",
	                    data: [],
	                    color: '#036115',
	                    marker :{
	                        symbol :'circle',
	                        radius:7
	                        }
	             };
	             var datapmpcpsfiabilite =  {
				        name:" pm",
				        data: [],
				        datapm_pc_ps_fiabilite: [],
				        showInLegend: false,
				        marker: {
				                symbol: 'circle',
				                  radius: 15
				            
				            }
			      };
	    
	    
	    $.each(lines, function(lineNo, line) { 
	        line = line.replace(/['"]+/g, '');
	        var items = line.split(',');
	       
	        if (lineNo == 0) {
	       
	            $.each(items, function(itemNo, item) {
	                if (itemNo == 10 ) options.xAxis.categories.push(item); 
	            });
	            $.each(items, function(itemNo, item) {
	                
	
	                if (itemNo == 11 ) options.yAxis.categories1.push(item);
	            });
	        }else {
	        	alert(getColorbyReliability(parseFloat(items[10])));
	        	
	            switch (items[0])
	            {
	            
	                 case "Bioref-PM":
	                   datapm.data.push(
	                         {
	                        	
	                            color:getColorbyReliability(parseFloat(items[10])),
	                            
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            
	                            x: parseFloat(items[14]),
	                            y: parseFloat(items[15]),
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min : parseFloat(items[7]),
	                            Glucose_max : parseFloat(items[8]),
	                            E_factore_Min : parseFloat(items[12]),
	                            E_factore_Max : parseFloat(items[13]) 
	                        }
	                    );
	                  datalinepmx.data.push( 
	                        {
	                            x: parseFloat(items[10]),
	                            color: getColorbyReliability(parseFloat(items[12])),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            
	                            y: parseFloat(items[11]),
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min: parseFloat(items[6]),
	                            Glucose_max: parseFloat(items[7]),
	                            E_factore_Min: parseFloat(items[8]),
	                            E_factore_Max: parseFloat(items[9]),
	                            
	                            marker: { fillColor: '#BF0B23', radius: calculerInterval( parseFloat(items[9]), parseFloat(items[8]))*8}
	                        }
	                    );
	                    
	                 
	                       datalineV.data.push( 
	                        {
	                            x: parseFloat(items[10]),
	                            color: getColorbyReliability(parseFloat(items[12])),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            
	                            y: parseFloat(items[11]),
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min: parseFloat(items[6]),
	                            Glucose_max: parseFloat(items[7]),
	                            E_factore_Min: parseFloat(items[8]),
	                            E_factore_Max: parseFloat(items[9]),
	                            marker: { fillColor: '#BF0B23', radius: calculerInterval( parseFloat(items[6]), parseFloat(items[7]))}
	                        }
	                    );
	                    datapmfiabilite.data.push( 
	                        {
	                            color: getColorbyReliability(parseFloat(items[9])),
	                            x: parseFloat(items[14]),
	                            y: parseFloat(items[15]),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min : parseFloat(items[7]),
	                            Glucose_max : parseFloat(items[8]),
	                            E_factore_Min : parseFloat(items[12]),
	                            E_factore_Max : parseFloat(items[13])
	                        }
	                    );
	               
	                    break;
	                case "Bioref-PM-UFM":
	                    datapm_ufm.data.push(
	                        {
	                            
	                            color: getColorbyReliability(parseFloat(items[10])),
	                            x: parseFloat(items[14]),
	                            y: parseFloat(items[15]),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min : parseFloat(items[7]),
	                            Glucose_max : parseFloat(items[8]),
	                            E_factore_Min : parseFloat(items[12]),
	                            E_factore_Max : parseFloat(items[13])
	                        }
	                    );
	                      datapmufmfiabilite.data.push( 
	                        {
	                            color:getColorbyReliability(parseFloat(items[9])),
	                            
	                            x: parseFloat(items[14]),
	                            y: parseFloat(items[15]),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min : parseFloat(items[7]),
	                            Glucose_max : parseFloat(items[8]),
	                            E_factore_Min : parseFloat(items[12]),
	                            E_factore_Max : parseFloat(items[13])
	                        }
	                    );
	                         datalinepmufmx.data.push( 
	                        {
	                           
	                            x: parseFloat(items[14]),
	                            y: parseFloat(items[15]),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min : parseFloat(items[7]),
	                            Glucose_max : parseFloat(items[8]),
	                            E_factore_Min : parseFloat(items[12]),
	                            E_factore_Max : parseFloat(items[13]) ,
	                            
	                            marker: { fillColor: '#BF0B23', radius: calculerInterval( parseFloat(items[9]), parseFloat(items[8])) *8 }
	                        }
	                    );
	                  
	                    
	                     break;
	                 case "Bioref-PM-PC-UFM":
	                    datapm_pc_ufm_ps.data.push(
	                             {
	                            
	                            color:getColorbyReliability(parseFloat(items[10])),
	                            x: parseFloat(items[14]),
	                            y: parseFloat(items[15]),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min : parseFloat(items[7]),
	                            Glucose_max : parseFloat(items[8]),
	                            E_factore_Min : parseFloat(items[12]),
	                            E_factore_Max : parseFloat(items[13]) 
	                            
	                        }
	                    );
	                        datalinepmpcufmpsx.data.push( 
	                        {
	                           
	                            x: parseFloat(items[14]),
	                            y: parseFloat(items[15]),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min : parseFloat(items[7]),
	                            Glucose_max : parseFloat(items[8]),
	                            E_factore_Min : parseFloat(items[12]),
	                            E_factore_Max : parseFloat(items[13]) ,
	                            marker: { fillColor: '#BF0B23', radius: calculerInterval( parseFloat(items[9]), parseFloat(items[8])) *8 }
	                        }
	                    );
	                 
	                   datapmufmpsfiabilite.data.push( 
	                        {
	                            color:getColorbyReliability(parseFloat(items[9])),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            x: parseFloat(items[14]),
	                            y: parseFloat(items[15]),
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min : parseFloat(items[7]),
	                            Glucose_max : parseFloat(items[8]),
	                            E_factore_Min : parseFloat(items[12]),
	                            E_factore_Max : parseFloat(items[13])
	
	                        }
	                    );
	                    break;
	                case "pm-pc-ps":
	                   datapm_pc_ps.data.push(
	                        {
	                            
	                            color:getColorbyReliability(parseFloat(items[10])),
	                            x: parseFloat(items[14]),
	                            y: parseFloat(items[15]),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min : parseFloat(items[7]),
	                            Glucose_max : parseFloat(items[8]),
	                            E_factore_Min : parseFloat(items[12]),
	                            E_factore_Max : parseFloat(items[13])
	                        }
	                    );
	                  datapmpcpsfiabilite.data.push( 
	                        {
	                            color: getColorbyReliability(parseFloat(items[9])),
	                            x: parseFloat(items[14]),
	                            y: parseFloat(items[15]),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min : parseFloat(items[7]),
	                            Glucose_max : parseFloat(items[8]),
	                            E_factore_Min : parseFloat(items[12]),
	                            E_factore_Max : parseFloat(items[13])
	                            
	                        }
	                    );
	                        datalinepmpcpsx.data.push( 
	                        {
	                      
	                            x: parseFloat(items[14]),
	                            y: parseFloat(items[15]),
	                            Fiabilite_min:parseFloat(items[9]),
	                            Fiabilite_max:parseFloat(items[10]),
	                            numDoc : parseFloat(items[1]),
	                            Topic:items[0],
	                            Glucose_min : parseFloat(items[7]),
	                            Glucose_max : parseFloat(items[8]),
	                            E_factore_Min : parseFloat(items[12]),
	                            E_factore_Max : parseFloat(items[13]),
	
	                            marker: { fillColor: '#BF0B23', radius: calculerInterval( parseFloat(items[9]), parseFloat(items[8]))*8}
	                        }
	                    );
	                    break;
	            }
	
	        }
	    });
	           options.series = [];
	           
	      
	                if(datapmufmfiabilite.data.length > 0 )options.series.push(datapmufmfiabilite);
	                if(datapmfiabilite.data.length > 0 )  options.series.push(datapmfiabilite);
	                if(datapmufmpsfiabilite.data.length > 0 ) options.series.push(datapmufmpsfiabilite);
	                if(datapmpcpsfiabilite.data.length > 0 )  options.series.push(datapmpcpsfiabilite);
	        
	                /* Les Points     x */
	                if(datapm_ufm.data.length > 0 ) options.series.push(datapm_ufm);
	                if(datapm.data.length > 0 ) options.series.push(datapm); 
	                if(datapm_pc_ufm_ps.data.length > 0 ) options.series.push(datapm_pc_ufm_ps);
	                if(datapm_pc_ps.data.length > 0 )  options.series.push(datapm_pc_ps);
	                
	                
	                
	                /* Legend  couleure  */
	                options.series.push(couleur01);
	                options.series.push(couleur02);
	                options.series.push(couleur03);
	                options.series.push(couleur04);
	                options.series.push(couleur05);
	                options.series.push(couleur06);
	                options.series.push(couleur07);
	                options.series.push(couleur08);
	                options.series.push(couleur09);
	                options.series.push(couleur010);
	
	    options.tooltip = {
	        backgroundColor: '#ffffff',
	        borderColor: '#0C7CD5',
	        borderRadius: 10,
	        borderWidth: 3,
	        color:'#000000',
	        formatter: function () {
	          var s ='<b> Topic :</b>:' + this.point.Topic +'<br/>';
	          s+= '<b> X: </b>' + this.x + '<br/> ';
	          s+= '<b> Y : </b>' + this.y +'<br/>';
	          s+= ' <b> NÂ° Document : ' + this.point.numDoc + '</b><br/>';
	          s+= ' <b> Glucose Yield [min ,max] :</b> [' + this.point.Glucose_min + ',' +        this.point.Glucose_max + ']<br/>';
	          s+= ' <b> E-fator[min ,max] :</b> [' + this.point.E_factore_Min + ',' +this.point.E_factore_Max + ']<br/>';
	          s+= ' <b> Fiablite [min ,max] :</b> [' + this.point.Fiabilite_min + ',' +this.point.Fiabilite_max + ']<br/>';
	        
	        
	
	            return s;
	        }
	
	    };
	   
	
	   new Highcharts.Chart(options);

    });
    
}