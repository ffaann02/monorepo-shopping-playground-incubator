import { db, storage } from "../../config/firebase/initFirebase.mjs";
import { collection, getDocs, getDoc, doc, setDoc, updateDoc, or } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getBytes } from "firebase/storage";
import { generateUniqueImageName } from "./utils.mjs";

export async function Get_users_database() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    let formated_data = [];
    querySnapshot.forEach((doc) => {
      const docID = doc.id;
      const docData = doc.data();
      formated_data.push({
        userId: docID,
        data: docData
      })
    });
    return formated_data;
  } catch (error) {
    throw error;
  }
}

export async function Set_user_database(userId) {
  try {
    const data = {
      userId: userId,
      phoneNo: "",
      recipientName: ""
    }
    const userIsAlreadyExist = await Check_user_database(userId);
    if (userIsAlreadyExist === false) {
      const result = await setDoc(doc(db, "users", userId), data);
      return result;
    }
    else {
      return;
    }
  } catch (error) {
    throw error;
  }
}

export async function Update_user_database(userId, phoneNo) {
  try {
    const userDataRef = doc(db, "users", userId);
    await updateDoc(userDataRef, {
      phoneNo: phoneNo
    });
  } catch (error) {
    throw error;
  }
}

async function Check_user_database(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(`userId ${userId} is already exists in firestore database`);
      return true;
    } else {
      console.log(`userId ${userId} is not exists`);
      return false;
    }
  } catch (error) {
    throw error;
  }
}

export async function Get_game_decoration(gameId) {
  try {
    const docRef = doc(db, "game_decoration", gameId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function Update_game_decoration(gameId, updateData) {
  try {
    const userDataRef = doc(db, "game_decoration", gameId);
    const response = await updateDoc(userDataRef, updateData);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function Get_game_setting(gameId) {
  try {
    const docRef = doc(db, "game_setting", gameId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function Upload__game_setting_image(gameId, pairId, base64Image) {
  try {
    const fileName = `Card${pairId}.jpg`
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const storageRef = ref(storage, `game_setting_image/${gameId}/` + fileName);
    const metadata = {
      contentType: 'image/jpeg'
    };
    const response = await uploadBytes(storageRef, imageBuffer, metadata);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function Get_game_setting_image(gameId, fileName) {
  try {
    const fileNameFull = `${fileName}.jpg`
    const fullPath = `game_setting_image/${gameId}/${fileNameFull}`;
    const pathReference = ref(storage, fullPath);
    const url = await getDownloadURL(pathReference);
    return url;
  } catch (error) {
    throw error;
  }
}

export async function Update_game_setting(gameId, updateData) {
  try {
    const userDataRef = doc(db, "game_setting", gameId);
    const response = await updateDoc(userDataRef, updateData);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function Upload__game_decoration_image(gameId, base64Image) {
  try {
    const fileName = `Logo.jpg`
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const storageRef = ref(storage, `game_decoration_image/${gameId}/` + fileName);
    const metadata = {
      contentType: 'image/jpeg'
    };
    const response = await uploadBytes(storageRef, imageBuffer, metadata);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function Get_game_decoration_image(gameId) {
  try {
    const fileNameFull = 'Logo.jpg';
    const fullPath = `game_decoration_image/${gameId}/${fileNameFull}`;
    const pathReference = ref(storage, fullPath);
    const url = await getDownloadURL(pathReference);
    return url;
  } catch (error) {
    throw error;
  }
}

export async function Upload_gift_image(base64Image) {
  try {
    const generateName = await generateUniqueImageName();
    const fileName = `${generateName}.jpg`;
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const storageRef = ref(storage, `created_gift/image/` + fileName);
    const metadata = {
      contentType: 'image/jpeg'
    };
    const response = await uploadBytes(storageRef, imageBuffer, metadata)
    const fullPath = response.metadata.fullPath;
    const pathReference = ref(storage, fullPath);
    const imageUrl = await getDownloadURL(pathReference);
    return imageUrl;
  } catch (error) {
    throw error;
  }
}

export async function Insert_reward_history(documentID, historyData) {
  try {
    const result = await setDoc(doc(db, "reward_history", documentID), historyData);
    return result
  } catch (error) {
    throw error;
  }
}

export async function Insert_game_decoration(gameId, data) {
  try {
    const response = await setDoc(doc(db, "game_decoration", gameId), data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function Insert_game_setting(gameId, data) {
  try {
    const response = await setDoc(doc(db, "game_setting", gameId), data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function Get_image_bytes_logoLine() {
  try {
    const templateLogo = "line.png"
    const fullPath = `/asset/games/memory_card/${templateLogo}`;
    const pathReference = ref(storage, fullPath);
    const blob = await getBytes(pathReference);
    console.log(blob);
    return blob;
  } catch (error) {
    throw error;
  }
}