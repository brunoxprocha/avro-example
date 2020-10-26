from protobuf import people_pb2

def person_list_to_people_protobuf(person_list):
    people_protobuf = people_pb2.People()
    for person_dict in person_list:
        person = people_protobuf.people.add()
        person.name = person_dict['name']
        person.email = person_dict['email']
        person.phone = person_dict['phone']
        person.age = person_dict['age']
    return people_protobuf

def person_protobuf_to_person_dict(person_protobuf):
    return {'name': person_protobuf.name, 'email': person_protobuf.email, 'phone': person_protobuf.phone, 'age': person_protobuf.age}