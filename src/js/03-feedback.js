import throttle from 'lodash.throttle';
const FORM_STATE = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
const formStateValue = {};

populateForm();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInputChange, 500));

function onFormSubmit(e) {
  e.preventDefault();
  console.log({
    email: `${refs.input.value}`,
    message: `${refs.textarea.value}`,
  });

  localStorage.removeItem(FORM_STATE);
  e.currentTarget.reset();
}

function populateForm() {
  const savedValues = localStorage.getItem(FORM_STATE);
  if (savedValues) {
    const { email, message } = JSON.parse(savedValues);
    refs.input.value = email;
    refs.textarea.value = message;
  }
}

function onFormInputChange(e) {
  formStateValue[e.target.name] = e.target.value;
  localStorage.setItem(FORM_STATE, JSON.stringify(formStateValue));
}
