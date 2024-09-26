import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";
import { Alert } from "react-native";

export const exportAndNotify = async (fileName: string, item: any) => {
  let directoryUri = "";

  // Demander l'autorisation d'accéder à un répertoire
  try {
    const permission =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permission.granted) {
      // URI du répertoire sélectionné
      const dirUri = permission.directoryUri;
      directoryUri = dirUri;
    }
  } catch (error) {
    console.error("Erreur lors de la sélection du dossier", error);
  }

  if (!directoryUri) {
    Alert.alert(
      "Erreur",
      "Aucun dossier sélectionné. Veuillez choisir un dossier d'abord."
    );
    return;
  }

  try {
    // Formatage de la date
    const date = item.date
      ? new Date(item.date).toISOString().split("T")[0]
      : "unknown-date";
    const uniqueId = Date.now().toString(); // Utiliser le timestamp comme identifiant unique
    const finalFileName = `${fileName}-${date}-${uniqueId}.json`;

    const jsonData = JSON.stringify(item);

    // Créer et écrire le fichier dans le répertoire sélectionné
    const uri = await FileSystem.StorageAccessFramework.createFileAsync(
      directoryUri,
      finalFileName,
      "application/json" // Type MIME pour le fichier JSON
    );

    await FileSystem.writeAsStringAsync(uri, jsonData);
    Alert.alert("Succès", `Fichier enregistré : ${uri}`);

    // Ouvrir le fichier avec une application compatible
    await Linking.openURL(uri);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du fichier", error);
  }
};

export const getRandomPastDate = () => {
  const maxDaysInPast = 365;

  // la date actuelle
  const today = new Date();

  // Générer un nombre aléatoire de jours dans le passé
  const randomDaysAgo = Math.floor(Math.random() * maxDaysInPast);

  // Soustraire ces jours de la date actuelle
  const randomPastDate = new Date(today);
  randomPastDate.setDate(today.getDate() - randomDaysAgo);

  return randomPastDate;
};
