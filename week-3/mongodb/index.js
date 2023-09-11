const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require('dotenv');
const { seedDatabase } = require("./seedDatabase.js");
dotenv.config();

async function createEpisodeExercise(client) {
  const newEpisode = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDIOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
  };

  const bobRossCollection = client
    .db("databaseWeek3")
    .collection("bob_ross_episodes");
  const result = await bobRossCollection.insertOne(newEpisode);

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  async function createEpisodeExercise(client) {
    const newEpisode = {
      episode: "S09E13",
      title: "MOUNTAIN HIDE-AWAY",
      elements: [
        "CIRRUS",
        "CLOUDS",
        "CONIFER",
        "DECIDIOUS",
        "GRASS",
        "MOUNTAIN",
        "MOUNTAINS",
        "RIVER",
        "SNOWY_MOUNTAIN",
        "TREE",
        "TREES",
      ],
    };

    const bobRossCollection = client
      .db("databaseWeek3")
      .collection("bob_ross_episodes");
    const result = await bobRossCollection.insertOne(newEpisode);

    console.log(
      `Created season 9 episode 13 and the document got the id ${result.insertedId}`
    );
  }

  console.log(
    `The title of episode 2 in season 2 is ${"TODO: fill in variable here"}`
  );

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${"TODO: fill in variable here"}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]

  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${"TODO: fill in variable here"}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]

  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${"TODO: fill in variable here"}`
  );
}

async function updateEpisodeExercises(client) {
    const bobRossCollection = client
      .db("databaseWeek3")
      .collection("bob_ross_episodes");

    const result1 = await bobRossCollection.updateOne(
      { episode: "S30E13" },
      { $set: { title: "BLUE RIDGE FALLS" } }
    );
    console.log(
      `Ran a command to update episode 13 in season 30 and it updated ${result1.modifiedCount} episodes`
    );


  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${"TODO: fill in variable here"} episodes`
  );

  // Unfortunately we made a mistake in the arrays and the element type called 'BUSHES' should actually be 'BUSH' as sometimes only one bush was painted.
  // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
  // It should update 120 episodes!

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${"TODO: fill in variable here"} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  const bobRossCollection = client
    .db("databaseWeek3")
    .collection("bob_ross_episodes");

  const result = await bobRossCollection.deleteOne({ episode: "S31E14" });
  console.log(
    `Ran a command to delete episode and it deleted ${result.deletedCount} episodes`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
