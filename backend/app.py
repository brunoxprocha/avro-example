from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from fastavro import writer, parse_schema, schemaless_writer, reader, schemaless_reader
from io import BytesIO
from constants import PEOPLE_SCHEMA, PERSON_SCHEMA

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

people_parsed_schema = parse_schema(PEOPLE_SCHEMA)
person_parsed_schema = parse_schema(PERSON_SCHEMA)

people = [
    {'name': 'Fulano', 'email': 'fulano@gmail.com', 'phone': '+5581988776656', 'age': 20},
    {'name': 'Sicrano', 'email': 'Sicrano@gmail.com', 'phone': '+5581988776655', 'age': 22}
]

@app.route('/avro', methods=['GET'])
@cross_origin()
def get_people_using_avro_protocol():
    buf = BytesIO()
    schemaless_writer(buf, people_parsed_schema, people)
    message = buf.getvalue()
    return message

@app.route('/avro', methods=['POST'])
@cross_origin()
def add_person_using_avro_protocol():
    bytes_reader = BytesIO(request.get_data())
    person = schemaless_reader(bytes_reader, person_parsed_schema)
    people.append(person)
    buf = BytesIO()
    schemaless_writer(buf, person_parsed_schema, person)
    message = buf.getvalue()
    return message

@app.route('/json', methods=['GET'])
@cross_origin()
def get_people_using_json():
    return jsonify(people)

@app.route('/json', methods=['POST'])
@cross_origin()
def add_person_using_json():
    person = request.get_json()
    people.append(person)
    return jsonify(people)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)