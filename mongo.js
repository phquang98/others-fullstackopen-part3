import mongoose from "mongoose";
const { connect, Schema, model, connection } = mongoose;

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@learningcluster0.c6v16.mongodb.net/fso_chap3?retryWrites=true&w=majority`;

connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = model("persons", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 6) {
  const person = new Person({
    id: process.argv[3],
    name: process.argv[4],
    number: process.argv[5],
  });

  person.save().then((result) => {
    console.log(`password ${process.argv[2]} added ${process.argv[4]} number ${process.argv[5]} to phonebook!`);
    mongoose.connection.close();
  });
}

// if (process.argv.length < 6) {
//   console.log("Please provide like this: node mongo.js <password> <id> <name> <number>");
//   process.exit(1);
// }
