package com.univ.jeuxdemots.beans;


import org.neo4j.driver.v1.AuthTokens;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.GraphDatabase;
import org.neo4j.driver.v1.Session;

public class ConnectionNeo4j {
	
	private static Driver driver = GraphDatabase.driver( "bolt://localhost", AuthTokens.basic( "neo4j", "manuelle89" ) );
	private static Session session ;
	
	
	public static Session getConnectionNeo4j(){
	
	
		if(session == null){
			
			session = driver.session();
			
		}
		
     return session;
		
	}
	
	public static void closeConnectionNeo4j(){
		
		session.close();
		
		driver.close();
		 
		
	}
}
