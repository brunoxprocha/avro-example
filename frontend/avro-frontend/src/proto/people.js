import { Root, Type, Field } from "protobufjs";

export default class ProtobufManager {

  static myInstance = null;

  _root = null;

  _createRoot =  () => {
    const Person = new Type("Person")
    .add(new Field("name", 1, "string"))
    .add(new Field("phone", 2, "string"))
    .add(new Field("email", 3, "string"))
    .add(new Field("age", 4, "int64"));
    const People = new Type("People")
    .add(new Field("people", 1, "Person", 'repeated'));
    return new Root().add(Person).add(People);;
  }

  _getRoot =  () => {
    if (this._root == null) {
      this._root =  this._createRoot();
    }
    return this._root;
  }

  /**
   * @returns {ProtobufManager}
   */
  static getInstance() {
      if (ProtobufManager.myInstance == null) {
        ProtobufManager.myInstance = new ProtobufManager();
      }
      return this.myInstance;
  }

  decodePeople =  function (buffer) {
    return this._getRoot().lookupType('People').decode(buffer);
  }

  encodePerson =  function (personJson) {
    return this._getRoot().lookupType('Person').encode(personJson).finish();
  }
}