const nanoid = require("nanoid");

const createPetModel = (db) => {
  return {
    findMany(filter) {
      return db
        .get("pet")
        .filter(filter)
        .orderBy(["createdAt"], ["desc"])
        .value();
    },

    findOne(filter) {
      return db.get("pet").find(filter).value();
    },

    create(pet) {
      const newPet = { id: nanoid(), createdAt: Date.now(), ...pet };

      db.get("pet").push(newPet).write();

      return newPet;
    },

    edit(pet) {
      const { id } = pet;
      const existingPet = db.get("pet").find({ id }).value();

      db.get("pet")
        .find({ id })
        .assign({ ...existingPet, ...pet })
        .write();

      return db.get("pet").find({ id }).value();
    },

    delete(pet) {
      const { id } = pet;
      try {
        db.get("pet").remove({ id }).write();
        return true;
      } catch (e) {
        console.log(`Unable to delete pet: ${e}`);
        return false;
      }
    },
  };
};

module.exports = createPetModel;
