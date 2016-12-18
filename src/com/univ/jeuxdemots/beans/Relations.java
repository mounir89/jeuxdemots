package com.univ.jeuxdemots.beans;

import java.util.ArrayList;

import org.neo4j.driver.v1.Record;
import org.neo4j.driver.v1.Session;
import org.neo4j.driver.v1.StatementResult;


public class Relations {
	
	private static Session session;
	
	private static ArrayList<String> relations = new ArrayList<>();
	
	public static ArrayList<String> getRelations(){
		
		session = ConnectionNeo4j.getConnectionNeo4j();
		
		StatementResult result = session.run( "MATCH (n:RelationTypes) RETURN n.name as name" );
		
		//System.out.println(result.list());
		
		while ( result.hasNext() )
		{
		    Record record = result.next();
		    
		    
		    relations.add(record.get("name").asString());
		    
		}
		
		//ConnectionNeo4j.closeConnectionNeo4j();
		
		return relations;
	}

}
