import { generateFlashcardsFromAPI } from './api.js';

let currentCardIndex = 0;
let flashcards = [];

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

generateBtn.addEventListener('click', generateFlashcards);
prevBtn.addEventListener('click', showPreviousCard);
nextBtn.addEventListener('click', showNextCard);
newFlashcardsBtn.addEventListener('click', resetToCreate);

document.addEventListener('keydown', (e) => {
    if (carouselScreen.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            showPreviousCard();
        } else if (e.key === 'ArrowRight') {
            showNextCard();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            flipCurrentCard();
        }
    }
});

async function generateFlashcards() {
    const topic = topicInput.value.trim();
    
    if (!topic) {
        alert('Por favor, descreva um tópico!');
        return;
    }
    
    createScreen.classList.remove('active');
    loadingScreen.classList.add('active');
    
    try {
        flashcards = await generateFlashcardsFromAPI(topic);
        currentCardIndex = 0;
        
        loadingScreen.classList.remove('active');
        carouselScreen.classList.add('active');
        
        renderFlashcard();
        updateCounter();
        updateNavigationButtons();
    } catch (error) {
        console.error('Erro:', error);
        loadingScreen.classList.remove('active');
        createScreen.classList.add('active');
        alert('Erro ao gerar flashcards. Verifique se o servidor está rodando e tente novamente.');
    }
}

function renderFlashcard() {
    if (flashcards.length === 0) return;
    
    const card = flashcards[currentCardIndex];
    
    flashcardCarousel.innerHTML = `
        <div class="flashcard-3d" onclick="this.classList.toggle('flipped')">
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
}

function flipCurrentCard() {
    const card = document.querySelector('.flashcard-3d');
    if (card) {
        card.classList.toggle('flipped');
    }
}

function showPreviousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        renderFlashcard();
        updateCounter();
        updateNavigationButtons();
    }
}

function showNextCard() {
    if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++;
        renderFlashcard();
        updateCounter();
        updateNavigationButtons();
    }
}

function updateCounter() {
    currentCardSpan.textContent = currentCardIndex + 1;
    totalCardsSpan.textContent = flashcards.length;
}

function updateNavigationButtons() {
    prevBtn.disabled = currentCardIndex === 0;
    nextBtn.disabled = currentCardIndex === flashcards.length - 1;
}

function resetToCreate() {
    carouselScreen.classList.remove('active');
    createScreen.classList.add('active');
    topicInput.value = '';
    flashcards = [];
    currentCardIndex = 0;
}
