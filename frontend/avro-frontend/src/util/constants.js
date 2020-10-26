
import avro from "avsc";
export const personType = avro.Type.forSchema({
    "name": "Person",
    "type": "record",
    "fields": [
        {
        "name": "name",
        "type": "string"
        },
        {
        "name": "email",
        "type": "string"
        },
        {
        "name": "phone",
        "type": "string"
        },
        {
        "name": "age",
        "type": "int"
        }
    ]
});

export const peopleSchema = {
    "name": "People",
    "type": "array",
    "items": {
        "name": "Person",
        "type": "record",
        "fields": [
            {
            "name": "name",
            "type": "string"
            },
            {
            "name": "email",
            "type": "string"
            },
            {
            "name": "phone",
            "type": "string"
            },
            {
            "name": "age",
            "type": "int"
            }
        ]
    }
};
  
export const peopleType = avro.Type.forSchema({
    "name": "People",
    "type": "array",
    "items": {
        "name": "Person",
        "type": "record",
        "fields": [
            {
            "name": "name",
            "type": "string"
            },
            {
            "name": "email",
            "type": "string"
            },
            {
            "name": "phone",
            "type": "string"
            },
            {
            "name": "age",
            "type": "int"
            }
        ]
    }
});