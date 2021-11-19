module.exports.increaseUserSkills = async (db, skillName, email) => {
  const usersRef = db.collection("users");
  const usersRefSnapshot = await usersRef.where("email", "==", email).get();

  let user;
  let docID;

  usersRefSnapshot.forEach((doc) => {
    user = doc.data();
    docID = doc.id;
  });

  if (user.skills === undefined) {
    const initSkills = {
      coding: 0,
      connection: 0,
      karma: 0,
      wellness: 0,
    };
    // usersRefSnapshot.skillName
    await usersRef.doc(docID).update({
      skills: {
        ...initSkills,
      },
    });

    user = {
      ...user,
      skills: {
        ...initSkills,
      },
    };
  }

  const toBeUpdatedSkills = { ...user.skills };

  switch (skillName) {
    case "Mentoring": {
      toBeUpdatedSkills.coding += 10;
      toBeUpdatedSkills.karma += 10;
      toBeUpdatedSkills.connection += 10;
      break;
    }

    case "Problem solving": {
      toBeUpdatedSkills.coding += 20;
      break;
    }
    case "Attended to event": {
      toBeUpdatedSkills.karma += 30;
      toBeUpdatedSkills.connection += 20;
      break;
    }

    case "Advice giver": {
      toBeUpdatedSkills.connection += 10;
      toBeUpdatedSkills.karma += 10;
      break;
    }

    case "Sport hero": {
      toBeUpdatedSkills.connection += 20;
      toBeUpdatedSkills.wellness += 40;
      break;
    }

    case "Play and learn master": {
      toBeUpdatedSkills.connection += 10;
      toBeUpdatedSkills.wellness += 20;
      toBeUpdatedSkills.coding += 10;
      break;
    }
    default: {
      throw Error("Invalid skill provided.");
    }
  }

  await usersRef.doc(docID).update({
    skills: {
      ...toBeUpdatedSkills,
    },
  });
};
