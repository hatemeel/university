let photoFile;
let wasSubmited;
const form = document.forms.authForm;

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

const daysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const validators = {
  firstName: (value) => {
    const regex = /^[A-Z][a-z]*'?[a-z]+((-| )[A-Za-z]+'?[a-z]+){0,2}$/;
    const regex_2 = /^[A-Z][a-z]*'?[a-z]+(-[A-Za-z]+'?[a-z]+){2}$/;
    const regex_3 = /^[A-Z][a-z]*'?[a-z]+( [A-Za-z]+'?[a-z]+){2}$/;
    return (
      regex.test(value.trim()) &&
      !regex_2.test(value.trim()) &&
      !regex_3.test(value.trim())
    );
  },
  lastName: (value) => {
    const regex = /^[A-Z][a-z]*'?[a-z]+((-| )[A-Za-z]+'?[a-z]+){0,2}$/;
    const regex_2 = /^[A-Z][a-z]*'?[a-z]+(-[A-Za-z]+'?[a-z]+){2}$/;
    const regex_3 = /^[A-Z][a-z]*'?[a-z]+( [A-Za-z]+'?[a-z]+){2}$/;
    return (
      regex.test(value.trim()) &&
      !regex_2.test(value.trim()) &&
      !regex_3.test(value.trim())
    );
  },
  birthDate: (value) => {
    const regex = /^\d{2}\/\d{2}\/(\d{2}|\d{4})$/;
    const regex_2 = /^\d{2}\.\d{2}\.(\d{2}|\d{4})$/;

    if (
      value.match(/\d{2}$/) &&
      value.match(/\d{2}$/)[0] &&
      !value.match(/\d{4}$/)
    ) {
      const match = value.match(/\d{2}$/)[0];
      const year = new Date().getFullYear().toString();

      if (match <= year.slice(2)) {
        value = value.replace(/\d{2}$/, (g) => `${year.slice(0, 2)}${g}`);
      } else {
        value = value.replace(/\d{2}$/, (g) => `${year.slice(0, 2) - 1}${g}`);
      }
    }

    if (regex.test(value.trim()) || regex_2.test(value.trim())) {
      if (
        value.match(/^\d{2}/)[0] >
          daysInMonth(
            value.match(/\d{4}$/)[0],
            value.match(/(?<=(\/|\.))\d{2}(?=(\/|\.))/)[0]
          ) ||
        parseInt(value.match(/^\d{2}/)[0], 10) < 1 ||
        parseInt(value.match(/(?<=(\/|\.))\d{2}(?=(\/|\.))/)[0], 10) < 1 ||
        parseInt(value.match(/(?<=(\/|\.))\d{2}(?=(\/|\.))/)[0], 10) > 12
      ) {
        return false;
      }

      if (value.match(/\d{4}$/)[0] < new Date().getFullYear() - 90) {
        return false;
      }
    }
    return regex.test(value.trim()) || regex_2.test(value.trim());
  },
  email: (value) => {
    const regex = /^[A-Za-z](?=.{0,254}$)(?=.{0,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]*(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?){0,5}\.[A-Za-z0-9]{2,5}$/;
    return regex.test(value.trim());
  },
  interests: (value) => {
    return !!value.trim();
  },
  password: (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    return regex.test(value.trim());
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

      if (el.name === 'birthDate') {
        let { value } = el;
        if (
          value.match(/\d{2}$/) &&
          value.match(/\d{2}$/)[0] &&
          !value.match(/\d{4}$/)
        ) {
          const match = value.match(/\d{2}$/)[0];
          const year = new Date().getFullYear().toString();

          if (match <= year.slice(2)) {
            value = value.replace(/\d{2}$/, (g) => `${year.slice(0, 2)}${g}`);
          } else {
            value = value.replace(
              /\d{2}$/,
              (g) => `${year.slice(0, 2) - 1}${g}`
            );
          }
        }
        acc[el.name] = value;
      } else {
        acc[el.name] = el.value;
      }

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

  if (!selectedLanguages.length && wasSubmited) {
    form.querySelector('.langs-error').classList.add('d-block');
    valid = false;
  } else {
    form.querySelector('.langs-error').classList.remove('d-block');
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
