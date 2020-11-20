if (!localStorage.getItem('authToken')) {
  location.replace('login.html');
} else {
  const usersTableBodyRef = document.querySelector('.users-table tbody');

  let searchValue = '';
  let users = [];
  let selectedUser;
  let isAdmin;
  fetchUsers();

  function searchUsers({ target }) {
    searchValue = target.value;
    fetchUsers();
  }

  async function fetchUsers() {
    const res = await fetch(`/api/getUsers.php?search=${searchValue}`, {
      headers: new Headers({
        authorization: localStorage.getItem('authToken'),
      }),
    }).then((r) => r.json());
    users = res.users;
    isAdmin = res.isAdmin;
    renderUsers();
  }

  function renderUsers() {
    let html = '';

    if (isAdmin) {
      html = users.reduce(
        (acc, { id, firstName, lastName, email, isMe, photoUrl, role }) =>
          acc +
          `
						<tr>
							<td class="w-fit">
								<img
									src="${photoUrl}"
									alt=""
									class="user-photo"
									onerror="onImageError(event)"
								/>
	
								<span>${firstName} ${lastName}</span>
							</td>
							<td class="w-fit">
								${(isMe && `<span class="badge badge-primary">me</span>`) || ''}
								${
                  (role === 'admin' &&
                    `<span class="badge badge-danger" title="Admin"><i class="ri-user-star-line"></i></span>`) ||
                  ''
                }
							</td>
							<td>
								<a href="mailto:${email}">${email}</a>
							</td>
							<td class="w-fit">
								<div class="d-flex">
									<div onclick="selectUser('${id}')" class="btn btn-sm btn-outline-info">Details</div>
								
									${
                    (!isMe &&
                      `<div onclick="deleteUser('${id}')" class="btn btn-sm btn-outline-danger ml-3">Delete</div>`) ||
                    ''
                  }
								</div>
							</td>
						</tr>
					`,
        ''
      );
    } else {
      html = users.reduce(
        (acc, { id, firstName, lastName, email, isMe, photoUrl, role }) =>
          acc +
          `
						<tr>
							<td class="w-fit">
								<img
									src="${photoUrl}"
									alt=""
									class="user-photo"
									onerror="onImageError(event)"
								/>
	
								<span>${firstName} ${lastName}</span>
							</td>
							<td class="w-fit">
							${(isMe && `<span class="badge badge-primary">me</span>`) || ''}
							${
                (role === 'admin' &&
                  `<span class="badge badge-danger" title="Admin"><i class="ri-user-star-line"></i></span>`) ||
                ''
              }
							</td>
							<td>
								<a href="mailto:${email}">${email}</a>
							</td>
							<td class="w-fit">
								<div onclick="selectUser('${id}')" class="btn btn-sm btn-outline-info">Details</div>
							</td>
						</tr>
					`,
        ''
      );
    }

    usersTableBodyRef.innerHTML = html;
  }

  function selectUser(uid) {
    selectedUser = users.find(({ id }) => id === uid);
    console.log(selectedUser);

    $('[authModal] .modal-body tbody').html(
      Object.keys(selectedUser).reduce((acc, key) => {
        if (['id', 'createdAt', 'isMe'].includes(key)) {
          return acc;
        }

        return (
          acc +
          `
						<tr>
							<td>${key}</td>
							<td>${
                (key === 'photoUrl'
                  ? `
											<img class="w-100" src="${selectedUser.photoUrl}">
										`
                  : key === 'selectedLanguages'
                  ? transformLanguages(selectedUser)
                  : selectedUser[key] &&
                    selectedUser[key].length &&
                    selectedUser[key]) || 'No data provided'
              }</td>
						</tr>
					`
        );
      }, '')
    );

    $('[authModal]').modal('show');
  }

  async function deleteUser(uid) {
    const { isConfirmed } = await Swal.fire({
      title: 'Error!',
      text: 'Do you want to delete this user?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });

    if (isConfirmed) {
      await fetch(`/api/deleteUser.php?userId=${uid}`);
      fetchUsers();
    }
  }

  function transformLanguages(user) {
    const langs = {
      en: 'English',
      zh: 'Chinese',
      pt: 'Portuguese',
      es: 'Spanish',
      ar: 'Arabic',
      ru: 'Russian',
    };

    return user.selectedLanguages
      .split(',')
      .map((lang) => langs[lang])
      .join(', ');
  }
}
