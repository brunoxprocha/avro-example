PERSON_SCHEMA = {
    'name': 'Person',
    'type': 'record',
    'fields': [
      {
        'name': 'name',
        'type': 'string'
      },
      {
        'name': 'email',
        'type': 'string'
      },
      {
        'name': 'phone',
        'type': 'string'
      },
      {
        'name': 'age',
        'type': 'int'
      }
    ]
}

PEOPLE_SCHEMA = {
  'name': 'People',
  'type': 'array',
  'items': PERSON_SCHEMA
}