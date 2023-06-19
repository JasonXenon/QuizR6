// Sélection des éléments HTML du quiz
const questionElement = document.getElementById("question");
const reponsesElement = document.getElementById("reponses");

// Données du quiz (à titre d'exemple)
const quizData = {
  questions: [
    {
      question: "Iana est-elle une assaillante ou une défenseuse ?",
      reponses: ["Assaillante", "Défenseuse"],
      reponseCorrecte: 0
    },
    {
      question: "De quelle nationalité est Sens ?",
      reponses: ["Belge", "Français", "Luxembourgeois", "Espagnol"],
      reponseCorrecte: 0
    },
    {
      question: "Combien de caméras possède Valkyrie ?",
      reponses: ["4", "3", "5", "2"],
      reponseCorrecte: 1
    },
    {
      question: "Quel est l'escouade de Brava ?",
      reponses: ["Redhammer", "Nighthaven", "Viperstrike"],
      reponseCorrecte: 2
    },
    {
      question: "Quel est l'alternative à Thermite la plus efficace pour créer des breaches lourdes à distance ?",
      reponses: ["Zero", "Osa", "Maverick", "Ace"],
      reponseCorrecte: 3
    }
  ]
};

// Variables pour suivre l'état du quiz
let questionIndex = 0;
let score = 0; // Variable pour stocker le score

// Fonction pour générer et afficher une question
function afficherQuestion(question) {
  questionElement.textContent = question.question;

  // Effacer les réponses précédentes
  reponsesElement.innerHTML = "";

  // Générer les boutons de réponse
  question.reponses.forEach((reponse, index) => {
    const bouton = document.createElement("button");
    bouton.textContent = reponse;
    bouton.addEventListener("click", () => {
      validerReponse(index);
    });
    reponsesElement.appendChild(bouton);
  });
}

// Fonction pour valider la réponse et passer à la question suivante
function validerReponse(indexReponse) {
  const question = quizData.questions[questionIndex];
  const reponseCorrecte = question.reponseCorrecte;
  const boutonsReponses = reponsesElement.getElementsByTagName("button");

  // Désactiver les boutons de réponse pour empêcher de sélectionner une autre réponse
  Array.from(boutonsReponses).forEach(bouton => {
    bouton.disabled = true;
  });

  // Vérifier la réponse choisie
  if (indexReponse === reponseCorrecte) {
    score++; // Incrémenter le score si la réponse est correcte
  }

  // Délai d'attente en millisecondes avant de passer à la question suivante
  const delaiAttente = 2000;

  // Passer à la question suivante après le délai d'attente
  setTimeout(() => {
    questionIndex++;
    if (questionIndex < quizData.questions.length) {
      const prochaineQuestion = quizData.questions[questionIndex];
      afficherQuestion(prochaineQuestion);
    } else {
      afficherScoreFinal(); // Afficher le score final lorsque le quiz est terminé
    }
  }, delaiAttente);
}

// Fonction pour afficher le score final
function afficherScoreFinal() {
  // Effacer le contenu précédent du quiz
  questionElement.textContent = "";
  reponsesElement.innerHTML = "";

  // Afficher le score final
  const scoreText = `Votre score est de ${score} sur ${quizData.questions.length}.`;
  const scoreElement = document.createElement("p");
  scoreElement.textContent = scoreText;
  reponsesElement.appendChild(scoreElement);
}

// Charger le quiz lors du chargement de la page
window.addEventListener("load", () => {
  // Afficher la première question du quiz
  const premiereQuestion = quizData.questions[questionIndex];
  afficherQuestion(premiereQuestion);
});
