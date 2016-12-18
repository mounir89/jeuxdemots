package com.univ.jeuxdemots.beans;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;

import org.neo4j.driver.v1.Record;
import org.neo4j.driver.v1.Session;
import org.neo4j.driver.v1.StatementResult;

public class RechercherMot {
	private static Session session;

	private static HashMap<String, ArrayList<String>> res = new HashMap<>();
	private static HashMap<String, LinkedList<String>> info = new HashMap<>();

	public static HashMap<String, ArrayList<String>> getMots(String mot, int taille) {

		session = ConnectionNeo4j.getConnectionNeo4j();

		StatementResult result = session.run("match (n)-[r]->(m) where n.name = '" + mot
				+ "' return type(r) as typeR ,m.name as name  ");

		while (result.hasNext()) {
			Record record = result.next();

			if (res.containsKey(record.get("typeR").asString())) {
				res.get(record.get("typeR").asString()).add(record.get("name").asString());

			} else {
				ArrayList<String> temp = new ArrayList<>();
				temp.add(record.get("name").asString());
				res.put(record.get("typeR").asString(), temp);
			}

		}

		for (String i : res.keySet()) {
           
			StatementResult result2 = session.run("match (r:RelationTypes) where r.id =" +i+ " return r.name as name, r.nom_etendu as nom_etendu, r.info as info ");

			while (result2.hasNext()) {
				LinkedList<String> tempp = new LinkedList<>();
				Record record = result2.next();
				tempp.add(record.get("name").asString());
				tempp.add(record.get("nom_etendu").asString());
				tempp.add(record.get("info").asString());
				info.put(i, tempp);

			}
		}
       ConnectionNeo4j.closeConnectionNeo4j();
		return res;
	}

	public static HashMap<String, LinkedList<String>> getTypeRelation() {
		return info;
	}
}
// match (r:RelationTypes) where r.id = 62 return r
// match (n:termes)-[r]->(m:termes) where n.name = "rapidement" return type(r)
// ,m.name limit 10
