import throttle from 'lodash.throttle';
const FORM_STATE = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
const formStateValue = {
  inputValue: '',
  textareaValue: '',
};
populateTextArea();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInputChange, 500));

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(FORM_STATE);
  console.log(formStateValue);
}

function populateTextArea() {
  const savedMessage = localStorage.getItem(FORM_STATE);
  if (savedMessage) {
    const { inputValue, textareaValue } = JSON.parse(savedMessage);
    refs.input.value = inputValue;
    refs.textarea.value = textareaValue;
  }
}

function onFormInputChange(e) {
  if (e.target === refs.input) {
    formStateValue.inputValue = e.target.value;
  } else {
    formStateValue.textareaValue = e.target.value;
  }
  localStorage.setItem(FORM_STATE, JSON.stringify(formStateValue));
}
