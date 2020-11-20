if (localStorage.getItem('authToken')) {
  location.replace('/');
}

let wasSubmited;
const form = document.forms.authForm;

const validateFields = () => {
  Object.keys(form.elements).map((key) =>
    form.elements[key].classList.remove('is-invalid')
  );

  if (!form.elements.email.value || !form.elements.password.value) {
    if (wasSubmited && !form.elements.email.value) {
      form.elements.email.classList.add('is-invalid');
    }
    if (wasSubmited && !form.elements.password.value) {
      form.elements.password.classList.add('is-invalid');
    }
    return false;
  }
  return true;
};

const onFormSubmit = async (event) => {
  event.preventDefault();
  wasSubmited = true;

  if (!validateFields()) {
    return;
  }

  const formData = new FormData();

  formData.append('email', form.elements.email.value);
  formData.append('password', form.elements.password.value);

  const { success, authToken, message } = await fetch('/api/login.php', {
    method: 'post',
    body: formData,
  }).then((r) => r.json());

  if (success) {
    localStorage.setItem('authToken', authToken);
    location.replace('/');
  } else {
    toastr.error(message);
    form.reset();
  }
};
