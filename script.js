'use strict';

const btn = document.querySelector('#btn');
const inputEl = document.querySelector('#input');
const infoTextEl = document.querySelector('#info-text');
const meaningContainer = document.querySelector('#meaning-container');
const titleEl = document.querySelector('#title');
const meaningEl = document.querySelector('#meaning');
const audioEl = document.querySelector('#audio');
const phoneticEl = document.querySelector('#phonetic');
const phoneticEl2 = document.querySelector('.parags');

const fetchWord = async function (word) {
  try {
    meaningContainer.style.display = 'none';
    infoTextEl.textContent = `Searching for the word "${word}"`;

    infoTextEl.style.display = 'block';
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    inputEl.value = '';
    infoTextEl.style.display = 'none';

    if (result.title) {
      meaningContainer.style.display = 'block';
      titleEl.textContent = word;
      meaningEl.textContent = 'Not available! 😶';
      phoneticEl2.style.display = 'none';
      audioEl.style.display = 'none';
    } else {
      meaningContainer.style.display = 'block';
      audioEl.style.display = 'block';
      phoneticEl2.style.display = 'block';
      titleEl.textContent = result[0].word;
      meaningEl.textContent = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
      result[0].hasOwnProperty('phonetic')
        ? (phoneticEl.textContent = result[0].phonetic)
        : '';
    }

    console.log(result);
  } catch (error) {
    console.error(`${error} 🔴`);
    infoTextEl.textContent = 'You are not connected to the internet! 🥴';
  }
};

btn.addEventListener('click', function () {
  console.log(inputEl.value);
  const result = document.querySelector('#input').value;
  fetchWord(result);
});
