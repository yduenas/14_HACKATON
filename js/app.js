//const listado = document.getElementById('listado');
//const infoCarritos = [];
let infoCarrito = [];
//window.onload = obtenerInfo();
obtenerInfo();
async function obtenerInfo() {
	//alert('hola');
	//window.event.preventDefault();
	/* inicio */
	try {
		const infoCarritos = await fetch('http://localhost:3000/users');
		//console.log(infoCarritos);
		//const infoCarrito = await infoCarritos.json();
		let infoCarrito = await infoCarritos.json();
		//console.log(infoCarrito);

		const listado = document.getElementById('listado');
		let template = '';
		infoCarrito.forEach((user) => {
			//console.log(user.title);
			//console.log(user);
			template += `
			<!--producto-->
			<div id="${user.id}"" class="item col-md-3 col-6">
				<div class="p-2 product-block">
					<div class="d-flex justify-content-between">
						<div class="hover" data-toggle="modal" data-target="#modalEditar${user.id}">
							<i class="bi bi-pencil-square"></i><br />
							edit
						</div>
						<!--
						<div @click="eliminar(index, usuario.id)" data-toggle="modal" data-target="#modalBorrar">
						-->
						<div class="hover" data-toggle="modal" data-target="#modalBorrar${user.id}">
							<i class="bi bi-x-circle"></i><br />
							delete
						</div>
					</div>

					<img class="img-fluid" src="./img/silueta.jpg" alt="Perro1" />

					<div class="caption">
						<h5>name : ${user.name}</h5>
						<h6>username : ${user.username}</h6>
						<hr>
						<div>email : ${user.email}</div>
						<hr>
						<div>address : ${user.address.street} - ${user.address.suite}</div>
					</div>

					<!-- Modal BORRAR-->
					<div
						class="modal fade"
						id="modalBorrar${user.id}"
						tabindex="-1"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLabel">Eliminar usuario</h5>
									<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body">¿ Estas seguro que quieres eliminar este usuario: # ${user.id} - ${user.username} ?</div>
								<div class="modal-footer">
									<div class="row">
										<div class="col">
											<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
										</div>
										<div class="col">
											<button  type="button" class="btn btn-red" onclick="eliminar(${user.id});return false;"  data-dismiss="modal">Eliminar usuario</button>
											<!--id="enviar${user.id}"-->
											<!--onclick="eliminar(${user.id})"-->
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Modal BORRAR-->

					<!-- Modal EDITAR-->
					<div
						class="modal fade"
						id="modalEditar${user.id}"
						tabindex="-1"
						role="dialog"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLabel">Editar usuario</h5>
									<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true"></span>
									</button>
								</div>
								<div class="modal-body">
									<input class="form-control" type="text" id="id${user.id}" placeholder="Agregar ID" value="${user.id}" readonly />
									<input class="form-control" type="text" id="name${user.id}" placeholder="Agregar name" value="${user.name}"/>
									<input class="form-control" type="text" id="username${user.id}" placeholder="Agregar username" value="${user.username}" />
									<input class="form-control" type="text" id="email${user.id}" placeholder="Agregar uemail" value="${user.email}"/>

									<input class="form-control" type="text" id="street${user.id}" placeholder="Agregar street" value="${user.address.street}"/>
									<input class="form-control" type="text" id="suite${user.id}" placeholder="Agregar suite" value="${user.address.suite}"/>
									<input class="form-control" type="text" id="city${user.id}" placeholder="Agregar city" value="${user.address.city}"/>
									<input class="form-control" type="text" id="zipcode${user.id}" placeholder="Agregar zipcode" value="${user.address.zipcode}"/>
									<input class="form-control" type="text" id="lat${user.id}" placeholder="Agregar lat" value="${user.address.geo.lat}"/>
									<input class="form-control" type="text" id="lng${user.id}" placeholder="Agregar lng" value="${user.address.geo.lng}"/>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
									<button type="button" class="btn btn-red" data-dismiss="modal" onclick="actualizar(
										document.getElementById('id${user.id}').value,
										document.getElementById('name${user.id}').value,
										document.getElementById('username${user.id}').value,
										document.getElementById('email${user.id}').value,
										document.getElementById('street${user.id}').value,
										document.getElementById('suite${user.id}').value,
										document.getElementById('city${user.id}').value,
										document.getElementById('zipcode${user.id}').value,
										document.getElementById('lat${user.id}').value,
										document.getElementById('lng${user.id}').value
										)" >Actualizar</button>
										<!--





										-->
								</div>
							</div>
						</div>
					</div>

					<!-- /modal EDITAR-->
				</div>
			</div>
			<!--/producto-->
									`;
		});
		listado.innerHTML = template;

		//return infoCarrito;
		//console.log(infoCarrito);
	} catch (error) {
		console.log(error);
		/* fin */
	}
}

//console.log(obtenerInfo().then(console.log));

//const data = obtenerInfo().then((info) => info);
//console.log(data);
//const data = obtenerInfo();

//console.log(data);

/************/

const actualizar = async (id, name, username, email, street, suite, city, zipcode, lat, lng) => {
	alert('actualizando: ' + id);

	event.preventDefault();
	try {
		const datos = {
			id: id,
			name: name,
			username: username,
			email: email,
			address: {
				street: street,
				suite: suite,
				city: city,
				zipcode: zipcode,
				geo: {
					lat: lat,
					lng: lng,
				},
			},
		};
		console.log(datos);

		const url = `http://localhost:3000/users/${id}`;

		const params = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: JSON.stringify(datos),
		};
		const data = await fetch(url, params);
		const result = await data.json();
		console.log(result);
		obtenerInfo();
	} catch (err) {
		console.log(err);
	}
};
/*
function eliminar(id) {
	//alert('eliminando: ' + id);
	var elemento = document.getElementById(id);
	//alert(elemento);
	if (!elemento) {
		alert('El elemento selecionado no existe');
	} else {
		elemento.remove();

	}
}
*/

const eliminar = async (id) => {
	window.event.preventDefault();
	console.log(id);

	try {
		const url = `http://localhost:3000/users/${id}`;
		const parans = {
			method: 'DELETE',
		};
		const data = await fetch(url, parans);
		console.log(data);

		//	obtenerInfo();
	} catch (err) {
		console.log(err);
	}
};
/*
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function (e) {
	e.preventDefault();
	console.log('funciona');
});
*/
const agregarInfo = async () => {
	event.preventDefault();
	try {
		const datos = {
			//	id: infoCarrito.length + 1,
			name: document.getElementById('name').value,
			username: document.getElementById('username').value,
			email: document.getElementById('email').value,
			address: {
				street: document.getElementById('street').value,
				suite: document.getElementById('suite').value,
				city: document.getElementById('city').value,
				zipcode: document.getElementById('zipcode').value,
				geo: {
					lat: document.getElementById('lat').value,
					lng: document.getElementById('lng').value,
				},
			},
		};
		console.log(datos);

		const url = 'http://localhost:3000/users';

		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: JSON.stringify(datos),
		};
		const data = await fetch(url, params);
		const result = await data.json();
		console.log(result);
		obtenerInfo();
	} catch (err) {
		console.log(err);
	}
};

async function agregarInfox() {
	try {
		const infoCarritos = await fetch('http://localhost:3000/users');
		//console.log(infoCarritos);
		//const infoCarrito = await infoCarritos.json();
		let infoCarrito = await infoCarritos.json();

		let hola = 'hola';

		const infoCarritoMODAL = {
			//	id: document.getElementById('id').value,
			id: infoCarrito.length + 1,
			name: document.getElementById('name').value,
			username: document.getElementById('username').value,
			email: document.getElementById('email').value,
			address: {
				street: document.getElementById('street').value,
				suite: document.getElementById('suite').value,
				city: document.getElementById('city').value,
				zipcode: document.getElementById('zipcode').value,
				lat: document.getElementById('lat').value,
				lng: document.getElementById('lng').value,
			},
		};
		//console.log(infoCarrito.length);
		//console.log(infoCarritos);
		//console.log(infoCarrito);
		//console.log(infoCarritoMODAL);
		infoCarrito = [...infoCarrito, infoCarritoMODAL];

		document.getElementById('id').value = '';
		document.getElementById('name').value = '';
		document.getElementById('username').value = '';
		document.getElementById('email').value = '';
		document.getElementById('street').value = '';
		document.getElementById('suite').value = '';
		document.getElementById('city').value = '';
		document.getElementById('zipcode').value = '';
		document.getElementById('lat').value = '';
		document.getElementById('lng').value = '';
		//console.log(infoCarrito);

		let template = '';
		infoCarrito.forEach((user) => {
			//console.log(user.title);
			//console.log(user);
			template += `

			<!--producto-->
			<div id="${user.id}"" class="item col-md-3 col-6">
				<div class="p-2 product-block">
					<div class="d-flex justify-content-between">
						<div data-toggle="modal" data-target="#modalEditar${user.id}">
							<i class="bi bi-pencil-square"></i><br />
							edit
						</div>
						<!--
						<div @click="eliminar(index, usuario.id)" data-toggle="modal" data-target="#modalBorrar">
						-->
						<div data-toggle="modal" data-target="#modalBorrar${user.id}">
							<i class="bi bi-x-circle"></i><br />
							delete
						</div>
					</div>

					<img class="img-fluid" src="./img/silueta.jpg" alt="Perro1" />

					<div class="caption">
						<h5>name : ${user.name}</h5>
						<h6>username : ${user.username}</h6>
						<div>email : ${user.email}</div>
						<div>address : ${user.address.street} - ${user.address.suite}</div>
					</div>

					<!-- Modal BORRAR-->
					<div
						class="modal fade"
						id="modalBorrar${user.id}"
						tabindex="-1"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLabel">Eliminar usuario</h5>
									<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body">¿ Estas seguro que quieres eliminar este usuario: # ${user.id} - ${user.username} ?</div>
								<div class="modal-footer">
									<div class="row">
										<div class="col">
											<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
										</div>
										<div class="col">
											<button type="button" class="btn btn-red" onclick="eliminar(${user.id})" data-dismiss="modal">Eliminar usuario</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Modal BORRAR-->

					<!-- Modal EDITAR-->
					<div
						class="modal fade"
						id="modalEditar${user.id}"
						tabindex="-1"
						role="dialog"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLabel">Editar usuario</h5>
									<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true"></span>
									</button>
								</div>
								<div class="modal-body">
									<input class="form-control" type="text" id="id${user.id}" placeholder="Agregar ID" value="${user.id}" readonly />
									<input class="form-control" type="text" id="name${user.id}" placeholder="Agregar name" value="${user.name}"/>
									<input class="form-control" type="text" id="username${user.id}" placeholder="Agregar username" value="${user.username}" />
									<input class="form-control" type="text" id="email${user.id}" placeholder="Agregar uemail" value="${user.email}"/>

									<input class="form-control" type="text" id="street${user.id}" placeholder="Agregar street" value="${user.address.street}"/>
									<input class="form-control" type="text" id="suite${user.id}" placeholder="Agregar suite" value="${user.address.suite}"/>
									<input class="form-control" type="text" id="city${user.id}" placeholder="Agregar city" value="${user.address.city}"/>
									<input class="form-control" type="text" id="zipcode${user.id}" placeholder="Agregar zipcode" value="${user.address.zipcode}"/>
									<input class="form-control" type="text" id="lat${user.id}" placeholder="Agregar lat" value="${user.address.lat}"/>
									<input class="form-control" type="text" id="lng${user.id}	" placeholder="Agregar lng" value="${user.address.lng}"/>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
									<button type="button" class="btn btn-red" data-dismiss="modal">Grabar</button>
								</div>
							</div>
						</div>
					</div>

					<!-- /modal EDITAR-->
				</div>
			</div>
			<!--/producto-->

									`;
		});
		listado.innerHTML = template;
	} catch (error) {
		console.log(error);
		/* fin */
	}

	//console.log(infoCarrito2);
	//alert('hola');
	//alert(id + ' - ' + nombre + ' - ' + url + ' - ' + telefono + ' - ' + correo + ' - ' + pais + ' - ' + about);

	//infoCarritos = [...infoCarritos, infoCarrito2];
}
//console.log(infoCarrito);
