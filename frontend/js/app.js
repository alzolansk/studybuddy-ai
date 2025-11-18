// Dados mockados dos flashcards para o protótipo
const mockFlashcards = [
    {
        front: "Queda do Muro de Berlim",
        back: "Iniciada em 13 de agosto de 1961 pela Alemanha Oriental para impedir a fuga massiva de cidadãos para o lado ocidental da cidade."
    },
    {
        front: "Revolução Francesa",
        back: "Período de intensa transformação política e social na França que durou de 1789 até 1799, marcando o fim do absolutismo e o surgimento de ideias republicanas."
    },
    {
        front: "Primeira Guerra Mundial",
        back: "Conflito global que ocorreu entre 1914 e 1918, envolvendo as principais potências mundiais divididas em Aliados e Potências Centrais."
    },
    {
        front: "Renascimento",
        back: "Movimento cultural, científico e artístico que surgiu na Itália no século XIV e se espalhou pela Europa, marcando a transição da Idade Média para a Idade Moderna."
    },
    {
        front: "Revolução Industrial",
        back: "Processo de mudança de uma economia agrária e artesanal para uma economia dominada pela indústria e manufatura, iniciado na Inglaterra no século XVIII."
    },
    {
        front: "Descobrimento do Brasil",
        back: "Chegada dos portugueses ao território brasileiro em 22 de abril de 1500, liderada por Pedro Álvares Cabral."
    },
    {
        front: "Guerra Fria",
        back: "Período de tensão geopolítica entre Estados Unidos e União Soviética após a Segunda Guerra Mundial, caracterizado por conflitos indiretos e corrida armamentista."
    },
    {
        front: "Independência do Brasil",
        back: "Processo político que culminou na separação do Brasil de Portugal em 7 de setembro de 1822, proclamada por Dom Pedro I."
    },
    {
        front: "Revolução Russa",
        back: "Série de eventos revolucionários em 1917 que derrubaram o governo czarista e levaram à criação da União Soviética."
    },
    {
        front: "Segunda Guerra Mundial",
        back: "Conflito militar global que durou de 1939 a 1945, envolvendo a maioria das nações do mundo, incluindo todas as grandes potências."
    }
];

// Estado da aplicação
let currentCardIndex = 0;
let flashcards = [...mockFlashcards];

// Elementos do DOM
const createScreen = document.getElementById('createScreen');
const loadingScreen = document.getElementById('loadingScreen');
const carouselScreen = document.getElementById('carouselScreen');
const generateBtn = document.getElementById('generateBtn');
const topicInput = document.getElementById('topicInput');
const flashcardCarousel = document.getElementById('flashcardCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentCardSpan = document.getElementById('currentCard');
const totalCardsSpan = document.getElementById('totalCards');
const newFlashcardsBtn = document.getElementById('newFlashcardsBtn');

// Event Listeners
generateBtn.addEventListener('click', generateFlashcards);
prevBtn.addEventListener('click', showPreviousCard);
nextBtn.addEventListener('click', showNextCard);
newFlashcardsBtn.addEventListener('click', resetToCreate);

// Função para gerar flashcards (por enquanto apenas simula)
function generateFlashcards() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
        alert('Por favor, descreva um tópico!');
        return;
    }
    
    // Mostra tela de loading
    createScreen.classList.remove('active');
    loadingScreen.classList.add('active');
    
    // Simula o tempo de processamento (2 segundos)
    setTimeout(() => {
        loadingScreen.classList.remove('active');
        carouselScreen.classList.add('active');
        renderFlashcard();
        updateCounter();
        updateNavigationButtons();
    }, 2000);
}

// Renderiza o flashcard atual
function renderFlashcard() {
    const card = flashcards[currentCardIndex];
    
    flashcardCarousel.innerHTML = `
        <div class="flashcard-3d" id="currentFlashcard">
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <h2>${card.front}</h2>
                    <p class="flip-hint">Use as setas ↑↓ ou clique para virar</p>
                </div>
                <div class="flashcard-back">
                    <p>${card.back}</p>
                </div>
            </div>
        </div>
    `;
    
    // Adiciona evento de clique para virar o card
    const flashcard3d = document.getElementById('currentFlashcard');
    flashcard3d.addEventListener('click', flipCard);
}

// Vira o flashcard
function flipCard() {
    const flashcard3d = document.getElementById('currentFlashcard');
    flashcard3d.classList.toggle('flipped');
}

// Navegar para o card anterior
function showPreviousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        renderFlashcard();
        updateCounter();
        updateNavigationButtons();
    }
}

// Navegar para o próximo card
function showNextCard() {
    if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++;
        renderFlashcard();
        updateCounter();
        updateNavigationButtons();
    }
}

// Atualiza o contador
function updateCounter() {
    currentCardSpan.textContent = currentCardIndex + 1;
    totalCardsSpan.textContent = flashcards.length;
}

// Atualiza os botões de navegação
function updateNavigationButtons() {
    prevBtn.disabled = currentCardIndex === 0;
    nextBtn.disabled = currentCardIndex === flashcards.length - 1;
}

// Volta para a tela de criação
function resetToCreate() {
    carouselScreen.classList.remove('active');
    createScreen.classList.add('active');
    currentCardIndex = 0;
    topicInput.value = '';
}

// Suporte para teclas de seta
document.addEventListener('keydown', (e) => {
    if (carouselScreen.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            showPreviousCard();
        } else if (e.key === 'ArrowRight') {
            showNextCard();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            flipCard();
        }
    }
});
