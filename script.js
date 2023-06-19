// Récupérer les éléments HTML du quiz
var questionElement = document.getElementById("question");
var reponsesElement = document.getElementById("reponses");

// Données du quiz (à titre d'exemple)
var quizData = {
  questions: [
    {
      question: "Iana est-elle une assaillant ou défenseur ?",
      reponses: ["Assaillant", "défenseur"],
      reponseCorrecte: 0
    },
    {
      question: "De quelle nationalité est Sens ?",
      reponses: ["Belge", "Français", "Luxembourgeois", "Espagnol"],
      reponseCorrecte: 0
    },
    {
        question: "Combien de caméra à Valkyrie ?",
        reponses: ["4", "3", "5", "2"],
        reponseCorrecte: 1
    },
    {
        question: "Quel est l'escouade de Brava ?",
        reponses: ["Redhammer", "Nighthaven", "Viperstrike"],
        reponseCorrecte: 2
    },
    {
        question: "Quel est l'alternative à thermite le plus efficace pour faire des breach lourdes de loin ?",
        reponses: ["Zero", "Osa", "Maverick", "Ace"],
        reponseCorrecte: 3
    }
  ]
};

// Variables pour suivre l'état du quiz
var questionIndex = 0;
var score = 0; // Variable pour stocker le score

// Fonction pour générer et afficher une question
function afficherQuestion(question) {
  questionElement.textContent = question.question;

  // Effacer les réponses précédentes
  reponsesElement.innerHTML = "";

  // Générer les boutons de réponse
  for (var i = 0; i < question.reponses.length; i++) {
    var reponse = question.reponses[i];
    var bouton = document.createElement("button");
    bouton.textContent = reponse;
    bouton.addEventListener("click", (function(index) {
      return function() {
        validerReponse(index);
      };
    })(i));
    reponsesElement.appendChild(bouton);
  }
}

// Fonction pour valider la réponse et passer à la question suivante
function validerReponse(indexReponse) {
  var question = quizData.questions[questionIndex];
  var reponseCorrecte = question.reponseCorrecte;
  var boutonsReponses = reponsesElement.getElementsByTagName("button");

  // Désactiver les boutons de réponse pour empêcher de sélectionner une autre réponse
  for (var i = 0; i < boutonsReponses.length; i++) {
    boutonsReponses[i].disabled = true;
  }

  // Vérifier la réponse choisie
  if (indexReponse === reponseCorrecte) {
    score++; // Incrémenter le score si la réponse est correcte
  }

  // Délai d'attente en millisecondes avant de passer à la question suivante
  var delaiAttente = 2000;

  // Passer à la question suivante après le délai d'attente
  setTimeout(function() {
    questionIndex++;

    if (questionIndex < quizData.questions.length) {
      var prochaineQuestion = quizData.questions[questionIndex];
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
  var scoreText = "Votre score est de " + score + " sur " + quizData.questions.length + ".";
  var scoreElement = document.createElement("p");
  scoreElement.textContent = scoreText;
  reponsesElement.appendChild(scoreElement);
}

// Charger le quiz lors du chargement de la page
window.addEventListener("load", function() {
  // Afficher la première question du quiz
  var premiereQuestion = quizData.questions[questionIndex];
  afficherQuestion(premiereQuestion);
});
