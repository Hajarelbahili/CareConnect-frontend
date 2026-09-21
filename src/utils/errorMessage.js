export const getErrorMessage = (error) => {
  switch (error?.status) {
    case 400:
      return "Les données envoyées sont invalides.";

    case 401:
      return "Email ou mot de passe incorrect.";

    case 403:
      return "Accès refusé.";

    case 404:
      return "Ressource introuvable.";

    case 409:
      return "Cette donnée existe déjà.";

    case 500:
      return "Une erreur interne du serveur est survenue.";

    default:
      return "Une erreur est survenue. Veuillez réessayer.";
  }
};
