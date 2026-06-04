<!DOCTYPE html>
<html lang="fr">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Widget Chatbot - TimeTravel Agency</title>
   <style>
       /* Styles de base pour le widget */
       body {
           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
           margin: 0;
           padding: 0;
           background-color: #121212;
           color: #e0e0e0;
       }


       /* Style de l'icône flottante */
       .chatbot-float {
           position: fixed;
           bottom: 20px;
           right: 20px;
           width: 60px;
           height: 60px;
           background-color: #D4AF37; /* Or */
           border-radius: 50%;
           display: flex;
           justify-content: center;
           align-items: center;
           cursor: pointer;
           box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
           transition: transform 0.3s, box-shadow 0.3s;
           z-index: 1000;
       }


       .chatbot-float:hover {
           transform: scale(1.1);
           box-shadow: 0 6px 16px rgba(212, 175, 55, 0.5);
       }


       .chatbot-float svg {
           width: 30px;
           height: 30px;
           fill: #121212;
       }


       /* Style de la fenêtre de chat */
       .chatbot-container {
           position: fixed;
           bottom: 90px;
           right: 20px;
           width: 350px;
           max-height: 500px;
           background-color: #1e1e1e;
           border-radius: 12px;
           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
           display: none;
           flex-direction: column;
           overflow: hidden;
           border: 1px solid #D4AF37;
           z-index: 1000;
       }


       .chatbot-header {
           background-color: #D4AF37;
           color: #121212;
           padding: 12px 16px;
           font-weight: bold;
           font-size: 16px;
           display: flex;
           justify-content: space-between;
           align-items: center;
       }


       .chatbot-close {
           cursor: pointer;
           font-size: 20px;
           background: none;
           border: none;
           color: #121212;
       }


       .chatbot-messages {
           flex: 1;
           padding: 16px;
           overflow-y: auto;
           max-height: 350px;
       }


       .chatbot-message {
           margin-bottom: 12px;
           padding: 10px 14px;
           border-radius: 18px;
           max-width: 80%;
           word-wrap: break-word;
           font-size: 14px;
           line-height: 1.4;
       }


       .user-message {
           background-color: #D4AF37;
           color: #121212;
           margin-left: auto;
           border-bottom-right-radius: 4px;
       }


       .bot-message {
           background-color: #2d2d2d;
           color: #e0e0e0;
           margin-right: auto;
           border-bottom-left-radius: 4px;
       }


       .chatbot-input-container {
           padding: 12px;
           background-color: #2d2d2d;
           display: flex;
           align-items: center;
       }


       .chatbot-input {
           flex: 1;
           padding: 10px 14px;
           border: 1px solid #444;
           border-radius: 20px;
           background-color: #1e1e1e;
           color: #e0e0e0;
           font-size: 14px;
           outline: none;
           transition: border-color 0.3s;
       }


       .chatbot-input::placeholder {
           color: #888;
       }


       .chatbot-input:focus {
           border-color: #D4AF37;
       }


       .chatbot-send {
           margin-left: 8px;
           padding: 10px;
           background-color: #D4AF37;
           color: #121212;
           border: none;
           border-radius: 50%;
           width: 40px;
           height: 40px;
           cursor: pointer;
           display: flex;
           justify-content: center;
           align-items: center;
           transition: background-color 0.3s;
       }


       .chatbot-send:hover {
           background-color: #B8941F;
       }


       .chatbot-send svg {
           width: 18px;
           height: 18px;
           fill: #121212;
       }


       /* Animation pour l'ouverture/fermeture */
       @keyframes fadeIn {
           from { opacity: 0; transform: translateY(10px); }
           to { opacity: 1; transform: translateY(0); }
       }


       .chatbot-container {
           animation: fadeIn 0.3s ease-out;
       }


       /* Style pour les messages du bot avec personnalité */
       .bot-message::before {
           content: "🕰️ ";
           margin-right: 4px;
       }
   </style>
</head>
<body>
   <!-- Icône flottante -->
   <div class="chatbot-float" id="chatbotFloat">
       <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
       </svg>
   </div>


   <!-- Fenêtre de chat -->
   <div class="chatbot-container" id="chatbotContainer">
       <div class="chatbot-header">
           <span>TimeTravel Agency</span>
           <button class="chatbot-close" id="chatbotClose">&times;</button>
       </div>
       <div class="chatbot-messages" id="chatbotMessages">
           <div class="chatbot-message bot-message">
               Bonjour et bienvenue chez TimeTravel Agency ! Je suis votre conseiller en voyages temporels.
               Comment puis-je vous aider à explorer le passé ou le futur aujourd'hui ?
           </div>
       </div>
       <div class="chatbot-input-container">
           <input
               type="text"
               class="chatbot-input"
               id="chatbotInput"
               placeholder="Posez-moi vos questions sur les voyages temporels..."
           >
           <button class="chatbot-send" id="chatbotSend">
               <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
               </svg>
           </button>
       </div>
   </div>


   <script>
       // Éléments DOM
       const chatbotFloat = document.getElementById('chatbotFloat');
       const chatbotContainer = document.getElementById('chatbotContainer');
       const chatbotClose = document.getElementById('chatbotClose');
       const chatbotInput = document.getElementById('chatbotInput');
       const chatbotSend = document.getElementById('chatbotSend');
       const chatbotMessages = document.getElementById('chatbotMessages');


       // Réponses du chatbot avec personnalité
       const responses = {
           greeting: [
               "Bonjour et bienvenue chez TimeTravel Agency ! Je suis ravi de vous accompagner dans la découverte de nos destinations temporelles exceptionnelles.",
               "Quelle joie de vous rencontrer ! Chez TimeTravel Agency, nous transformons vos rêves de voyages dans le temps en réalité. Par où commencer ?",
               "Bienvenue, explorateur du temps ! Je suis là pour vous guider vers les époques qui vous fascinent le plus."
           ],
           destinations: {
               "Paris 1889": {
                   description: "Ah, Paris en 1889 ! Une époque magique où la Tour Eiffel brillait de mille feux lors de l'Exposition Universelle. Imaginez-vous flâner sur les Champs-Élysées, découvrir les innovations technologiques de l'époque, ou siroter un café en terrasse en admirant l'architecture Haussmannienne.",
                   highlights: ["Visite de la Tour Eiffel fraîchement construite", "Découverte des pavillons de l'Exposition Universelle", "Balade en bateau-mouche sur la Seine", "Soirée à l'Opéra Garnier"],
                   price: "À partir de 6 499 € par personne pour 7 jours (vol temporel inclus, hébergement en hôtel 5* de l'époque, et guide historique privé)."
               },
               "Crétacé -65M": {
                   description: "Le Crétacé, une période fascinante où les dinosaures régnaient en maîtres ! Vivez une aventure inoubliable au cœur d'une nature luxuriante, à l'époque où la Terre était bien différente de ce que nous connaissons aujourd'hui.",
                   highlights: ["Safari en jeep temporelle pour observer les dinosaures", "Visite guidée par un paléontologue", "Nuit en campement sécurisé dans la jungle préhistorique", "Découverte de la faune et de la flore du Crétacé"],
                   price: "À partir de 12 999 € par personne pour 5 jours (équipement de sécurité inclus, guide expert, et assurance 'Retour Garanti')."
               },
               "Florence 1504": {
                   description: "Florence en 1504, au cœur de la Renaissance italienne ! Plongez dans l'âge d'or de l'art et de la culture, où Michel-Ange et Léonard de Vinci travaillaient à leurs chefs-d'œuvre. Une expérience inoubliable pour les amateurs d'histoire et d'art.",
                   highlights: ["Visite des ateliers de Michel-Ange", "Découverte du David en cours de sculpture", "Balade dans les ruelles médiévales de Florence", "Rencontre avec des artisans locaux"],
                   price: "À partir de 8 799 € par personne pour 6 jours (vol temporel, hébergement dans une villa toscane, et accès VIP aux ateliers d'artistes)."
               }
           },
           conseils: {
               "art": "Si vous êtes passionné d'art, je vous recommande vivement Florence en 1504. Vous pourrez y rencontrer les plus grands maîtres de la Renaissance et découvrir leurs techniques.",
               "aventure": "Pour les amateurs d'aventure, le Crétacé est une destination unique ! Vous y vivrez des émotions fortes en observant les dinosaures dans leur milieu naturel.",
               "romantique": "Paris en 1889 est parfait pour un voyage romantique. L'ambiance de la Belle Époque et l'architecture somptueuse de la ville en font une destination idéale pour les couples.",
               "famille": "Pour un voyage en famille, Paris 1889 est une excellente option. Les enfants adorent la Tour Eiffel et les innovations de l'Exposition Universelle !"
           },
           faq: {
               "Sécurité": "Chez TimeTravel Agency, la sécurité est notre priorité absolue. Nos voyages temporels sont encadrés par des bulles temporelles brevetées, qui garantissent votre retour en toute sécurité. Aucune chance de rester bloqué dans le passé !",
               "Bagages": "Vous pouvez emporter un bagage de 10 kg maximum. Nous vous conseillons d'éviter les objets modernes pour ne pas perturber le continuum espace-temps. Un guide vous sera fourni pour vous aider à vous intégrer discrètement.",
               "Santé": "Un certificat médical est requis pour les voyages avant 1500 ou après 2100. Nous fournissons également des vaccins contre les maladies anciennes ou futures, selon votre destination.",
               "Annulation": "Vous pouvez annuler gratuitement jusqu'à 48h avant le départ. Au-delà, des frais de 20% du prix du voyage s'appliquent. Nous comprenons que les imprévus font partie de la vie !",
               "Durée": "La durée maximale d'un voyage temporel est de 30 jours pour des raisons de sécurité et de confort. Cela permet également de limiter les risques de désynchronisation temporelle.",
               "Devises": "Nous acceptons les paiements en euros, dollars, livres sterling, ou cryptomonnaies (Bitcoin, Ethereum). Notre système de paiement est sécurisé et adapté aux transactions inter-temporelles."
           },
           default: [
               "Je suis désolé, je n'ai pas tout à fait compris votre question. Pouvez-vous préciser ou reformuler votre demande ? Je suis là pour vous aider !",
               "Votre question est intéressante ! Malheureusement, je n'ai pas d'information précise à ce sujet. N'hésitez pas à me poser une autre question sur nos destinations ou nos services.",
               "Je suis spécialisé dans les voyages temporels. Si vous avez des questions sur nos destinations, nos tarifs, ou nos conseils, je serai ravi d'y répondre !"
           ]
       };


       // Fonction pour ajouter un message dans la fenêtre de chat
       function addMessage(content, isUser = false) {
           const messageDiv = document.createElement('div');
           messageDiv.classList.add('chatbot-message');
           messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
          
           // Ajouter une animation de typographie pour les messages du bot
           if (!isUser) {
               messageDiv.textContent = '';
               let index = 0;
               const speed = 20; // Vitesse de frappe en ms
              
               function typeWriter() {
                   if (index < content.length) {
                       messageDiv.textContent += content.charAt(index);
                       index++;
                       setTimeout(typeWriter, speed);
                   }
               }
               typeWriter();
           } else {
               messageDiv.textContent = content;
           }
          
           chatbotMessages.appendChild(messageDiv);
           chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
       }


       // Fonction pour générer une réponse du chatbot avec personnalité
       function generateResponse(userMessage) {
           const lowerMessage = userMessage.toLowerCase();
          
           // Vérifier les mots-clés pour les salutations
           if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello') || lowerMessage.includes('couco')) {
               return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
           }
          
           // Vérifier les mots-clés pour les destinations spécifiques
           for (const [destination, info] of Object.entries(responses.destinations)) {
               if (lowerMessage.includes(destination.toLowerCase())) {
                   if (lowerMessage.includes('prix') || lowerMessage.includes('coût') || lowerMessage.includes('tarif')) {
                       return `Pour ${destination}, ${info.price}`;
                   }
                   if (lowerMessage.includes('activit') || lowerMessage.includes('à faire') || lowerMessage.includes('visite')) {
                       return `À ${destination}, vous pourrez profiter de : ${info.highlights.join(', ')}.`;
                   }
                   return info.description;
               }
           }
          
           // Vérifier les mots-clés pour les conseils
           if (lowerMessage.includes('conseil') || lowerMessage.includes('recommandation') || lowerMessage.includes('choisir')) {
               if (lowerMessage.includes('art')) {
                   return responses.conseils.art;
               }
               if (lowerMessage.includes('aventure')) {
                   return responses.conseils.aventure;
               }
               if (lowerMessage.includes('romantique') || lowerMessage.includes('couple')) {
                   return responses.conseils.romantique;
               }
               if (lowerMessage.includes('famille') || lowerMessage.includes('enfant')) {
                   return responses.conseils.famille;
               }
               return "Pour choisir une destination, dites-moi ce qui vous passionne : l'art, l'aventure, le romantisme, ou autre chose ? Je pourrai ainsi vous conseiller au mieux !";
           }
          
           // Vérifier les mots-clés pour la FAQ
           for (const [question, answer] of Object.entries(responses.faq)) {
               if (lowerMessage.includes(question.toLowerCase())) {
                   return answer;
               }
           }
          
           // Vérifier les mots-clés pour les destinations générales
           if (lowerMessage.includes('destination') || lowerMessage.includes('où') || lowerMessage.includes('pays') || lowerMessage.includes('époque')) {
               return "Nous proposons des voyages vers trois destinations phares : **Paris 1889** (Belle Époque), **Florence 1504** (Renaissance), et le **Crétacé (-65 millions d'années)** pour une aventure préhistorique. Laquelle vous intrigue le plus ?";
           }
          
           // Vérifier les mots-clés pour les prix
           if (lowerMessage.includes('prix') || lowerMessage.includes('coût') || lowerMessage.includes('tarif') || lowerMessage.includes('combien')) {
               return "Voici nos tarifs pour nos destinations phares : " +
                      Object.entries(responses.destinations).map(([dest, info]) => `${dest}: ${info.price}`).join(" | ");
           }
          
           // Réponse par défaut
           return responses.default[Math.floor(Math.random() * responses.default.length)];
       }


       // Afficher/Masquer la fenêtre de chat
       chatbotFloat.addEventListener('click', () => {
           chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
           if (chatbotContainer.style.display === 'flex' && chatbotMessages.children.length === 1) {
               // Ajouter un message de bienvenue si c'est la première ouverture
               setTimeout(() => {
                   const welcomeMessage = responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
                   addMessage(welcomeMessage);
               }, 500);
           }
       });


       chatbotClose.addEventListener('click', () => {
           chatbotContainer.style.display = 'none';
       });


       // Envoyer un message
       function sendMessage() {
           const userMessage = chatbotInput.value.trim();
           if (userMessage === '') return;


           addMessage(userMessage, true);
           chatbotInput.value = '';


           // Simuler une réponse après un court délai
           setTimeout(() => {
               const botResponse = generateResponse(userMessage);
               addMessage(botResponse);
           }, 500);
       }


       chatbotSend.addEventListener('click', sendMessage);


       chatbotInput.addEventListener('keypress', (e) => {
           if (e.key === 'Enter') {
               sendMessage();
           }
       });
   </script>
</body>
</html>
