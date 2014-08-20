package org.glaze.framework.rpc;

import org.glaze.framework.rpc.annotation.ServerImpl;

import t.Person;

@ServerImpl
public class TestInterfaceImpl implements TestInterface {

	@Override
	public Person updatePerson(Person person) {
		person.setMark(100);
		person.setName("update liu");
		person.setId(1);
		return person;
	}

}
