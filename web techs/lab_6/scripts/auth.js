let photoFile;
let wasSubmited;
const form = document.forms.authForm;

const formatDateInput = ({ target }) => {
  let value = target.value.replace(/\/|\D/g, '');

  value = value.replace(
    /[0-9]{2}/g,
    (g, i) =>
      `${g.toLowerCase()}${
        (i < 2 && value.length > 2) || (i < 3 && value.length > 4) ? '/' : ''
      }`
  );

  target.value = value.slice(0, 10);
};

const readFileData = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

const previewPhoto = async ({ target }) => {
  const file = target.files[0];
  photoFile = file;

  const src = await readFileData(file);

  target.parentElement.querySelector('.dropzone-preview').src = src;
  target.value = null;
};

const validators = {
  firstName: (value) => {
    const regex = /^\w+(-\w+)?$/;
    return regex.test(value.trim());
  },
  lastName: (value) => {
    const regex = /^\w+(-\w+)?$/;
    return regex.test(value.trim());
  },
  birthDate: (value) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(value.trim());
  },
  email: (value) => {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(value.trim());
  },
  password: (value) => {
    return value.trim().length >= 6;
  },
  confirmPassword: (value, confirmValue) => {
    return value === confirmValue;
  },
};

const validateForm = () => {
  let valid = true;
  const controls = [...form.elements].reduce((acc, el) => {
    if (el.name) {
      if (el.name === 'photo') {
        acc[el.name] = photoFile || null;
        return acc;
      }

      if (el.name === 'confirmPassword') {
        if (wasSubmited) {
          if (!validators[el.name](el.value, form.password.value)) {
            el.classList.add('is-invalid');
            valid = false;
          } else {
            el.classList.remove('is-invalid');
          }
        }

        return acc;
      }

      acc[el.name] = el.value;

      if (wasSubmited) {
        if (validators[el.name] && !validators[el.name](el.value)) {
          el.classList.add('is-invalid');
          valid = false;
        } else {
          el.classList.remove('is-invalid');
        }
      }
    }

    return acc;
  }, {});

  const selectedLanguages = [...form.querySelectorAll('[data-lang]')].reduce(
    (acc, el) => {
      if (el.checked) {
        acc.push(el.dataset.lang);
      }

      return acc;
    },
    []
  );

  if (!selectedLanguages.length) {
    form.querySelector('.langs-error').classList.add('d-block');
  } else {
    form.querySelector('.langs-error').classList.remove('d-block');
    valid = false;
  }

  if (!valid) {
    form.classList.add('border-danger');
  } else {
    form.classList.remove('border-danger');
  }

  return { ...controls, selectedLanguages };
};

const onFormSubmit = (event) => {
  event.preventDefault();
  wasSubmited = true;

  const controls = validateForm();

  console.log(controls);
};
