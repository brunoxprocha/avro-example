from flask import Flask, jsonify, request, send_file
from flask_cors import CORS, cross_origin
from fastavro import parse_schema, schemaless_writer, schemaless_reader
from io import BytesIO
from constants import PEOPLE_SCHEMA, PERSON_SCHEMA
from protobuf.utils import person_list_to_people_protobuf, person_protobuf_to_person_dict
from protobuf import people_pb2
from util import createPeople

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

people_parsed_schema = parse_schema(PEOPLE_SCHEMA)
person_parsed_schema = parse_schema(PERSON_SCHEMA)

people = createPeople(500)

@app.route('/avro', methods=['GET'])
@cross_origin()
def get_people_using_avro_protocol():
    buff = BytesIO()
    schemaless_writer(buff, people_parsed_schema, people)
    message = buff.getvalue()

    # app.logger.info('%s logged in successfully', message)

    return message.decode("ISO-8859-1")


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

@app.route('/protobuf', methods=['GET'])
@cross_origin()
def get_people_using_protobuf_protocol():
    people_protobuf = person_list_to_people_protobuf(people)
    return people_protobuf.SerializeToString()

@app.route('/protobuf', methods=['POST'])
@cross_origin()
def add_person_using_protobuf_protocol():
    bytes_reader = BytesIO(request.get_data())
    person_protobuf = people_pb2.Person()
    person = person_protobuf_to_person_dict(person_protobuf)
    people.append(person)
    people_protobuf = person_list_to_people_protobuf(people)
    return people_protobuf.SerializeToString()


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)