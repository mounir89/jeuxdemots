package com.univ.jeuxdemots.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONObject;

import com.univ.jeuxdemots.beans.ConnectionNeo4j;
import com.univ.jeuxdemots.beans.RechercherMot;
import com.univ.jeuxdemots.beans.Relations;
import com.univ.jeuxdemots.beans.paramMot;

/**
 * Servlet implementation class ControllerHome
 */
@WebServlet("/ControllerHome")
public class ControllerHome extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public ControllerHome() {
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
				
		
		      //  System.out.println(ConnectionNeo4j.getConnectionNeo4j());
		          ArrayList<String> relations = Relations.getRelations();
		          
		          //System.out.println("-------------------------"+relations.toString());
		        request.setAttribute("relations", relations);
				this.getServletContext().getRequestDispatcher( "/index.jsp" ).forward( request, response );
				
				
				
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("application/json");  
		BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
        String json = "";
        if(br != null){
            json = br.readLine();
        }
        System.out.println(json);
        
        ObjectMapper mapper = new ObjectMapper();
        
        paramMot param = mapper.readValue(json, paramMot.class);
        
        HashMap<String, ArrayList<String>> res = RechercherMot.getMots(param.getMot(), 0);
        HashMap<String, LinkedList<String>> info = RechercherMot.getTypeRelation();
        
        System.out.println(res.toString());
        System.out.println(info.toString());
        JSONObject objetSuccess = new JSONObject();
		
		objetSuccess.put("res", res);
		
		mapper.writeValue(response.getOutputStream(),objetSuccess);	
        
	}

}
