from faker import Faker
import random

faker = Faker()

def createPeople(qty):
    people = []
    for i in range(qty):
        people.append({'name': faker.name(), 'email': faker.email(), 'phone': faker.phone_number(), 'age': random.randint(18, 70)})
    return people